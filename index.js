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
      return res.json(
      {
        "unix":req.params.date, 
        "utc":req.params.date}
    );  
  }

  return res.json(
    {
      "startus":"Error in parameter, should be yyyy-mm-dd"
    }
  );
  
  
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Validate YYYY-MM-DD format
function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
}

