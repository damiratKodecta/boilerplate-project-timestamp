// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// /api/2015-12-25
app.get("/api/:date", function (req, res) {

  console.log(req.params.date);
    
  if ( isValidDateFormat(req.params.date)  ) 
    {
      const d = new Date(req.params.date);
      return res.json(
      {
        //"status": "OK",
        "unix": Date.parse(d), 
        "utc": d.toISOString()}
    );  
  }

  if (isValidTimestamp(req.params.date)) {
    const d = new Date(req.params.date*1000);
    return res.json(
      {
        "status": "OK",
        "unix": Date.parse(d), 
        "utc": d.toISOString()}
    );  
  }

  return res.json(
    {
      "status":"Error in parameter, should be yyyy-[m]m-[d]d, you have provided " + req.params.date
    }
  );
  
  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Validate YYYY-[M]M-[D]D format
function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  const valid = dateString.match(regex) !== null;
  console.log('valid date format:' + valid);
  return valid;
}

//Validate timestamp
function isValidTimestamp(stampString) {
  const valid = (new Date(stampString*1000)).getTime() > 0;
  console.log('valid timestamp:' + valid);
return valid;

}
