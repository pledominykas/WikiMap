// Node modules
const cy = require('cytoscape');
const algorithm = require('./algorithm.js');
const wiki_scrape = require('./wiki_scrape');

function AddNode(url, callback){
  wiki_scrape.GetArticleName(url, function(name){
    callback(name)
  });
}

// Module exports
module.exports.AddNode = function(url, callback){
  AddNode(url, callback);
}
