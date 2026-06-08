import { useExtensions } from "@/contexts/ExtensionsContext"
import Adw from "gi://Adw"
import { For, With } from "gnim"
import Gtk from "gi://Gtk"
import type { WebApp } from "@/models/WebApp"
import ExtensionRow from "./ExtensionRow"
import Gio from "gi://Gio"

export function ExtensionList() {
  const { extensions, setEnabled, uninstall } = useExtensions()

  const userExtensions = extensions.as((items) =>
    items.filter((ext) => !ext.isBuiltin),
  )

  const builtinExtensions = extensions.as((items) =>
    items.filter((ext) => ext.isBuiltin),
  )

  return (
    <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>

      <With value={userExtensions((u) => u.length > 0)}>
        {(isNotEmpty) => {
          if (isNotEmpty) {
            return (<Adw.PreferencesGroup title="Installed Extensions">
              <For each={userExtensions}>
                {(ext) => <ExtensionRow extension={ext} isBuiltIn={false} />}
              </For>
            </Adw.PreferencesGroup>)
          }
        }}
      </With>
      <With value={builtinExtensions((u) => u.length > 0)}>
        {(isNotEmpty) => {
          if (isNotEmpty) {
            return (<Adw.PreferencesGroup title="BuiltIn Extensions">
              <For each={builtinExtensions}>
                {(ext) => <ExtensionRow extension={ext} isBuiltIn={true} />}
              </For>
            </Adw.PreferencesGroup>)
          }
        }}
      </With>
    </Gtk.Box>
  )
}
