import m from 'mithril'
import InfiniteList from 'infinite-list'
import {icon} from 'polythene'
import iconSpinner from 'mmsvg/zavoloklom/msvg/zavoloklom/new/web_application/spinner'

const view = vnode => {
  return <div className="spinner">{m(icon, {msvg: iconSpinner})}</div>
}

export default {
  view
}