import m from 'mithril'

const loadList = (topic_id) => {

  return m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + topic_id + '/replies.json'
  })
}

export {loadList}
