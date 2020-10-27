var Mock = require('mockjs');
var _mockData = {
  retrieve: { data:{
    "list|1-10":[{
    "id":"@guid",
    "mobile":/1[3578][089]\d{8}/,
    "nickName":"@cname",
    "registDate":"@date(yyyy-MM-dd HH:mm:ss)",
    "email":"@email",
    "steamID":"@id",
    "status|0-1": 1,
    "sellPermission":"@range(0,1,2)",
  }]
  }, code:"0", message:"ok",  messageType:"info"}
}

let data = Mock.mock(_mockData);
console.log(data)