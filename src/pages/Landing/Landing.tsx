import { ArrowRight, TreePine } from 'lucide-react'

interface LandingProps {
  onStart: () => void
}

export function Landing({ onStart }: LandingProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <TreePine size={24} className="text-stone-700" />

          <span className="text-lg font-semibold tracking-tight text-stone-800">
            Family Tree
          </span>
        </div>

        <span className="text-sm text-stone-400">A personal project</span>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-8 py-16">
        <div className="grid w-full items-center gap-16 md:grid-cols-2">
          <div className="max-w-xl">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
              Every family has a story
            </span>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.1] tracking-tight text-stone-800 md:text-6xl">
              Discover the story behind your family.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-stone-500">
              Create, explore, and visualize your family tree. Bring generations
              together and preserve the stories that make your family unique.
            </p>

            <button
              type="button"
              onClick={onStart}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-stone-800 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              Create your family tree
              <ArrowRight size={18} />
            </button>

            <p className="mt-6 text-sm text-stone-400">
              Still growing, just like a family tree. 🌱
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-stone-200/60 blur-3xl" />

            <div className="relative flex h-[420px] w-full max-w-md items-center justify-center rounded-[2rem] border border-stone-200 bg-white/70 shadow-sm">
              <div className="text-center">
                <TreePine
                  size={110}
                  strokeWidth={1}
                  className="mx-auto text-stone-400"
                />

                <p className="mt-6 text-sm font-medium text-stone-500">
                  Your family story starts here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
