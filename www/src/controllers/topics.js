import m from 'mithril'

const loadList = data => {
  data.offset = data.offset || 0

  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics.json',
    data: data
  })
}

const loadTopicList = offset => {
  return loadList({offset: offset})
}

const loadNodeList = (offset, node_id) => {
  return loadList({offset: offset, node_id: node_id})
}

const loadJobList = offset => {
  return loadNodeList(offset, 25)
}

const loadTopic = id => {
  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + id + '.json',
    data: {id: id}
  })
}

export {loadTopicList, loadNodeList, loadJobList, loadTopic}
