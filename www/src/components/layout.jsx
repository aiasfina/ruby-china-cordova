import m from 'mithril'

export default {
  view: (vnode) => {
    return(
      <main>
        {vnode.children}
      </main>
    )
  }
}