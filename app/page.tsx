import SignInWithGoogleButton from '@/components/SignInWithGoogleButton'
import { getServerUser } from '@/lib/getServerUser'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getServerUser()
    if (user) redirect('/dashboard')

  return (
    <div className="relative isolate pt-14 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">

      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.5" />
      </div>

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Keep your links <span className="text-indigo-600">organized.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          The minimal bookmark manager for professionals. Save links instantly, access them anywhere, and keep your workspace clutter-free.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <SignInWithGoogleButton />
        </div>
      </div>
    </div>
  )
}