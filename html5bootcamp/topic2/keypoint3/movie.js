function Movie (attributes) { 
this.name = attributes.title ;
}

Movie.prototype = {
    constructor: Movie,
    play:function ()  {
        console.log("Playing " + this.name);
        /*var event = new Event('build');*/
        /*getElementsByTagName("body").dispatchEvent(event);*/
    },
    stop:function ()  {
        console.log(this.name + " has stopped playing.");
    },
    set:function (attr, value)  {

    },
    get:function (attr)  {
    
    }
}

var firstMovie = new Movie({title:"Terminator"});
firstMovie.play();
firstMovie.stop();