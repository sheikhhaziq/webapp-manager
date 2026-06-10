#!/usr/bin/env gjs -m

import {
  exit,
  programArgs,
  programInvocationName,
} from "system"

import GLib from "gi://GLib"
import Gettext from "gettext"

const localedir = GLib.build_filenamev([
  import.meta.datadir,
  "locale",
])

Gettext.bindtextdomain(
  import.meta.domain,
  localedir,
)

Gettext.textdomain(
  import.meta.domain,
)

//
// CLI mode
//

if (programArgs[0] === "launch") {
  const url = programArgs[1]
  const profilePath =
    programArgs[2]

  if (!url || !profilePath) {
    printerr(
      `Usage: ${programInvocationName} launch <url> <profile-dir>`,
    )

    exit(1)
  }

  const {
    default: LauncherService,
  } = await import(
    "./services/LauncherService");

  LauncherService.launchUrl(
    url,
    profilePath,
  )

  exit(0)
}

//
// GUI mode
//

const { App } =
  await import(
    "./app/application"
  )

const exitCode =
  await new App().runAsync([
    programInvocationName,
    ...programArgs,
  ])

exit(exitCode)