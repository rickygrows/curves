define([
	"config"
],
function(
	Config
){

	function Display () {

		this.jcanvas = null;
		this.stage = null;
		this.container = null;		// contains all other children
	}

	Display.prototype.init = function ( jcanvas_ ) {

		this.jcanvas = jcanvas_;
		this.jcanvas.attr({
			'width': $(window).width(),
			'height': $(window).height()
		});

		this.stage = new createjs.Stage( jcanvas_.get(0) );

		this.container = new createjs.Container();
		this.stage.addChild( this.container );
	};

	Display.prototype.update = function () {

		this.stage.update();
	};

	Display.prototype.createCurveAvatar = function () {

		shape = new createjs.Shape();

		this.container.addChild( shape );

		return shape;
	};

	return Display;

});