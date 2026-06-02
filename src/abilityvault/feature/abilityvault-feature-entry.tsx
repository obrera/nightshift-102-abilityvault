import { useWalletUi } from '@wallet-ui/react'
import { ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import type { AbilityClass, AbilityElement, AbilityLoadout, AbilityRole } from '@/abilityvault/util/abilityvault-types'

import { defaultAbilityLoadout } from '@/abilityvault/data-access/abilityvault-catalog'
import { useAbilityVaultMint } from '@/abilityvault/data-access/use-abilityvault-mint'
import {
  type AbilityVaultVerification,
  useAbilityVaultVerifier,
} from '@/abilityvault/data-access/use-abilityvault-verifier'
import { AbilityVaultUiBuilder } from '@/abilityvault/ui/abilityvault-ui-builder'
import { AbilityVaultUiMint } from '@/abilityvault/ui/abilityvault-ui-mint'
import { AbilityVaultUiPreview } from '@/abilityvault/ui/abilityvault-ui-preview'
import { AbilityVaultUiSimulation } from '@/abilityvault/ui/abilityvault-ui-simulation'
import { AbilityVaultUiVerifier } from '@/abilityvault/ui/abilityvault-ui-verifier'
import { simulateAbilityLoadout } from '@/abilityvault/util/abilityvault-engine'
import { Button } from '@/core/ui/button'
import { useSolanaClient } from '@/solana/data-access/use-solana-client'
import { SolanaUiWalletDialog } from '@/solana/ui/solana-ui-wallet-dialog'

export function AbilityVaultFeature() {
  const client = useSolanaClient()
  const { account } = useWalletUi()
  const [loadout, setLoadout] = useState<AbilityLoadout>({ ...defaultAbilityLoadout })
  const [verification, setVerification] = useState<AbilityVaultVerification>()
  const simulation = useMemo(() => simulateAbilityLoadout(loadout), [loadout])
  const verifier = useAbilityVaultVerifier({ client })

  function setClass(classId: AbilityClass) {
    setLoadout((current) => ({ ...current, classId }))
  }

  function setRole(role: AbilityRole) {
    setLoadout((current) => ({ ...current, role }))
  }

  function setElement(element: AbilityElement) {
    setLoadout((current) => ({ ...current, element }))
  }

  function setPassive(passiveId: string) {
    setLoadout((current) => ({ ...current, passiveId }))
  }

  function toggleRune(runeId: string) {
    setLoadout((current) => {
      const hasRune = current.runeIds.includes(runeId)
      const runeIds = hasRune ? current.runeIds.filter((id) => id !== runeId) : [...current.runeIds, runeId].slice(-2)
      return { ...current, runeIds }
    })
  }

  function toggleNode(nodeId: string) {
    setLoadout((current) => {
      const hasNode = current.selectedNodeIds.includes(nodeId)
      const selectedNodeIds = hasNode
        ? current.selectedNodeIds.filter((id) => id !== nodeId)
        : [...current.selectedNodeIds, nodeId].slice(-5)
      return { ...current, selectedNodeIds }
    })
  }

  async function verify(input: { assetAddress: string; signature: string }) {
    try {
      const result = await verifier.verifyAbilityAsset(input)
      setVerification(result)
      toast.success('Verifier check complete')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verifier check failed')
    }
  }

  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:px-6">
        <div className="grid gap-4 rounded-md border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
              <ShieldCheck className="size-4" />
              Nightshift build 102
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">AbilityVault</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Build a playable Solana game ability page, tune combat sockets, simulate readiness, preview deterministic
              metadata, verify Core assets, and mint with the connected devnet wallet.
            </p>
          </div>
          {account ? <Button variant="outline">Wallet Connected</Button> : <SolanaUiWalletDialog />}
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
          <AbilityVaultUiBuilder
            loadout={loadout}
            setClass={setClass}
            setElement={setElement}
            setPassive={setPassive}
            setRole={setRole}
            toggleNode={toggleNode}
            toggleRune={toggleRune}
          />
          <div className="grid content-start gap-5">
            <AbilityVaultUiSimulation simulation={simulation} />
            {account ? (
              <AbilityVaultMintConnected account={account} client={client} loadout={loadout} simulation={simulation} />
            ) : (
              <AbilityVaultUiMint loadout={loadout} simulation={simulation} />
            )}
            <AbilityVaultUiVerifier
              isChecking={verifier.isChecking}
              result={verification}
              verify={(input) => verify(input)}
            />
          </div>
        </div>
        <AbilityVaultUiPreview loadout={loadout} />
      </section>
    </div>
  )
}

function AbilityVaultMintConnected({
  account,
  client,
  loadout,
  simulation,
}: {
  account: NonNullable<ReturnType<typeof useWalletUi>['account']>
  client: ReturnType<typeof useSolanaClient>
  loadout: AbilityLoadout
  simulation: ReturnType<typeof simulateAbilityLoadout>
}) {
  const mint = useAbilityVaultMint({ account, client })

  return (
    <AbilityVaultUiMint
      isMinting={mint.isMinting}
      loadout={loadout}
      mintAbilityPage={mint.mintAbilityPage}
      simulation={simulation}
    />
  )
}

export { AbilityVaultFeature as Component }
