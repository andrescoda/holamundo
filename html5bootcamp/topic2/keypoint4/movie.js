function Movie (title) { this.name = title; }
Movie.prototype = {
    constructor: Movie,
    play:function ()  {
        alert("Playing " + this.name);
    },
    stop:function ()  {
        alert(this.name + " Has stopped playing.");
    },
    set:function (info, data)  {

    },
    get:function (info, data)  {

    }
}

firstMovie = new Movie("terminator");
firstMovie.play();

