import { Accessor, createContext, createState } from "gnim"

import type { BrowserExtension } from "@/models/BrowserExtension"

import ExtensionService from "@/services/ExtensionService"

export interface ExtensionsState {
  extensions: Accessor<BrowserExtension[]>

  reload(): void

  setEnabled(extensionId: string, enabled: boolean): void

  uninstall(extensionId: string): void
}

export function createExtensionsState(profilePath: string): ExtensionsState {
  const [extensions, setExtensions] = createState<BrowserExtension[]>([])

  function reload() {
    setExtensions(ExtensionService.list(profilePath))
  }

  function setEnabled(extensionId: string, enabled: boolean) {
    ExtensionService.setEnabled(profilePath, extensionId, enabled)

    reload()
  }

  function uninstall(extensionId: string) {
    ExtensionService.uninstall(profilePath, extensionId)

    reload()
  }

  reload()

  return {
    extensions,
    reload,
    setEnabled,
    uninstall,
  }
}

export const ExtensionsContext = createContext<ExtensionsState | null>(null)

export function useExtensions(): ExtensionsState {
  const state = ExtensionsContext.use()

  if (!state) {
    throw new Error("ExtensionsContext not in scope")
  }

  return state
}
