import '../../../css/header_panel.scss'

import m from 'mithril'

const setContentHeight = vnode => {
  var height = vnode.dom.offsetHeight
  vnode.dom.parentNode.style.height = height + 'px'
}

const view = vnode => {
  const attrs = vnode.attrs
  const fixed = !!attrs.fixed

  return(
    <div className="pe-header_panel--wrapper">
      <div className={'pe-header_panel' + (fixed ? ' fixed' : '')} oncreate={setContentHeight}>
        {attrs.toolbar}
        <div fixed={fixed}>
          {vnode.children}
        </div>
      </div>
    </div>
  )
}

export default {
  view
}
