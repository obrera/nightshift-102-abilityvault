import type { AbilityLoadout, AbilityNode, AbilityPassive, AbilityRune } from '../util/abilityvault-types'

export const ABILITYVAULT_BASE_URL = 'https://abilityvault102.colmena.dev'

export const abilityClasses = [
  { id: 'sentinel', label: 'Sentinel', text: 'Barrier timing and measured counter pressure.' },
  { id: 'riftblade', label: 'Riftblade', text: 'Fast combo trees with volatile finishers.' },
  { id: 'arcanist', label: 'Arcanist', text: 'Control chains and elemental resource loops.' },
] as const

export const abilityRoles = [
  { id: 'duelist', label: 'Duelist' },
  { id: 'support', label: 'Support' },
  { id: 'warden', label: 'Warden' },
] as const

export const abilityElements = [
  { id: 'ember', label: 'Ember' },
  { id: 'frost', label: 'Frost' },
  { id: 'volt', label: 'Volt' },
] as const

export const abilityPassives: AbilityPassive[] = [
  {
    description: 'Every third ability banks guard into burst damage.',
    id: 'oath-loop',
    name: 'Oath Loop',
    stat: 'defense',
  },
  {
    description: 'Combo resets convert haste into precision control.',
    id: 'afterimage',
    name: 'Afterimage',
    stat: 'tempo',
  },
  {
    description: 'Elemental casts amplify the next support window.',
    id: 'relay-focus',
    name: 'Relay Focus',
    stat: 'control',
  },
]

export const abilityRunes: AbilityRune[] = [
  {
    description: 'Adds burn pressure and finisher damage.',
    element: 'ember',
    id: 'cinder-socket',
    name: 'Cinder Socket',
  },
  {
    description: 'Improves crowd control and shield stability.',
    element: 'frost',
    id: 'glacier-socket',
    name: 'Glacier Socket',
  },
  {
    description: 'Raises action economy and opening speed.',
    element: 'volt',
    id: 'storm-socket',
    name: 'Storm Socket',
  },
]

export const abilityNodes: AbilityNode[] = [
  {
    classId: 'sentinel',
    cost: 1,
    element: 'frost',
    id: 'guard-pulse',
    name: 'Guard Pulse',
    role: 'warden',
    stats: { control: 6, defense: 14, power: 5, tempo: 4 },
    tier: 1,
  },
  {
    classId: 'sentinel',
    cost: 2,
    element: 'ember',
    id: 'vow-breaker',
    name: 'Vow Breaker',
    role: 'duelist',
    stats: { control: 4, defense: 8, power: 15, tempo: 6 },
    tier: 2,
  },
  {
    classId: 'sentinel',
    cost: 3,
    element: 'volt',
    id: 'aegis-step',
    name: 'Aegis Step',
    role: 'support',
    stats: { control: 8, defense: 12, power: 6, tempo: 12 },
    tier: 3,
  },
  {
    classId: 'riftblade',
    cost: 1,
    element: 'volt',
    id: 'blink-cut',
    name: 'Blink Cut',
    role: 'duelist',
    stats: { control: 3, defense: 3, power: 12, tempo: 16 },
    tier: 1,
  },
  {
    classId: 'riftblade',
    cost: 2,
    element: 'ember',
    id: 'fracture-chain',
    name: 'Fracture Chain',
    role: 'duelist',
    stats: { control: 7, defense: 4, power: 18, tempo: 10 },
    tier: 2,
  },
  {
    classId: 'riftblade',
    cost: 3,
    element: 'frost',
    id: 'mirror-parry',
    name: 'Mirror Parry',
    role: 'warden',
    stats: { control: 12, defense: 10, power: 8, tempo: 8 },
    tier: 3,
  },
  {
    classId: 'arcanist',
    cost: 1,
    element: 'ember',
    id: 'sigil-spark',
    name: 'Sigil Spark',
    role: 'support',
    stats: { control: 10, defense: 4, power: 9, tempo: 7 },
    tier: 1,
  },
  {
    classId: 'arcanist',
    cost: 2,
    element: 'frost',
    id: 'lattice-bind',
    name: 'Lattice Bind',
    role: 'support',
    stats: { control: 16, defense: 7, power: 6, tempo: 5 },
    tier: 2,
  },
  {
    classId: 'arcanist',
    cost: 3,
    element: 'volt',
    id: 'overload-rite',
    name: 'Overload Rite',
    role: 'duelist',
    stats: { control: 8, defense: 3, power: 17, tempo: 13 },
    tier: 3,
  },
]

export const defaultAbilityLoadout = {
  classId: 'sentinel',
  element: 'frost',
  passiveId: 'oath-loop',
  role: 'warden',
  runeIds: ['glacier-socket', 'storm-socket'],
  selectedNodeIds: ['guard-pulse', 'aegis-step', 'mirror-parry'],
} satisfies AbilityLoadout
