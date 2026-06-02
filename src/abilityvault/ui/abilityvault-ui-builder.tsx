import { Check, Circle } from 'lucide-react'

import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { cn } from '@/core/util/utils'

import type { AbilityClass, AbilityElement, AbilityLoadout, AbilityRole } from '../util/abilityvault-types'

import {
  abilityClasses,
  abilityElements,
  abilityNodes,
  abilityPassives,
  abilityRoles,
  abilityRunes,
} from '../data-access/abilityvault-catalog'

export function AbilityVaultUiBuilder({
  loadout,
  setClass,
  setElement,
  setPassive,
  setRole,
  toggleNode,
  toggleRune,
}: {
  loadout: AbilityLoadout
  setClass: (value: AbilityClass) => void
  setElement: (value: AbilityElement) => void
  setPassive: (value: string) => void
  setRole: (value: AbilityRole) => void
  toggleNode: (value: string) => void
  toggleRune: (value: string) => void
}) {
  return (
    <Card className="border-cyan-400/20 bg-slate-950/80">
      <CardHeader>
        <CardTitle>Ability Tree Builder</CardTitle>
        <CardDescription>
          Choose a class page, combat role, element lane, passive, rune sockets, and up to five nodes.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <Picker label="Class">
          {abilityClasses.map((item) => (
            <Button
              key={item.id}
              onClick={() => setClass(item.id)}
              variant={loadout.classId === item.id ? 'default' : 'outline'}
            >
              {item.label}
            </Button>
          ))}
        </Picker>
        <Picker label="Role">
          {abilityRoles.map((item) => (
            <Button
              key={item.id}
              onClick={() => setRole(item.id)}
              variant={loadout.role === item.id ? 'default' : 'outline'}
            >
              {item.label}
            </Button>
          ))}
        </Picker>
        <Picker label="Element">
          {abilityElements.map((item) => (
            <Button
              key={item.id}
              onClick={() => setElement(item.id)}
              variant={loadout.element === item.id ? 'default' : 'outline'}
            >
              {item.label}
            </Button>
          ))}
        </Picker>
        <div className="grid gap-2">
          <div className="text-xs font-medium tracking-wide text-slate-400 uppercase">Passive</div>
          <div className="grid gap-2 md:grid-cols-3">
            {abilityPassives.map((passive) => (
              <button
                className={cn(
                  'rounded-md border p-3 text-left transition-colors',
                  loadout.passiveId === passive.id
                    ? 'border-emerald-300 bg-emerald-300/10'
                    : 'border-slate-700 bg-slate-900/70 hover:border-slate-500',
                )}
                key={passive.id}
                onClick={() => setPassive(passive.id)}
                type="button"
              >
                <span className="block text-sm font-semibold">{passive.name}</span>
                <span className="mt-1 block text-xs text-slate-400">{passive.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="text-xs font-medium tracking-wide text-slate-400 uppercase">Rune Sockets</div>
          <div className="grid gap-2 sm:grid-cols-3">
            {abilityRunes.map((rune) => (
              <button
                className={cn(
                  'rounded-md border p-3 text-left transition-colors',
                  loadout.runeIds.includes(rune.id)
                    ? 'border-cyan-300 bg-cyan-300/10'
                    : 'border-slate-700 bg-slate-900/70 hover:border-slate-500',
                )}
                key={rune.id}
                onClick={() => toggleRune(rune.id)}
                type="button"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {loadout.runeIds.includes(rune.id) ? <Check className="size-4" /> : <Circle className="size-4" />}
                  {rune.name}
                </span>
                <span className="mt-1 block text-xs text-slate-400">{rune.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="text-xs font-medium tracking-wide text-slate-400 uppercase">Tree Nodes</div>
          <div className="grid gap-2 md:grid-cols-3">
            {abilityNodes.map((node) => (
              <button
                className={cn(
                  'rounded-md border p-3 text-left transition-colors',
                  loadout.selectedNodeIds.includes(node.id)
                    ? 'border-amber-300 bg-amber-300/10'
                    : 'border-slate-700 bg-slate-900/70 hover:border-slate-500',
                )}
                key={node.id}
                onClick={() => toggleNode(node.id)}
                type="button"
              >
                <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                  {node.name}
                  <span className="text-[0.65rem] text-slate-400">T{node.tier}</span>
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  {node.classId} / {node.role} / {node.element}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Picker({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="grid gap-2">
      <div className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
