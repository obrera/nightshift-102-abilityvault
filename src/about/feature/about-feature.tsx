import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'

export function AboutFeature() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Card className="max-w-3xl border-border/60">
        <CardHeader className="gap-2">
          <CardTitle className="text-xl font-semibold tracking-tight">About</CardTitle>
          <CardDescription className="max-w-2xl text-sm/6">
            AbilityVault turns a playable class ability tree into a wallet-owned MPL Core devnet ability page with
            deterministic metadata, SVG art, and verifier tooling.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-medium">Ability page builder</div>
            <div className="mt-1 text-xs/relaxed text-muted-foreground">
              Tune class, role, element, passive, rune sockets, and tree nodes before committing a page.
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-medium">Wallet-signed Core mint</div>
            <div className="mt-1 text-xs/relaxed text-muted-foreground">
              The connected devnet wallet signs as payer, owner, and update authority for the MPL Core asset.
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-medium">Verifier-ready metadata</div>
            <div className="mt-1 text-xs/relaxed text-muted-foreground">
              Hono serves deterministic JSON and SVG routes for the page encoded by the minted asset URI.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { AboutFeature as Component }
