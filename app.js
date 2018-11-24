/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var fs = require('fs');

// the splitter function, used by the service
function verifyArrgs(args) {
    
    if(args.hasOwnProperty('currency') && args.hasOwnProperty('configurationPrice') &&  args.hasOwnProperty('configurationIsSpecialPrice') ){
        return {
            currency:args.currency,
            configurationPrice:args.configurationPrice,
            configurationIsSpecialPrice:args.configurationIsSpecialPrice
        }
    }
    else {
        throw {
            Fault: {
              Code: {
                Value: 'soap:Sender',
                Subcode: { value: 'rpc:BadArguments' }
              },
              Reason: { Text: 'an argument is missing in the request object ' }
            }
        };
    }
    
}

// the service
var serviceObject = {
  AdaptPriceService: {
        AdaptPriceServiceSoapPort: {
            AdaptPrice: verifyArrgs
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/PriceAdapterService/AdaptPrice";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});