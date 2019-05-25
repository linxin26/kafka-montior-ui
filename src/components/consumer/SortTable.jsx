/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";


const columns = [{
    title: 'memberId',
    dataIndex: 'memberId',
    sorter: false,
    key: 'name',
    width: '10%',
}, {
    title: 'group',
    dataIndex: 'group',
    sorter: false,
    width: '5%',
}, {
    title: 'topic',
    dataIndex: 'topic',
    sorter: false,
    width: '10%',
}, {
    title: 'partition',
    dataIndex: 'partition',
    sorter: false,
    width: '10%',
}, {
    title: 'currentOffset',
    dataIndex: 'currentOffset',
    sorter: false,
    width: '10%',
}, {
    title: 'endOffset',
    dataIndex: 'endOffset',
    sorter: false,
    width: '5%',
}, {
    title: 'lag',
    dataIndex: 'lag',
    sorter: false,
    width: '5%',
}, {
    title: 'clientId',
    dataIndex: 'clientId',
    sorter: false,
    width: '5%',
}];

const data = [{
    id: '1',
    name: 'topic1',
    partition: 32,
    offset: '19',
}, {
    id: '2',
    name: 'topic2',
    partition: 42,
    offset: '19',
}, {
    id: '3',
    name: 'topic3',
    partition: 32,
    offset: '19',
}, {
    id: '4',
    name: 'topic4',
    partition: 32,
    offset: '192',
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
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
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
            // url: 'https://randomuser.me/api',
            url: 'http://localhost:5050/data/consumerServlet',
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
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data.length;
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
                <Table columns={columns} rowKey={record => record.memberId}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       dataSource={this.state.data} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default SortTable;
