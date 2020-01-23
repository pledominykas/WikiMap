// Node modules
const cy = require('cytoscape');
const algorithm = require('./algorithm.js');
const wiki_scrape = require('./wiki_scrape');

function ExpandNode(url, onlyFirstParagraph){
  return new Promise((resolve, reject) => {
    wiki_scrape.GetHyperlinks(url, onlyFirstParagraph).then((hyperlinks) => {
      resolve(hyperlinks);
    });
  });
}

// Module exports
module.exports.ExpandNode = function(url, onlyFirstParagraph){
  return new Promise((resolve, reject) => {
    ExpandNode(url, onlyFirstParagraph).then((hyperlinks) => resolve(hyperlinks));
  });
}
