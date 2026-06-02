export type AbilityClass = 'arcanist' | 'riftblade' | 'sentinel'
export type AbilityElement = 'ember' | 'frost' | 'volt'
export interface AbilityLoadout {
  classId: AbilityClass
  element: AbilityElement
  passiveId: string
  role: AbilityRole
  runeIds: string[]
  selectedNodeIds: string[]
}

export interface AbilityNode {
  classId: AbilityClass
  cost: number
  element: AbilityElement
  id: string
  name: string
  role: AbilityRole
  stats: {
    control: number
    defense: number
    power: number
    tempo: number
  }
  tier: number
}

export interface AbilityPassive {
  description: string
  id: string
  name: string
  stat: keyof AbilityNode['stats']
}

export type AbilityRole = 'duelist' | 'support' | 'warden'

export interface AbilityRune {
  description: string
  element: AbilityElement
  id: string
  name: string
}

export interface AbilitySimulation {
  code: string
  control: number
  defense: number
  power: number
  rarity: 'Common' | 'Epic' | 'Mythic' | 'Rare'
  readiness: number
  synergy: number
  tempo: number
  warnings: string[]
}

export interface AbilityVaultMetadata {
  attributes: Array<{ trait_type: string; value: number | string }>
  description: string
  image: string
  name: string
  properties: {
    category: string
    files: Array<{ type: string; uri: string }>
  }
  symbol: string
}
