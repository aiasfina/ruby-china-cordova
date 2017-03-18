import '../../../css/replies.scss'

import m from 'mithril'
import {list, tab, toolbar, iconButton, dialog} from 'polythene'
import Scrollload from 'Scrollload'
import iconArrowLeft from 'mmsvg/templarian/msvg/arrow-left'
import ReplyItem from './item.jsx'
import {loadList} from '../../controllers/replies'
import HeaderPanel from '../share/headerPanel.jsx'

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
      Toolbar.iBtn(iconArrowLeft, () => { window.history.back() }),
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

const vm = {
  offset: 0,
  list: [],
  loadList: loadList
}

const loadMore = vm => {
  return vm.loadList(vm.topicId, vm.offset)
  .then(resp => {
    vm.list = vm.list.concat(resp.replies)
    vm.offset += resp.replies.length

    return resp.replies.length
  })
}

const createInfiniteList = (vnode) => {
  const
    loadMore = vnode.state.loadMore,
    refresh = vnode.state.refresh,
    vm = vnode.state.vm

  return new Scrollload({
    container: vnode.dom,
    content: vnode.dom.querySelector('ul'),
    threshold: 0,
    loadMore: sl => {
      loadMore(vm).then(length => {
        if (!length) {
          sl.noMoreData()
        } else {
          sl.unLock()
        }
      })
    }
  })
}

const oninit = vnode => {
  const state = vnode.state

  vm.topicId = vnode.attrs.topicId
  state.vm = vm
  state.loadMore = loadMore
}

const oncreate = vnode => {
  vnode.state.infiniteList = createInfiniteList(vnode)
}

const view = vnode => {
  const topicTitle = vnode.attrs.topicTitle

  return(
    <div className="app-topic_replies">
      {m(HeaderPanel, {toolbar: m(Toolbar, {topicTitle: topicTitle}), fixed: true})}
      <ul>
        {vnode.state.vm.list.map(reply => {
          return m(ReplyItem, {reply: reply})
        })}
      </ul>
    </div>
  )
}

export default {
  oninit,
  oncreate,
  view
}
