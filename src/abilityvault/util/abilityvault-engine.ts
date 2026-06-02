import type { AbilityLoadout, AbilitySimulation } from './abilityvault-types'

import { abilityNodes, abilityPassives, abilityRunes } from '../data-access/abilityvault-catalog'

export function decodeAbilityLoadout(code: string): AbilityLoadout {
  const [classId, role, element, passiveId, runeText, nodeText] = code.split('__')
  return {
    classId: isOneOf(classId, ['sentinel', 'riftblade', 'arcanist']) ? classId : 'sentinel',
    element: isOneOf(element, ['ember', 'frost', 'volt']) ? element : 'frost',
    passiveId: abilityPassives.some((passive) => passive.id === passiveId) ? passiveId : 'oath-loop',
    role: isOneOf(role, ['duelist', 'support', 'warden']) ? role : 'warden',
    runeIds:
      runeText
        ?.split('.')
        .filter((id) => abilityRunes.some((rune) => rune.id === id))
        .slice(0, 2) ?? [],
    selectedNodeIds:
      nodeText
        ?.split('.')
        .filter((id) => abilityNodes.some((node) => node.id === id))
        .slice(0, 5) ?? [],
  }
}

export function encodeAbilityLoadout(loadout: AbilityLoadout) {
  return [
    loadout.classId,
    loadout.role,
    loadout.element,
    loadout.passiveId,
    loadout.runeIds.join('.'),
    loadout.selectedNodeIds.join('.'),
  ].join('__')
}

export function simulateAbilityLoadout(loadout: AbilityLoadout): AbilitySimulation {
  const nodes = abilityNodes.filter((node) => loadout.selectedNodeIds.includes(node.id))
  const passive = abilityPassives.find((item) => item.id === loadout.passiveId) ?? abilityPassives[0]
  const runes = abilityRunes.filter((rune) => loadout.runeIds.includes(rune.id))
  const totals = nodes.reduce(
    (sum, node) => ({
      control: sum.control + node.stats.control,
      defense: sum.defense + node.stats.defense,
      power: sum.power + node.stats.power,
      tempo: sum.tempo + node.stats.tempo,
    }),
    { control: 12, defense: 12, power: 12, tempo: 12 },
  )

  totals[passive.stat] += 12
  for (const rune of runes) {
    if (rune.element === 'ember') totals.power += 8
    if (rune.element === 'frost') totals.defense += 8
    if (rune.element === 'volt') totals.tempo += 8
  }

  const classMatches = nodes.filter((node) => node.classId === loadout.classId).length
  const roleMatches = nodes.filter((node) => node.role === loadout.role).length
  const elementMatches =
    nodes.filter((node) => node.element === loadout.element).length +
    runes.filter((rune) => rune.element === loadout.element).length
  const tierPressure = nodes.reduce((sum, node) => sum + node.cost, 0)
  const synergy = clamp(
    36 + classMatches * 9 + roleMatches * 7 + elementMatches * 6 - Math.max(0, tierPressure - 7) * 5,
    0,
    100,
  )
  const readiness = clamp(
    Math.round((totals.power + totals.defense + totals.tempo + totals.control) / 4 + synergy / 3),
    0,
    100,
  )
  const warnings = [
    nodes.length < 3 ? 'Socket at least three ability nodes before minting a tournament-ready page.' : '',
    synergy < 62 ? 'Synergy is thin; align class, role, element, or runes for a stronger page.' : '',
    tierPressure > 8 ? 'High tier pressure may drain early-combat resource tempo.' : '',
  ].filter(Boolean)

  return {
    code: encodeAbilityLoadout(loadout),
    control: totals.control,
    defense: totals.defense,
    power: totals.power,
    rarity: readiness >= 92 ? 'Mythic' : readiness >= 78 ? 'Epic' : readiness >= 62 ? 'Rare' : 'Common',
    readiness,
    synergy,
    tempo: totals.tempo,
    warnings,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function isOneOf<T extends string>(value: string | undefined, values: readonly T[]): value is T {
  return values.includes(value as T)
}
