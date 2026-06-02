import { fetchAssetV1 } from '@obrera/mpl-core-kit-lib/generated'
import { address, signature as solanaSignature } from '@solana/kit'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

export interface AbilityVaultVerification {
  assetName?: string
  owner?: string
  signatureStatus?: string
  updateAuthority?: string
  uri?: string
}

export function useAbilityVaultVerifier({ client }: { client: SolanaClient }) {
  const [isChecking, setIsChecking] = useState(false)

  async function verifyAbilityAsset({ assetAddress, signature }: { assetAddress: string; signature: string }) {
    setIsChecking(true)
    try {
      const result: AbilityVaultVerification = {}
      if (assetAddress.trim()) {
        const asset = await fetchAssetV1(client.rpc, address(assetAddress.trim()))
        result.assetName = asset.data.name
        result.owner = String(asset.data.owner)
        result.updateAuthority = JSON.stringify(asset.data.updateAuthority)
        result.uri = asset.data.uri
      }
      if (signature.trim()) {
        const statuses = await client.rpc
          .getSignatureStatuses([solanaSignature(signature.trim())], { searchTransactionHistory: true })
          .send()
        const status = statuses.value[0]
        result.signatureStatus = status
          ? `${status.confirmationStatus ?? 'processed'} / ${status.err ? 'error' : 'ok'}`
          : 'not found'
      }
      return result
    } finally {
      setIsChecking(false)
    }
  }

  return { isChecking, verifyAbilityAsset }
}
