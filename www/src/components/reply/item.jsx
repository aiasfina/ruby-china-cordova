import m from 'mithril'
import {listTile, icon} from 'polythene'
import timeago from '../share/timeago.js'

const Avatar = {
  view: vnode => {
    const user = vnode.attrs.user

    return m(icon, {
      type: 'medium',
      class: 'app-topic_reply-avatar avatar--circle',
      src: user.avatar_url
    })
  }
}

const Content = {
  view: vnode => {
    const reply = vnode.attrs.reply

    return(
      <div>
        <div className="app-topic_reply-meta">
          <span><b>{reply.user.login}</b></span>
          <span><time oncreate={timeago} datetime={reply.created_at}></time></span>
        </div>
        <div className="app-topic_reply-content">{m.trust(reply.body_html)}</div>
      </div>
    )
  }
}

const view = vnode => {
  const reply = vnode.attrs.reply

  return m(listTile, {
    class: 'app-topic_replies-reply',
    ink: true,
    front: m(Avatar, {user: reply.user}),
    content: m(Content, {reply: reply})
  })
}

export default {
  view
}