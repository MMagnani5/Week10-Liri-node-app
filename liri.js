// The List of keys required to access Twitter, Spotfiy and OMDB


var keys = require('./keys.js');
var Twitter = require('twitter');


// Spotify request
var spotify = require('spotify');


var fs = require('fs');

var request = require ('request');


var omdb = require("omdb");




// 
var command = process.argv[2];

//var params = process.argv.slice(3);

var argument = process.argv.slice(3);


// build a switch case
switch(command){
  case 'my-tweets':
  lookForMyTweets();
  break;

  case 'spotify-this-song':
  spotifyMusic(command);
  break;


  case 'movie-this':
  movie(command);
  break;

 
  case 'do-what-it-says':
  doWhat();
  break;

  default:
  console.log("Sorry try again")

}

//Twitter process

function lookForMyTweets(){
  console.log("lookForMyTweets");
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      for (var i=0; i< tweets.length; i++){
      console.log(tweets[i].text);
      
      }
    }

});


}
// Spotify Process
function spotifyMusic(){
  var songToPass;

  // change the agrument to length to store the array
          if(argument.length === 0){
              songToPass = "whats my age again"; 
              console.log("what’s my age again");
     } else {
              songToPass = argument;
        
    }
      console.log("what’s my age again");
  
  console.log(songToPass);  
         
spotify.search({ type: 'track', query: songToPass}, function(error, data) {
    console.log(data);
        var data = data.tracks.items[0];
        console.log("Artist: " + data.artists[0].name);
        console.log("Song: " + data.name);
        console.log("Link: " + data.preview_url);
        console.log("Album: " + data.album.name + "\n");
        var data = "Artist: " + data.artists[0].name;
    });
}

function movie(){
    var movieTitle;
    if (argument.length === 0){

        movieTitle = "Mr. Nobody";

    }else{
         movieTitle = argument;

    }
  
  var url = "http://www.omdbapi.com/?t=" + movieTitle; request(url, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      var movieDetails = JSON.parse(body);
      console.log("Title: " + movieDetails.Title);
      console.log("Year: " + movieDetails.Year);
      console.log("IMDB Rating: " + movieDetails.imdbRating);
      console.log("Country: " + movieDetails.Country);
      console.log("Language: " + movieDetails.Language);
      console.log("Plot: " + movieDetails.Plot);
      console.log("Actors: " + movieDetails.Actors);
    };
  });
};

  function doWhat(){
    fs.readFile('./random.txt', "utf8", function(error, data){
      console.log(data);

      data = data.split(',');
      command = data[0];
      params = data[1];
    
    })
};


