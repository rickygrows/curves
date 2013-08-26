define([
	"dictionary"
],
function(
	Dictionary
){

	function Config () {

		this.characters = new Dictionary();
	}

	Config.prototype.getNow = function () {

		return Math.floor( new Date().getTime()/1000 );
	};

	Config.prototype.getNewKeyNum = function () {

		return Math.floor( this.getNow() + Math.rand(1,10000000) );
	};

	Math.rand = function (min, max) {
		return min + Math.random() * (max - min);
	};

	return new Config();

});