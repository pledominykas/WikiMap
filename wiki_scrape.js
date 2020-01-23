// Node Modules
const request = require('request');
const cheerio = require('cheerio');
const wikipediaOriginUrl = 'https://en.wikipedia.org';

//// TODO: Add error handling
// Gets the html of a wikipedia article
function GetWikiHtml(url){
  return new Promise((resolve, reject) => {
    request(url, function(err, res, html){
      if(!err && res.statusCode == 200){
        resolve(html);
      }
    });
  });
}

// Gets all valid unique wikipedia article links from a html string
function GetValidWikiHyperlinks(html, onlyFirstParagraph){
  const $ = cheerio.load(html);
  html = $('.mw-parser-output');
  if(onlyFirstParagraph === true){
    html.children('p').each(function(index, element){
      if(($(element).attr('class') == '' || $(element).attr('class') == undefined) && $(element).find('#coordinates').length == 0 && $(element).find('.mw-kartographer-map').length == 0){ // selects the first paragraph without any classes and ignores the coordinates paragraph
        html = $(element);
        return false; // breaks out of the each() loop
      }
    });
  }
  let hyperlinks = html.find('a');
  let filtered = [];
  for (var i = 0; i < hyperlinks.length; i++) {
    let link = hyperlinks[i].attribs.href;
    if(link != undefined && IsWikiArticle(link) && !filtered.includes(link)) {
      filtered.push(wikipediaOriginUrl+link);
    }
  }
  return filtered;
}

// Checks if the specified link is a valid wikipedia article
function IsWikiArticle(link) {
  return link.startsWith('/wiki/') && !link.includes(':');
}

// Module exports
module.exports.GetHyperlinks = function(url, onlyFirstParagraph){
  return new Promise((resolve, reject) => {
    GetWikiHtml(url).then((html) => resolve(GetValidWikiHyperlinks(html, onlyFirstParagraph)));
  });
}
