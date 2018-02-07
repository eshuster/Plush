import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';

import DatePicker from './DatePicker'
import SeatPicker from './SeatPicker'
import FlightSelector from './FlightSelector'

import styles from './css/plushmars.scss'

class PlushMars extends React.Component {

  constructor(props) {
    super()
    this.state = {
      departureDate: null,
      returnDate: null,
      numberOfSeats: 1,
      flightFound: false,
      months: [1,2,3,4,5,6,7,8,9,10,11,12],
      days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      year: [2017],
      seats: 20,
      flightData: null,
      apiUrl: 'http://ec2-54-190-51-40.us-west-2.compute.amazonaws.com/flights/search/?'
    }

    this.submitSearch = this.submitSearch.bind(this)
    this.dateHandler = this.dateHandler.bind(this)
    this.seatChange = this.seatChange.bind(this)
  }

  submitSearch() {
    let url = this.state.apiUrl 
    let seats = 'number_seats=' + this.state.numberOfSeats
    let departureDateObject = this.state.departureDate
    let returnDateObject = this.state.returnDate

    let departureMonth = null

   // let departureMonth = departureDateObject.month ? departureDateObject.month.toString().length > 1 : '0' + departureDateObject.month 
    if (departureDateObject.month.toString().length > 1) {
      departureMonth = departureDateObject.month
    } else {
      departureMonth = '0' + departureDateObject.month;
    }


    // let departureDay =  departureDateObject.day ? departureDateObject.day.toString().length > 1 : '0' + departureDateObject.day
    let departureDay = null
    if (departureDateObject.day.toString().length > 1) {
      departureDay = departureDateObject.day
    } else {
      departureDay = '0' + departureDateObject.day;
    }


    let departureYear = departureDateObject.year
    let departureDate = 'depart_date=' + departureMonth + '-' + departureDay + '-' + departureYear
    let returnDate = 'return_date=' + returnDateObject.month + '-' + returnDateObject.day + '-' + returnDateObject.year

    //url += "number_seats=" + this.state.numberOfSeats + "&depart_date=" + departureDate + "&" + returnDate
    //console.log(url)


    const request = new Request(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    fetch(request)
      .then(data=>
          data.json()
        )
      .then(jsonData=>{
        this.setState({flightData: jsonData})
        this.setState({flightFound: true}) 
      })
  }

  dateHandler(date, arrivalOrDeparture) {
    if (arrivalOrDeparture == 'departure') {
      this.setState({departureDate: date})
    } else {
      this.setState({returnDate: date})
    }
  }

  seatChange(numberOfSeats) {
    this.setState({numberOfSeats: numberOfSeats})
  }

  onChange(date, dor) {    
    this.dateHandler(date, dor)
  }

  render() {
    let flightFound = this.state.flightFound
    let months = this.state.months
    let days = this.state.days
    let year = this.state.year
    let flightData = this.state.flightData

    // console.log(this.state)

    return (
      <div>
        <div className="header">Welcome to PlushMars!</div>
          { !flightFound && 
          <div className='flight-finder'>
            <div>Select Departure Date</div>
            <DatePicker
              dateHandler = {this.dateHandler}
              months={months}
              days={days}
              year={year}
              arrivalOrDeparture='arrival'
              onChange={this.onChange.bind(this)}
              />
            <div>Select Return Date</div>
            <DatePicker 
              dateHandler = {this.dateHandler}
              months={months}
              days={days}
              year={year}
              arrivalOrDeparture='departure'
              onChange={this.onChange.bind(this)}
              />
            <div>Select Number of Seats</div>

            <SeatPicker 
              seatChange={this.seatChange}
            />
            <button onClick={this.submitSearch}>Find flights</button>
          </div>
          }

          { flightFound &&
          <div className='flight-booker'>
            <div>Select Seats</div>
            <div>Book this flight</div>
            <FlightSelector flightData={flightData}/>
          </div>
          }
      </div>
    )
  }

}


ReactDOM.render(
  <PlushMars />,
  document.querySelector('.react-wrapper'))
