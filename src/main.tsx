import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/app/providers'
import { HomePage } from '@/pages/home'

import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <HomePage />
    </AppProviders>
  </StrictMode>
)
