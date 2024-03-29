const parseCSV = require('./app');
const express = require('express')
const bodyParser = require("body-parser");
const axios = require('axios');



//fetching csv data

const csvFilePath = './Backend_assignment_gg_dataset - dataset.csv';
let event = []
let show = []


parseCSV(csvFilePath)
  .then((data2) => {
    event = data2 // Parsed CSV data
  })
  .catch((error) => {
    console.error('Error parsing CSV:', error);
  });


const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    // console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function eventsData(nearestEvents,lat,long){
  try {
    const promises = nearestEvents.map(async (cur) => {
      try {
        const url_forDateAndWeather = `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${cur.city}&date=${cur.date} `;
        const weatherData = await fetchData(url_forDateAndWeather);

        const url_forDistance = `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${lat}&longitude1=${long}&latitude2=${cur.latitude}&longitude2=${cur.longitude}`;
        const distanceData = await fetchData(url_forDistance);

        // Return the result as an object with weather and distance data
        return {
          event_name: cur.event_name,
          city_name: cur.city_name,
          date: cur.date,
          weather: weatherData.weather,
          distance_km: distanceData.distance
        };
      } catch (error) {
        console.log(error);
        // Return an object with default values if an error occurs
        return {
          event_name: cur.event,
          city_name: cur.city,
          date: cur.date,
          weather: 0, // Or any other default value
          distance_km: 0 // Or any other default value
        };
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    results.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Send the results as JSON response with "events" key
    show = results
   
   
  } catch (error) {
    console.error(error);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.post("/", async (req, res) => {
  const lat = req.body.lat;
  const long =  req.body.long;
  const date = new Date(req.body.date);
  const city = req.body.city;
  const nearestEvents = [];
  const temprory = []
  
  event.forEach((temp) => {
    let d = new Date(temp.date);
    if ( date - d <= 14) {
      nearestEvents.push(temp);
    }
  });
  
  await eventsData(nearestEvents,lat,long);
  res.render('show',{show});
});
  




app.listen(3000,()=>{
  console.log("server is started")
})
