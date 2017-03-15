import '../../css/layout.scss'

import m from 'mithril'

import {iconButton, tabs, toolbar} from 'polythene'
import iconMenu from 'mmsvg/google/msvg/navigation/menu'
import iconSearch from 'mmsvg/google/msvg/action/search'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'

import HeaderPanel from './headerPanel.jsx'

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
        url: {
          href: '/topics',
          oncreate: m.route.link
        }
      },
      {
        label: '招聘',
        url: {
          href: '/jobs',
          oncreate: m.route.link
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
        autofit: true
      })
    )
  }
}

export default {
  view: vnode => {
    return(
      <main className="app-main">
        {m(HeaderPanel, {toolbar: m(Toolbar)}, m(Tab))}
        <div className="app-content">
          {vnode.children}
        </div>
      </main>
    )
  }
}