import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import App from '../components/App';
import Landing from '../components/pages/Landing';
import NotFound from '../components/pages/NotFound';

const r = () => {
  return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
        <IndexRoute component={Landing}/>
        <Route path="*" component={NotFound} />
			</Route>
		</Router>
  )
}

export default r;
