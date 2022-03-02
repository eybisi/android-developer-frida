### Frida Snippet Generator for developer.android.com

Right click on function names (public methods section) or fields and it will automatically copy generated frida snippet.
It respects if you copied from same class earlier so won't add class variable.

### Build

Call `web-ext build` and load zip file as an temporary addon.

[Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/frida-sniper-for-dev-android/)

### TODO

- Work with content scripts to see if target function needs to be overloaded.
- Add toggle for typescript


