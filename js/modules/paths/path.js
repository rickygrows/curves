define([
	"config",
	"dictionary",
	"paths/curve"
],
function(
	Config,
	Dictionary,
	Curve
){

	function Path () {

		this.curves = new Dictionary();
		this.points = new Dictionary();
	}

	Path.prototype.addPoint = function ( point_, ctrl0_, ctrl1_ ) {

		var p,prev;

		prev = this.points.getTop();

		p = {x:point_.x, y:point_.y};
		this.points.addItem( "point"+Math.random(), p );

		// setup curve if needed
		if ( prev !== null ) {
			this.addCurve( prev, {x:prev.x-30,y:prev.y+30}, {x:p.x+50,y:p.y-50}, p );
			//this.addCurve( prev, {x:prev.x,y:prev.y}, {x:p.x,y:p.y}, p );	// straight line
		}
	};

	Path.prototype.addCurve = function ( point0_, ctrl0_, ctrl1_, point1_ ) {

		var curve;

		curve = new Curve();
		curve.setPoints( point0_, ctrl0_, ctrl1_, point1_ );

		this.curves.addItem( "curve"+Config.getNewKeyNum(), curve );
	};

	Path.prototype.getPointByPercent = function ( pd_ ) {

		var percent,whole,dec;
		var curve,point;

		percent = pd_ * this.curves.list.length;
		whole = Math.floor( percent );
		dec = (percent % whole) || pd_;

		curve = this.curves.getItemAtIndex( whole );
		point = curve.pointAtPercent( dec );

		console.log(pd_, this.curves.list.length, percent, whole, dec);

		return point;
	}

	return Path;

});