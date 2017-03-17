import m from 'mithril'
import {toolbar, iconButton, icon} from 'polythene'
import iconHeart from 'mmsvg/templarian/msvg/heart'
import iconBookmark from 'mmsvg/templarian/msvg/bookmark'
import iconComment from 'mmsvg/templarian/msvg/comment-text-outline'
import iconEye from 'mmsvg/templarian/msvg/eye'

const showReplies = (topic) => {
  m.route.set('/topics/' + topic.id + '/replies', {title: topic.title})
}

const Menu = {
  iBtn: (msvg) => {
    return m(iconButton, {
      icon: {
        msvg: msvg
      }
    })
  },
  view: vnode => {
    const meta = vnode.attrs.meta
    const topic = vnode.attrs.topic

    return(
      <ul className="app-topic_detail-menu">
        <li className={"app-topic_detail-menu-bookmark" + (meta.favorited ? ' active' : '')}>{Menu.iBtn(iconBookmark)}</li>
        <li className={"app-topic_detail-menu-heart" + (meta.liked ? ' active' : '')}>{Menu.iBtn(iconHeart)}</li>
        <li className="app-topic_detail-menu-eye">{Menu.iBtn(iconEye)}</li>
        <li className="app-topic_detail-menu-comment" onclick={() => {showReplies(topic)}}>{Menu.iBtn(iconComment)}</li>
      </ul>
    )
  }
}

export default Menu