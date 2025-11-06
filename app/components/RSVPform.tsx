// components/RSVPForm.tsx

'use client';

import { useState, FormEvent } from 'react';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    // Clear error and save to localStorage
    setError(null);
    try {
      const guestList = JSON.parse(
        localStorage.getItem('guestList') || '[]'
      );
      guestList.push(name.trim());
      localStorage.setItem('guestList', JSON.stringify(guestList));

      // Show thank you message
      setSubmittedName(name.trim());
      setName('');
    } catch (storageError) {
      console.error('Failed to save to localStorage:', storageError);
      setError('Could not save your RSVP. Please try again.');
    }
  };

  if (submittedName) {
    return (
      <div className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-3">
          Thank you, {submittedName}!
        </h2>
        <p className="text-gray-200 mb-6">You're on the list. See you there.</p>
        <button
          onClick={() => setSubmittedName(null)}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors duration-300"
        >
          RSVP for someone else
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Join the Party
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="sr-only">
            Your Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-3.5 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-white/30 
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-lg font-bold text-lg text-white 
                     bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-700 hover:to-pink-700
                     shadow-lg hover:shadow-purple-500/40
                     transition-all duration-300 transform hover:scale-105"
        >
          Count Me In
        </button>
      </form>
    </div>
  );
}