/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card, Icon} from 'antd';
import SortTable from './SortTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";

class Brokers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                brokerTotal:0,
                brokerAbleTotal:0
            }
        }
    }

    initialState() {
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getBrokerState',
            url: 'http://localhost:5050/data/brokerServlet/summary',
            method: 'get',
            data: {},
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            console.log(data.data);
            this.setState({
                data: data.data
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="brokers" second="broker"/>
                <Row gutter={10}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">可用数</div>
                                        <h2>{this.state.data.brokerAbleTotal}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="Broker" bordered={false}>
                                <SortTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Brokers;