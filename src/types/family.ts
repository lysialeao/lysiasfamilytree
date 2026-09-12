export type Gender = 'male' | 'female' | 'other'

export type RelationshipType = 'parent-child' | 'spouse'

export interface Person {
  id: string
  firstName: string
  lastName?: string
  gender?: Gender
  birthDate?: string
  deathDate?: string
  birthPlace?: string
  deathPlace?: string
  photoUrl?: string
  biography?: string
}

export interface Relationship {
  id: string
  type: RelationshipType
  from: string
  to: string
}
