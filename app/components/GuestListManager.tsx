'use client';

import { Download } from 'lucide-react';

// This component receives the guest list from the server page
export default function GuestListManager({ guests }: { guests: string[] }) {
  const handleDownload = () => {
    if (guests.length === 0) {
      alert('No guests to download.');
      return;
    }

    // 1. Create CSV content
    // Your action saves only the name, so we'll create a 1-column CSV.
    // (If you update actions.ts to save timestamp, we can add it here)
    const header = 'Name\n';
    const rows = guests
      .map((name) => `"${name.replace(/"/g, '""')}"`) // Handle names with quotes
      .join('\n');
    const csvContent = header + rows;

    // 2. Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'fy_btech_freshers_guest_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-gray-400">
          {guests.length} guest(s) RSVPd
        </p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
        >
          <Download size={18} />
          Download .csv
        </button>
      </div>

      {/* The Guest List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
        {guests.length > 0 ? (
          <ul className="space-y-3">
            {guests.map((guest, index) => (
              <li
                key={index}
                className="p-3 bg-black/20 rounded-lg text-lg"
              >
                {/* The list is in reverse-chronological order (newest first) */}
                {guest}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-lg">No guests have RSVPd yet.</p>
        )}
      </div>
    </div>
  );
}