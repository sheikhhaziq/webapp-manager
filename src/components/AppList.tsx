import Gtk from "gi://Gtk"

import { For, With } from "gnim"

import { useApps } from "@/contexts/AppsContext"
import AppRow from "./AppRow"
import EmptyApps from "./EmptyApps"

export default function AppList() {
  const { apps } = useApps()
  return (
    <With value={apps((items) => (items.length === 0 ? true : null))}>
      {(isEmpty) =>
        isEmpty ? (
          <EmptyApps />
        ) : (
          <Gtk.ListBox
            class="boxed-list"
            selectionMode={Gtk.SelectionMode.NONE}
          >
            <For each={apps}>{(app) => <AppRow app={app} />}</For>
          </Gtk.ListBox>
        )
      }
    </With>
  )
}
