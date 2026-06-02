import { Coins } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'

import type { AbilityVaultMintResult } from '../data-access/use-abilityvault-mint'
import type { AbilityLoadout, AbilitySimulation } from '../util/abilityvault-types'

import { createAbilityVaultMetadata } from '../util/abilityvault-render'

export function AbilityVaultUiMint({
  isMinting,
  loadout,
  mintAbilityPage,
  simulation,
}: {
  isMinting?: boolean
  loadout: AbilityLoadout
  mintAbilityPage?: (input: { metadataUri: string; name: string }) => Promise<AbilityVaultMintResult>
  simulation: AbilitySimulation
}) {
  const [result, setResult] = useState<AbilityVaultMintResult>()
  const metadata = createAbilityVaultMetadata(loadout)
  const metadataUri =
    typeof window === 'undefined'
      ? `/api/metadata/${encodeURIComponent(simulation.code)}`
      : `${window.location.origin}/api/metadata/${encodeURIComponent(simulation.code)}`
  const canMint = Boolean(mintAbilityPage) && simulation.readiness >= 62

  return (
    <Card className="border-amber-400/20 bg-slate-950/80">
      <CardHeader>
        <CardTitle>Wallet-Signed MPL Core Mint</CardTitle>
        <CardDescription>
          The connected wallet signs as payer, owner, and update authority for a devnet Core asset.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="rounded-md border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-300">
          {metadataUri}
        </div>
        <Button
          disabled={!canMint || isMinting}
          onClick={() =>
            void mintAbilityPage?.({ metadataUri, name: metadata.name }).then((mintResult) => {
              setResult(mintResult)
            })
          }
          size="lg"
        >
          <Coins className="size-4" />
          {isMinting ? 'Minting' : mintAbilityPage ? 'Mint Ability Page' : 'Connect Wallet to Mint'}
        </Button>
        {simulation.readiness < 62 ? (
          <div className="text-xs text-amber-200">Raise readiness to 62 before minting.</div>
        ) : null}
        {result ? (
          <pre className="overflow-auto rounded-md border border-slate-800 bg-slate-900/80 p-3 text-[0.7rem] text-slate-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </CardContent>
    </Card>
  )
}
