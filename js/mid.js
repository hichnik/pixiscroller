function Mid(){
  
  var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
  PIXI.extras.TilingSprite.call(this,texture,512,256);
  this.position.x = 0;
  this.position.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewPortX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

/*Mid.prototype.update = function() {
  this.tilePosition.x -= .64;
}*/

Mid.DELTA_X = 0.32;

Mid.prototype.setViewPortX = function(newViewPortX) {
  var distanceTravelled = newViewPortX - this.viewPortX;
  this.viewPortX = newViewPortX;
  this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
}