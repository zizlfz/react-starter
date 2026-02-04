import { FC, ReactNode } from 'react'

interface AppProvidersProps {
  readonly children: ReactNode
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <>{children}</> // ← later add QueryClientProvider, Theme etc.
)
