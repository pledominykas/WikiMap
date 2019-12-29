// Node modules
const cy = require('cytoscape');
const algorithm = require('./algorithm.js');
const wiki_scrape = require('./wiki_scrape');

function AddNode(url, callback){
  wiki_scrape.GetArticleName(url, function(name){
    callback(name);
  });
}

function ExpandNode(url, onlyFirstParagraph, callback){
  wiki_scrape.GetHyperlinks(url, onlyFirstParagraph, function(hyperlinks){
    callback(hyperlinks);
  });
}

// Module exports
module.exports.AddNode = function(url, callback){
  AddNode(url, callback);
}

module.exports.ExpandNode = function(url, onlyFirstParagraph, callback){
  ExpandNode(url, onlyFirstParagraph, callback);
}
