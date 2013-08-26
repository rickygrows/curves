define([
	"app"
],
function(
	App
){

	function Main () {

	}

	Main.prototype.init = function () {

		this.app = new App();
		this.app.init();
	};

	return new Main();
});