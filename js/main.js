function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    {view: document.getElementById("gameCanvas")}
  );


//  this.scroller = new Scroller(this.stage);
//  requestAnimationFrame(this.update.bind(this));
  this.loadSpriteSheet();

};

Main.SCROLL_SPEED = 1;

Main.prototype.update = function() {
  this.scroller.moveViewPortXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  
  var assetsToLoad = [
    "resources/wall.json",
    "resources/bg-mid.png",
    "resources/bg-far.png"
  ];
  
  var loader = new PIXI.loaders.Loader();
  loader.add(assetsToLoad);
  loader.once('complete', this.spriteSheetLoaded.bind(this));
  loader.load();
  /*var assetsToLoad = [
    "resources/wall.json",
    "resources/bg-mid.png",
    "resources/bg-far.png"
  ];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
  */
};

Main.prototype.spriteSheetLoaded = function() {
  
  this.scroller = new Scroller(this.stage);

  /*var slice1 = PIXI.Sprite.fromFrame("edge_01");
  slice1.position.x = 32;
  slice1.position.y = 64;
  this.stage.addChild(slice1);
  var slice2 = PIXI.Sprite.fromFrame("decoration_03");
  slice2.position.x = 128;
  slice2.position.y = 64;
  this.stage.addChild(slice2);*/

  this.pool = new WallSpritesPool();
  this.wallSlices = [];

  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++) {
    var sprite;
    //var sprite = this.pool.borrowWindow();
    if (i % 2 === 0) {
      sprite = this.pool.borrowWindow();
    } else {
      sprite = this.pool.borrowDecoration();
    }

    sprite.position.x = -32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);
    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++) {
      var sprite = this.wallSlices[i];
      this.stage.removeChild(sprite);
      
      //this.pool.returnWindow(sprite);
      if (i % 2  === 0) {
        this.pool.returnWindow(sprite);
      } else {
        this.pool.returnDecoration(sprite);
      }

  }

  this.wallSlices = [];

};

