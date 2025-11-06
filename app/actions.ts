// app/actions.ts
'use server';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- TYPES ---
export type FormState = {
  success?: string;
  error?: string;
};

export type Guest = {
  name: string;
  createdAt: string; // camelCase for frontend
};

// --- SUPABASE CLIENT ---
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.NESCO_SUPABASE_URL!;
  const anonKey = process.env.NESCO_SUPABASE_ANON_KEY!;

  supabase = createClient(url, anonKey);
  return supabase;
}

// --- ADD GUEST ---
export async function addGuest(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string | null;

  if (!name || !name.trim()) {
    return { error: 'Please enter your name.' };
  }

  try {
    const client = getSupabaseClient();

    const { error } = await client
      .from('guests')
      .insert([{ name: name.trim() }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return { error: 'Server error. Please try again later.' };
    }

    return { success: `Thank you, ${name.trim()}! You're on the guest list.` };
  } catch (err) {
    console.error('Unexpected error adding guest:', err);
    return { error: 'Server error. Please try again later.' };
  }
}

// --- GET GUEST LIST ---
export async function getGuestList(): Promise<Guest[]> {
  try {
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('guests')
      .select('name, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase select error:', error);
      return [];
    }

    if (!data) return [];

    // Map snake_case to camelCase
    return data.map((g: any) => ({
      name: g.name,
      createdAt: g.created_at,
    }));
  } catch (err) {
    console.error('Unexpected error fetching guest list:', err);
    return [];
  }
}
