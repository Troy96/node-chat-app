const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000
var app = express();

//App middleware for rendering static files
app.use(express.static(path.join(__dirname,'../public')));


//Make server listen at port 3000 for requests
app.listen(port, () => {
	console.log(`Server running at ${port}...`);
});