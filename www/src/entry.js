import '../css/app.scss'

import m from 'mithril'

import Layout from './components/layout.jsx'
import Topics from './components/topics.jsx'

document.addEventListener( 'deviceready', init, false)

function init() {
  m.route(document.body, '/topics', {
    '/topics': {
      render: () => {
        return m(Layout, m(Topics))
      }
    }
  })
}