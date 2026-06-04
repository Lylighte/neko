# Template Migration Report

This branch is intended to turn the current Neco frontend into an organization portal template that can also support blog-style content.

## Current Shape

- App shell: `src/main.ts`, `src/App.vue`, `src/router/index.ts`
- Main public pages: `lobby`, `list`, `activity`, `news`, `about`, `documents`
- Management and content authoring: `management/*`, `documents_editor`, `auth/login`
- API boundary: `src/api/*` talks to the external `/necore` backend
- Theme system: Minecraft-styled components under `src/components/utils`, shared page parts in `src/components`, and asset-heavy visuals in `public/`

## Migration Layers

1. Core app shell
   - router, layout shell, auth token handling, title management
2. Theme primitives
   - button, input, switch, dialog, textarea, toast overrides, markdown preview theme
3. Feature modules
   - content/news, documents/blog, profile/about, list/activity modules
4. Static assets
   - theme-critical textures and backgrounds first, app-specific media later

## Recommended Reuse Order

- Keep first: NavBar, FooterBar, MinecraftButton family, MinecraftInput, dialog styles, markdown preview styling
- Keep selectively: background art, block textures, hover/click sounds, logo assets
- Drop or isolate for template use: server-specific art, management-only imagery, PDF.js runtime, one-off media tied to the current organization

## Cleanup Targets

- Reduce console noise in production
- Improve mobile handling for narrow screens
- Extract brand-specific labels and titles into a small config layer
- Trim route groups and content modules when building the template repository

## Notes

- The current repository is frontend-only and depends on `/necore`
- The original visual language is strong enough to be preserved if theme primitives are extracted before page rewrites