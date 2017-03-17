import '../css/app.scss'

import m from 'mithril'

import Layout from './components/share/layout.jsx'
import {NewestTopics, JobTopics} from './components/topics/list.jsx'
import TopicDetail from './components/topic/topic.jsx'
import ReplyList from './components/reply/list.jsx'

document.addEventListener( 'deviceready', init, false)

function init() {
  m.route(document.body, '/topics', {
    '/topics': {
      render: () => {
        return m(Layout, m(NewestTopics, {type: 'newest'}))
      }
    },
    '/jobs': {
      render: () => {
        return m(Layout, m(JobTopics, {type: 'job'}))
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