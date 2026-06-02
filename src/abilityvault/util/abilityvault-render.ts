import type { AbilityLoadout, AbilityVaultMetadata } from './abilityvault-types'

import { abilityClasses, abilityNodes, ABILITYVAULT_BASE_URL } from '../data-access/abilityvault-catalog'
import { decodeAbilityLoadout, simulateAbilityLoadout } from './abilityvault-engine'

export function createAbilityVaultMetadata(
  loadout: AbilityLoadout,
  baseUrl = ABILITYVAULT_BASE_URL,
): AbilityVaultMetadata {
  const simulation = simulateAbilityLoadout(loadout)
  const code = encodeURIComponent(simulation.code)
  const className = abilityClasses.find((item) => item.id === loadout.classId)?.label ?? 'Sentinel'

  return {
    attributes: [
      { trait_type: 'Class', value: className },
      { trait_type: 'Role', value: loadout.role },
      { trait_type: 'Element', value: loadout.element },
      { trait_type: 'Rarity', value: simulation.rarity },
      { trait_type: 'Readiness', value: simulation.readiness },
      { trait_type: 'Synergy', value: simulation.synergy },
      { trait_type: 'Nodes', value: loadout.selectedNodeIds.length },
    ],
    description:
      'AbilityVault is a wallet-signed Solana game ability page: a playable class tree with deterministic first-party SVG art, combat simulation, and verifier metadata.',
    image: `${baseUrl}/api/art/${code}`,
    name: `AbilityVault ${className} ${simulation.rarity} Page`,
    properties: {
      category: 'image',
      files: [{ type: 'image/svg+xml', uri: `${baseUrl}/api/art/${code}` }],
    },
    symbol: 'ABV102',
  }
}

export function createAbilityVaultMetadataFromCode(code: string, baseUrl = ABILITYVAULT_BASE_URL) {
  return createAbilityVaultMetadata(decodeAbilityLoadout(code), baseUrl)
}

export function renderAbilityVaultSvg(loadout: AbilityLoadout) {
  const simulation = simulateAbilityLoadout(loadout)
  const nodes = abilityNodes.filter((node) => loadout.selectedNodeIds.includes(node.id))
  const className = abilityClasses.find((item) => item.id === loadout.classId)?.label ?? 'Sentinel'
  const nodeText = nodes
    .map((node, index) =>
      svgText(`<text x="80" y="${270 + index * 46}" fill="#dbeafe" font-size="24">${node.name} / T${node.tier}</text>`),
    )
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#080b10"/>
  <rect x="48" y="48" width="1104" height="704" rx="24" fill="#101722" stroke="#2dd4bf" stroke-width="3"/>
  <path d="M770 120 C980 120 1040 250 1030 398 C1015 588 900 676 728 674 C804 566 812 458 777 348 C750 268 716 190 770 120Z" fill="#132f3d"/>
  <circle cx="914" cy="250" r="86" fill="#f97316" opacity="0.84"/>
  <circle cx="940" cy="416" r="118" fill="#38bdf8" opacity="0.45"/>
  <text x="78" y="132" fill="#f8fafc" font-family="Arial, sans-serif" font-size="54" font-weight="700">AbilityVault</text>
  <text x="80" y="180" fill="#5eead4" font-family="Arial, sans-serif" font-size="28">${className} / ${loadout.role} / ${loadout.element}</text>
  <text x="80" y="230" fill="#94a3b8" font-family="Arial, sans-serif" font-size="20">Playable ability page nodes</text>
  ${nodeText}
  <text x="742" y="190" fill="#f8fafc" font-family="Arial, sans-serif" font-size="42" font-weight="700">${simulation.rarity}</text>
  <text x="742" y="248" fill="#d1fae5" font-family="Arial, sans-serif" font-size="28">Readiness ${simulation.readiness}</text>
  <text x="742" y="294" fill="#bfdbfe" font-family="Arial, sans-serif" font-size="28">Synergy ${simulation.synergy}</text>
  <text x="742" y="360" fill="#f8fafc" font-family="Arial, sans-serif" font-size="24">PWR ${simulation.power} / DEF ${simulation.defense}</text>
  <text x="742" y="402" fill="#f8fafc" font-family="Arial, sans-serif" font-size="24">TMP ${simulation.tempo} / CTL ${simulation.control}</text>
  <text x="78" y="708" fill="#64748b" font-family="Arial, sans-serif" font-size="18">Nightshift build 102 deterministic first-party SVG metadata</text>
</svg>`
}

export function renderAbilityVaultSvgFromCode(code: string) {
  return renderAbilityVaultSvg(decodeAbilityLoadout(code))
}

function svgText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<text', '<text font-family="Arial, sans-serif"')
}
