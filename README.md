# Wikipedia Skin Selector

This is a **Chrome extension for selecting Wikipedia skins**. Here's how it works:

**manifest.json**
- Defines extension metadata (name, version, permissions)
- Injects content.js into all Wikimedia sites (Wikipedia, Wiktionary, etc.) at document start
- Requests `storage` and `tabs` permissions

**popup.html**
- Simple UI with a dropdown menu selecting from 5 skins (Vector 2022, Vector, MonoBook, Timeless, Minerva)
- "Apply" button to save and apply selection

**popup.js**
- On load: retrieves previously saved skin preference from Chrome storage and updates dropdown
- On "Apply" click: saves selected skin to storage, then redirects current tab to the same page with `?useskin=` query parameter

**content.js**
- Runs on every Wikimedia page automatically
- Checks if page is a wiki subdomain (e.g., `en.wikipedia.org`)
- If skin is set in storage and page doesn't already have that skin, adds `?useskin=` parameter and reloads page
- Acts as an automatic enforcer of the user's preferred skin across all wiki visits

**In essence**: User picks a skin in the popup → saved to storage → content script automatically applies it to all wiki pages they visit.