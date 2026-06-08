import Adw from "gi://Adw"
import Gtk from "gi://Gtk"

export default function EmptyApps() {
  return (
    <Adw.StatusPage
      iconName="web-browser-symbolic"
      title="No Apps"
      description="Create your first app"
    >
      <Gtk.Button
        $type="child"
        class="suggested-action pill"
        halign={Gtk.Align.CENTER}
        // onClicked={props.onAdd}
      >
        <Gtk.Box spacing={6}>
          <Gtk.Image iconName="list-add-symbolic" />

          <Gtk.Label label="Create" />
        </Gtk.Box>
      </Gtk.Button>
    </Adw.StatusPage>
  )
}
