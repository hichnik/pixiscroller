function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);

  this.front = new Walls();
  stage.addChild(this.front);

  this.mapBuilder = new MapBuilder(this.front);

  this.viewPortX = 0;
}

/*Scroller.prototype.update = function() {
  this.far.update();
  this.mid.update();
}*/

Scroller.prototype.setViewPortX = function(viewPortX) {
  
  this.viewPortX = viewPortX;

  this.far.setViewPortX(viewPortX);
  this.mid.setViewPortX(viewPortX);
  this.front.setViewPortX(viewPortX);

}

Scroller.prototype.getViewPortX = function() {
  return this.viewPortX;
}

Scroller.prototype.moveViewPortXBy = function(units) {
  var newViewPortX = this.viewPortX + units;
  this.setViewPortX(newViewPortX);
}


