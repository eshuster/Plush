import React from 'react'
import ReactDOM from 'react-dom'

class FlightSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      flightData : props.flightData
    }
  }

  render() {
    let months = this.state.months
    let days = this.state.days
    let year = this.state.year
    let flightData = this.state.flightData

    console.log(flightData)


    return (
      <div className="flight-selector">
        <table>
           <thead>
              <tr>
                <th>Flight ID</th>
                <th>Price</th>
                <th>Depart Date</th>
                <th>Return Date</th>
                <th>Choose Seat Number</th>
              </tr>
           </thead>
           <tbody>
             {flightData.map((col, index) => {
                <tr>
                  <td>{col.id} fff</td>
                  <td>{col.price_per_seat}</td>
                  <td>{col.depart_date}</td>
                  <td>{col.return_date}</td>
                </tr>
             })}
           </tbody>
         </table>
      </div>
    )
  }

}

export default FlightSelector


           // <tbody>
           //   {flightData.map((col) =>
           //      <tr>
           //        <td key={col.id}>{col.id}</td>
           //        <td key={col.price_per_seat}>{col.price_per_seat}</td>
           //        <td key={col.depart_date}>{col.depart_date}</td>
           //        <td key={col.return_date}>{col.return_date}</td>
           //      </tr>
           //    )}
           // </tbody>
                    // <td key={col.craft_name}>
                    //   <select>
                    //     {col.available_seats.map((seat) =>
                    //       return<option key={seat.id}>{seat}</option>
                    //     )}
                    //     </select>
                    // </td>

