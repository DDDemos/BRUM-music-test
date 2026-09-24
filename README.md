# Birmingham Music Stories

An interactive digital exhibition exploring Birmingham's musical heritage through artists, genres, neighbourhoods, and venues. The current collection includes Black Sabbath, Steel Pulse, UB40, Duran Duran, and Electric Light Orchestra.

## Features

- **Sonic Movements:** exhibition cards covering heavy metal, reggae and dub, new wave, Bhangra, and rock and pop.
- **Genre filters:** update the movement cards and featured stories without reloading the page.
- **Sound Map:** a stylised SVG map with selectable locations in Aston, Handsworth, the City Centre, and Broad Street, plus a location detail panel.
- **Featured Stories:** cards generated from local data, with modal views for artist details and curatorial notes.
- **Archive search:** case-insensitive matching across artists, genres, locations, descriptions, and years.
- **Music Through Time:** a horizontal timeline that opens related stories or milestone summaries.
- **Audio effect:** a short vinyl needle-drop and crackle effect generated through the browser's Web Audio API.
- **Responsive presentation:** mobile navigation, visible keyboard focus styles, and reduced-motion CSS support.

## How the project works

The active exhibition uses plain HTML, CSS, and JavaScript. [index.html](index.html) loads [styles.css](styles.css) and [script.js](script.js). Once the DOM is ready, the script renders story cards and registers handlers for filtering, search, map selection, modals, audio, and navigation.

Content lives in JavaScript objects and HTML. There is no implemented backend, database, authentication, or persistent storage.

The repository also contains a React/TypeScript starter and Vite configuration with React and Tailwind plugins. The current HTML does not load `src/main.tsx` or contain the `#root` element it expects, so the React application is not part of the displayed exhibition. Packages such as Express, the Google Gen AI SDK, Motion, and Lucide React are declared in `package.json` but are not used by the active page.

## Run locally

### Static preview

The current exhibition can run without installing npm dependencies. From the project directory, use Python 3 to serve the files:

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open <http://localhost:3000>. A modern browser is required; the audio effect requires Web Audio API support. Fonts and images are hosted externally, so their original appearance requires an internet connection.

### Vite development server

With Node.js and npm installed, run:

```sh
npm install
npm run dev
```

Open <http://localhost:3000>, or the URL printed by Vite if that port is occupied. The development script binds to `0.0.0.0`. The repository currently does not pin a Node.js version or include a dependency lockfile.

### Available npm scripts

- `npm run dev` — starts Vite on port 3000 with network access enabled.
- `npm run build` — invokes Vite's production build, using its default `dist/` output directory.
- `npm run preview` — serves the production build locally.
- `npm run lint` — runs `tsc --noEmit` for TypeScript checking; this is not an ESLint check.
- `npm run clean` — removes `dist/` and the root-level `server.js`, if present.

For static hosting, publish `index.html`, `styles.css`, and `script.js` together. If using the Vite build, verify that the output includes and correctly loads `script.js`: the current HTML references it as a classic script rather than a module entry. The npm installation and production build have not been validated as part of this documentation update.

## Project structure

```text
BRUM-music-test/
├── README.md          # Project overview and development guide
├── index.html         # Active page, exhibition sections, map, and overlays
├── styles.css         # Active styling, design tokens, layout, and animation
├── script.js          # Exhibition data and all active interaction logic
├── metadata.json      # Exhibition metadata and declared AI Studio capability
├── package.json       # npm scripts and dependency declarations
├── vite.config.ts     # Vite plugins, root alias, and HMR/watch configuration
├── tsconfig.json      # TypeScript and JSX compiler configuration
├── .env.example       # Template environment variables for AI Studio integration
├── .gitignore         # Excludes dependencies, build output, and local env files
└── src/               # React starter scaffold; not connected to index.html
    ├── App.tsx        # Placeholder App component returning an empty div
    ├── main.tsx       # React entry point expecting an element with id="root"
    └── index.css      # Tailwind CSS import for the React scaffold
```

## Main classes, components, and functions

There are no custom JavaScript or TypeScript classes in this project. The active application is organised around functions and data objects inside the `DOMContentLoaded` callback in `script.js`.

### Data structures

- **`musicStories`** — array of five artist records used by the story grid, genre filtering, search, and detail modals. Records contain `id`, `artist`, `genre`, `genreCategory`, `location`, `year`, `era`, `headline`, `description`, `readTime`, `curatorialNote`, and `image`.
- **`mapLocations`** — object keyed by location name. Each entry contains `sector`, `title`, `description`, `era`, `landmark`, `status`, and `associatedStoryId`, linking the location to an artist record.

### Rendering and filtering

- **`renderStories(items)`** — builds cards in `#stories-grid`, adds image fallbacks, and attaches click and keyboard handlers. An empty collection displays a reset button.
- **`filterGenre(genreKey)`** — updates filter button states, filters stories, and shows or hides movement cards. Supported keys are `all`, `metal`, `reggae`, `newwave`, `bhangra`, and `rock`.
- **`window.resetGenreFilter()`** — public helper that restores the `all` filter from the empty-state button.

### Map and story details

- **`selectMapLocation(locationName)`** — updates the selected map node, current location, and inspector content. The inspector action opens the associated story.
- **`openStoryModal(item)`** — populates and displays `#story-modal`, locks body scrolling, and moves focus to its close button.
- **`closeStoryModal()`** — hides the modal, restores scrolling, and returns focus to the previous element. Close buttons, backdrop clicks, and Escape trigger dismissal.

Movement cards open the first story matching their genre, with a fallback summary taken from their HTML. Timeline cards use `data-story-id` to find a story, or display their own milestone summary when no story is linked.

### Search and feedback

- **`toggleSearch(show)`** — opens or closes the search overlay and resets the input when opening.
- **`renderSearchResults(query)`** — searches the full story collection, renders matches, and connects results to the story modal. Search operates independently of the selected genre filter.
- **`playVinylNeedleEffect()`** — synthesises a brief needle-drop and noise effect using oscillators, buffers, filters, and gain nodes.
- **`showToast(msg)`** — displays a temporary message in `#archive-toast`.

Additional inline event handlers toggle the mobile menu and highlight navigation links as the user scrolls.

### React scaffold

- **`App`** in [src/App.tsx](src/App.tsx) is a function component that currently returns an empty `<div>`.
- [src/main.tsx](src/main.tsx) mounts `App` using React's `createRoot` and `StrictMode`, and imports `src/index.css`. It would need to be connected to `index.html` before it could render.

### Main CSS classes

The active styles are in `styles.css`:

- **`.container`, `.section-header`, `.section-title`** — shared layout and section typography.
- **`.site-header`, `.site-nav`, `.nav-link`** — primary navigation; `.mobile-open` controls the mobile menu.
- **`.hero-section`, `.hero-filter-bar`, `.genre-btn`** — introduction and genre controls.
- **`.movement-card`** — genre exhibition posters.
- **`.sound-map-container`, `.map-node-button`, `.map-inspector-card`** — map layout, selectable locations, and inspector.
- **`.stories-grid`, `.story-card`** — generated story layout and cards.
- **`.timeline-card`** — chronological milestones.
- **`.modal-backdrop`, `.modal-dialog`** — story overlay; `.is-open` makes it visible.
- **`.search-overlay`, `.search-result-item`** — archive search; `.is-active` opens the overlay.
- **`.archive-toast`** — transient feedback; `.show` displays the toast.

Design tokens are defined on `:root`, including background colours, text colours, brass and crimson accents, font families, and maximum content width. Typography uses Playfair Display and Source Sans 3 through Google Fonts.

## Editing exhibition content

1. Add or update artist records in `musicStories` in `script.js`. Use a unique `id` and a `genreCategory` matching the filter keys.
2. Add or update places in `mapLocations`. Set `associatedStoryId` to an existing story ID, and match the location key to a map button's `data-location` in `index.html`.
3. Edit movement posters and timeline milestones directly in `index.html`. Timeline `data-story-id` attributes should match story IDs.
4. Change colours, fonts, spacing, and responsive layouts in `styles.css`.

Some content appears in both HTML and JavaScript, including the initial map inspector. Keep these copies consistent when editing. New genre categories also require corresponding filter buttons and movement cards in the HTML.

## Configuration

No environment variables or API keys are needed for the active static exhibition.

- `.env.example` contains `GEMINI_API_KEY` and `APP_URL` placeholders for AI Studio integration. Neither is consumed by the current application code.
- `metadata.json` declares a server-side Gemini capability, but no Gemini requests or server implementation are present.
- `vite.config.ts` reads `DISABLE_HMR` from the process environment. Setting it to `true` disables hot module replacement and file watching.
- The `@` alias in Vite and TypeScript points to the repository root.

## Current scope and checks

The collection is a local prototype dataset. Bhangra has a movement card but no entry in `musicStories`, so its featured-story filter shows an empty state. The map is an illustrative SVG rather than a geographic mapping service. Buttons labelled as audio logs play the generated effect; recorded music and archival audio are not included.

Keyboard support is partial: story cards support Enter and Space, search results support Enter, and overlays close with Escape. Movement and timeline cards currently have click handlers only, and the modal does not implement a focus trap.

There is no automated test suite or `npm test` script. Useful checks when making changes are:

```sh
node --check script.js
npm run lint
```

The TypeScript check requires installed npm dependencies and does not enable JavaScript `checkJs` checking. In a browser, verify genre filters and their reset action, search results and empty results, all four map locations, story and timeline modals, audio feedback, and the mobile menu.
