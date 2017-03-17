import m from 'mithril'
import {loadJobList} from '../../controllers/topics'
import List from './list.jsx'

var page = 1

var list = []

function refresh() {
  page = 1
  loadJobList(page)
  .then(resp => {
    list = resp.topics
  })
}

function loadMore() {
  page += 1

  loadJobList(page)
  .then(resp => {
    resp.topics.forEach(v => {
      list.push(v)
    })
  })
}

export default {
  oninit: vnode => {
    if (!list.length) {
      refresh()
    }
  },
  view: vnode => {
    return m(List, {list: list})
  }
}
