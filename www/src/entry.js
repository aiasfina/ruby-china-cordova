require('../css/app.scss')

import m from 'mithril'

document.addEventListener( 'deviceready', init, false)

function init() {
  m.route(document.body, '/topics', {
    '/topics': {}
  })
}