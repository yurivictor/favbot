var Twitter = require( 'twitter' );

var client = new Twitter( {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_tokey_key,
  access_token_secret: process.env.access_token_secret
} );

function Favbot ( hashtag ) {
  this.hashtag = hashtag;
}

Favbot.prototype = {
  go: function( hashtag ) {
    this.search();
  },
  search: function () {
    client.get( 'search/tweets', { q: this.hashtag, count: 25 }, this.fav );
  },
  fav: function ( error, tweets, response ) {
    var statuses = tweets.statuses;
    for ( var i = 0, l = statuses.length; i < l; i++ ) {
      var s = statuses[i].text.toLowerCase();
      if ( s.indexOf( 'gamergate' ) > -1 ) {
        return;
      } else {
        client.post( 'favorites/create', { id: statuses[i].id_str }, function ( errors, tweets, response ) {} );
      }
    }
  }
};

var favbot = new Favbot( '#xoxofest' );
favbot.go();
