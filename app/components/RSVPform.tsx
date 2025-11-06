// app/components/RSVPform.tsx

'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addGuest, FormState } from '@/app/actions';

// Initial state for the form
const initialState: FormState | null = null;

// A helper component to show pending state on the button
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 px-4 rounded-lg font-bold text-lg text-white 
                 bg-gradient-to-r from-purple-600 to-pink-600 
                 hover:from-purple-700 hover:to-pink-700
                 shadow-lg hover:shadow-purple-500/40
                 transition-all duration-300 transform hover:scale-105
                 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
    >
      {pending ? 'Submitting...' : 'Count Me In'}
    </button>
  );
}

export default function RSVPForm() {
  // useFormState hooks our form to the server action
  const [formState, formAction] = useFormState(addGuest, initialState);

  // We can use a ref or state to clear the input,
  // but for simplicity, we'll let the success message replace the form.
  if (formState?.success) {
    return (
      <div className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-3">
          {formState.success}
        </h2>
        <p className="text-gray-200">You're on the list. See you there.</p>
        {/* We don't show the "RSVP for someone else" button to keep the success message final */}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Join the Party
      </h2>
      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="name" className="sr-only">
            Your Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name" // The 'name' attribute is crucial for FormData
            placeholder="Enter your full name"
            className="w-full p-3.5 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-white/30 
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
          />
          {formState?.error && (
            <p className="text-red-400 text-sm mt-2 text-left">
              {formState.error}
            </p>
          )}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}