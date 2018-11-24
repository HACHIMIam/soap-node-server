# node-soap-example
 -install dependencies 
 `$ yarn install`
-start the server 
`$ yarn start`
go to postman and chose a post methode to the  http://localhost:8000/PriceAdapterService/AdaptPrice?wsdl

and chose a raw xml 

###success xml request 
`<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><soap:Body><soap:AdaptPriceRequest><soap:currency>uad</soap:currency><soap:configurationPrice>12321</soap:configurationPrice><soap:configurationIsSpecialPrice>true</soap:configurationIsSpecialPrice></soap:AdaptPriceRequest></soap:Body></soap:Envelope>`

###error xml request missing request parameter 
`<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ><soap:Body><soap:AdaptPriceRequest><soap:currency>uad</soap:currency><soap:configurationPrice>12321</soap:configurationPrice></soap:AdaptPriceRequest></soap:Body></soap:Envelope>`

 


