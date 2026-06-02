import { Badge } from '@/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/ui/card'

import type { AbilityLoadout } from '../util/abilityvault-types'

import { encodeAbilityLoadout } from '../util/abilityvault-engine'
import { createAbilityVaultMetadata, renderAbilityVaultSvg } from '../util/abilityvault-render'

export function AbilityVaultUiPreview({ loadout }: { loadout: AbilityLoadout }) {
  const metadata = createAbilityVaultMetadata(loadout)
  const svg = renderAbilityVaultSvg(loadout)
  const code = encodeURIComponent(encodeAbilityLoadout(loadout))
  const metadataPath = `/api/metadata/${code}`
  const artPath = `/api/art/${code}`

  return (
    <Card className="border-sky-400/20 bg-slate-950/80">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Metadata Preview</CardTitle>
          <Badge variant="outline">JSON + SVG</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div
          className="overflow-hidden rounded-md border border-slate-800 bg-slate-900"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <div className="grid gap-1 text-xs">
          <a className="truncate text-cyan-300 hover:underline" href={metadataPath} rel="noreferrer" target="_blank">
            {metadataPath}
          </a>
          <a className="truncate text-cyan-300 hover:underline" href={artPath} rel="noreferrer" target="_blank">
            {artPath}
          </a>
        </div>
        <pre className="max-h-72 overflow-auto rounded-md border border-slate-800 bg-slate-900/80 p-3 text-[0.7rem] text-slate-300">
          {JSON.stringify(metadata, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}
