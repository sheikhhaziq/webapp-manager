#!@gjs@ -m

import { exit, programArgs, programInvocationName } from "system"
import GLib from "gi://GLib"
import Gettext from "gettext"

const localedir = GLib.build_filenamev([import.meta.datadir, "locale"])
Gettext.bindtextdomain(import.meta.domain, localedir)
Gettext.textdomain(import.meta.domain)

const { App } = await import("../src/app/application")
const exitCode = await new App().runAsync([
  programInvocationName,
  ...programArgs,
])

exit(exitCode)
