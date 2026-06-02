import { app } from '../server/index'
import { defaultAbilityLoadout } from '../src/abilityvault/data-access/abilityvault-catalog'
import { encodeAbilityLoadout } from '../src/abilityvault/util/abilityvault-engine'

const code = encodeURIComponent(encodeAbilityLoadout(defaultAbilityLoadout))

const checks = [
  { contentType: 'application/json', path: '/api/health' },
  { contentType: 'application/json', path: `/api/metadata/${code}` },
  { contentType: 'image/svg+xml', path: `/api/art/${code}` },
]

for (const check of checks) {
  const response = await app.fetch(new Request(`http://localhost:3000${check.path}`))
  if (!response.ok) {
    throw new Error(`${check.path} returned ${response.status}`)
  }
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes(check.contentType)) {
    throw new Error(`${check.path} returned ${contentType}`)
  }
  const body = await response.text()
  if (!body.includes('AbilityVault') && !body.includes('abilityvault102')) {
    throw new Error(`${check.path} did not include AbilityVault runtime content`)
  }
  console.log(`ok ${check.path}`)
}
