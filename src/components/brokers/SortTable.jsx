/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";
import {Link} from "react-router";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        sorter: false,
        key: 'id',
        width: '5%',
        render: (text, record) => <Link to={'/app/broker/' + record.id}>{text}</Link>
    }, {
        title: 'host',
        dataIndex: 'host',
        sorter: false,
        width: '5%',
    }, {
        title: 'port',
        dataIndex: 'port',
        sorter: false,
        width: '5%',
    }, {
        title: 'startTime',
        dataIndex: 'startTime',
        sorter: false,
        width: '10%',
    }, {
        title: 'endpoints',
        dataIndex: 'endpoints',
        sorter: false,
        width: '10%',
    }, {
        title: 'version',
        dataIndex: 'version',
        sorter: false,
        width: '5%',
    }, {
        title: 'jmx_port',
        dataIndex: 'jmx_port',
        sorter: false,
        width: '5%',
    }, {
        title: 'controller',
        sorter: false,
        width: '5%',
        render: (text, record) =>text.controller.toString(),
    }];

class SortTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data: [],
        pagination: {},
        loading: false,
    };
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            filters,
        });
    };
    clearFilters = () => {
        this.setState({filteredInfo: null});
    };
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getBroker',
            url:'http://localhost:5050/data/brokerServlet',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback'
        }).then((data) => {
            const pagination = {...this.state.pagination};
            pagination.total = data.data.length;
            this.setState({
                loading: false,
                data: data.data,
                pagination,
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}
                       rowKey={record => record.id}
                       pagination={this.state.pagination}
                       onChange={this.handleChange}
                       loading={this.state.loading}
                />
            </div>
        );
    }
}

export default SortTable;
