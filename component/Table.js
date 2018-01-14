import React from 'react';
 
var p1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='
var p2= '&outputsize=full&apikey=N8MZIE1KJ85TGKQZ'
class Table extends React.Component{
	constructor() {
	    super();
	    this.state = {
	    	value: '',
	    	time: "week",
	    	myData: [],
	    	max: 0,
	    	min: 0,
	    	myAve: [],
	    	totalAverage: 0
	    };
	}
	componentWillMount(newProps){
		this.state.value = this.props.input;
		this.state.time = this.props.time1;
		this.getList();
	}
	getList(){
		fetch(p1+this.state.value+p2)
		    .then(response => response.json())
		    .then(resp => {
		    	if(resp["Error Message"]){
		    		alert("The Stock Symbol:"+this.state.value+" does not exist")
		    	}else{
			      	this.setState({ 
			      		myData: resp["Time Series (Daily)"]
			      	});
			      	this.setState({
			      		max: this.getMax(),
			      		min: this.getMin(),
			      		myAve: this.getAve()
			      	});
		      	}
		  	});
	}
	getAve(){
	  	var data = this.state.myData;
	  	var time = this.state.time;
	  	var ave = [0,0,0,0,0,0,0],count=0;
		var final = [0,0,0,0,0,0,0];
		if(time=="month"){
			for(let k in data){
				if(count<30){
					let d= new Date(k);
					let dayNumber = d.getDay();
					ave[dayNumber]+=Number(data[k]["2. high"]);
					final[dayNumber]++;
					count++;
				}else{
					break;
				}
			}
		}else if(time=="week"){
			for(let k in data){
				if(count<5){
					let d= new Date(k);
					let dayNumber = d.getDay();
					ave[dayNumber]+=Number(data[k]["2. high"]);
					final[dayNumber]++;
					count++;
				}else{
					break;
				}
			}
		}else if(time=="year"){
			for(let k in data){
				if(count<365){
					let d= new Date(k);
					let dayNumber = d.getDay();
					ave[dayNumber]+=Number(data[k]["2. high"]);
					final[dayNumber]++;
					count++;
				}else{
					break;
				}
			}
		}
		var sum=0;
		for(var i=0;i<7;i++){
			final[i]= (ave[i]/final[i]).toFixed(2)
		}
		for(var i=1;i<6;i++){
			sum+=final[i]/5;
		}
		this.setState({
			totalAverage: sum.toFixed(2)
		});
		return final;
  	}
  	getMin(){
  		var data = this.state.myData;
  		var time = this.state.time;
  		var dateString="",maximum=10000,count=0;
		if(time=="year"){
			for(let k in data){
				if(count==365){
					return data[dateString]["3. low"]
				}else{
					if(data[k]["3. low"]<maximum ){
						dateString = k
						maximum = data[k]["3. low"]
					}
					count++;
				}
			}
		}else if(time=="month"){
			for(let k in data){
				if(count==30){
					return data[dateString]["3. low"]
				}else{
					if(data[k]["3. low"]<maximum ){
						dateString = k;
						maximum = data[k]["3. low"]
					}
					count++;
				}
			}
		}else if(time=="week"){
			for(let k in data){
				if(count==5){
					return data[dateString]["3. low"]
				}else{
					if(data[k]["3. low"]<maximum ){
						dateString = k;
						maximum = data[k]["3. low"]
					}
					count++;
				}
			}
		}
  	}
  	getMax(){
  		var data = this.state.myData;
  		var time = this.state.time;
  		var dateString="",maximum=0,count=0;
		if(time=="year"){
			for(let k in data){
				if(count==365){
					return data[dateString]["2. high"]
				}else{
					if(data[k]["2. high"]>maximum ){
						dateString = k;
						maximum = data[k]["2. high"]
					}
					count++;
				}
			}
		}else if(time=="month"){
			for(let k in data){
				if(count==30){
					return data[dateString]["2. high"]
				}else{
					if(data[k]["2. high"]>maximum ){
						dateString = k;
						maximum = data[k]["2. high"]
					}
					count++;
				}
			}
		}else if(time=="week"){
			for(let k in data){
				if(count==5){
					return data[dateString]["2. high"]
				}else{
					if(data[k]["2. high"]>maximum ){
						dateString = k;
						maximum = data[k]["2. high"]
					}
					count++;
				}
			}
		}
  	}
  	render(){
  		return (
  			<div>
  				<h3>
		  			{this.state.value}
		  			<br />
			  		Max: {this.state.max} &nbsp; Min: {this.state.min}
	  			</h3>
				<table border="1" align="center">
					<tbody>
						<tr>
							<th>Weekdays</th>
							<th>Average</th>
						</tr>
						<tr>
							<th>Monday</th>
							<th>{this.state.myAve[1]}</th>
						</tr>
						<tr>
							<th>Tuesday</th>
							<th>{this.state.myAve[2]}</th>
						</tr>
						<tr>
							<th>Wednesday</th>
							<th>{this.state.myAve[3]}</th>
						</tr>
						<tr>
							<th>Thursday</th>
							<th>{this.state.myAve[4]}</th>
						</tr>
						<tr>
							<th>Friday</th>
							<th>{this.state.myAve[5]}</th>
						</tr>
						<tr>
							<th>Total</th>
							<th>{this.state.totalAverage}</th>
						</tr>
					</tbody>
				</table>
	  		</div>
	  	);
	}
}
export default Table;