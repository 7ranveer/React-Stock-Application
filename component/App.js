import React from 'react';
import Stock from './Stock.js';
import Scheduler from './Scheduler.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class App extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Router>
			<div>
				<h1>
				PlexusMd Stocks and Schedule
				</h1>
					<h3><Link to= {'/Stock'}><h3>Stock</h3></Link></h3>
					<h3><Link to={'/Scheduler'}><h3>Scheduler</h3></Link></h3>
				<Switch>
					<Route exact path='/Scheduler' component={Scheduler} />
					<Route exact path='/Stock' component={Stock} />
				</Switch>
			</div>
			</Router>
		); 
	}
}
export default App;