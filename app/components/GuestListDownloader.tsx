// components/GuestListDownloader.tsx

'use client';

export default function GuestListDownloader() {
  const handleDownload = () => {
    try {
      const guestList = JSON.parse(
        localStorage.getItem('guestList') || '[]'
      );
      if (guestList.length === 0) {
        alert('No guests have RSVPd yet.');
        return;
      }

      // Create CSV content
      const header = 'Name\n';
      const rows = guestList
        .map((name: string) => `"${name.replace(/"/g, '""')}"`)
        .join('\n');
      const csvContent = header + rows;

      // Create blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        'fy_btech_freshers_guest_list_2025.csv'
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download guest list:', error);
      alert('Could not download the guest list. Check console for errors.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="py-2 px-5 rounded-lg text-sm text-gray-300 bg-transparent 
                 border border-white/30 hover:bg-white/10 hover:text-white 
                 transition-colors duration-300"
    >
      Download Guest List (.csv)
    </button>
  );
}