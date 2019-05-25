var Mock = require('mockjs');
let Random = Mock.Random;

module.exports = {

    getTopics: Mock.mock({
        "error": 0,
        "message": "success",
        "data|5": [{
            "name": "@datetime",
            "partitions": Random.integer(1, 10)
        }]
    }),
    getTopicPartition: Mock.mock({
        "error": 0,
        "message": "success",
        "data|5": [{
            "id": 12,
            "leaderId": -1,
            "preferredLeaderId": -1,
            "size": 2,
            "firstOffset": "1",
            "replicas": []
        }]
    }),
    getTopicState: Mock.mock({
        "result": {
            "topicTotal": Random.integer(1, 10),
            "topicAbleTotal": Random.integer(10, 100)
        }
    }),
};