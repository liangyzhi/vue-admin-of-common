const Mock = require('mockjs')
const username = ['admin', 'super']
const password = ['123', '321']
const login = (options) => {
    const body = JSON.parse(options.body);
    if (!username.includes(body.username) || !password.includes(body.password)) {
        return {
            msg: '账号密码错误!',
            code: 400,
            data: null
        }
    }

    return {
        "code": 200,
        "msg": "登录成功!",
        "data": {
            'id': Mock.mock('@guid'),
            'name': Mock.mock('@name'),
            'username': 'admin',
            'password': '',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
            'status': 1,
            'telephone': '',
            'lastLoginIp': '27.154.74.117',
            'lastLoginTime': 1534837621348,
            'creatorId': 'admin',
            'createTime': 1497160610259,
            'deleted': 0,
            'roleId': 'admin',
            'lang': 'zh-CN',
            'token': '4291d7da9005377ec9aec4a71ea837f',
        }
    }
}
Mock.mock('/api/login', 'post', login)
