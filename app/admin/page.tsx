'use client'

import { useState } from 'react'
import { getGuestList } from '@/app/actions'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [guestList, setGuestList] = useState<{ name: string; createdAt: string }[]>([])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password === '9323003566') {
        setIsAuthenticated(true)
        const guests = await getGuestList()
        setGuestList(guests)
      } else {
        setError('Incorrect password.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch guest list.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const csv = ['Name,Joined At']
      .concat(guestList.map(g => `${g.name},${new Date(g.createdAt).toLocaleString()}`))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'guest_list.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 p-8 rounded-2xl shadow-lg flex flex-col w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-6 bg-white text-black font-semibold py-2 rounded-lg hover:bg-zinc-200 transition"
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Guest List</h1>

        {guestList.length === 0 ? (
          <p className="text-gray-400 text-center">No guests yet.</p>
        ) : (
          <ul className="space-y-3">
            {guestList.map((guest, index) => (
              <li
                key={index}
                className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center border border-zinc-800"
              >
                <span>{guest.name}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(guest.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleDownload}
          className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Download CSV
        </button>
      </div>
    </div>
  )
}
