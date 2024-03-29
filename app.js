const fs = require('fs');
const csv = require('csv-parser');




function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        console.log('CSV file parsed successfully.');
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = parseCSV;
