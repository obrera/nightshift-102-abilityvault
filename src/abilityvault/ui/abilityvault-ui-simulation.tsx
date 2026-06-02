import { Badge } from '@/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card'

import type { AbilitySimulation } from '../util/abilityvault-types'

export function AbilityVaultUiSimulation({ simulation }: { simulation: AbilitySimulation }) {
  const stats = [
    ['Power', simulation.power],
    ['Defense', simulation.defense],
    ['Tempo', simulation.tempo],
    ['Control', simulation.control],
  ] as const

  return (
    <Card className="border-emerald-400/20 bg-slate-950/80">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Combat Simulation</CardTitle>
          <Badge variant="secondary">{simulation.rarity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Readiness" value={simulation.readiness} />
          <Metric label="Synergy" value={simulation.synergy} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(([label, value]) => (
            <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3" key={label}>
              <div className="text-xs text-slate-400">{label}</div>
              <div className="mt-1 text-xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-2">
          {simulation.warnings.length ? (
            simulation.warnings.map((warning) => (
              <div
                className="rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-xs text-amber-100"
                key={warning}
              >
                {warning}
              </div>
            ))
          ) : (
            <div className="rounded-md border border-emerald-300/30 bg-emerald-300/10 p-3 text-xs text-emerald-100">
              Page is tournament-ready for a devnet mint.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
    </div>
  )
}
