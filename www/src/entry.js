import '../css/app.scss'

import m from 'mithril'

import Layout from './components/layout.jsx'
import NewestTopics from './components/newestTopics.jsx'
import JobTopics from './components/jobTopics.jsx'
import TopicDetail from './components/topic.jsx'
import ReplyList from './components/reply/list.jsx'

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
    },
    '/topics/:id': {
      render: vnode => {
        return m(TopicDetail, {id: vnode.attrs.id})
      }
    },
    '/topics/:id/replies': {
      render: vnode => {
        return m(ReplyList, {topicId: vnode.attrs.id, topicTitle: vnode.attrs.title})
      }
    }
  })
}