import { getGuestList } from '@/app/actions';

export const revalidate = 30;

export default async function AdminGuestList() {
  const guests = await getGuestList();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 p-8 md:p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Freshers' Party Guest List
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
          {guests.length > 0 ? (
            <ul className="space-y-3">
              {guests.map((guest: string, index: number) => (
                <li key={index} className="p-3 bg-black/20 rounded-lg text-lg">
                  {guest}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-lg">No guests have RSVPd yet.</p>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          This page automatically refreshes every 30 seconds.
        </p>
      </div>
    </main>
  );
}
