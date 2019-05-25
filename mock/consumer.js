var Mock = require('mockjs');
let Random = Mock.Random;

module.exports = {

    getConsumers: Mock.mock({
        "error": 0,
        "message": "success",
        "result|5": [{
            "memberId": "@id",
            "clientId": "@id",
            "group": "groupName",
            "host": "@ip",
            "topic": "topicName",
            "partition": 1,
            "currentOffset": 12,
            "endOffset": 21,
            "lag": 90,
            "owner": "linx",

        }]
    }),
};