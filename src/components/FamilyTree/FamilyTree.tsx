import { useCallback, useMemo, useState } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { people, relationships } from '../../data/family'
import { getTreeLayout } from '../../utils/treeLayout'
import { PersonCard } from '../PersonCard/PersonCard'
import { FamilyConnector } from '../FamilyConnector/FamilyConnector'

import type { Person } from '../../types/family'
import { PersonDetails } from '../PersonDetails/PersonDetails'

const nodeTypes = {
  person: PersonCard,
  family: FamilyConnector,
}

export function FamilyTree() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const handleSelectPerson = useCallback((person: Person) => {
    setSelectedPerson(person)
  }, [])
  const positions = useMemo(() => getTreeLayout(people, relationships), [])

  const personNodes = useMemo<Node[]>(
    () =>
      people.map((person) => ({
        id: person.id,
        type: 'person',
        position: positions[person.id],
        data: {
          person,
          onSelect: handleSelectPerson,
          selected: selectedPerson?.id === person.id,
        },
      })),
    [positions, handleSelectPerson, selectedPerson],
  )

  const familyGroups = useMemo(() => {
    const parentRelationships = relationships.filter(
      (relationship) => relationship.type === 'parent-child',
    )

    const spouseRelationships = relationships.filter(
      (relationship) => relationship.type === 'spouse',
    )

    const groups = new Map<
      string,
      {
        parents: [string, string]
        children: string[]
      }
    >()

    spouseRelationships.forEach(({ from, to }) => {
      const parents: [string, string] = from < to ? [from, to] : [to, from]

      const id = `family-${parents[0]}-${parents[1]}`

      groups.set(id, {
        parents,
        children: [],
      })
    })

    parentRelationships.forEach(({ from, to }) => {
      const family = Array.from(groups.values()).find(
        (group) =>
          group.parents.includes(from) &&
          group.parents.some((parent) => parent !== from),
      )

      if (!family) {
        return
      }

      if (!family.children.includes(to)) {
        family.children.push(to)
      }
    })

    return Array.from(groups.entries())
      .filter(([, group]) => group.children.length > 0)
      .map(([id, group]) => ({
        id,
        parents: group.parents,
        children: group.children,
      }))
  }, [])

  const familyNodes = useMemo<Node[]>(
    () =>
      familyGroups.map((family) => {
        const parentA = positions[family.parents[0]]
        const parentB = positions[family.parents[1]]

        const firstChild = positions[family.children[0]]

        return {
          id: family.id,
          type: 'family',
          position: {
            x: (parentA.x + parentB.x) / 2,
            y: (parentA.y + firstChild.y) / 2 - 20,
          },
          data: {},
        }
      }),
    [familyGroups, positions],
  )

  const nodes = useMemo(
    () => [...personNodes, ...familyNodes],
    [personNodes, familyNodes],
  )

  const edges = useMemo<Edge[]>(() => {
    const result: Edge[] = []

    // Casamentos
    relationships
      .filter((relationship) => relationship.type === 'spouse')
      .forEach((relationship) => {
        result.push({
          id: relationship.id,
          source: relationship.from,
          target: relationship.to,
          sourceHandle: 'right-source',
          targetHandle: 'left-target',
          type: 'straight',
        })
      })

    // Famílias
    familyGroups.forEach((family) => {
      const [parentA, parentB] = family.parents

      // Primeiro pai → união
      result.push({
        id: `${family.id}-parent-a`,
        source: parentA,
        target: family.id,
        sourceHandle: 'bottom-source',
        targetHandle: 'left',
        type: 'smoothstep',
      })

      // Segundo pai → união
      result.push({
        id: `${family.id}-parent-b`,
        source: parentB,
        target: family.id,
        sourceHandle: 'bottom-source',
        targetHandle: 'right',
        type: 'smoothstep',
      })

      // União → filhos
      family.children.forEach((childId) => {
        result.push({
          id: `${family.id}-${childId}`,
          source: family.id,
          target: childId,
          sourceHandle: 'bottom',
          targetHandle: 'top-target',
          type: 'smoothstep',
        })
      })
    })

    return result
  }, [familyGroups])

  return (
    <div className="relative h-screen w-screen">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {selectedPerson && (
        <PersonDetails
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  )
}
