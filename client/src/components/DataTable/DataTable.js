import React, { Component } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import './DataTable.css'

const $ = require('jquery');
$.DataTable = require('datatables.net');

class DataTable extends Component {

  constructor(props) {
    super(props);
    this.tableData = null;
    this.state = {
      country: "UNITED STATES"
    }
  }
  
  componentDidMount() {
    this.tableData = $("#myTable").DataTable({
      "order": [[1, "desc"]],
      data: this.props.data,
      columns: [
        { data: "Date", title: "Date" },
        { data: "Active", title: "Active" },
        { data: "Confirmed", title: "Confirmed" },
        { data: "Deaths", title: "Deaths" },
        { data: "Recovered", title: "Recovered" }
      ]
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      this.setState({
        country: this.props.country
      })
      this.tableData.clear()
      this.tableData.rows.add(this.props.data)
      this.tableData.draw();
    }
  }

  render() {

    return (
      <div className="tableContainer">
        <h1 id="datatableHeader" >ALL CASES IN {this.state.country}</h1>
        <table id="myTable" className="display" width="100%"></table>
      </div>
    )
  }
}

export default DataTable;