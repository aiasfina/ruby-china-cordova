import m from 'mithril'

const loadList = (topic_id, offset) => {

  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + topic_id + '/replies.json',
    data: {offset: offset}
  })
}

export {loadList}
