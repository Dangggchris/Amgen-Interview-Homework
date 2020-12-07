import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import ApexChart from './ApexChart/ApexChart';
import DataTable from './DataTable/DataTable';
import PieChart from './PieChart/PieChart';
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";
import './Main.css'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0d82ff;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      selectedValue: '',
      data: {},
      pieChartData: [],
      mostRecentDate: '',
      totalCases: [],
      dates: [],
      country: '',
      loading: false,
      initialLoad: true,
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
    
    let country = this.state.selectedValue.replace(/-/g, ' ').toLowerCase().split(' ').map( word => { return word[0].toUpperCase() + word.slice(1)}).join(' ');

    this.setState({
      country: country
    }) 

    // Show charts and datatable
    if (this.state.initialLoad === true) { this.setState({ initialLoad: false})}
    event.preventDefault();
  }

  // Grab all country's name and slug to populate select dropdown
  componentDidMount = async () => {
    let namesAndSlugsOptions = [] 

    await axios.get('https://api.covid19api.com/countries')
    .then(response => {
      let data =response.data;

      for(let i = 0; i < data.length; i++) {
        let currentObj = {}

        currentObj['option'] = data[i].Country;
        currentObj['value'] = data[i].Slug.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        namesAndSlugsOptions.push(currentObj)
      }
      this.setState({
        selectOptions: namesAndSlugsOptions
      })
    })
    .catch(error => {
      console.log(error)
      alert('Too many requests! Please wait a minute.')
      window.location.reload();
    })
  }
  
  // API Query
  getAllCountries = async () => {

    let totalCases = [];
    let latestInfo = [];

    try {
      await axios.get('/api/getCountry/' + this.state.selectedValue)
      .then((response) => {
        let data = response.data;
        let last = data[data.length-1]
        let mostRecentDate = ''

        // Grab only the most current information needed to populate the pie/donut chart
        if (last !== undefined) {
          latestInfo.push(last.Active);
          latestInfo.push(last.Deaths);
          latestInfo.push(last.Recovered);
          mostRecentDate = moment(last.Date).format('L');
        }
        else { alert('This country has no data. :(') }

        // Loop through every index and create the data needed to populate line/area chart and datatable
        for(let i = 0; i < data.length; i++) {
          let currentCase = {};
          let currentConfirmedCase = data[i].Confirmed;
          let currentDate = new Date(data[i].Date);
          let convertedDate = moment(currentDate).format('L');

          data[i].Date = convertedDate;
          currentCase['y'] = currentConfirmedCase;
          currentCase['x'] = convertedDate;
          totalCases.push(currentCase);
        }

        this.setState({
          totalCases: totalCases,
          data: data,
          loading: false,
          pieChartData: latestInfo,
          mostRecentDate: mostRecentDate
        })
      })
    } catch (error) {
      console.log(error);
      this.setState({
        initialLoad: true,
        loading: false
      })
      alert('Too many requests! Please wait a minute.');
    }
  }

  // Function to determine whether or not to show the loader or the charts and datatables
  DataContainers = () => (
    this.state.loading === true ? 
    <div id="loadingGif">
      <MoonLoader id="loadingGif"
      css={override}
      size={100}
      color={"#0d82ff"}
      loading={this.state.loading}
      />
    </div>
    :
    <React.Fragment>
      <div id="apexContainer">
        <PieChart data={this.state.pieChartData} mostRecentDate={this.state.mostRecentDate}/>
        <ApexChart totalCases={this.state.totalCases} country={this.state.country} />
      </div>
      <DataTable data={this.state.data} country={this.state.country} />
    </React.Fragment>
  )
  

  render() {
    return (
      <div className="container">
        <div className="headerFormContainer">
          <h1 id="mainHeader">Covid-19 Tracker</h1>
          <form id="mainForm" onSubmit={this.handleSubmit}>
            <label>
              Select Country:
              <select value={this.state.selectedValue} onChange={this.handleChange}>
                {this.state.selectOptions.map(option => <option key={option.value} value={option.value}>{option.option}</option>)}
              </select>
            </label>
            <button type="submit" disabled={this.state.loading}>Submit</button>
          </form>
        </div>

        <div className="dataContainers">
          {
            this.state.initialLoad === true ? null : <this.DataContainers />
          }
        </div>
        
      </div>
    )
  }
}

export default Main;