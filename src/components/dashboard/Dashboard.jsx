/**
 * Created by Linx on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card, Icon} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as reqwest from "reqwest";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                init: true,
                nodeSize: 5,
                clusterState: 1,
                topicSize: 10,
                partitionSize: 20
            },
            topicAlarm: []
        }
    }

    initialState() {
        return {
            data: {
                init: false,
                nodeSize: 5
            }
        };
    }

    featchAlarm = () => {
        reqwest({
            url: 'http://localhost:5050/data/alarmServlet',
            method: 'get',
            data: {},
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            data = data.data;
            var body = '';
            for (var i = 0; i < data.length; i++) {
                body += 'topic:' + data[i].topic + '-' + 'preferred:' + data[i].preferred + "/n";
                // console.log(data[i].topic,data[i].preferred);
            }
            this.setState({
                topicAlarm: data
            })
        });
    }
    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            url: 'http://localhost:5050/data/kafkaInfoServlet',
            method: 'get',
            data: {},
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            this.setState({
                data: data
            });
        });
    }

    componentDidMount() {
        this.initialState();
        this.fetch();
        this.featchAlarm();
        var myChart = echarts.init(document.getElementById("realtime_echart"));
        var op = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['生产者平均可用性', '消费者平均可用性'],
                top: '5%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '15%',
                height: "85%",
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: '生产者平均可用性',
                type: 'line',
                data: [1, 2, 3, 4],
            }, {
                name: '消费者平均可用性',
                type: 'line',
                data: [1, 2, 3, 4],
            }],
        };
        myChart.setOption(op);
        setInterval(function () {
            reqwest({
                url: 'http://localhost:5050/data/metricsServlet/avg',
                method: 'get',
                data: {},
                type: 'jsonp',
                jsonpCallback: 'callback',
                jsonpCallbackName: 'callback'
            }).then((data) => {
                op.series[0].data = data.data.producerAvg;
                op.series[1].data = data.data.consumerAvg;
                op.xAxis[0].data = data.data.time;
                myChart.setOption(op);
            });
        }, 5000);
        this.errorLostTotalCharts();
        this.delayCharts();
    }

    errorLostTotalCharts() {
        var myChart = echarts.init(document.getElementById('error_lost_total_charts'));
        // 指定图表的配置项和数据
        var op = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['生产错误数', '消费错误数', '记录丢失数'],
                top: '0%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '10%',
                height: "90%",
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: '生产错误数',
                type: 'line',
                data: [1, 2, 3, 4],
            }, {
                name: '消费错误数',
                type: 'line',
                data: [1, 2, 3, 4],
            }, {
                name: '记录丢失数',
                type: 'line',
                data: [1, 2, 3, 4],
            }],
        };
        myChart.setOption(op);
        setInterval(function () {
            reqwest({
                //url:'/api/total',
                url: 'http://localhost:5050/data/metricsServlet/error',
                method: 'get',
                data: {},
                type: 'jsonp',
                jsonpCallback: 'callback',
                jsonpCallbackName: 'callback'
            }).then((data) => {
                op.series[0].data = data.data.producerError;
                op.series[1].data = data.data.consumerError;
                op.series[2].data = data.data.lostTotal;
                op.xAxis[0].data = data.data.time;
                myChart.setOption(op);
            });
        }, 5000);

    }

    delayCharts() {
        var myChart = echarts.init(document.getElementById('delayCharts'));
        // 指定图表的配置项和数据
        var op = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['平均延迟毫秒', '最大延迟毫秒'],
                top: '2%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '12%',
                height: "88%",
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: '平均延迟毫秒',
                type: 'line',
                data: [1, 2, 3, 4],
            }, {
                name: '最大延迟毫秒',
                type: 'line',
                data: [1, 2, 3, 4],
            }],
        };
        myChart.setOption(op);
        setInterval(function () {
            reqwest({
                //url:'/api/total',
                url: 'http://localhost:5050/data/metricsServlet/delay',
                method: 'get',
                data: {},
                type: 'jsonp',
                jsonpCallback: 'callback',
                jsonpCallbackName: 'callback'
            }).then((data) => {
                op.series[0].data = data.data.delayMsAvg;
                op.series[1].data = data.data.delayMsMax;
                op.xAxis[0].data = data.data.time;
                myChart.setOption(op);
            });
        }, 5000);

    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />

                <Row gutter={10}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">集群状态</div>
                                        <h2>{this.state.data.clusterState ? '正常' : '异常'}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">节点数</div>
                                        <h2>{this.state.data.brokerNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-info"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Topic总数</div>
                                        <h2>{this.state.data.topicNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-success" />
                                    </div>
                                    <div className="camera">
                                        <div className="text-muted">Partition总数</div>
                                        <h2>{this.state.data.partitionNum}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <div id="realtime_echart" style={{width: '100%', height: 200}}>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>延迟统计</h3>
                                    <small>实时</small>
                                </div>
                                <div id="delayCharts" style={{width: '100%', height: 200}}>

                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>报警栏</h3>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <Comp one={this.state.topicAlarm} />,
                                {this.state.topicAlarm.body}
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>异常统计</h3>
                                    <small>实时</small>
                                </div>
                                <div id="error_lost_total_charts" style={{width: '100%', height: 200}}>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

class Comp extends React.Component {
    render() {
        return (
            <ul className="list-group no-border">
                {this.props.one.map(function (item, index) {
                    return <li key={index} className="list-group-item">
                        <span className="text-muted">topic: </span> {item.topic}
                        <span className="text-muted"
                              style={{color: 'red', margin: '0 5px 0 15px'}}>分区可用率: </span>{item.preferred}
                    </li>;
                })}
            </ul>
        );
    }
};

export default Dashboard;