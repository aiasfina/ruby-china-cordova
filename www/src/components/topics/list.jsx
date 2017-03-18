import '../../../css/topics.scss'

import m from 'mithril'
import Scrollload from 'Scrollload'
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
  vm.offset = 0
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

const createInfiniteList = (vnode) => {
  const
    loadMore = vnode.state.loadMore,
    refresh = vnode.state.refresh,
    vm = vnode.state.vm

  return new Scrollload({
    container: vnode.dom,
    content: vnode.dom.children[0],
    threshold: 0,
    loadMore: sl => {
      if (vm.offset > 120) { return sl.noMoreData() }
      loadMore(vm).then(() => sl.unLock())
    },
    enablePullRefresh: true,
    pullRefresh: sl => {
      refresh(vm).then(() => sl.refreshComplete())
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
  vnode.state.infiniteList = createInfiniteList(vnode)
}

const NewestTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return(
      <div className="app-topics app-topics--newest">
        <ul>
          {vnode.state.vm.list.map(topic => {
            return m(TopicItem, {topic: topic})
          })}
        </ul>
      </div>
    )
  }
}

const JobTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return(
      <div className="app-topics app-topics--job">
        <ul>
          {vnode.state.vm.list.map(topic => {
            return m(TopicItem, {topic: topic})
          })}
        </ul>
      </div>
    )
  }
}

const NodeTopics =  {
  oninit,
  oncreate,
  view: vnode => {
    return(
      <div className="app-topics app-topics--node">
        <ul>
          {vnode.state.vm.list.map(topic => {
            return m(TopicItem, {topic: topic})
          })}
        </ul>
      </div>
    )
  }
}

export {NewestTopics, JobTopics, NodeTopics}
