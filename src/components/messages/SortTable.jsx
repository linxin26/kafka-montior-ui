/**
 * Created by linx on 2017/4/15.
 */
import React from 'react';
import {Table, Button} from 'antd';
import * as reqwest from "reqwest";
import {Link} from "react-router";

const columns = [{
    title: 'checksum',
    dataIndex: 'checksum',
    sorter: false,
    key: 'checksum',
    width: '10%',
    render: (text, record) => <Link to={'/app/topics/' + record.name}>{text}</Link>
}, {
    title: 'message',
    dataIndex: 'message',
    sorter: false,
    width: '20%',
}, {
    title: 'compressionCodec',
    dataIndex: 'compressionCodec',
    sorter: false,
    width: '10%',
}, {
    title: 'valid',
    dataIndex: 'valid',
    sorter: false,
    width: '10%',
    render: (text, record) => text.toString(),
}];

class SortTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            data: [],
            pagination: {},
            // loading: false,
        };
    }


    componentWillReceiveProps(nextProps) {
        // if(nextProps.loading){
        this.setState({
            loading: nextProps.loading,
            data: nextProps.data.data
        });
        // this.state.data = this.props.data.data;
        // this.state.data=this.props.data.data;
        // }
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
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


    componentDidMount() {
        // this.setState({
        //    data:this.props.data
        // });
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}
                       rowKey={record => record.checksum}
                       pagination={this.state.pagination}
                       onChange={this.handleChange}
                       loading={this.state.loading}/>
            </div>
        );
    }
}

export default SortTable;
