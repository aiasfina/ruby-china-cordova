import '../../../css/topics.scss'

import m from 'mithril'
import InfiniteList from 'infinite-list'
import {fab, icon} from 'polythene'
import {loadTopicList, loadNodeList, loadJobList} from '../../controllers/topics'
import TopicItem from './item.jsx'
import Spinner from '../share/spinner.jsx'

const vm = {
  newest: {
    offset: 0,
    list: [],
    loadList: loadTopicList
  },
  job: {
    offset: 0,
    list: [],
    loadList: loadJobList
  },
  node: {
    offset: 0,
    list: [],
    loadList: loadNodeList
  }
}

const loadVM = type => {
  return vm[type]
}

const refresh = vm => {
  vm.offset = 1
  return vm.loadList(vm.offset)
  .then(resp => {
    vm.list = resp.topics
    vm.offset += resp.topics.length
  })
}

const loadMore = vm => {
  return vm.loadList(vm.offset)
  .then(resp => {
    vm.list = vm.list.concat(resp.topics)
    vm.offset += resp.topics.length

    return resp.topics.length
  })
}

const createInfiniteList = (state) => {
  const
    loadMore = state.loadMore,
    refresh = state.refresh,
    vm = state.vm

  return new InfiniteList({
    initialPage: {
      hasMore: true
    },
    loadMoreRenderer: (index, domElement) => {
      m.render(domElement, m(Spinner))
    },
    itemRenderer: (index, domElement) => {
      m.render(domElement, m(TopicItem, {topic: vm.list[index]}))
    },
    pageFetcher: (fromIndex, callback) => {
      loadMore(vm).then(length => callback(length, !!length))
    }
  })
}

const oninit = vnode => {
  const state = vnode.state

  state.vm = loadVM(vnode.attrs.type)
  state.refresh = refresh
  state.loadMore = loadMore
}

const oncreate = vnode => {
  vnode.state.infiniteList = createInfiniteList(vnode.state)
  vnode.state.infiniteList.attach(vnode.dom)
}

const NewestTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return <div className="app-topics app-topics--newest"></div>
  }
}

const JobTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return <div className="app-topics app-topics--job"></div>
  }
}

const NodeTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return <div className="app-topics app-topics--node"></div>
  }
}

export {NewestTopics, JobTopics, NodeTopics}
