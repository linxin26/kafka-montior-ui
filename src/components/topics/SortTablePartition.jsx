/**
 * Created by linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";
import {Link} from "react-router";

const columns = [{
    title: 'partition',
    dataIndex: 'id',
    sorter: false,
    key: 'id',
    width: '5%',
    render:(text,record)=><Link to={'/app/topics/'+record.name}>{text}</Link>
}, {
    title: 'leader',
    dataIndex: 'leader',
    sorter: false,
    width: '5%',
}, {
    title: 'underReplicated',
    dataIndex: 'underReplicated',
    sorter: false,
    width: '10%',
}, {
    title: 'leaderPreferred',
    dataIndex: 'leaderPreferred',
    sorter: false,
    width: '10%',
}, {
    title: 'size',
    dataIndex: 'size',
    sorter: false,
    width: '5%',
}, {
    title: 'replicas',
    dataIndex: 'replicas',
    sorter: false,
    width: '10%',
}, {
    title: 'inSyncReplicas',
    dataIndex: 'inSyncReplicas',
    sorter: false,
    width: '10%',
}, {
    title: 'firstOffset',
    dataIndex: 'firstOffset',
    sorter: false,
    width: '10%',
},{
    title: 'lastOffset',
    dataIndex: 'lastOffset',
    sorter: false,
    width: '10%',
}];

class SortTablePartition extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data: [],
        pagination: {},
        loading: false,
    };
    handleChange = (pagination, filters, sorter) => {
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
        console.log('partition props:', this.props);
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getTopics',
            url:'http://localhost:5050/data/partitionServlet?results=&current=&topicName='+this.props.topicName,
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
                       loading={this.state.loading}/>
            </div>
        );
    }
}

export default SortTablePartition;
