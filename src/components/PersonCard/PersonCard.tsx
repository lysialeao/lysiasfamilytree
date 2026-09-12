import { Handle, Position, type NodeProps } from '@xyflow/react'

import type { Person } from '../../types/family'

type PersonCardData = {
  person: Person
  onSelect: (person: Person) => void
  selected?: boolean
}

export function PersonCard({ data }: NodeProps & { data: PersonCardData }) {
  const { person, onSelect, selected } = data

  const fullName = `${person.firstName} ${person.lastName ?? ''}`.trim()

  const formatYear = (date?: string) => {
    if (!date) return null

    return new Date(`${date}T00:00:00`).getFullYear()
  }

  const birthYear = formatYear(person.birthDate)
  const deathYear = formatYear(person.deathDate)

  const years =
    birthYear || deathYear ? `${birthYear ?? '?'} — ${deathYear ?? ''}` : null

  return (
    <div
      onClick={() => onSelect(person)}
      className={`
                relative w-[220px] overflow-hidden rounded-2xl border bg-white
                shadow-sm transition
                hover:-translate-y-1 hover:shadow-md
                ${
                  selected
                    ? 'border-stone-800 ring-2 ring-stone-200'
                    : 'border-stone-200'
                }
            `}
    >
      {/* Parent → Child */}
      <Handle
        id="top-target"
        type="target"
        position={Position.Top}
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      <Handle
        id="bottom-source"
        type="source"
        position={Position.Bottom}
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      {/* Spouse */}
      <Handle
        id="left-target"
        type="target"
        position={Position.Left}
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      <Handle
        id="right-source"
        type="source"
        position={Position.Right}
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      <div className="flex flex-col items-center px-5 py-5">
        {person.photoUrl ? (
          <img
            src={person.photoUrl}
            alt={fullName}
            className="mb-3 h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-2xl text-stone-400">
            {person.firstName.charAt(0)}
          </div>
        )}

        <h3 className="text-base font-semibold text-stone-800">{fullName}</h3>

        {years && <span className="mt-1 text-sm text-stone-500">{years}</span>}

        {person.birthPlace && (
          <span className="mt-2 text-xs text-stone-400">
            {person.birthPlace}
          </span>
        )}
      </div>
    </div>
  )
}
