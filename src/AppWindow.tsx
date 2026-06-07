import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import { useSettings } from "./settings"
import { createState } from "gnim"
import { gettext as t } from "gettext"

export default function AppWindow(props: {
  app: Adw.Application
  ref: (self: Adw.ApplicationWindow) => void
}) {
  let toasts: Adw.ToastOverlay

  const { app, ref } = props
  const { stringKey, setStringKey } = useSettings()
  const [number, setNumber] = createState(1)

  function addToast() {
    toasts.add_toast(
      new Adw.Toast({
        title: stringKey.get(),
        timeout: 2,
      }),
    )
  }

  return (
    <Adw.ApplicationWindow
      $={ref}
      application={app}
      title={t("My Awesome App")}
    >
      <Adw.ToastOverlay $={(self) => (toasts = self)}>
        <Adw.ToolbarView>
          <Adw.HeaderBar $type="top">
            <Adw.WindowTitle
              $type="title"
              title={t("My Awesome App")}
              subtitle={t("Written with Gnim")}
            />
          </Adw.HeaderBar>
          <Gtk.ScrolledWindow>
            <Adw.Clamp maximumSize={400}>
              <Gtk.Box
                marginTop={8}
                marginBottom={8}
                marginEnd={8}
                marginStart={8}
                spacing={8}
                orientation={Gtk.Orientation.VERTICAL}
              >
                <Gtk.ListBox
                  class="boxed-list"
                  selectionMode={Gtk.SelectionMode.NONE}
                >
                  <Adw.EntryRow
                    title={t("String Key")}
                    text={stringKey}
                    onNotifyText={({ text }) => setStringKey(text)}
                    onEntryActivated={addToast}
                  />
                </Gtk.ListBox>

                <Gtk.Box spacing={8} marginTop={12} halign={Gtk.Align.CENTER}>
                  <Gtk.Button onClicked={() => setNumber((n) => n + 1)}>
                    {t("Increment")}
                  </Gtk.Button>
                  <Gtk.Label
                    widthRequest={18}
                    label={number((n) => n.toString())}
                  />
                  <Gtk.Button onClicked={() => setNumber((n) => n - 1)}>
                    {t("Decrement")}
                  </Gtk.Button>
                </Gtk.Box>
              </Gtk.Box>
            </Adw.Clamp>
          </Gtk.ScrolledWindow>
        </Adw.ToolbarView>
      </Adw.ToastOverlay>
    </Adw.ApplicationWindow>
  )
}
