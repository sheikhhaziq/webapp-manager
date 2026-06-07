import Page from "@/components/Page"
import Gtk from "gi://Gtk"

export default function AboutPage() {
  return (
    <Page title="About Page">
      <Gtk.Box
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}
        orientation={Gtk.Orientation.VERTICAL}
        spacing={12}
        marginTop={12}
        marginBottom={12}
        marginStart={12}
        marginEnd={12}
      >
        <Gtk.Label label="About Page" />
        <Gtk.Label label="Welcome to my awesome application." />
      </Gtk.Box>
    </Page>
  )
}
