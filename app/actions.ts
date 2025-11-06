'use server';

import { createClient } from 'redis';

// --- TYPES ---
export type FormState = {
  success?: string;
  error?: string;
};

type Guest = {
  name: string;
  createdAt: string;
};

// --- REDIS CLIENT (Single Instance) ---
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (redisClient && redisClient.isOpen) return redisClient;

  const client = createClient({
    url: process.env.REDIS_URL, // e.g. redis://default:password@host:port
  });

  client.on('error', (err) => console.error('Redis Client Error:', err));

  await client.connect();
  redisClient = client;
  return client;
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
    const client = await getRedisClient();

    const guest: Guest = {
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    await client.lPush('guest_list', JSON.stringify(guest));

    return { success: `Thank you, ${guest.name}! You're on the guest list.` };
  } catch (err) {
    console.error('Error adding guest:', err);
    return { error: 'Server error. Please try again later.' };
  }
}

// --- GET GUEST LIST ---
export async function getGuestList(): Promise<Guest[]> {
  try {
    const client = await getRedisClient();
    const data = await client.lRange('guest_list', 0, -1);

    if (!data || data.length === 0) return [];

    const guests = data.map((g: string) => {
      try {
        return JSON.parse(g) as Guest;
      } catch {
        return { name: g, createdAt: new Date().toISOString() };
      }
    });

    return guests.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } catch (err) {
    console.error('Error fetching guest list:', err);
    return [];
  }
}
