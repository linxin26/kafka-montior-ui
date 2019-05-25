/**
 * Created by linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";
import {Link} from "react-router";

const columns = [{
    title: 'name',
    dataIndex: 'name',
    sorter: false,
    key: 'name',
    width: '10%',
    render:(text,record)=><Link to={'/app/topics/'+record.name}>{text}</Link>
}, {
    title: 'Partitions',
    dataIndex: 'partitionCount',
    sorter: false,
    width: '10%',
}, {
    title: 'Broker Partitions',
    dataIndex: 'brokerPartitionCount',
    sorter: false,
    width: '20%',
}, {
    title: 'Partition Ids',
    dataIndex: 'PartitionIds',
    sorter: false,
    width: '10%',
}];

class SortTableTopic extends React.Component {
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
        console.log('partition props:', this.props);
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:9090/getTopics',
            url:'http://localhost:5050/data/brokerTopicServlet/'+this.props.brokerId,
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
                       rowKey={record => record.name}
                       pagination={this.state.pagination}
                       onChange={this.handleChange}
                       loading={this.state.loading}/>
            </div>
        );
    }
}

export default SortTableTopic;
