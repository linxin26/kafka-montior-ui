var Mock = require('mockjs');
let Random = Mock.Random;

module.exports = {

    getPartitionReplica: Mock.mock({
        "error": 0,
        "message": "success",
        "result|5": [{
            "id": 1,
            "inService": false,
            "leader": true
        }]
    })
};