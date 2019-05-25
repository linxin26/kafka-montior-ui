/**
 * Created by linx on 2017/8/13.
 */
import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Page from '../components/Page';
import BasicForm from '../components/forms/BasicForm';
import BasicTable from '../components/tables/BasicTables';
import AdvancedTable from '../components/tables/AdvancedTables';
import Login from '../components/pages/Login';
import Echarts from '../components/charts/Echarts';
import Recharts from '../components/charts/Recharts';
import Icons from '../components/ui/Icons';
import Buttons from '../components/ui/Buttons';
import Spins from '../components/ui/Spins';
import Modals from '../components/ui/Modals';
import Notifications from '../components/ui/Notifications';
import Tabs from '../components/ui/Tabs';
import Banners from '../components/ui/banners';
import Drags from '../components/ui/Draggable';
import Dashboard from '../components/dashboard/Dashboard';
import Gallery from '../components/ui/Gallery';
import NotFound from '../components/pages/NotFound';
import BasicAnimations from '../components/animation/BasicAnimations';
import ExampleAnimations from '../components/animation/ExampleAnimations';
import AuthBasic from '../components/auth/Basic';
import RouterEnter from '../components/auth/RouterEnter';
import Brokers from '../components/brokers/Brokers';
import Broker from '../components/brokers/Broker';
import Topics from '../components/topics/Topics';
import Topic from '../components/topics/Topic';
import Comsumers from '../components/consumer/Consumers';
import Partition from "../components/partitions/Partition";
import TopicCreate from "../components/topics/TopicCreate";
import Messages from "../components/messages/Messages";
import SearchTable from "../components/tables/SearchTable";

const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('../components/ui/Wysiwyg').default);
    }, 'Wysiwyg');
};

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { store } = this.props;
        const { auth } = store.getState().httpData;
        if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
        return component;
    };
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/app/dashboard/index" />
                    <Route path={'app'} component={App}>
                        <Route path={'form'}>
                            <Route path={'basicForm'} component={BasicForm} />
                        </Route>
                        <Route path={'table'}>
                            <Route path={'basicTable'} component={BasicTable} />
                            <Route path={'advancedTable'} components={AdvancedTable} />
                            <Route path={'asynchronousTable'} components={SearchTable} />
                        </Route>
                        <Route path={'chart'}>
                            <Route path={'echarts'} component={Echarts} />
                            <Route path={'recharts'} component={Recharts} />
                        </Route>
                        <Route>
                            <Route path={'brokers'} component={Brokers} />
                            <Route path={'broker/:id'} component={Broker} />
                            <Route path={'topics'} component={Topics} />
                            <Route path={'topics/:name'} component={Topic} />
                            <Route path={'topicCreate'} component={TopicCreate} />
                            <Route path={'consumers'} component={Comsumers} />
                            <Route path={'messages'} component={Messages} />
                        </Route>
                        <Route path={'ui'}>
                            <Route path={'icons'} component={Icons} />
                            <Route path={'buttons'} component={Buttons} />
                            <Route path={'spins'} component={Spins} />
                            <Route path={'modals'} component={Modals} />
                            <Route path={'notifications'} component={Notifications} />
                            <Route path={'tabs'} component={Tabs} />
                            <Route path={'banners'} component={Banners} />
                            <Route path={'wysiwyg'} getComponent={Wysiwyg} />
                            <Route path={'drags'} component={Drags} />
                            <Route path={'gallery'} component={Gallery} />
                        </Route>
                        <Route path={'animation'}>
                            <Route path={'basicAnimations'} component={BasicAnimations} />
                            <Route path={'exampleAnimations'} component={ExampleAnimations} />
                        </Route>
                        <Route path={'dashboard/index'} component={Dashboard} />
                        <Route path={'partitions/partition'} component={Partition} />
                        <Route path="auth">
                            <Route path="basic" component={AuthBasic} />
                            <Route path="routerEnter" component={RouterEnter} />
                        </Route>
                    </Route>
                    <Route path={'login'} components={Login} />
                    <Route path={'404'} component={NotFound} />
                </Route>
            </Router>
        )
    }
}