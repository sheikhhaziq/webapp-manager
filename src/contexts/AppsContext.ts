import { Accessor, createContext, createState } from "gnim"

import type { WebApp } from "@/models/WebApp"
import WebAppService from "@/services/WebAppService"

export interface AppsState {
  apps: Accessor<WebApp[]>

  reload(): void

  createApp(name: string, url: string): Promise<void>

  removeApp(app: WebApp): void
}

export function createAppsState(): AppsState {
  const [apps, setApps] = createState<WebApp[]>([])

  function reload() {
    setApps(WebAppService.list())
  }

  async function createApp(name: string, url: string) {
    await WebAppService.create(name, url)

    reload()
  }

  function removeApp(app: WebApp) {
    WebAppService.remove(app)

    reload()
  }

  reload()

  return {
    apps,
    reload,
    createApp,
    removeApp,
  }
}

export const AppsContext = createContext<AppsState | null>(null)

export function useApps() {
  const state = AppsContext.use()

  if (!state) {
    throw new Error("AppsContext not in scope")
  }

  return state
}
