/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Card, Form, Input, message, Select, Row, Col, Button} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";

const Option = Select.Option;
const FormItem = Form.Item;
const gridStyle = {
    width: '15%',
    textAlign: 'center',
};

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class TopicCreates extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                topic: '',
                partitions: 0,
                replicaFactor: 0
            }
        }
    }

    initialState() {
    }

    fetch = (params = {}) => {

        const {router} = this.props;
        reqwest({
            url: 'http://localhost:5050/data/topicServlet/create',
            method: 'post',
            data: this.state.data,
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            if(data.status==200) {
                router.push('/app/topics');
            }else{
                this.error(data.error);
            }
        });
    };
    error = (msg) => {
        message.error(msg);
    };

    componentDidMount() {
    };

    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.state.data.topic = values.topic;
                this.state.data.partitions = values.partitions;
                this.state.data.replicaFactor = values.replicaFactor;
                this.fetch();
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="topics" second="create"/>
                <Row>
                    <Col className="gutter-row">
                        <div className="gutter-box">
                            <Card title="Topic信息" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Row gutter={2}>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Topic"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('topic', {
                                                    rules: [{
                                                        pattern: '[a-z,-]', message: '不可包含特殊字符!',
                                                    }, {
                                                        required: true, message: '请输入Topic!',
                                                    }],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Partitions"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('partitions', {
                                                    rules: [{
                                                        required: true, message: '请输Partitions!',
                                                    }],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Replication Factor"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('replicaFactor', {
                                                    rules: [{
                                                        required: true, message: '请输入副本因子!',
                                                    }],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={8}>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label={(
                                                    <span>
                                            retention.ms
                                        </span>
                                                )}
                                            >

                                                <Input/>
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="max.message.bytes"
                                            >
                                                <Input/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={8}>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="segment.index.bytes"
                                            >
                                                <Input/>
                                            </FormItem>
                                        </Col>

                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="segment.bytes"
                                            >
                                                <Input/>

                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={8}>
                                        <Col span={10}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="min.cleanable.dirty.ratio"
                                            >
                                                <Input/>

                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="min.insync.replicas"
                                            >
                                                <Input/>

                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button htmlType="submit" size="large">Create</Button>
                                    </FormItem>

                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
};

const TopicCreate = Form.create()(TopicCreates);

export default TopicCreate;