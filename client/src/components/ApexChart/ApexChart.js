import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import './ApexChart.css';

class ApexChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          background: '#f4f4f4',
          foreColor: '#333'
        },
        xaxis: {
          type: 'datetime'
        },
        fill: {
          colors: ['#f44336'],
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Total cases over time',
          align: 'center',
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: '25px'
          }
        }
      },
      series: [{
        name: 'Cases',
        data: []
      }]
    }
  }

  setStateOnProps() {
    let newTitle = 'Total Cases Over Time In ' + this.props.country;
    this.setState({
      series: [{
        name: 'Cases',
        data: this.props.totalCases
      }],
      options: {
        chart: {
          background: '#ffffff',
          foreColor: '#333'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'MM / yyyy'
          }
        },
        fill: {
          colors: ['#1998ff'],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: newTitle,
          align: 'center',
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: '25px'
          }
        }
      }
    })
  }

  componentDidMount() {
    this.setStateOnProps();
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      this.setStateOnProps(); 
    }
  }

  render() {

    return (
      <div className="apexCharContainer">
        <div>
        <Chart 
          options = {this.state.options}
          series = {this.state.series}
          type = "area"
          height = "450"
          width = "100%"
        />
        </div>
      </div>
    )
  }
}

export default ApexChart;