import '../../css/topics.scss'

import m from 'mithril'
import timeago from '../timeago.js'
import {list, listTile, fab, icon} from 'polythene'
import {loadTopicList} from '../controllers/topics'

// component
const Avatar = {
  view: vnode => {
    const user = vnode.attrs.user
    return(
      m(icon, {
        type: 'medium',
        class: 'app-topic_avatar',
        src: user.avatar_url
      })
    )
  }
}

const TileContent = {
  renderTimeago: vnode => {
    timeago.render(vnode.dom, 'zh_CN')
  },
  renderCreatedOrReplied: topic => {
    if (topic.replied_at) {
      return(
        <span>
          <time oncreate={TileContent.renderTimeago} datetime={topic.replied_at}></time>
          回复
        </span>
      )
    } else {
      return(
        <span>
          <time oncreate={TileContent.renderTimeago} datetime={topic.created_at}></time>
          发表
        </span>
      )
    }
  },
  view: vnode => {
    const topic = vnode.attrs.topic
    return(
      <div className="app-topic_content">
        <p className="app-topic_title">{topic.title}</p>
        <p className="app-topic_meta">
          <span>
            <b className="app-topic_login">{topic.user.login}</b>
            {TileContent.renderCreatedOrReplied(topic)}
          </span>
          <span>{topic.replies_count + ' / ' + topic.hits}</span>
        </p>
      </div>
    )
  }
}

// component
const Tile = {
  oninit: vnode => {
    vnode.state.onclick = e => {
    }
  },
  view: vnode => {
    const topic = vnode.attrs.topic
    return(
      m(listTile, {
        front: m(Avatar, {user: topic.user}),
        content: m(TileContent, {topic: topic}),
        ink: true,
        events: {
          onclick: vnode.state.onclick
        }
      })
    )
  }
}

const List = {
  oninit: vnode => {
    vnode.state.list = []
    loadTopicList().then(resp => {
      vnode.state.list = resp.topics
    })
  },
  generateTiles: (list) => {
    return list.map(v => {
      return m(Tile, {topic: v})
    })
  },
  view: vnode => {
    return(
      m(list, {
        tiles: List.generateTiles(vnode.state.list)
      })
    )
  }
}

export default {
  view: () => {
    return m(List)
  }
}