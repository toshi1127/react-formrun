import { useCallback, useEffect } from 'react'

type DependencyList = ReadonlyArray<any>

type Config = {
  className: string
  type?: 'default' | 'embed'
}

interface Formrun<T> {
  init: (className: string) => void
  _formViews: T
  _reset: () => void
}

declare global {
  interface Window { Formrun: Formrun<never>; }
}

const defaultConfig: Config = {
  className: '.formrun',
  type: 'default',
}

export const useFormrun = <ReadonlyArray>(
  config = defaultConfig,
  deps?: DependencyList
): {
  initFormrun: () => void
  getFormrun: () => Formrun<ReadonlyArray> | undefined
} => {
  const getFormrun = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.Formrun
    }
  }, [window])
  
  const initFormrun = useCallback(() => {
    if (!window.Formrun) {
      throw new Error('Formrun is not initialized')
    }
    window.Formrun._reset()
    window.Formrun.init(config.className)
  }, [window])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (config.type === 'embed') {
        if (typeof window !== 'undefined') {
          new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.addEventListener('load', resolve)
            script.addEventListener('error', reject)
            script.src = 'https://sdk.form.run/js/v2/embed.js'
            document.head.appendChild(script)
          })
        }
      } else {
        if (window.Formrun) {
          initFormrun()
          return
        }
        new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.addEventListener('load', resolve)
          script.addEventListener('error', reject)
          script.src = 'https://sdk.form.run/js/v2/formrun.js'
          document.head.appendChild(script)
        })
          .then(() => {
            initFormrun()
          })
          .catch((error) => {
            Promise.reject(error)
          })
      }
    }
  }, [deps])

  return {
    initFormrun,
    getFormrun,
  }
}
