/* FWDU3DCarPageThumbs */
(function (window){
var FWDU3DCarPageThumbs = function(props_obj){
		
		var self = this;
		var prototype = FWDU3DCarPageThumbs.prototype;
		
		this.parent = props_obj.parent;
		this.image_img;
		
		this.imagesPath_ar = props_obj.imagesPath;
		this.thumbs_ar = [];
		
		this.thumbnailBorderColor_str =  props_obj.thumbnailBorderColor;"#FFFFFF";
		this.textNormalColor_str =  props_obj.textNormalColor; "#666666";
		this.textSelectedColor_str =  props_obj.textSelectedColor; "#0099ff";
		this.wiewSampleTextColor_str =  props_obj.wiewSampleTextColor; "#FFFFFF";
			
		this.totalThumbs = self.imagesPath_ar.length;
		this.maxWidth = props_obj.maxWidth;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.totalHeight = 0;
		this.thumbnailMaxWidth = 180;
		this.thumbnailMaxHeight = 119;
		this.spacerH = 50;
		this.spacerV = 10;
		this.iconOffsetHeight = 40;
		this.thumbnailBorderSize = 4;
		this.countLoadedThumbs = 0;
		this.totalRows;
		this.remainSpace;
		this.thumbW;
		this.thumbH;
		this.stageWidth;
		this.howManyThumbsToDisplayH;
		this.howManyThumbsToDisplayV;
		this.toAddToX;
		this.curId = 0;
		this.shadowOffsetX = props_obj.shadowOffsetX;
		this.shadowOffsetY = props_obj.shadowOffsetY;
		this.shadowOffsetW = props_obj.shadowOffsetW;
		this.shadowOffsetH = props_obj.shadowOffsetH;
		
		this.loadWithDelayId_to;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setupThumbs();
			self.enableOrDisableThumbs(0);
			self.parent.appendChild(self.screen);
			
			setTimeout(self.positionAndResize, 50);
		};
		
		//###########################################//
		/* resize and position */
		//##########################################//
		this.positionAndResize = function(viewportWidth){	
			if (!viewportWidth) return;
			if(self.viewportWidth == viewportWidth) return;
			
			self.viewportWidth = viewportWidth;
			
			self.stageWidth = viewportWidth > self.maxWidth ? self.maxWidth : viewportWidth;
		
			self.setSizeAndPositionData();
			self.positionAndResizeThumbs();
			self.setX(parseInt((self.viewportWidth - self.stageWidth)/2));
		};
		
		//#############################################//
		/* setup thumbnails */
		//#############################################//
		this.setupThumbs = function()
		{
			var thumb;
			
			for(var i=0; i<self.totalThumbs; i++)
			{
				FWDU3DCarPageThumb.setPrototype();
				
				thumb = new FWDU3DCarPageThumb(i, 180, 119, self.imagesPath_ar[i] + "N.jpg", self.imagesPath_ar[i] + "S.jpg");
				thumb.addListener(FWDU3DCarPageThumb.CLICK, self.onThumbClick);
				
				self.thumbs_ar[i] = thumb;
				self.addChild(thumb);
			}
		};
		
		this.onThumbClick = function(e)
		{
			self.curId = e.id;
			self.enableOrDisableThumbs();
			
			self.dispatchEvent(FWDU3DCarPageThumb.CLICK, {id:self.curId});
		};
		
		//#############################################//
		/* load images */
		//#############################################//
		this.loadImages = function(){
			if(self.countLoadedThumbs > self.totalThumbs-1) return;
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onload = self.onImageLoadComplete;
			self.image_img.src = self.imagesPath_ar[self.countLoadedThumbs];
		};
		
		this.onImageLoadComplete = function(e){
			var thumb = self.thumbs_ar[self.countLoadedThumbs];
			
			thumb.setImage(self.image_img);
			
			self.countLoadedThumbs++;
			self.loadWithDelayId_to = setTimeout(self.loadImages, 40);	
		};
		
		//#############################################//
		/* set data for resize */
		//#############################################//
		this.setSizeAndPositionData = function(){
			if(isNaN(self.stageWidth)) return;
			var maxColumns;
			var totalWidth;
		
			maxColumns = Math.round((self.stageWidth - self.spacerH)/(self.thumbnailMaxWidth + self.spacerH));
			maxColumns = Math.min(maxColumns, self.totalThumbs);
			self.thumbW = self.thumbnailMaxWidth;
			
			totalWidth = (maxColumns * (self.thumbW + self.spacerH)) - self.spacerH;
			self.toAddToX = Math.floor((self.stageWidth - totalWidth)/2);
				
			self.remainSpace = (self.stageWidth - totalWidth);
		
			self.thumbH = Math.floor((self.thumbW/self.thumbnailMaxWidth) * self.thumbnailMaxHeight) + self.iconOffsetHeight;
				
			self.howManyThumbsToDisplayH = maxColumns;
			
			self.totalRows = Math.ceil((self.totalThumbs/self.howManyThumbsToDisplayH));
			self.totalHeight = self.totalRows * (self.thumbH + self.spacerV) - self.spacerV;
			self.parent.style.height = self.totalHeight + "px";
		};
		
		//#############################################//
		/* resize thumbnails and containers */
		//#############################################//
		this.positionAndResizeThumbs = function(animate){
			
			var thumb;
			var newX;
			var newY;
			var count = 0;
			
			for(var i=0; i<self.totalThumbs; i++){
				
				thumb = self.thumbs_ar[i];
				
				newX = Math.floor((i % self.howManyThumbsToDisplayH) * (self.thumbW + self.spacerH)) + self.toAddToX;
				newY = Math.floor(i / self.howManyThumbsToDisplayH) * (self.thumbH + self.spacerV) + self.spacerV;
				
				thumb.setX(newX);
				thumb.setY(newY);
			}
		};
		
		//#############################################//
		/* Disable / enable */
		//#############################################//
		this.enableOrDisableThumbs = function(){
			for(var i=0; i<self.totalThumbs; i++){
				thumb = self.thumbs_ar[i];
				if(self.curId == i){
					thumb.disable();
				}else{
					thumb.enable();
				}
			}
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarPageThumbs.setPrototype = function(){
		FWDU3DCarPageThumbs.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarPageThumbs.CLICK = "onClick";

	FWDU3DCarPageThumbs.prototype = null;
	window.FWDU3DCarPageThumbs = FWDU3DCarPageThumbs;
}(window));