define([
	"config",
	"dictionary",
	'pathcharacter',
	'display',
	"paths/path"
],
function(
	Config,
	Dictionary,
	PathCharacter,
	Display,
	Path
){

	function App () {

		this.updateIntervalId = -1;

		this.jcanvas = $("#easelCanvas");
		this.display =null;
	}

	App.prototype.init = function () {

		this.createDisplay();
		this.createCharacters();

		this.startUpdate();
	};


	// Creation
	// ===============================

	App.prototype.createDisplay = function () {

		this.display = new Display();
		this.display.init( this.jcanvas );
	};

	App.prototype.createCharacters = function () {

		var p,a,c;

		p = new Path();
		p.addPoint( {x:10, y:10} );
		p.addPoint( {x:100, y:100} );
		p.addPoint( {x:200, y:200} );

		a = this.display.createCurveAvatar();

		c = new PathCharacter();
		c.path = p;
		c.avatar = a;
		Config.characters.addItem( "char"+Config.getNewKeyNum(), c );

		//this.paths.addItem( "path"+Math.random(), p );
	};


	// updating

	App.prototype.update = function () {

		var chars,i,imax,c;

		chars = Config.characters.getAll();
		imax = chars.length;
		for(i=0;i<imax;i++) {
			c = chars[i];
			c.update(true);
		}

		// update drawing
		this.display.update();
	};

	App.prototype.startUpdate = function (){

		this.updateIntervalId = setInterval( this.update.bind(this), 1000/45 );
	};

	App.prototype.stopUpdate = function (){

		clearInterval( this,updateIntervalId );
	};


	return App;

});