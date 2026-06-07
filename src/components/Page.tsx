import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import GObject from "gi://GObject"

interface PageProps {
  title: string
  subtitle?: string

  header?: GObject.Object | GObject.Object[]

  children?: GObject.Object | GObject.Object[]
}

export default function Page(props: PageProps) {
  return (
    <Adw.NavigationPage title={props.title}>
      <Adw.ToolbarView>
        {props.header ?? (
          <Adw.HeaderBar $type="top">
            <Adw.WindowTitle
              $type="title"
              title={props.title}
              subtitle={props.subtitle}
            />
          </Adw.HeaderBar>
        )}

        {props.children}
      </Adw.ToolbarView>
    </Adw.NavigationPage>
  )
}
