import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './containers/Homepage';
import NotFoundPage from './containers/NotFound';
import MyCollection from './containers/MyCollection';
import TulipPage from './containers/TulipPage';
import Commission from './containers/Commission';
import Browse from './containers/Browse';
import Gift from './containers/Gift';
import {createBrowserHistory} from 'history';
import { Router } from 'react-router';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

export default function App() {
  const history = createBrowserHistory();

  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/collection/:account?" component={({match}) => <MyCollection account={match.params.account || null} />}  />
            <Route exact path="/browse/:page?" component={({match}) => <Browse startPage={parseInt(match.params.page, 10) || 0} />} />
            <Route exact path="/tulip/:id" component={({match}) => <TulipPage id={match.params.id | ""} />}  />
            <Route exact path="/commission" component={Commission} />
            <Route exact path="/gift" component={Gift} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Web3ReactProvider>
    </div>
  );
}
