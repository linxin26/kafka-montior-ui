/**
 * Created by Linx on 2017/4/15.
 */
import React, {Component} from 'react';
import {Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import * as reqwest from "reqwest";
import SortTable from "./SortTable";

const Option = Select.Option;
const FormItem = Form.Item;
const table = SortTable;
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

class Message extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                topic: '1',
                partition: 0,
                messageSum: 0,
                num: 0
            },
            body: '111',
            loading: false
        }
    }

    componentWillReceiveProps() {
        if (this.state.loading) {
            this.setState({
                loading: true
            });
        }
    }

    fetch = (params = {}) => {
        this.state.loading = true;
        this.setState({
            loading: true,
            load:1
        });

        reqwest({
            url: 'http://localhost:5050/data/messageServlet',
            method: 'post',
            data: this.state.data,
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            this.setState({
                data:data,
                loading:false
            });
        });
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
                this.state.data.partition = values.partition;
                this.state.data.offset = values.offset;
                this.state.data.messageSum = values.num;
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
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="messages" second=""/>
                <Card title="查询消息" bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '900px'}}>
                        <Row gutter={2}>
                            <Col className="gutter-row" span={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Topic">
                                    {getFieldDecorator('topic', {
                                        rules: [{required: true, message: '请输入Topic!'}],
                                    })(
                                        <Input
                                            placeholder="Topic"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Partition">
                                    {getFieldDecorator('partition', {
                                        rules: [{required: true, message: '请输入Partition!'}],
                                    })(
                                        <Input
                                            placeholder="Partition"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Offset">
                                    {getFieldDecorator('offset', {
                                        rules: [{required: true, message: '请输入Offset!'}],
                                    })(
                                        <Input
                                            placeholder="Offset"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Num">
                                    {getFieldDecorator('num', {
                                        rules: [{required: true, message: '请输入Num!'}],
                                    })(
                                        <Input
                                            placeholder="Num"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{width: '100%'}}>
                                        查询
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card title="消息" bordered={true}>
                    <SortTable data={this.state.data} load={this.state.load} loading={this.state.loading}/>
                </Card>
            </div>)
    }
};

const Messages = Form.create()(Message);

export default Messages;