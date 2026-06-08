import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

import { createComputed, createState, onMount } from "gnim"

import { useApps } from "@/contexts/AppsContext"

export default function CreateWebAppDialog() {
  const { createApp } = useApps()

  const [name, setName] = createState("")
  const [url, setUrl] = createState("")
  const [creating, setCreating] = createState(false)

  const isValid = createComputed(
    () => !creating() && name().trim().length > 0 && url().trim().length > 0,
  )

  let dialog: Adw.Dialog

  async function create() {
    const appName = name().trim()
    const appUrl = url().trim()

    if (!appName || !appUrl) return

    setCreating(true)

    try {
      await createApp(appName, appUrl)

      dialog.close()
    } finally {
      setCreating(false)
    }
  }

  let nameRow: Adw.EntryRow
  let urlRow: Adw.EntryRow

  onMount(() => {
    if (nameRow) {
      nameRow.grab_focus()
    }
  })

  return (
    <Adw.Dialog
      $={(self) => {
        dialog = self
      }}
      title="Create Web App"
    >
      <Adw.ToolbarView>
        <Adw.HeaderBar $type="top" show_end_title_buttons={false}>
          <Gtk.Button
            $type="start"
            label="Cancel"
            sensitive={!creating()}
            onClicked={() => dialog.close()}
          />

          <Adw.WindowTitle
            $type="title"
            title="Create Web App"
            subtitle="Add a new web application"
          />

          <Gtk.Button
            $type="end"
            label={creating() ? "Creating..." : "Create"}
            cssClasses={["suggested-action"]}
            sensitive={isValid}
            onClicked={create}
          />
        </Adw.HeaderBar>

        <Gtk.Box
          orientation={Gtk.Orientation.VERTICAL}
          spacing={18}
          marginTop={18}
          marginBottom={18}
          marginStart={18}
          marginEnd={18}
        >
          <Gtk.Image
            iconName="web-browser-symbolic"
            pixelSize={100}
            halign={Gtk.Align.CENTER}
          />

          <Adw.PreferencesGroup>
            <Adw.EntryRow
              $={(self) => {
                nameRow = self
              }}
              title="Name"
              text={name}
              onNotifyText={(self) => setName(self.text)}
              onEntryActivated={(self) => {
                if (self.text.length > 0) {
                  urlRow.grab_focus()
                }
              }}
            />

            <Adw.EntryRow
              $={(self) => {
                urlRow = self
              }}
              title="URL"
              text={url}
              showApplyButton={false}
              onNotifyText={(self) => setUrl(self.text)}
              onEntryActivated={() => {
                if (isValid()) create()
              }}
            />
          </Adw.PreferencesGroup>
        </Gtk.Box>
      </Adw.ToolbarView>
    </Adw.Dialog>
  )
}
