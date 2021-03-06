import '../../../css/layout.scss'

import m from 'mithril'
import {iconButton, button, tabs, toolbar, fab} from 'polythene'
import iconMenu from 'mmsvg/google/msvg/navigation/menu'
import iconSearch from 'mmsvg/google/msvg/action/search'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'
import iconPlus from 'mmsvg/templarian/msvg/plus'
import HeaderPanel from '../share/header_panel.jsx'

// style
iconButton.theme('.app-toolbar-ibtn', {
  color_light: '#fff'
})

toolbar.theme('.app-toolbar', {
  color_light_text: '#fff',
  color_light_background: '#00bcd4'
})

tabs.theme('.app-toolbar-tabs', {
  color_light: '#b2ebf2',
  color_light_selected: '#fff',
  color_light_tab_indicator: '#FFFF8D'
})

// component
const iBtn = function(msvg) {
  return m(iconButton, {
    class: 'app-toolbar-ibtn',
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

const Tab = {
  oninit: (vnode) => {
    vnode.state.btns = [
      {
        label: '主题',
        events: {
          onclick: () => {
            m.route.set('/topics', null, {replace: true})
          }
        }
      },
      {
        label: '招聘',
        events: {
          onclick: () => {
            m.route.set('/jobs', null, {replace: true})
          }
        }
      }
    ]
  },
  view: (vnode) => {
    return(
      m(tabs, {
        menu: true,
        class: 'app-toolbar-tabs',
        buttons: vnode.state.btns,
        autofit: true,
        selectedTab: (function() {
          switch(m.route.get()) {
            case '/topics': return 0
            case '/jobs': return 1
            default: 0
          }
        }())
      })
    )
  }
}

const clickFab = vnode => {

}

const Fab = {
  oninit: vnode => {
    vnode.state.clickFab = clickFab
  },
  view: vnode => {
    return m(fab, {
      class: 'app-fab--fixed',
      icon: {
        msvg: iconPlus
      },
      events: {
        onclick: vnode.state.clickFab
      }
    })
  }
}

const view = vnode => {
  return(
    <main className="app-main">
      {m(HeaderPanel, {toolbar: m(Toolbar), fixed: true}, m(Tab))}
      <div className="app-content">
        {vnode.children}
      </div>
      {m(Fab)}
    </main>
  )
}

export default {
  view
}