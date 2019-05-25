/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card, Button, Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";
import SortTablePartition from "./SortTablePartition";

const gridStyle = {
    width: '15%',
    textAlign: 'center',
};
const confirm = Modal.confirm;

class Topic extends React.Component {


    constructor(props) {
        super(props);
        // console.log('params',props.params.name);
        this.state = {
            redirect: false,
            data: {
                name: props.params.name,
                topicTotal: 0,
                PartitionTotal: 0,
                UnderReplicatedPartitions: 0
            }
        }
    }

    delete = () => {
        this.deleteConfirm();
    };

    deleteConfirm() {
        const {router} = this.props;
        var topicName=this.state.data.name;
        confirm({
            title: '确定删除topic?',
            content: '删除后将无法恢复',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                reqwest({
                    url: 'http://localhost:5050/data/topicServlet/delete?topic=' + topicName,
                    method: 'get',
                    data: {},
                    type: 'jsonp',
                    jsonpCallback: 'callback',
                    jsonpCallbackName: 'callback'
                }).then((data) => {
                    router.push('/app/topics');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    fetch = (params = {}) => {
        //刷新视图
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getTopicState',
            url: 'http://localhost:5050/data/topicServlet/' + this.state.data.name,
            method: 'get',
            data: {},
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            this.setState({
                data: data.data
            });
        });

    }

    componentDidMount() {
        this.fetch();
    }

    render() {

        // if (this.state.redirect) {
        //     console.log("render");
        //     return (<Redirect push to="/app/topics"/>);
        // }
        return (

            <div className="gutter-example">
                <BreadcrumbCustom first="topics" second="topic"/>
                <Row>
                    <Col className="gutter-row">
                        <Card title={this.state.data.name}>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">Partition总数</div>
                                        <h2>{this.state.data.PartitionTotal}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">首选副本率</div>
                                        <h2>{this.state.data.PreferredReplicas}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">消息总数</div>
                                        <h2>{this.state.data.totalSize}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">可读数</div>
                                        <h2>{this.state.data.availableSize}</h2>
                                    </div>
                                </div>
                            </Card.Grid>

                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <Button onClick={this.delete}>Delete Topic</Button>
                                    </div>
                                </div>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Grid style={{width: '100%'}}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <span className="text-muted">同步中副本分区: </span>
                                        <h2 style={{display: 'inline'}}>{this.state.data.UnderReplicatedPartitions}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="Partitions" bordered={false}>
                                <SortTablePartition topicName={this.state.data.name}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
};

export default Topic;