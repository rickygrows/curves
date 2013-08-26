define([
	"config"
],
function(
	Config
){

	function PathCharacter () {

		this.type = "path";
		this.path = null;
		this.avatar = null;

		this.dirty = false;
	}

	PathCharacter.prototype.init = function ( path_, avatar_ ) {

		this.path = path_;
		this.avatar = avatar_;
	};

	PathCharacter.prototype.update = function ( force_ ) {

		if ( force_ === true || this.dirty === true ) {
			this.drawAvatar();
		}
	};

	PathCharacter.prototype.drawAvatar = function () {

		var i,imax,curves,p,c;
		var g;

		g = this.avatar.graphics;
		g.clear();

		curves = this.path.curves.getAll();
		imax = curves.length;
		for(i=0;i<imax;i++) {
			c = curves[i];

			g.ss( 3 );
			g.s( "rgba(255,0,0,0.3)" );
			g.mt( c.p0.x, c.p0.y );
			g.bt( c.c0.x, c.c0.y, c.c1.x, c.c1.y, c.p1.x, c.p1.y );
			g.es();
		}

	};

	return PathCharacter;

});