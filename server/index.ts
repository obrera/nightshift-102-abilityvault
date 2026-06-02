import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import { ABILITYVAULT_BASE_URL } from '../src/abilityvault/data-access/abilityvault-catalog'
import {
  createAbilityVaultMetadataFromCode,
  renderAbilityVaultSvgFromCode,
} from '../src/abilityvault/util/abilityvault-render'

export const app = new Hono()

app.get('/api/health', (context) =>
  context.json({
    build: '102',
    name: 'AbilityVault',
    ok: true,
    service: 'abilityvault102',
  }),
)

app.get('/api/metadata/:code', (context) => {
  const code = context.req.param('code')
  return context.json(
    createAbilityVaultMetadataFromCode(code, getBaseUrl(context.req.url, context.req.header('x-forwarded-proto'))),
  )
})

app.get('/api/art/:code', (context) =>
  context.body(renderAbilityVaultSvgFromCode(context.req.param('code')), 200, {
    'Cache-Control': 'public, max-age=300',
    'Content-Type': 'image/svg+xml; charset=utf-8',
  }),
)

app.use('/assets/*', serveStatic({ root: './dist' }))
app.use('/favicon.ico', serveStatic({ path: './dist/favicon.ico' }))
app.use('*', serveStatic({ path: './dist/index.html' }))

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 3000)
  console.log(`AbilityVault server listening on ${port}`)
  Bun.serve({ fetch: app.fetch, port })
}

function getBaseUrl(requestUrl: string, forwardedProto?: string) {
  if (process.env.PUBLIC_BASE_URL) return process.env.PUBLIC_BASE_URL.replace(/\/$/, '')
  const url = new URL(requestUrl)
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return `${forwardedProto ?? url.protocol.replace(':', '')}://${url.host}`
  }
  return ABILITYVAULT_BASE_URL
}
