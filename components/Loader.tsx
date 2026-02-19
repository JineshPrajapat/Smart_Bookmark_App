'use client'

interface LoaderProps {
  size?: number
  color?: string
  message?: string
}

export default function Loader({
  size = 40,
  color = 'text-blue-600',
  message,
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-gray-200 ${color}`}
        style={{ width: size, height: size }}
      ></div>
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  )
}
