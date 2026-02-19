'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-red-50 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Application Error
          </h1>

          <p className="mt-4 text-gray-700">
            {error.message || 'A critical error occurred.'}
          </p>

          <button
            onClick={() => reset()}
            className="mt-8 rounded-lg bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  )
}
