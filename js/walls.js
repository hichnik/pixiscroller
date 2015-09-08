function Walls() {
  PIXI.DisplayObjectContainer.call(this);

  this.pool = new WallSpritesPool();
  this.createLookupTables();

/*  console.log("Before borrowing window:" + this.pool.windows.length);
  var sprite = this.borrowWallSprite(SliceType.WINDOW);
  this.addChild(sprite);
  console.log("After borrowing window:" + this.pool.windows.length);
  this.removeChild(sprite);
  this.returnWallSprite(SliceType.WINDOW, sprite);
  console.log("After returning window:" + this.pool.windows.length);
*/

  this.slices = [];
  /*this.createTestMap();*/

  this.viewPortX = 0;
  this.viewPortSliceX = 0;

}

Walls.constructor = Walls;
Walls.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1; 
//Math.ceil(Walls.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;

Walls.prototype.setViewPortX = function(viewPortX) {
  //console.log("Walls::setViewPortX( " + viewPortX  + " );");
  this.viewPortX = this.checkViewPortXBounds(viewPortX);

  var prevViewPortSliceX = this.viewPortSliceX;
  this.viewPortSliceX = Math.floor(this.viewPortX/WallSlice.WIDTH);

  this.removeOldSlices(prevViewPortSliceX);
  this.addNewSlices();
  
}


Walls.prototype.removeOldSlices = function(prevViewPortSliceX) {
  var numOldSlices = this.viewPortSliceX - prevViewPortSliceX;
  //console.log(numOldSlices);
  if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
    numOldSlices = Walls.VIEWPORT_NUM_SLICES;
  }

  for(var i = prevViewPortSliceX; i < prevViewPortSliceX + numOldSlices; i++) {
    var slice = this.slices[i];
    //console.log(slice)
    if (slice.sprite != null) {
      this.returnWallSprite(slice.type, slice.sprite);
      this.removeChild(slice.sprite);
      slice.sprite = null;
    }
  }
}


Walls.prototype.checkViewPortXBounds = function(viewPortX) {
  
  var maxViewPortX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;

  if (viewPortX < 0) {
    viewPortX = 0;
  } else if (viewPortX >= maxViewPortX ) {
    viewPortX = maxViewPortX;
  }

  return viewPortX;
  
}

Walls.prototype.addNewSlices = function() {
  
  //debugger;

  var firstX = -(this.viewPortX % WallSlice.WIDTH);
  for (var  i = this.viewPortSliceX, sliceIndex = 0;
            i < this.viewPortSliceX + Walls.VIEWPORT_NUM_SLICES;
            i++, sliceIndex++)
  {
    var slice = this.slices[i];
    if (slice.sprite == null && slice.type != SliceType.GAP) {
      // Associate the slice with a sprite and update the sprite`s position
      slice.sprite = this.borrowWallSprite(slice.type);

      slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
      slice.sprite.position.y = slice.y;

     // console.log("addChild slice.sprite");
      this.addChild(slice.sprite);
    }
    else if (slice.sprite != null) {
      // The slice id already associated with a sprite. Just update its position
      slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
    }

  }
}

Walls.prototype.addSlice = function(sliceType, y) {
  var slice = new WallSlice(sliceType, y);
  this.slices.push(slice);
}

Walls.prototype.createLookupTables = function() {
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
  this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
}

Walls.prototype.borrowWallSprite = function(sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
}

Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
}

/*Walls.prototype.createTestWallSpan = function() {
  this.addSlice(SliceType.FRONT,192);
  this.addSlice(SliceType.WINDOW,192);
  this.addSlice(SliceType.DECORATION,192);
  this.addSlice(SliceType.WINDOW,192);
  this.addSlice(SliceType.DECORATION,192);
  this.addSlice(SliceType.WINDOW,192);
  this.addSlice(SliceType.DECORATION,192);
  this.addSlice(SliceType.WINDOW,192);
  this.addSlice(SliceType.BACK,192);
}

Walls.prototype.createTestSteppedWallSpan = function() {
  this.addSlice(SliceType.FRONT,192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.DECORATION, 192);
  this.addSlice(SliceType.STEP,256);
  this.addSlice(SliceType.WINDOW,256);
  this.addSlice(SliceType.BACK,256);
}

Walls.prototype.createTestGap = function() {
  this.addSlice(SliceType.GAP);
}

Walls.prototype.createTestMap = function() {
  for(var i = 0; i < 10; i++) {
    this.createTestWallSpan();
    this.createTestGap();
    this.createTestSteppedWallSpan();
    this.createTestGap();
  } 

}*/