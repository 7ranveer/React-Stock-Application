import React from 'react';
import ToggleButton from 'react-toggle-button'; 
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var showSchedule = " ";
class Scheduler extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	value: false,
	    	startDate: moment(),
	    	dif: false
	    };
	    this.handleChange = this.handleChange.bind(this);
	}
  	handleChange(date) {
	    this.setState({
	      startDate: date._d.toString()
	    });
	    this.setState({
	    	value: !this.state.value,
	    	dif: !this.state.dif
	    })
	}
   	render() {
   		if(!this.state.value){
   			if(!this.state.dif){
   				showSchedule = <div>Please toggle on to schedule</div>
   			}else{
   				console.log(this.state.startDate)
	   			var t = this.state.startDate;
	   			t.toString();
	   			var selectedDate = " "+t;
	   			showSchedule = <div><br />
	   								<h4>Your Current Schedule is {selectedDate}</h4> 
	   							</div>
			}
   		}else{
   			showSchedule = <div>
   								<DatePicker
   									autoFocus
   									selected={this.state.startDate} 
   									onChange={this.handleChange}
   									showTimeSelect
								    timeFormat="HH"
								    timeIntervals={60}
								    dateFormat="LLL"
  									/>
  								<br />
   						   </div>;
      	}
      	return (
	        <div>
	      	<h1>Scheduler</h1>
			<ToggleButton value={this.state.value} onToggle={(value) => {
					this.setState({
      				value: !value
    				})
  				}} 
  			/><br />
  			{
  				showSchedule
  			}
	        </div>
      	);
   }
}

export default Scheduler;