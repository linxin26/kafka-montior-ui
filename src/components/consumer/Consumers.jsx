/**
 * Created by Linx on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card} from 'antd';
import SortTable from './SortTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

const Consumers = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="consumers" second=""/>
        <Row gutter={16}>
            <Col className="gutter-row" span={24}>
                <div className="gutter-box">
                    <Card title="Consumers" bordered={false}>
                        <SortTable/>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default Consumers;