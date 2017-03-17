import '../../../css/replies.scss'

import m from 'mithril'
import {list, tab, toolbar, iconButton, dialog} from 'polythene'
import iconArrowLeft from 'mmsvg/templarian/msvg/arrow-left'
import ReplyItem from './item.jsx'
import {loadList} from '../../controllers/replies'
import HeaderPanel from '../headerPanel.jsx'

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
      m('span.flex', vnode.attrs.topicTitle)
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
  vnode.state.replies = []

  loadList(vnode.attrs.topicId)
  .then(resp => {
    vnode.state.replies = resp.replies
  })
}

const view = vnode => {
  const topicId = vnode.attrs.topicId
  const topicTitle = vnode.attrs.topicTitle

  return(
    <div className="app-topic_replies">
      {m(HeaderPanel, {toolbar: m(Toolbar, {topicTitle: topicTitle})})}
      {m(list, {
        tiles: vnode.state.replies.map(reply => { return m(ReplyItem, {reply: reply}) })
      })}
    </div>
  )
}

export default {
  oninit,
  view
}
