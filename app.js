// Requiring module
const express = require('express');
const bodyParser = require("body-parser");


// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
const { userAgent } = require('aws-sdk/lib/util');
// Set the region 
let credentials = new AWS.SharedIniFileCredentials({profile : 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});
// Create the DynamoDB service object
let ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
// Creating express object
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// Port Number
const PORT = process.env.PORT ||5001;
// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));




// Handling GET request
app.get('/', (req, res) => {
	res.send('A simple Node App is '
		+ 'running on this server')
	res.end()
})



app.get('/api/adduser', (req, res) => {
    console.log(req.query);
    const email = req.query.email;
    const passwd = req.query.passwd;
    

    let params = {
        TableName: 'CUSTOMER_LIST',
        Item: {
          'CUSTOMER_ID' : {S: email},
          'CUSTOMER_NAME' : {S: passwd}
        }
    };

    let status = writeToDb(params);

    console.log(status);

    res.send({
        'email' : email,
        'passwd' : passwd
    });
})



app.post('/api/userstest', (req, res) => {
    console.log(req.body);
    let user = req.body;

    let userobject = {
        "userid" : user.id,
        "name" : user.name,
        "age" : user.age,
        "email" : user.email
    };
    // let user = req.body.user;
    
    res.status(200).send("all done");
})

//functions

// let params = {
//   TableName: 'CUSTOMER_LIST',
//   Item: {
//     'CUSTOMER_ID' : {S: '001'},
//     'CUSTOMER_NAME' : {S: 'Richard Roe'}
//   }
// };

// Call DynamoDB to add the item to the table

function writeToDb(params) {
    let status = "";   
    ddb.putItem(params, function(err, data) {
        if (err) {
            status = "Error";
            console.log(err)
        } else {
            status = "Success";
        }
    });

    return status;
}

