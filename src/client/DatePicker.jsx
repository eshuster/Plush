import React from 'react'
import ReactDOM from 'react-dom'

class DatePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      months: props.months,
      days: props.days,
      year: props.year,
      selectedMonth: 1,
      selectedDay: 1,
      selectedYear: 2017,
      arrivalOrDeparture: props.arrivalOrDeparture,
    }
    this.dateChanged = this.dateChanged.bind(this)
  }

  componentWillMount() {
    this.dateChanged({
      month:this.state.selectedMonth,
      day: this.state.selectedDay,
      year: this.state.selectedYear
    })
  }

  

  dateChanged(k, value) {
    this.setState({ [k]: value })

    let date = {
      month: this.state.selectedMonth,
      day: this.state.selectedDay,
      year: this.state.selectedYear
    }

    return date
  }

  onFieldChange(event) {
      let fieldName = event.target.name;
      let fieldValue = event.target.value;

      let updatedDate = this.dateChanged(fieldName, fieldValue)

      //this.props.dateHandler(updatedDate, this.props.arrivalOrDeparture)
       this.props.onChange(updatedDate, this.props.arrivalOrDeparture);
    }


  render() {
    let months = this.state.months
    let days = this.state.days
    let year = this.state.year 

    return (
      <div className="date-picker">
        <label>Month</label>
        <select name="selectedMonth" onChange={this.onFieldChange.bind(this)}>
         { months.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Day</label>
        <select name="selectedDay" onChange={this.onFieldChange.bind(this)}>
         { days.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
        <label>Year</label>
        <select name="selectedYear" onChange={this.onFieldChange.bind(this)}>
         { year.map((item, index) => {
          return <option key={item} value={item}>{item}</option>
         })}
         </select>
      </div>
    )
  }

}

export default DatePicker