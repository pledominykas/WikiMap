// Node Modules
const request = require('request');
const cheerio = require('cheerio');


//// TODO: Add error handling
// Gets the html of a wikipedia article
function GetWikiHtml(url, onlyFirstParagraph, callback){
  request(url, function(err, res, html){
    if(!err && res.statusCode == 200){
      const $ = cheerio.load(html);
      html = $('.mw-parser-output');

      if(onlyFirstParagraph){
        html.children('p').each(function(index, element){
          if($(element).attr('class') == '' || $(element).attr('class') == undefined){ // selects the first paragraph without any classes
            html = $(element);
            return false; // breaks out of the each() loop
          }
        });
      }

      callback(html.html());
    }
  });
}

// Gets all valid unique wikipedia article links from a html string
function GetValidWikiHyperlinks(html){
  const $ = cheerio.load(html);
  let hyperlinks = $('a');
  let filtered = [];
  for (var i = 0; i < hyperlinks.length; i++) {
    let link = hyperlinks[i].attribs.href;
    if(link != undefined && IsWikiArticle(link) && !filtered.includes(link)) {
      filtered.push(link);
    }
  }
  return filtered;
}

// Checks if the specified link is a valid wikipedia article
function IsWikiArticle(link) {
  return link.startsWith('/wiki/') && !link.includes(':');
}

// Module exports
module.exports = function(url, onlyFirstParagraph, callback){
  GetWikiHtml(url, onlyFirstParagraph, function(html){
    callback(GetValidWikiHyperlinks(html));
  });
}
