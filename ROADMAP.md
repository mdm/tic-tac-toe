Roadmap
=======

* Prep
  * React refresher
  * Decide on using TypeScript or not
* Init Git repo
* Implement auth (backend)
  * Create Rails 6 app (API mode)
  * Generate player model
  * Generate auth controller
  * Implement login (JWT based)
  * Implement auth check (with refresh)
  * Implement logout
* Implement login (frontend)
  * Create React app (TypeScript?)
  * Create login form
  * Implement basic routing
  * Implement backend calls
* Setup testing (frontend and backend)
* Implement lobby
  * Use Action Cable to provide list of connected users
  * Online user can be challeng
  * Challenges can be accepted or denied
* Implement gameplay
  * Validate moves in backend
  * Debounce tile clicks
  * Highlight emtpy tile until accepted move is published
* Nice to have
  * Allow resuming games after navigation
  * Rematch (with forced color change)
  * Docker Compose file / Heroku deployment
  * Animations
  * E2E testing
  * Redis or memcached for caching
