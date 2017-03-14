import '../../css/header_panel.scss'

import m from 'mithril'
import move from 'move-js'

function listenScroll(vnode) {
  var
    dom = vnode.dom,
    isShown = true,
    lastScrollTop = 0

  window.onscroll = (e) => {
    var st = window.pageYOffset || document.documentElement.scrollTop
    if (st - lastScrollTop > 60 && isShown) {
      move(dom)
        .duration(200)
        .translate(0, -dom.offsetHeight)
        .end()
      isShown = false
    } else if (lastScrollTop - st > 60 && !isShown) {
      move(dom)
        .duration(200)
        .translate(0, 0)
        .end()
      isShown = true
    }

    if (timer) { clearTimeout(timer) }
    var timer = setTimeout(() => {
      lastScrollTop = st
    }, 200)
  }
}

const setContentHeight = vnode => {
  var height = vnode.dom.offsetHeight
  vnode.dom.parentNode.style.height = height + 'px'
}

const onremove = vnode => {
  window.onscroll = null
}

const view = vnode => {
  const attrs = vnode.attrs

  return(
    <div className="pe-header_panel--wrapper">
      <div className="pe-header_panel" oncreate={setContentHeight}>
        {attrs.toolbar}
        <div oncreate={listenScroll}>
          {vnode.children}
        </div>
      </div>
    </div>
  )
}

export default {
  onremove,
  view
}
