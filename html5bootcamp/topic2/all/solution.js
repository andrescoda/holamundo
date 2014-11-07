/**
 * Created by ecancino on 11/5/14.
 */

var slice = Array.prototype.slice

var observable = (function () {
  var subscribe, unsubscribe, publish;
  subscribe = function subscribe (channel, observer) {
    if (!observable.channels[channel]) {
      observable.channels[channel] = [];
    }
    observable.channels[channel].push(observer);
    return this;
  };
  unsubscribe = function unsubscribe (channel, observer) {
    observable.channels[channel] = observable.channels[channel].filter(function (registered) {
      return registered !== observer;
    });
    return this;
  };
  publish = function publish (channel) {
    if (!observable.channels[channel]) { return false; }
    var args, subscription, subscriptions, i, l;
    args = slice.call(arguments, 1);
    subscriptions = observable.channels[channel].length;
    for (i = 0, l = subscriptions; i < l; i += 1) {
      subscription = observable.channels[channel][i];
      subscription.notify.apply(subscription, args);
    }
    return this;
  };
  return {
    channels: {},
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    installTo: function installTo (obj) {
      obj.subscribe = subscribe;
      obj.unsubscribe = unsubscribe;
      obj.publish = publish;
    }
  };
}())
;
function Observer(name) {
  this.name = name;
  this.notify = function notify (event) {
    console.log(this.name, 'says: ', slice.call(arguments).join(' '));
  };
}


function Movie() {
  this.attributes = {};
}

Movie.prototype = {
  constructor: Movie,
  play: function () {
    console.log('Playing', this.get('title'));
    this.publish('control', 'PLAY');
  },
  stop: function () {
    console.log('Stopped', this.get('title'));
    this.publish('control', 'STOP');
  },
  set: function (attr, value) {
    this.attributes[attr] = value;
    this.publish('control', 'CHANGE', attr, value);
  },
  get: function (attr) {
    return (this.attributes[attr]);
  }
};

observable.installTo(Movie.prototype);

var terminator3 = new Movie();
terminator3.set('title', 'Terminator 3');

var observer1 = new Observer('Uno');
var observer2 = new Observer('Dos');

terminator3.subscribe('control', observer1);
terminator3.subscribe('control', observer2);

terminator3.play();
terminator3.stop();

var shawshank = new Movie();
shawshank.set('title', 'The Shawshank Redemption');
shawshank.play();
shawshank.stop();

var fightclub = new Movie();
fightclub.set('title', 'Fight Club');
fightclub.play();
fightclub.stop();

function DownloadableMovie() {
  Movie.call(this);
}
DownloadableMovie.prototype = new Movie();
DownloadableMovie.prototype.download = function () {
  console.log('Downloading', this.get('title'));
  this.publish('control', 'DOWNLOAD');
};
DownloadableMovie.constructor = DownloadableMovie;

var ironman = new DownloadableMovie();
ironman.set('title', 'Iron Man');
ironman.play();
ironman.stop();
ironman.download();

ironman.unsubscribe('control', observer2);

var Social = function () {
  this.share = function (friendName) {
    console.log('Sharing', this.get('title'), 'with', friendName);
    this.publish('control', 'SHARE');
  };
  this.like = function () {
    console.log('Liking', this.get('title'));
    this.publish('control', 'LIKE');
  };
  return this;
};

Social.call(DownloadableMovie.prototype);

var guardians = new DownloadableMovie();
guardians.set('title', 'Guardians of the Galaxy');
guardians.play();
guardians.stop();
guardians.download();
guardians.like();
guardians.share('Noone');