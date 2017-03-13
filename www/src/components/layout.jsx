import m from 'mithril'

import '../styles/layout'

import {iconButton, tabs, toolbar} from 'polythene'
import iconMenu from 'mmsvg/google/msvg/navigation/menu'
import iconSearch from 'mmsvg/google/msvg/action/search'
import iconMore from 'mmsvg/google/msvg/navigation/more-vert'

// style
iconButton.theme('.pe-icon-button', {
  color_light: 'white'
})

toolbar.theme('.pe-toolbar', {
  color_light_text: 'white',
  color_light_background: '#00bcd4'
})

tabs.theme('.pe-tabs', {
  color_light: '#b0bec5',
  color_light_selected: '#00bcd4',
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
      m('span.flex', 'Toolbar'),
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
        label: '主题'
      },
      {
        label: '招聘'
      }
    ]
  },
  view: (vnode) => {
    return(
      m(tabs,{
        class: 'app-toolbar_tabs',
        buttons: vnode.state.btns,
        autofit: true
      })
    )
  }
}

export default {
  view: vnode => {
    return(
      <main>
        {m(Toolbar)}
        {m(Tab)}
        <div>
          {vnode.children}
        </div>
      </main>
    )
  }
}