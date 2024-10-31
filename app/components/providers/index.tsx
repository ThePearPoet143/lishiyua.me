import React from 'react'
import { AppThemeProvider } from '../theme'

const Providers = ({children}: {children:React.ReactNode}) => {
  return (
    <AppThemeProvider>{children}</AppThemeProvider>
  )
}

export default Providers
