// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
// Set the region 
let credentials = new AWS.SharedIniFileCredentials({profile : 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let params = {
  TableName: 'CUSTOMER_LIST',
  Item: {
    'CUSTOMER_ID' : {S: '001'},
    'CUSTOMER_NAME' : {S: 'Richard Roe'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});


module.exports()



// var AWS = require("aws-sdk");

// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });