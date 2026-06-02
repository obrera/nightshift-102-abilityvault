import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Input } from '@/core/ui/input'

import type { AbilityVaultVerification } from '../data-access/use-abilityvault-verifier'

export function AbilityVaultUiVerifier({
  isChecking,
  result,
  verify,
}: {
  isChecking: boolean
  result?: AbilityVaultVerification
  verify: (input: { assetAddress: string; signature: string }) => Promise<void>
}) {
  const [assetAddress, setAssetAddress] = useState('')
  const [signature, setSignature] = useState('')

  return (
    <Card className="border-violet-400/20 bg-slate-950/80">
      <CardHeader>
        <CardTitle>Asset Verifier</CardTitle>
        <CardDescription>
          Check an MPL Core asset address, transaction signature, owner, update authority, and URI.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input
          onChange={(event) => setAssetAddress(event.target.value)}
          placeholder="MPL Core asset address"
          value={assetAddress}
        />
        <Input
          onChange={(event) => setSignature(event.target.value)}
          placeholder="Transaction signature"
          value={signature}
        />
        <Button
          disabled={isChecking || (!assetAddress.trim() && !signature.trim())}
          onClick={() => void verify({ assetAddress, signature })}
        >
          <Search className="size-4" />
          {isChecking ? 'Checking' : 'Verify'}
        </Button>
        {result ? (
          <pre className="overflow-auto rounded-md border border-slate-800 bg-slate-900/80 p-3 text-[0.7rem] text-slate-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </CardContent>
    </Card>
  )
}
