import m from 'mithril'

const loadList = data => {
  data.page = data.page || 1

  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics.json',
    data: data
  })
}

const loadTopicList = page => {
  return loadList({page: page})
}

const loadNodeList = (page, node_id) => {
  return loadList({page: page, node_id: node_id})
}

const loadJobList = page => {
  return loadNodeList(page, 25)
}

const loadTopic = id => {
  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + id + '.json',
    data: {id: id}
  })
}

export {loadTopicList, loadNodeList, loadJobList, loadTopic}
