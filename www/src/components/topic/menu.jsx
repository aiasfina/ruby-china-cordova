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
        <li className={"app-topic_detail-menu-bookmark" + (meta.favorited ? ' active' : '')}>
          <p>{Menu.iBtn(iconBookmark)}</p>
          <p>收藏</p>
        </li>
        <li className={"app-topic_detail-menu-heart" + (meta.liked ? ' active' : '')}>
          <p>{Menu.iBtn(iconHeart)}</p>
          <p>喜欢</p>
        </li>
        <li className="app-topic_detail-menu-eye">
          <p>{Menu.iBtn(iconEye)}</p>
          <p>关注</p>
        </li>
        <li className="app-topic_detail-menu-comment" onclick={() => {showReplies(topic)}}>
          <p>{Menu.iBtn(iconComment)}</p>
          <p>回复</p>
        </li>
      </ul>
    )
  }
}

export default Menu