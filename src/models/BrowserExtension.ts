export interface BrowserExtension {
  id: string
  name: string
  version: string
  description: string
  isActive: boolean
  isBuiltin: boolean
  iconPath?: string
}
