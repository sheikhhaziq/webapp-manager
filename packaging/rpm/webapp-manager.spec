Name:           webapp-manager
Version:        0.1.0
Release:        1%{?dist}
Summary:        Create and manage standalone web applications

License:        GPL-3.0-or-later
URL:            https://github.com/sheikhhaziq/webapp-manager
Source0:        %{name}-%{version}.tar.xz

BuildArch:      noarch

BuildRequires:  meson
BuildRequires:  ninja-build
BuildRequires:  nodejs
BuildRequires:  gjs

Requires:       gjs

%description
WebApp Manager allows users to create and manage standalone web applications
using Chromium-based browsers. Each web application gets its own isolated
browser profile and desktop launcher, with support for managing installed
browser extensions.

%prep
%autosetup

%build
npm ci
meson setup build --prefix=/usr
meson compile -C build

%install
meson install -C build --destdir %{buildroot}

%post
glib-compile-schemas %{_datadir}/glib-2.0/schemas >/dev/null 2>&1 || :

%postun
glib-compile-schemas %{_datadir}/glib-2.0/schemas >/dev/null 2>&1 || :

%files
%{_bindir}/webapp-manager
%{_datadir}/applications/io.github.sheikhhaziq.WebappManager.desktop
%{_datadir}/glib-2.0/schemas/io.github.sheikhhaziq.WebappManager.gschema.xml
%{_datadir}/icons/hicolor/scalable/apps/io.github.sheikhhaziq.WebappManager.svg
%{_datadir}/metainfo/io.github.sheikhhaziq.WebappManager.metainfo.xml

%changelog

* Wed Jun 10 2026 Sheikh Haziq - 0.1.0-1

- Initial release
