import m from 'mithril'
import timeago from '../share/timeago'
import {listTile, fab, icon} from 'polythene'

const Avatar = {
  view: vnode => {
    const user = vnode.attrs.user

    return(
      m(icon, {
        type: 'large',
        class: 'app-topics-avatar avatar--circle',
        src: user.avatar_url
      })
    )
  }
}

const renderCreatedOrReplied = topic => {
  if (topic.replied_at) {
    return(
      <span>
        <time oncreate={timeago} datetime={topic.replied_at}></time> 回复
      </span>
    )
  } else {
    return(
      <span>
        <time oncreate={timeago} datetime={topic.created_at}></time> 发表
      </span>
    )
  }
}

const TileContent = {
  view: vnode => {
    const topic = vnode.attrs.topic

    return(
      <div className="app-topics-content">
        <div className="app-topics-title">{topic.title}</div>
        <div className="app-topics-meta">
          <span>
            <b className="app-topics-login">{topic.user.login}</b>
            <em className="app-topics-node">{topic.node_name}</em>
            {renderCreatedOrReplied(topic)}
          </span>
          <span>{topic.replies_count + ' / ' + topic.hits}</span>
        </div>
      </div>
    )
  }
}

const view = vnode => {
  const topic = vnode.attrs.topic
  const user = topic.user

  return(
    m(listTile, {
      class: 'app-topics-item',
      ink: true,
      front: m(Avatar, {user: user}),
      content: m(TileContent, {topic: topic}),
      events: {
        onclick: () => {
          m.route.set('/topics/' + topic.id)
        }
      }
    })
  )
}

export default {
  view
}