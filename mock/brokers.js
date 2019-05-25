var Mock = require('mockjs');
let Random = Mock.Random;

module.exports = {

    getBroker: Mock.mock({
        "error": 0,
        "message": "success",
        "data|10": [{
            "id": Random.integer(1, 12),
            "host": "@ip",
            "port": "2908",
            "startTime": "@datetime",
            "topics|1-5": 1,
            "endpoints": ["1", "2"],
            "version": 1,
            "jmx_port": 9090,
            "controller": "false"
        }]
    }),
    getClusterState: Mock.mock({
        "result": {
            "clusterState": false,
            "brokerNum": Random.integer(1, 10),
            "topicNum": Random.integer(10, 100),
            "partitionNum": Random.integer(50, 1000)
        }
    }),
    getBrokerState: Mock.mock({
        "result": {
            "brokerTotal": Random.integer(1, 10),
            "brokerAbleTotal": Random.integer(10, 100)
        }
    }),
};