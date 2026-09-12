import type { Person, Relationship } from '../types/family'

const HORIZONTAL_GAP = 280
const VERTICAL_GAP = 260

export function getTreeLayout(
  people: Person[],
  relationships: Relationship[],
): Record<string, { x: number; y: number }> {
  const parentRelationships = relationships.filter(
    (relationship) => relationship.type === 'parent-child',
  )

  const spouseRelationships = relationships.filter(
    (relationship) => relationship.type === 'spouse',
  )

  /*
   * ---------------------------------------------------------
   * 1. Cria os grupos de cônjuges
   * ---------------------------------------------------------
   */

  const spouseMap = new Map<string, Set<string>>()

  const addSpouse = (personId: string, spouseId: string) => {
    const spouses = spouseMap.get(personId) ?? new Set<string>()

    spouses.add(spouseId)

    spouseMap.set(personId, spouses)
  }

  spouseRelationships.forEach(({ from, to }) => {
    addSpouse(from, to)
    addSpouse(to, from)
  })

  /*
   * ---------------------------------------------------------
   * 2. Descobre a geração de cada pessoa
   * ---------------------------------------------------------
   */

  const generation = new Map<string, number>()

  const parentsByChild = new Map<string, string[]>()

  parentRelationships.forEach(({ from, to }) => {
    const parents = parentsByChild.get(to) ?? []

    parents.push(from)

    parentsByChild.set(to, parents)
  })

  const getSpouseGroup = (personId: string): string[] => {
    const group = new Set<string>([personId])
    const queue = [personId]

    while (queue.length > 0) {
      const current = queue.shift()!

      const spouses = spouseMap.get(current) ?? new Set()

      spouses.forEach((spouseId) => {
        if (!group.has(spouseId)) {
          group.add(spouseId)
          queue.push(spouseId)
        }
      })
    }

    return Array.from(group)
  }

  const visited = new Set<string>()

  const assignGeneration = (personId: string, currentGeneration: number) => {
    const spouseGroup = getSpouseGroup(personId)

    spouseGroup.forEach((memberId) => {
      const existingGeneration = generation.get(memberId)

      if (
        existingGeneration !== undefined &&
        existingGeneration <= currentGeneration
      ) {
        return
      }

      generation.set(memberId, currentGeneration)
      visited.add(memberId)
    })

    spouseGroup.forEach((memberId) => {
      const children = parentRelationships
        .filter((relationship) => relationship.from === memberId)
        .map((relationship) => relationship.to)

      children.forEach((childId) => {
        assignGeneration(childId, currentGeneration + 1)
      })
    })
  }

  /*
   * Pessoas que não possuem pais dentro da árvore
   * são possíveis raízes.
   */
  const roots = people.filter((person) => !parentsByChild.has(person.id))

  roots.forEach((person) => {
    if (!visited.has(person.id)) {
      assignGeneration(person.id, 0)
    }
  })

  /*
   * Pessoas que ainda não receberam geração
   * ficam na primeira geração disponível.
   */
  people.forEach((person) => {
    if (!generation.has(person.id)) {
      assignGeneration(person.id, 0)
    }
  })

  /*
   * ---------------------------------------------------------
   * 3. Agrupa pessoas por geração
   * ---------------------------------------------------------
   */

  const groups = new Map<number, Person[]>()

  people.forEach((person) => {
    const personGeneration = generation.get(person.id) ?? 0

    const group = groups.get(personGeneration) ?? []

    group.push(person)

    groups.set(personGeneration, group)
  })

  /*
   * ---------------------------------------------------------
   * 4. Organiza cônjuges lado a lado
   * ---------------------------------------------------------
   */

  const positions: Record<string, { x: number; y: number }> = {}

  groups.forEach((group, generationIndex) => {
    const ordered: Person[] = []
    const processed = new Set<string>()

    group.forEach((person) => {
      if (processed.has(person.id)) {
        return
      }

      const spouse = group.find((candidate) => {
        if (candidate.id === person.id) {
          return false
        }

        const spouses = spouseMap.get(person.id)

        return spouses?.has(candidate.id)
      })

      if (spouse) {
        ordered.push(person)
        ordered.push(spouse)

        processed.add(person.id)
        processed.add(spouse.id)

        return
      }

      ordered.push(person)
      processed.add(person.id)
    })

    const totalWidth = (ordered.length - 1) * HORIZONTAL_GAP

    const startX = -totalWidth / 2

    ordered.forEach((person, index) => {
      positions[person.id] = {
        x: startX + index * HORIZONTAL_GAP,
        y: generationIndex * VERTICAL_GAP,
      }
    })
  })

  return positions
}
