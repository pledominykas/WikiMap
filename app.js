// Node Modules
const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function(){
  console.log(`Server running on port: ${PORT}`);
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/scripts/cytoscape.min.js', function(req, res){
  res.sendFile(path.join(__dirname, 'node_modules', 'cytoscape', 'dist', 'cytoscape.min.js'));
});
