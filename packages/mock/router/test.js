const Mock = require('mockjs')

const random = Mock.Random

module.exports = [
  {
    url: 'api/test',
    methods: 'get',
    response() {
      return {
        errno: 0,
        data: {
          name: random.cname(),
        },
      }
    },
  },
]
