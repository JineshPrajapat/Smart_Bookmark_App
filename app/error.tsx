'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="mb-4 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9
                 9-4.03 9-9-4.03-9-9-9z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {error.message || 'Unexpected error occurred.'}
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
