const express = require('express');
const axios = require('axios')

const app = express();

let url = 'https://api.covid19api.com/total/country/'

app.get('/api/getCountry/:country', (req, res) => {
  let country = req.params.country

  const getCountryInfo = async () => {
    try {
      const response = await axios.get(url + country);
      res.json(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  getCountryInfo();
})

const port = 5000;

app.listen(port, () => 
  console.log('Server started on port:', port)
);