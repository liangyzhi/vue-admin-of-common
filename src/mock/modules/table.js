const Mock = require('mockjs')
var Random = Mock.Random

const tableData = (option) => {
    let result = {code:200,message:'成功!',data:[]}
    for(let i = 0; i < 30; i++) {
        result.data.push({
            id: i,
            status: i==2||i==3?1:0,
            name: Random.cname(),
            image: Random.image(),
            username: Random.name(),
            time: Random.datetime(),
            link: Random.url(),
            region: Random.region(),
            shuffle: Random.shuffle(),
            email: Random.email(),
            ip: Random.ip(),
            color: Random.color(),
            data:{
                count:30,
            }
        })
    }
	return result
}
Mock.mock('/table/data', 'get', tableData)
