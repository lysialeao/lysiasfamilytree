import type { Person, Relationship } from '../types/family'

export const people: Person[] = [
  {
    id: '1',
    firstName: 'Antônio',
    lastName: 'Silva',
    gender: 'male',
    birthDate: '1940-05-12',
    birthPlace: 'São Paulo, Brasil',
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Silva',
    gender: 'female',
    birthDate: '1943-09-20',
    birthPlace: 'São Paulo, Brasil',
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Silva',
    gender: 'male',
    birthDate: '1965-03-10',
    birthPlace: 'São Paulo, Brasil',
  },
  {
    id: '4',
    firstName: 'Ana',
    lastName: 'Oliveira',
    gender: 'female',
    birthDate: '1968-07-22',
    birthPlace: 'Campinas, Brasil',
  },
  {
    id: '5',
    firstName: 'Lucas',
    lastName: 'Silva',
    gender: 'male',
    birthDate: '1992-11-05',
    birthPlace: 'São Paulo, Brasil',
  },
  {
    id: '6',
    firstName: 'Julia',
    lastName: 'Silva',
    gender: 'female',
    birthDate: '1995-02-18',
    birthPlace: 'São Paulo, Brasil',
  },
]

export const relationships: Relationship[] = [
  {
    id: 'r1',
    type: 'spouse',
    from: '1',
    to: '2',
  },
  {
    id: 'r2',
    type: 'parent-child',
    from: '1',
    to: '3',
  },
  {
    id: 'r3',
    type: 'parent-child',
    from: '2',
    to: '3',
  },
  {
    id: 'r4',
    type: 'spouse',
    from: '3',
    to: '4',
  },
  {
    id: 'r5',
    type: 'parent-child',
    from: '3',
    to: '5',
  },
  {
    id: 'r6',
    type: 'parent-child',
    from: '4',
    to: '5',
  },
  {
    id: 'r7',
    type: 'parent-child',
    from: '3',
    to: '6',
  },
  {
    id: 'r8',
    type: 'parent-child',
    from: '4',
    to: '6',
  },
]
