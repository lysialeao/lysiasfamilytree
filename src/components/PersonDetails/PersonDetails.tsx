import { X } from 'lucide-react'

import type { Person } from '../../types/family'

interface PersonDetailsProps {
  person: Person
  onClose: () => void
}

export function PersonDetails({ person, onClose }: PersonDetailsProps) {
  const fullName = `${person.firstName} ${person.lastName ?? ''}`.trim()

  const formatDate = (date?: string) => {
    if (!date) return null

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${date}T00:00:00`))
  }

  return (
    <aside className="absolute right-0 top-0 z-20 h-full w-[360px] border-l border-stone-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
        <span className="text-sm font-medium text-stone-500">Pessoa</span>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-6 py-8">
        {person.photoUrl ? (
          <img
            src={person.photoUrl}
            alt={fullName}
            className="mx-auto h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-stone-100 text-4xl text-stone-400">
            {person.firstName.charAt(0)}
          </div>
        )}

        <div className="mt-5 text-center">
          <h2 className="text-2xl font-semibold text-stone-800">{fullName}</h2>

          {person.birthDate && (
            <p className="mt-2 text-sm text-stone-500">
              {formatDate(person.birthDate)}
              {person.deathDate && ` — ${formatDate(person.deathDate)}`}
            </p>
          )}
        </div>

        <div className="mt-8 space-y-5">
          {person.birthPlace && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                Nascimento
              </p>

              <p className="mt-1 text-sm text-stone-700">{person.birthPlace}</p>
            </div>
          )}

          {person.deathPlace && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                Falecimento
              </p>

              <p className="mt-1 text-sm text-stone-700">{person.deathPlace}</p>
            </div>
          )}

          {person.biography && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                Biografia
              </p>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                {person.biography}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
