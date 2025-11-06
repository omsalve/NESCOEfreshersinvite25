// app/actions.ts

'use server'; // This directive marks these functions as Server Actions

import { appendFile } from 'fs/promises';
import { join } from 'path';

// Define the state for our form response
export type FormState = {
  success?: string;
  error?: string;
};

export async function addGuest(
  previousState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;

  if (!name || !name.trim()) {
    return { error: 'Please enter your name.' };
  }

  try {
    const nameTrimmed = name.trim();
    // Create a CSV-safe entry
    const guestEntry = `${new Date().toISOString()},"${nameTrimmed.replace(/"/g, '""')}"\n`;

    // Write to a file in the project's root.
    // In a real production app (like on Vercel), you'd use a database,
    // Vercel KV, or write to the /tmp directory.
    // For this project, a root file is simplest.
    await appendFile(join(process.cwd(), 'guestlist.csv'), guestEntry);

    return { success: `Thank you, ${nameTrimmed}!` };
  } catch (e) {
    console.error(e);
    return { error: 'Server error. Please try again.' };
  }
}