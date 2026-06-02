import { createBrowserRouter, Navigate } from 'react-router'

import type { ShellNotFoundProps } from '@/shell/data-access/shell-not-found-props'

import { ShellFeature, ShellUiLoader } from '@/shell/feature'

export const appRouter = createBrowserRouter(
  [
    {
      children: [
        { element: <Navigate replace to="/abilityvault" />, index: true },
        {
          lazy: () => import('@/abilityvault/feature/abilityvault-feature-entry'),
          path: 'abilityvault',
        },
        {
          lazy: () => import('@/about/feature/about-feature'),
          path: 'about',
        },
        {
          lazy: () => import('@/wallet/feature/wallet-feature'),
          path: 'wallet',
        },
        {
          lazy: () => import('@/shell/feature/shell-not-found-feature'),
          loader: (): ShellNotFoundProps => ({
            links: [
              {
                description: 'Learn what this starter includes and how the wallet playground is organized.',
                title: 'About',
                to: '/about',
              },
              {
                description: 'Open the AbilityVault builder, simulator, metadata preview, verifier, and mint flow.',
                title: 'AbilityVault',
                to: '/abilityvault',
              },
            ],
          }),
          path: '*',
        },
      ],
      element: (
        <ShellFeature
          links={[
            { label: 'AbilityVault', to: '/abilityvault' },
            { label: 'Wallet', to: '/wallet' },
            { label: 'About', to: '/about' },
          ]}
        />
      ),
      hydrateFallbackElement: <ShellUiLoader fullScreen />,
    },
  ],
  {
    // Set the base URL for router links and redirects, removing trailing slashes if present, independent of the base
    basename: import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)
