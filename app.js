/*jslint node: true */
"use strict";


const soap = require('soap');
const express = require('express');
const fs = require('fs');

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
const serviceObject = {
  AdaptPriceService: {
        AdaptPriceServiceSoapPort: {
            AdaptPrice: verifyArrgs
        }
    }
};

// load the WSDL file
const xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
const app = express();



// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/PriceAdapterService/AdaptPrice";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});