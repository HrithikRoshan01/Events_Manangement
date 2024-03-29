const fs = require('fs');
const csv = require('csv-parser');

//const csvFilePath = './Backend_assignment_gg_dataset - dataset.csv';

// Function to read and parse CSV file
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Process each row
        data.push(row);
      })
      .on('end', () => {
        // CSV parsing is complete
        console.log('CSV file parsed successfully.');
        // Resolve the promise with the parsed data
        resolve(data);
      })
      .on('error', (error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
}

// Export the function to parse CSV
module.exports = parseCSV;