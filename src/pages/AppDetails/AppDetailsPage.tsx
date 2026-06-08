import Gtk from "gi://Gtk"

import Page from "@/components/Page"

import type { WebApp } from "@/models/WebApp"

interface AppDetailsPageProps {
  app: WebApp
}

export default function AppDetailsPage(props: AppDetailsPageProps) {
  return (
    <Page title={props.app.name}>
      <Gtk.Box
        orientation={Gtk.Orientation.VERTICAL}
        spacing={12}
        marginTop={12}
        marginBottom={12}
        marginStart={12}
        marginEnd={12}
      >
        <Gtk.Label xalign={0} label={`URL: ${props.app.url}`} />

        <Gtk.Label xalign={0} label={`Profile: ${props.app.profilePath}`} />
      </Gtk.Box>
    </Page>
  )
}
