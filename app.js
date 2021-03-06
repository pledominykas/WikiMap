// Node Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const graph = require('./graph.js')


const app = express();
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function(){
  console.log(`Server running on port: ${PORT}`);
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/scripts/cytoscape.min.js', function(req, res){
  res.sendFile(path.join(__dirname, 'node_modules', 'cytoscape', 'dist', 'cytoscape.min.js'));
});

app.get('/scripts/cytoscape-cola.js', function(req, res){
  res.sendFile(path.join(__dirname, 'node_modules', 'cytoscape-cola', 'cytoscape-cola.js'));
});

// Post request handling
app.post('/expand-node-click', function(req, res){
  graph.ExpandNode(req.body.url, (req.body.onlyFirstParagraph == 'true')).then((hyperlinks) => {
    res.status(200).send(JSON.stringify(hyperlinks));
  });
});
