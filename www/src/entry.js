import '../css/app.scss'

import m from 'mithril'

import Layout from './components/layout.jsx'
import NewestTopics from './components/newestTopics.jsx'
import JobTopics from './components/jobTopics.jsx'

document.addEventListener( 'deviceready', init, false)

function init() {
  m.route(document.body, '/topics', {
    '/topics': {
      render: () => {
        return m(Layout, m(NewestTopics))
      }
    },
    '/jobs': {
      render: () => {
        return m(Layout, m(JobTopics))
      }
    }
  })
}