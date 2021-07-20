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
  * Use Action Cable to provide list of connected users (done)
  * Online user can be challenged (done)
* Implement gameplay
  * Validate moves in backend (done)


* For future consideration
  * More validation in backend
  * Option to decline challenges
  * Redirect to intended target url after login
  * Rematch (with forced color change)
  * Docker Compose file / Heroku deployment
  * Animations
  * E2E testing
  * Refresh tokens for auth
  
* Known bugs
  * Unpermitted parameter "match" in backend - probably I'm violating some Rails convention I'm not aware of
  * Action Cable sometimes does not resubscribe to the "available players" channel when returning to the lobby after a match - this can be worked around by reloading the page
