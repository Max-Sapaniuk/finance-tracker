---
'finance-tracker': minor
---

Connect a platform from anywhere: a "Connect Platform" button in the app header opens a three-step wizard — choose a platform, enter credentials and pick where the key lives, then review and connect.

Monobank is connectable today; its token is saved in this browser's local storage and never sent to a server. Freedom24, Inzhur and Manual/CSV appear as disabled cards until their credential fields exist. Platforms are declared in a registry, so adding one means adding a single definition file rather than touching the wizard.

The header also gains a page title derived from the shared route table, and the sidebar toggle is now visible on desktop as well as mobile.
