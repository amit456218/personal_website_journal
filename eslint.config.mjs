import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Flags mount-time reads of browser-only state (viewport width, audio
      // duration) and resets keyed to a changing source. Those are deliberate
      // here, so surface it as advice rather than failing the build.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default config
