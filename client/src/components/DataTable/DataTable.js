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
      country: ""
    }
  }
  
  componentDidMount() {
    this.tableData = $("#myTable").DataTable({
      "order": [[0, "desc"]],
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

  render() {

    return (
      <div className="tableContainer">
        <h1 id="datatableHeader" > Reported Cases in {this.props.country}</h1>
        <table id="myTable" className="display" width="100%"></table>
      </div>
    )
  }
}

export default DataTable;