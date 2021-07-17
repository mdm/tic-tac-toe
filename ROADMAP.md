Roadmap
=======

* Prep
  * React refresher (done)
  * Decide on using TypeScript or not (done; use it)
* Init Git repo (done)
* Implement auth (backend)
  * Create Rails 6 app (API mode) (done)
  * Generate player model (done)
  * Generate auth controller (done)
  * Implement login (JWT based) (done)
  * Implement auth check (done)
  * Implement logout (done)
* Implement login (frontend)
  * Create React app (TypeScript?) (done)
  * Create login form (done)
  * Implement basic routing (done)
  * Implement backend calls (done)
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
  * Redirect to intended target url after login
  * Allow resuming games after navigation
  * Rematch (with forced color change)
  * Docker Compose file / Heroku deployment
  * Animations
  * E2E testing
  * Redis or memcached for caching
  * Refresh tokens for auth
