/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card, Icon, Button} from 'antd';
import SortTable from './SortTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";

class Topics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                topicTotal: 0,
                partitionTotal: 0
            }
        }
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getTopicState',
            url: 'http://localhost:5050/data/topicServlet/summary',
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

    createPage = () => {
        const {router} = this.props;
        router.push('/app/topicCreate');
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="topics" second=""/>
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-info"/>
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Topic总数</div>
                                        <h2>{this.state.data.topicTotal}</h2>
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
                                        <Icon type="camera" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Partition总数</div>
                                        <h2>{this.state.data.partitionTotal}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button onClick={this.createPage}>
                                    添加Topic
                                </Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="Topic" bordered={false}>
                                <SortTable/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
};

export default Topics;