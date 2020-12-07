import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import './PieChart.css'

class PieChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {
        title: {},
        labels: [],
        chart: {
          type: 'donut'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  }

  setStateOnProps() {
    this.setState({
      series: this.props.data,
      options: {
        title: {
          text: 'Latest Date: ' + this.props.mostRecentDate,
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'black'
          }
        },
        labels: ['Active', 'Deaths', 'Recovered'],
        chart: {
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total Cases: '
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            pie: {
              custonScale: 1.0
            },
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    })
  }

  componentDidMount() {
    this.setStateOnProps();
  }

  render() {

    return (
      <div className="pieChartContainer">
        <div>
        <Chart 
          options = {this.state.options}
          series = {this.state.series}
          type = "donut"
          height = "450"
          width = "100%"
          margin-top="100px"
        />
        </div>
      </div>
    )
  }
}

export default PieChart;