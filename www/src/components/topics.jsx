import '../../css/topics.scss'

import m from 'mithril'
import timeago from 'timeago.js'
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
    new timeago().render(vnode.dom)
  },
  view: vnode => {
    const topic = vnode.attrs.topic
    return(
      <div className="app-topic_content">
        <p className="app-topic_title">{topic.title}</p>
        <p className="app-topic_meta">
          <b>{topic.user.login}</b>
          <time oncreate={TileContent.renderTimeago} datetime={topic.replied_at}></time>
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