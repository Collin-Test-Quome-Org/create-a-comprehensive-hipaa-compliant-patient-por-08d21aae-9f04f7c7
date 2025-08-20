import {TooltipProvider} from '@/components/ui/tooltip'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from './components/theme-provider'

/**
 * Wraps app with various React Context Providers. Used in main.tsx
 */
export const Providers = ({children}: PropsWithChildren) => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <TooltipProvider>
      {children}
    </TooltipProvider>
  </ThemeProvider>
)
