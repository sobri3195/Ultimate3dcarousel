/* Image manager */
(function (window){
	
	var FWDU3DCarInfoWindow = function(
			margins,
			backgroundColor_str,
			backgroundOpacity,
			borderRadius,
			isMobile_bl
			){
		
		var self = this;
		var prototype = FWDU3DCarInfoWindow.prototype;
		
		this.main_do;
		this.text_do;
		this.background_do;
		
		this.backgroundColor_str = backgroundColor_str;
		this.backgroundOpacity = backgroundOpacity;
		
		this.margins = margins;
		this.maxWidth;
		this.maxHeight;
		this.finalWidth;
		this.finalHeight;
		this.lastPresedY;
		this.borderRadius = borderRadius;
		this.vy = 0;
		this.vy2 = 0;
		this.friction = .9;
		this.obj = {currentWidth:0};
	
		this.updateMobileScrollBarIntervalId_int;
		
		this.isShowed_bl = false;
		this.isScrollBarActive_bl = false;
		this.isMobile_bl = isMobile_bl;
		this.isDragging_bl = false;
		this.isHiddenDone_bl = true;
		
		this.init = function(){
			this.setOverflow("visible");
			this.setBkColor("#FF0000");
			this.setX(this.margins);
			this.setY(this.margins);
			this.setupMainContainers();
			this.setVisible(false);
		};
		
		//#####################################//
		/* setup main containers */
		//####################################//
		this.setupMainContainers = function(){
			this.main_do = new FWDU3DCarDisplayObject("div");
			this.text_do = new FWDU3DCarDisplayObject("div");
			this.text_do.getStyle().fontSmoothing = "antialiased";
			this.text_do.getStyle().webkitFontSmoothing = "antialiased";
			this.text_do.getStyle().textRendering = "optimizeLegibility";
			this.background_do = new FWDU3DCarDisplayObject("div");
			this.background_do.setResizableSizeAfterParent();
			this.background_do.setBkColor(this.backgroundColor_str);
			this.background_do.setAlpha(this.backgroundOpacity);
			this.main_do.addChild(this.background_do);
			this.main_do.addChild(this.text_do);
			this.addChild(this.main_do);
		
		};
		
		//#####################################//
		/* set text */
		//####################################//
		this.setText = function(pText, maxWidth, maxHeight, animate, isIframe){
			this.maxWidth = maxWidth;
			this.maxHeight = maxHeight;
			
			if(!isIframe && self.borderRadius != 0){
				self.background_do.getStyle().borderTopLeftRadius = (self.borderRadius - 1) + "px";
				self.background_do.getStyle().borderTopRightRadius = (self.borderRadius - 1) + "px";
			}else{
				if(self.borderRadius != 0){
					self.background_do.getStyle().borderTopLeftRadius = "0px";
					self.background_do.getStyle().borderTopRightRadius = "0px";
				}
			}
			
			this.text_do.setInnerHTML(pText);
			
			clearTimeout(this.resieId_to);
			this.resieId_to = setTimeout(
					function(){
						self.resize(self.maxWidth, self.maxHeight, animate);
						if(!self.isShowed_bl){
							if(self.isHiddenDone_bl) self.hide(false);
							self.show(true);
						}else{
							self.show(true);
						}
					}, 50);
			self.disableMobileScrollBar();
			self.onTweenUpdate();
		};
		
		this.resize = function(maxWidth, maxHeight, animate){
			self.maxWidth = maxWidth - (self.margins * 2);
			self.maxHeight = maxHeight - (self.margins * 2);
			self.finalWidth = self.maxWidth;
			self.setWidth(self.maxWidth);
			
			FWDU3DCarModTweenMax.killTweensOf(self.obj);	
			if(animate){
				FWDU3DCarModTweenMax.to(self.obj, .8, {delay:.1, currentWidth:self.maxWidth, onUpdate:self.onTweenUpdate, ease:Expo.easeInOut});
			}else{
				self.obj.currentWidth = self.maxWidth;
			}
			
			self.onTweenUpdate();
			self.text_do.setY(0);
		};
		
		this.onTweenUpdate = function(){
			self.main_do.setWidth(self.obj.currentWidth);
			self.finalHeight = self.text_do.getHeight() <= self.maxHeight ? self.text_do.getHeight() : self.maxHeight;
			self.main_do.setHeight(self.finalHeight);
			self.background_do.setHeight(self.finalHeight);
			
			if(self.text_do.getHeight()  > self.maxHeight){
				self.enableMobileScrollBar();
			}else{
				self.disableMobileScrollBar();
			}
		};
		
		//#####################################//
		/* activate / deacitvate mobile scrollbar*/
		//####################################//
		this.enableMobileScrollBar = function(){
			if(!this.isMobile_bl) return;
			if(this.isScrollBarActive_bl) return;
			this.getScreen().addEventListener("touchstart", this.touchStartHandler);
			clearInterval(this.updateMobileScrollBar);
			this.updateMobileScrollBarIntervalId_int =  setInterval(this.updateMobileScrollBar, 16);
			this.isScrollBarActive_bl = true;
		};
		
		this.disableMobileScrollBar = function(){
			if(!this.isScrollBarActive_bl) return;
			this.getScreen().removeEventListener("touchstart", this.touchStartHandler);
			clearInterval(this.updateMobileScrollBar);
			this.isScrollBarActive_bl = false;
		};
		
		this.touchStartHandler =  function(e){
			e.preventDefault();
			window.addEventListener("touchend", self.touchEndHandler);
			window.addEventListener("touchmove", self.scrollBarOnMoveHandler);
			self.lastPresedY = (e.touches[0].pageY - window.pageYOffset);
		};
		
		this.scrollBarOnMoveHandler = function(e){
			e.preventDefault();
			var toAdd = 0;
			self.isDragging_bl = true;
			toAdd = ((e.touches[0].pageY - window.pageYOffset) - self.lastPresedY);
			self.lastPresedY = (e.touches[0].pageY - window.pageYOffset);
			self.text_do.setY(self.text_do.getY() + toAdd);
			self.vy = toAdd  * 2;
		};
		
		this.touchEndHandler = function(e){
			window.removeEventListener("touchend", self.touchEndHandler);
			window.removeEventListener("touchmove", self.scrollBarOnMoveHandler);
			self.isDragging_bl = false;
		};
		
		this.updateMobileScrollBar = function(){
			var finalY = self.text_do.getY();
			var textHeight = self.text_do.getHeight();
			
			if(!self.isDragging_bl){
				self.vy *= self.friction;
				finalY += self.vy;
				
				if(finalY > 0){
					self.vy2 = (0 - finalY) * .5;
					self.vy *= self.friction;
					finalY += self.vy2;
				}else if(finalY <= self.maxHeight - textHeight){
					self.vy2 = (self.maxHeight - textHeight - finalY) * .5;
					self.vy *= self.friction;
					finalY += self.vy2;
				}
				self.text_do.setY(Math.round(finalY));
			}
		};
		
		//#####################################//
		/* hide / show */
		//####################################//
		this.hide = function(animate){
			FWDU3DCarModTweenMax.killTweensOf(this);
			if(animate){
				FWDU3DCarModTweenMax.to(this, .6, {y:-this.finalHeight, ease:Expo.easeInOut, onComplete:this.hideComplete});
				this.isHiddenDone_bl = false;
			}else{
				this.setVisible(false);
				this.setY(-this.finalHeight);
				this.isShowed_bl = false;
				this.isHiddenDone_bl = true;
			}
			
			self.isShowed_bl = false;
		};
		
		this.hideComplete = function(){
			self.isHiddenDone_bl = true;
			self.setVisible(false);
		};
		
		this.show = function(animate){
			this.setVisible(true);
			FWDU3DCarModTweenMax.killTweensOf(this);
			if(animate){
				FWDU3DCarModTweenMax.to(this, .6, {y:this.margins, ease:Expo.easeInOut});
			}else{
				this.setVisible(false);
				this.setY(this.margins);
			}
			this.isHiddenDone_bl = false;
			this.isShowed_bl = true;
		};
		
		this.init();
		
		//#################################//
		/* destroy */
		//################################//
		this.destroy = function(){
			clearInterval(this.updateMobileScrollBar);
			if(this.isMobile_bl){
				this.getScreen().removeEventListener("touchstart", this.touchStartHandler);
				window.removeEventListener("touchend", this.touchEndHandler);
				window.removeEventListener("touchmove", this.scrollBarOnMoveHandler);
			}
			
			FWDU3DCarModTweenMax.killTweensOf(this);
			FWDU3DCarModTweenMax.killTweensOf(this.obj);
			
			this.main_do.destroy();
			this.text_do.destroy();
			this.background_do.destroy();
			
			this.main_do = null;
			this.text_do = null;
			this.background_do = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarInfoWindow.prototype = null;
		};
	};
	
	/* set prototype */
	FWDU3DCarInfoWindow.setPrototype =  function(){
		FWDU3DCarInfoWindow.prototype = new FWDU3DCarDisplayObject("div");
	};


	FWDU3DCarInfoWindow.HIDE_COMPLETE = "infoWindowHideComplete";

	FWDU3DCarInfoWindow.prototype = null;
	window.FWDU3DCarInfoWindow = FWDU3DCarInfoWindow;
	
}(window));