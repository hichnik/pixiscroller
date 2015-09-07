function Far() {
  var texture = PIXI.Texture.fromImage("resources/bg-far.png");
  PIXI.extras.TilingSprite.call(this, texture, 512, 256);
  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewPortX = 0;
}

Far.constructor = Far;
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.DELTA_X = 0.128;

/*Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
}*/

Far.prototype.setViewPortX = function(newViewPortX) {
  var distanceTravelled = newViewPortX - this.viewPortX;
  this.viewPortX = newViewPortX;
  this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
}