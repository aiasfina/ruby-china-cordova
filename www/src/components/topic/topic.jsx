import '../../../css/topic.scss'

import m from 'mithril'
import {toolbar, iconButton, icon} from 'polythene'
import iconArrowLeft from 'mmsvg/templarian/msvg/arrow-left'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'
import {loadTopic} from '../../controllers/topics'
import HeaderPanel from '../share/headerPanel.jsx'
import Menu from './menu.jsx'
import timeago from '../share/timeago.js'

const btnToBack = () => {
  window.history.back()
}

const Toolbar = {
  iBtn: (msvg, cb) => {
    return m(iconButton, {
      class: 'app-toolbar-ibtn',
      icon: {
        msvg: msvg
      },
      events: {
        onclick: cb
      }
    })
  },
  oninit: vnode => {
    vnode.state.btns = [
      Toolbar.iBtn(iconArrowLeft, btnToBack),
      m('span.flex', vnode.attrs.topic.title),
      Toolbar.iBtn(iconMore)
    ]
  },
  view: vnode => {
    return(
      m(toolbar, {
        mode: 'medium-tall',
        class: 'app-toolbar',
        content: vnode.state.btns
      })
    )
  }
}

const oninit = vnode => {
  vnode.state.meta = {}
  vnode.state.topic = {}
  vnode.state.user = {}

  vnode.state.toolbar = m(Toolbar, {topic: vnode.state.topic})

  loadTopic(vnode.attrs.id)
  .then(resp => {
    vnode.state.topic = resp.topic
    vnode.state.user = resp.topic.user
    vnode.state.meta = resp.meta

    // 由于polythene控件不能redraw，需要手动更新
    vnode.state.toolbar.state.btns[1].dom.innerHTML = vnode.state.topic.title
  })
}

const view = vnode => {
  const topic = vnode.state.topic
  const user = vnode.state.user
  const meta = vnode.state.meta

  return(
    <div className="app-topic_detail--wrapper">
      {m(HeaderPanel, {toolbar: vnode.state.toolbar})}
      <div className="app-topic_detail flex-container column">
        <div className="app-topic_detail-screen flext-content">
          <div className="app-topic_detail-title">
            <h6>{topic.title}</h6>
          </div>
          <div className="app-topic_detail-meta">
            <span>{m(icon, {type: 'medium', class: 'app-topic_detail-avatar avatar--circle', src: user.avatar_url})}</span>
            <span><b>{user.login}</b></span>
            <span><time oncreate={timeago} datetime={topic.created_at}></time></span>
          </div>
          <div className="app-topic_detail-content content--common">
            {m.trust(topic.body_html)}
          </div>
        </div>
        <div className="app-topic_detail-menu">
          {m(Menu, {topic: topic, meta: meta})}
        </div>
      </div>
    </div>
  )
}

export default {
  oninit,
  view
}