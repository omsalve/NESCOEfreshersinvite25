'use server';

import { createClient } from 'redis';

export type FormState = {
  success?: string;
  error?: string;
};

// Connect to Redis once globally
let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL, // set this in .env
    });

    redis.on('error', (err) => console.error('Redis Client Error', err));
    await redis.connect();
  }
  return redis;
}

// Add a guest name to Redis list
export async function addGuest(
  previousState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;

  if (!name || !name.trim()) {
    return { error: 'Please enter your name.' };
  }

  const cleanName = name.trim();

  try {
    const client = await getRedisClient();

    // Store guests in a list
    await client.lPush('guest_list', cleanName);

    return { success: `Thank you, ${cleanName}! You're on the list.` };
  } catch (err) {
    console.error('Redis Error:', err);
    return { error: 'Could not save your name. Try again later.' };
  }
}

// Get all guests (for admin)
export async function getGuestList(): Promise<string[]> {
  try {
    const client = await getRedisClient();
    const guests = await client.lRange('guest_list', 0, -1);
    return guests;
  } catch (err) {
    console.error('Redis Fetch Error:', err);
    return [];
  }
}

// Clear guest list (for dev/admin only)
export async function clearGuestList(): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del('guest_list');
  } catch (err) {
    console.error('Redis Clear Error:', err);
  }
}
