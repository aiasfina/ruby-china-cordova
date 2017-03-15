import '../../css/topic.scss'

import m from 'mithril'

import {toolbar, iconButton} from 'polythene'
import iconArrowLeft from 'mmsvg/templarian/msvg/arrow-left'
import iconEye from 'mmsvg/templarian/msvg/eye'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'
import iconHeart from 'mmsvg/templarian/msvg/heart'
import iconBookmark from 'mmsvg/templarian/msvg/bookmark'
import iconComment from 'mmsvg/templarian/msvg/comment-text-outline'

import {loadTopic} from '../controllers/topics'
import HeaderPanel from './headerPanel.jsx'

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

const Menu = {
  iBtn: (msvg) => {
    return m(iconButton, {
      icon: {
        msvg: msvg
      }
    })
  },
  oninit: vnode => {
  },
  view: vnode => {
    const meta = vnode.attrs.meta

    return(
      <ul className="app-topic_detail-menu">
        <li className={"app-topic_detail-menu-bookmark" + (meta.favorited ? ' active' : '')}>{Menu.iBtn(iconBookmark)}</li>
        <li className={"app-topic_detail-menu-heart" + (meta.liked ? ' active' : '')}>{Menu.iBtn(iconHeart)}</li>
        <li className="app-topic_detail-menu-eye">{Menu.iBtn(iconEye)}</li>
        <li className="app-topic_detail-menu-comment">{Menu.iBtn(iconComment)}</li>
      </ul>
    )
  }
}

const oninit = vnode => {
  vnode.state.meta = {}
  vnode.state.topic = {}

  vnode.state.toolbar = m(Toolbar, {topic: vnode.state.topic})

  loadTopic(vnode.attrs.id)
  .then(resp => {
    vnode.state.topic = resp.topic
    vnode.state.meta = resp.meta

    // 由于polythene控件不能redraw，需要手动更新
    vnode.state.toolbar.state.btns[1].dom.innerHTML = vnode.state.topic.title
  })
}

const view = vnode => {
  const topic = vnode.state.topic
  const meta = vnode.state.meta

  return(
    <div className="app-topic_detail--wrapper">
      {m(HeaderPanel, {toolbar: vnode.state.toolbar})}
      <div className="app-topic_detail flex-container column">
        <div className="app-topic_detail-screen flext-content">
          <div className="app-topic_detail-title">
            {topic.title}
          </div>
          <div className="app-topic_detail-content">
            {m.trust(topic.body_html)}
          </div>
        </div>
        <div className="app-topic_detail-menu">
          {m(Menu, {meta: meta})}
        </div>
      </div>
    </div>
  )
}

export default {
  oninit,
  view
}