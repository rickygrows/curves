define([
	"config"
],
function(
	Config
){

	function Curve () {

		this.p0 = {x:0, y:0};
		this.c0 = {x:0, y:0};
		this.p1 = {x:0, y:0};
		this.c1 = {x:0, y:0};

		this.length = 0;
	}

	Curve.prototype.setPoints = function ( p0_, c0_, c1_, p1_ ) {

		this.p0 = p0_;
		this.c0 = c0_;
		this.c1 = c1_;
		this.p1 = p1_;

		this.length = this.calculateDistance();
	}

	Curve.prototype.pointAtPercent = function ( pd_ ) {

		var point;

		point = {x:0,y:0};

		point.x = this.p0.x*this.bezierBase1(pd_) + this.c0.x*this.bezierBase2(pd_) + this.c1.x*this.bezierBase3(pd_) + this.p1.x*this.bezierBase4(pd_);
		point.y = this.p0.y*this.bezierBase1(pd_) + this.c0.y*this.bezierBase2(pd_) + this.c1.y*this.bezierBase3(pd_) + this.p1.y*this.bezierBase4(pd_);

		return point;
	};


	// Internal
	// ============================================

	Curve.prototype.calculateDistance = function () {

		var i,imax,p0,p1,sum;

		sum = 0;
		imax = 1;
		p0 = this.p0;
		for(i=0;i<=imax;i+=0.02) {
			p1 = this.pointAtPercent( i );
			sum += Math.sqrt( ((p0.x-p1.x)*(p0.x-p1.x)) + ((p0.y-p1.y)*(p0.y-p1.y)) );
			p0 = p1;	// setup for next loop
		}

		// loop last ran at just under 100%, we'd like to go to the end of 100% to be thorough
		if ( i > 1 ) {
			p1 = this.pointAtPercent( 1 );
			sum += Math.sqrt( ((p0.x-p1.x)*(p0.x-p1.x)) + ((p0.y-p1.y)*(p0.y-p1.y)) );
		}

		return sum;
	}

	Curve.prototype.bezierBase1 = function ( t_ ) {
		
		return t_*t_*t_;
	};

	Curve.prototype.bezierBase2 = function ( t_ ) {

		return 3*t_*t_*(1-t_);
	};

	Curve.prototype.bezierBase3 = function ( t_ ) {

		return 3*t_*(1-t_)*(1-t_);
	};

	Curve.prototype.bezierBase4 = function ( t_ ) {

		return (1-t_)*(1-t_)*(1-t_);
	};

	return Curve;

});