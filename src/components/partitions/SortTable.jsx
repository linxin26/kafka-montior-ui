/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";


const columns = [{
    title: 'name',
    dataIndex: 'name',
    sorter: false,
    key: 'name',
    width: '20%',
}, {
    title: 'partition',
    dataIndex: 'partition',
    sorter: false,
    width: '20%',
}, {
    title: 'offset',
    dataIndex: 'email',
    sorter: false,
    width: '20%',
}]

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
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = {...this.state.pagination};
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
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
                <Table columns={columns} rowKey={record => record.registered}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       dataSource={this.state.data} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default SortTable;
