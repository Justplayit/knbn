import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Project from '../components/Project';
import Menu from '../components/Menu';
import EditComponent from '../components/EditComponent';
import TicketSetup from '../components/create/TicketSetup';
import PRSetup from '../components/create/PRSetup';
import CmpSetup from '../components/create/CmpSetup';
import store from '../storage/store';
import {Provider} from 'react-redux';
import ProjectSetup from '../components/create/ProjectSetup';
import Dashboard from '../components/Dashboard';
import EditTicket from '../components/editor/EditTicket';
import Wrapper from './Wrapper';
import LoginPage from '../components/LoginPage';
import Register from '../components/Register';
import { createBrowserHistory } from 'history'; 
import withAuth from './HighOrder';
import SearchedItems from '../components/SearchedItems';

class ReactHashRouter extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Provider store={store}>
                {/* <Wrapper> */}
                    <HashRouter>
                        <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route path="/login" component={LoginPage} />
                            <Route exact path="/" component={withAuth(Dashboard)} />
                            <Route exact path="/view-project/:id" component={withAuth(Project)} />
                            <Route exact path="/create-pr" component={withAuth(PRSetup)}/>
                            <Route exact path="/create-ticket" component={withAuth(TicketSetup)}/>
                            <Route exact path="/create-cmp" component={withAuth(CmpSetup)}/>
                            <Route exact path="/create-project" component={withAuth(ProjectSetup)}/>
                            <Route exact path="/edit-component/:id" component={withAuth(EditComponent)}/>
                            <Route exact path="/edit-ticket/:id" component={withAuth(EditTicket)}/>
                            <Route exact path="/search/:term" component={withAuth(SearchedItems)}/>
                        </Switch>
                    </HashRouter>
                {/* </Wrapper> */}
            </Provider>
        )
    }
}

ReactDom.render(<ReactHashRouter/>, document.getElementById('app'));