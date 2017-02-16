var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

/*
// let url = window.location.href;


// let json = {
//   [`${url}`] : {
//     ['page title'] : pageTitle,
//     ['is object on page'] : true/false,
//     ['number of objects'] : 0
//   }
// }

const rootUrl = stackoverflow.com;
let json = {};
let pageTitle = document.querySelector('title').innerHTML;
let anchorsInDocument = [].slice.call(document.querySelectorAll('a'));

let linkingPages = anchorsInDocument.map(function(x) {
  if(x.hostname.indexOd == rootUrl){
    return x.href;
  }
});

for (var i = linkingPages.length - 1; i >= 0; i--) {
  let currentURL = linkingPages[i];
  if([`${currentURL}`] in json){
    // do nothing
  } else {
    json[`${currentURL}`] = { "visited" : false };
  }
};

console.log(json);
*/

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
