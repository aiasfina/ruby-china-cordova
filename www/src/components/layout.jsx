import '../../css/layout.scss'

import m from 'mithril'
import move from 'move-js'

import {iconButton, tabs, toolbar} from 'polythene'
import iconMenu from 'mmsvg/google/msvg/navigation/menu'
import iconSearch from 'mmsvg/google/msvg/action/search'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'

// style
iconButton.theme('.pe-icon-button', {
  color_light: '#fff'
})

toolbar.theme('.pe-toolbar', {
  color_light_text: '#fff',
  color_light_background: '#00bcd4'
})

tabs.theme('.pe-tabs', {
  color_light: '#b2ebf2',
  color_light_selected: '#fff',
  color_light_tab_indicator: '#FFFF8D'
})

// component
const iBtn = function(msvg) {
  return m(iconButton, {
    icon: {
      msvg: msvg
    }
  })
}

const Toolbar = {
  oninit: (vnode) => {
    vnode.state.btns = [
      iBtn(iconMenu),
      m('span.flex', 'Ruby China'),
      iBtn(iconSearch),
      iBtn(iconMore)
    ]
  },
  view: (vnode) => {
    return(
      m(toolbar, {
        mode: 'medium-tall',
        class: 'app-toolbar',
        content: vnode.state.btns
      })
    )
  }
}

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

const Tab = {
  oncreate: vnode => {
    listenScroll(vnode)
  },
  onremove: vnode => {
    window.onscroll = null;
  },
  oninit: (vnode) => {
    vnode.state.btns = [
      {
        label: '主题'
      },
      {
        label: '招聘'
      }
    ]
  },
  view: (vnode) => {
    return(
      m(tabs, {
        menu: true,
        class: 'app-toolbar_tabs',
        buttons: vnode.state.btns,
        autofit: true
      })
    )
  }
}

const HeadPanel = {
  setHeadPanelHeight: vnode => {
    var height = vnode.dom.offsetHeight
    vnode.dom.parentNode.style.height = height + 'px'
  },
  view: vnode => {
    return(
      <div className="app-headpanel-wrapper">
        <div className="app-headpanel" oncreate={HeadPanel.setHeadPanelHeight}>
          {m(Toolbar)}
          {m(Tab)}
        </div>
      </div>
    )
  }
}

export default {
  view: vnode => {
    return(
      <main className="app-main">
        {m(HeadPanel)}
        <div className="app-content">
          {vnode.children}
        </div>
      </main>
    )
  }
}