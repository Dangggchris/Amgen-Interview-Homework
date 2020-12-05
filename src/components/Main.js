import React, { Component } from 'react';
import moment from 'moment';
import ApexChart from './ApexChart/ApexChart';
import DataTable from './DataTable/DataTable';
import './Main.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "united-states",
      data: {},
      totalCases: [],
      dates: [],
      country: "UNITED STATES",
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({selectedValue: event.target.value})
  }

  handleSubmit(event) {

    this.setState({loading: true})

    this.getAllCountries();
    let country = this.state.selectedValue.replace(/-/g, ' ').toUpperCase();

    this.setState({
      country: country
    }) 
    event.preventDefault();
  }

  // Call API after submit button is pressed
  getAllCountries = async () => {

    let totalCases = [];
    let dates = [];

  await fetch('https://api.covid19api.com/total/country/' + this.state.selectedValue)
    .then(res => res.json())
    .then((data) => {

      for(let i = 0; i < data.length; i++) {
        let currentConfirmedCases = data[i].Confirmed;
        let currentDate = new Date(data[i].Date);
        let convertedDate = moment(currentDate).format("L")

        totalCases.push(currentConfirmedCases);
        dates.push(convertedDate);
      }

      this.setState({
        totalCases: totalCases,
        dates: dates,
        data: data,
        loading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render() {

    return (
      <div className="container">
        <div className="headerFormContainer">
          <h1 id="mainHeader">Amgen Homework Assignment</h1>
          <form id="mainForm" onSubmit={this.handleSubmit}>
            <label>
              Select Country:
              <select value={this.state.selectedValue} onChange={this.handleChange}>
                <option value={"united-states"}>United States</option>
                <option value={"japan"}>Japan</option>
                <option value={"spain"}>Spain</option>
              </select>
            </label>
            <button type="submit" disabled={this.state.loading}>Submit</button>
          </form>
            {this.state.loading ? "Loading Information..." : "Done"}
        </div>
        <ApexChart totalCases={this.state.totalCases} dates={this.state.dates} country={this.state.country}/>
        <DataTable data={this.state.data} country={this.state.country} />
      </div>
    )
  }
}

export default Main;