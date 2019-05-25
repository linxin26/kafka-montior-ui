/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";
import SortTableTopic from "./SortTableTopic";

const gridStyle = {
    width: '15%',
    textAlign: 'center',
};

class Broker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                id:this.props.params.id,
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
            url: 'http://localhost:5050/data/brokerServlet/'+this.state.data.id,
            method: 'get',
            data: {},
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            this.setState({
                topicCount:data.topicCount,
                partitionCount:data.partitionCount,
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
                <BreadcrumbCustom first="brokers" second="broker" />
                <Row>
                    <Col className="gutter-row">
                        <Card title={"Broker ID : "+this.state.data.id}>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">Topics</div>
                                        <h2>{this.state.topicCount}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">Host</div>
                                        <h2>{this.state.data.host}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">Partitions</div>
                                        <h2>{this.state.partitionCount}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                            <Card.Grid style={{width:'20%'}}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">StartTime</div>
                                        <h2>{this.state.data.startTime}</h2>
                                    </div>
                                </div>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="Topics" bordered={false}>
                                <SortTableTopic brokerId={this.state.data.id} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }

}

export default Broker;