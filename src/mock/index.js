const Mock = require('mockjs')
require('./modules/user')
require('./modules/table')
Mock.setup({
  timeout: 3000 // setter delay time
})
