import React from 'react';
import Table from './Table.js';

class Stock extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	value: '',
	    	time: "week",
	    	arr: []
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handler = this.handler.bind(this);
	    this.handleSubmit1 = this.handleSubmit1.bind(this);
	}
  	handleChange(event) {
    	this.setState({
    		value: event.target.value
    	});
  	}
  	handler(event) {
  		this.setState({
  			time: event.target.value
  		});
  	}
  	handleSubmit1() {
    	var newar = this.state.value;
    	var time2 = this.state.time;
    	newar = newar.split(',');
    	newar = newar.map(function(i){
    		return i.toUpperCase().trim();
    	});
    	this.setState({
    		arr: newar
    	})
  	}
   	render() {
   		var companies = this.state.arr;
   		var time2 = this.state.time;
      	return (
	        <div align = "center">
	      	<h1>Stock Trading </h1>
			<h3>Stock Symbol:
			<input type="text" value={this.state.value} onChange={this.handleChange} />
	    	</h3>
	    	<br />
	    	<select value={this.state.time} onChange={this.handler} id="day">
				<option value='week'>Last week</option>
				<option value='month'>Last month</option>
				<option value='year'>Last year</option>
			</select>
		   	    <br /><br />
			<button onClick={this.handleSubmit1}>Submit</button>
			{	
				companies.map(function(index){
					return < Table key={index} input={index} time1 = {time2} />
				})
			}
	        </div>
      	);
   }
}

export default Stock;