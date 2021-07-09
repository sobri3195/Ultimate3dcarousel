/* FWDU3DCarScrollbar */
(function(window)
{
	var FWDU3DCarScrollbar = function(data, totalItems, curItemId)
	{
		var self = this;
		var prototype = FWDU3DCarScrollbar.prototype;

		this.handlerLeftNImg = data.handlerLeftNImg;
		this.handlerLeftSImg = data.handlerLeftSImg;
		this.handlerCenterNImg = data.handlerCenterNImg;
		this.handlerCenterSImg = data.handlerCenterSImg;
		this.handlerRightNImg = data.handlerRightNImg;
		this.handlerRightSImg = data.handlerRightSImg;
		
		this.trackLeftImg = data.trackLeftImg;
		this.trackCenterImg = data.trackCenterImg;
		this.trackRightImg = data.trackRightImg;
		
		this.textColorNormal = data.scrollbarTextColorNormal;
		this.textColorSelected = data.scrollbarTextColorSelected;
		
		this.scrollbarHandlerDO;
		this.scrollbarHandlerLeftNDO;
		this.scrollbarHandlerLeftSDO;
		this.scrollbarHandlerCenterNDO;
		this.scrollbarHandlerCenterSDO;
		this.scrollbarHandlerRightNDO;
		this.scrollbarHandlerRightSDO;
		this.scrollbarHandlerTextDO;
		this.scrollbarHandlerOverDO;
		
		this.scrollbarTrackDO;
		this.scrollbarTrackLeftDO;
		this.scrollbarTrackCenterDO;
		this.scrollbarTrackRightDO;
		
		this.scrollbarMaxWidth = data.controlsMaxWidth;
		this.handlerWidth = data.handlerWidth;
		this.trackWidth = data.controlsMaxWidth;
		
		this.scrollbarHeight = data.trackLeftImg.height;
		this.trackLeftWidth = data.trackLeftImg.width;
		this.handlerLeftWidth = data.handlerLeftNImg.width;

		this.totalItems = totalItems;
		this.curItemId = curItemId;
		this.prevCurItemId;
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.isPressed = false;

		this.isMobile = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent = FWDU3DCarUtils.hasPointerEvent;

		// ##########################################//
		/* initialize this */
		// ##########################################//
		this.init = function()
		{
			self.setupMainContainers();
		};

		// ##########################################//
		/* setup main containers */
		// ##########################################//
		this.setupMainContainers = function()
		{
			self.setWidth(self.scrollbarMaxWidth);
			self.setHeight(self.scrollbarHeight);
			
			self.setTrack();
			self.setHandler();
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.scrollbarHandlerOverDO.screen.addEventListener("MSPointerOver", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.addEventListener("MSPointerOut", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.addEventListener("MSPointerDown", self.onScrollMouseDown);
				}
				else
				{
					self.scrollbarHandlerOverDO.screen.addEventListener("touchstart", self.onScrollMouseDown);
				}
			}
			else
			{
				self.scrollbarHandlerOverDO.setButtonMode(true);
				
				if (self.screen.addEventListener)
				{
					self.scrollbarHandlerOverDO.screen.addEventListener("mouseover", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.addEventListener("mouseout", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.addEventListener("mousedown", self.onScrollMouseDown);
					window.addEventListener("mouseup", self.onScrollMouseUp);
				}
				else
				{
					self.scrollbarHandlerOverDO.screen.attachEvent("onmouseover", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.attachEvent("onmouseout", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.attachEvent("onmousedown", self.onScrollMouseDown);
					document.attachEvent("onmouseup", self.onScrollMouseUp);
				}
			}
		};
		
		this.setTrack = function()
		{
			self.scrollbarTrackDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.scrollbarTrackDO);
			
			self.scrollbarTrackDO.setWidth(self.trackWidth);
			self.scrollbarTrackDO.setHeight(self.scrollbarHeight);
			
			self.scrollbarTrackLeftDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarTrackLeftDO.setScreen(self.trackLeftImg);
			self.scrollbarTrackDO.addChild(self.scrollbarTrackLeftDO);
			
			self.scrollbarTrackCenterDO = new FWDU3DCarSimpleDisplayObject("div");
			self.scrollbarTrackCenterDO.screen.style.backgroundImage = "url(" + data.trackCenterPath + ")";
			self.scrollbarTrackCenterDO.screen.style.backgroundRepeat = "repeat-x";
			self.scrollbarTrackDO.addChild(self.scrollbarTrackCenterDO);
			
			self.scrollbarTrackCenterDO.setWidth(self.trackWidth - 2 * self.trackLeftWidth);
			self.scrollbarTrackCenterDO.setHeight(self.scrollbarHeight);
			self.scrollbarTrackCenterDO.setX(self.trackLeftWidth);
			
			self.scrollbarTrackRightDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarTrackRightDO.setScreen(self.trackRightImg);
			self.scrollbarTrackDO.addChild(self.scrollbarTrackRightDO);
			
			self.scrollbarTrackRightDO.setX(self.trackWidth - self.trackLeftWidth);
		};
		
		this.setHandler = function()
		{
			self.scrollbarHandlerDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.scrollbarHandlerDO);
			
			self.scrollbarHandlerDO.setWidth(self.handlerWidth);
			self.scrollbarHandlerDO.setHeight(self.scrollbarHeight);
			
			self.scrollbarHandlerLeftSDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarHandlerLeftSDO.setScreen(self.handlerLeftSImg);
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerLeftSDO);
			
			self.scrollbarHandlerLeftNDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarHandlerLeftNDO.setScreen(self.handlerLeftNImg);
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerLeftNDO);
			
			self.scrollbarHandlerCenterSDO = new FWDU3DCarSimpleDisplayObject("div");
			self.scrollbarHandlerCenterSDO.screen.style.backgroundImage = "url(" + data.handlerCenterSPath + ")";
			self.scrollbarHandlerCenterSDO.screen.style.backgroundRepeat = "repeat-x";
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerCenterSDO);
			
			self.scrollbarHandlerCenterSDO.setWidth(self.handlerWidth - 2 * self.handlerLeftWidth);
			self.scrollbarHandlerCenterSDO.setHeight(self.scrollbarHeight);
			self.scrollbarHandlerCenterSDO.setX(self.handlerLeftWidth);
			
			self.scrollbarHandlerCenterNDO = new FWDU3DCarSimpleDisplayObject("div");
			self.scrollbarHandlerCenterNDO.screen.style.backgroundImage = "url(" + data.handlerCenterNPath + ")";
			self.scrollbarHandlerCenterNDO.screen.style.backgroundRepeat = "repeat-x";
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerCenterNDO);
			
			self.scrollbarHandlerCenterNDO.setWidth(self.handlerWidth - 2 * self.handlerLeftWidth);
			self.scrollbarHandlerCenterNDO.setHeight(self.scrollbarHeight);
			self.scrollbarHandlerCenterNDO.setX(self.handlerLeftWidth);
			
			self.scrollbarHandlerRightSDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarHandlerRightSDO.setScreen(self.handlerRightSImg);
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerRightSDO);
			
			self.scrollbarHandlerRightSDO.setX(self.handlerWidth - self.handlerLeftWidth);
			
			self.scrollbarHandlerRightNDO = new FWDU3DCarSimpleDisplayObject("img");
			self.scrollbarHandlerRightNDO.setScreen(self.handlerRightNImg);
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerRightNDO);
			
			self.scrollbarHandlerRightNDO.setX(self.handlerWidth - self.handlerLeftWidth);
			
			self.scrollbarHandlerTextDO = new FWDU3DCarDisplayObject("div");
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerTextDO);
			
			self.scrollbarHandlerTextDO.getStyle().fontSmoothing = "antialiased";
			self.scrollbarHandlerTextDO.getStyle().webkitFontSmoothing = "antialiased";
			self.scrollbarHandlerTextDO.getStyle().textRendering = "optimizeLegibility";
			
			self.scrollbarHandlerTextDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.scrollbarHandlerTextDO.getStyle().fontSize = "10px";
			self.scrollbarHandlerTextDO.getStyle().color = self.textColorNormal;
			self.scrollbarHandlerTextDO.setInnerHTML((self.curItemId+1) + "/" + self.totalItems);
			
			self.setTextPositionId = setTimeout(self.setTextPosition, 10);
			
			self.scrollbarHandlerOverDO = new FWDU3DCarDisplayObject("div");
			self.scrollbarHandlerDO.addChild(self.scrollbarHandlerOverDO);
			
			self.scrollbarHandlerOverDO.setWidth(self.handlerWidth);
			self.scrollbarHandlerOverDO.setHeight(self.scrollbarHeight);
			
			if (FWDU3DCarUtils.isIE)
			{
				self.scrollbarHandlerOverDO.setBkColor("#000000");
				self.scrollbarHandlerOverDO.setAlpha(.001);
			}
		};
		
		this.setTextPosition = function()
		{
			self.scrollbarHandlerTextDO.setX(Math.floor((self.handlerWidth - self.scrollbarHandlerTextDO.getWidth())/2));
			self.scrollbarHandlerTextDO.setY(Math.floor((self.scrollbarHeight - self.scrollbarHandlerTextDO.getHeight())/2) + 1);
		};
		
		this.resize = function(stageWidth, controlsWidth)
		{
			if (stageWidth < (controlsWidth + self.scrollbarMaxWidth))
			{
				if ((stageWidth - controlsWidth) < self.handlerWidth)
				{
					self.resizeTrack(0);
					self.scrollbarHandlerDO.setY(500);
				}
				else
				{
					self.resizeTrack(Math.floor(stageWidth - controlsWidth));
					self.scrollbarHandlerDO.setY(0);
				}
			}
			else if (self.getWidth() < self.scrollbarMaxWidth)
			{
				self.resizeTrack(Math.floor(self.scrollbarMaxWidth));
				self.scrollbarHandlerDO.setY(0);
			}
		
			self.scrollbarHandlerDO.setX(Math.floor(self.curItemId * (self.trackWidth - self.handlerWidth) / (self.totalItems - 1)));
			self.scrollbarHandlerTextDO.setInnerHTML((self.curItemId+1) + "/" + self.totalItems);
		};
		
		this.resize2 = function()
		{
			self.resizeTrack(Math.floor(self.scrollbarMaxWidth));
		};
		
		this.resizeTrack = function(newWidth)
		{
			self.trackWidth = newWidth;
			self.setWidth(self.trackWidth);
			
			self.scrollbarTrackDO.setWidth(self.trackWidth);
			
			self.scrollbarTrackCenterDO.setWidth(Math.floor(self.trackWidth - 2 * self.trackLeftWidth));
			self.scrollbarTrackCenterDO.setX(Math.floor(self.trackLeftWidth));
			
			self.scrollbarTrackRightDO.setX(Math.floor(self.trackWidth - self.trackLeftWidth));
		};
		
		this.onScrollMouseOver = function()
		{
			self.scrollbarOver = true;
			
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerLeftNDO, .8, {alpha:0, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerCenterNDO, .8, {alpha:0, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerRightNDO, .8, {alpha:0, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerTextDO.screen, .8, {css : {color : self.textColorSelected}, ease : Expo.easeOut});
		};
		
		this.onScrollMouseOut = function()
		{
			self.scrollbarOver = false;
			
			if (self.isPressed)
				return;
			
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerLeftNDO, .8, {alpha:1, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerCenterNDO, .8, {alpha:1, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerRightNDO, .8, {alpha:1, ease : Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerTextDO.screen, .8, {css : {color : self.textColorNormal}, ease : Expo.easeOut});
		};
		
		this.onScrollMouseDown = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			self.curScrollX = self.scrollbarHandlerDO.getX();
			self.lastPressedX = self.mouseX;
			
			self.isPressed = true;
			
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerDO);
				
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					window.addEventListener("MSPointerMove", self.onScrollMove);
					window.addEventListener("MSPointerUp", self.onScrollMouseUp);
				}
				else
				{
					window.addEventListener("touchmove", self.onScrollMove);
					window.addEventListener("touchend", self.onScrollMouseUp);
				}
			}
			else
			{
				if (self.screen.addEventListener)
					window.addEventListener("mousemove", self.onScrollMove);
				else
					document.attachEvent("onmousemove", self.onScrollMove);
			}
		};
		
		this.onScrollMove = function(e)
		{
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			var dx = self.mouseX - self.lastPressedX;
			var newX = self.curScrollX + dx;
				
			newX = Math.max(newX, 0);
			newX = Math.min(self.trackWidth - self.handlerWidth, newX);
			
			self.scrollbarHandlerDO.setX(Math.floor(newX));
			
			self.curItemId = Math.floor(newX / (self.trackWidth - self.handlerWidth) * self.totalItems);
			
			if (self.curItemId == self.totalItems)
				self.curItemId--;
			
			if (self.prevCurItemId != self.curItemId)
			{
				self.dispatchEvent(FWDU3DCarScrollbar.MOVE, {id:self.curItemId});
			
				self.scrollbarHandlerTextDO.setInnerHTML((self.curItemId+1) + "/" + self.totalItems);
			}
			
			self.prevCurItemId = self.curItemId;
		};
		
		this.onScrollMouseUp = function()
		{
			self.isPressed = false;
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					window.removeEventListener("MSPointerUp", self.onScrollMouseUp);
					window.removeEventListener("MSPointerMove", self.onScrollMove);
				}
				else
				{
					window.removeEventListener("touchend", self.onScrollMouseUp);
					window.removeEventListener("touchmove", self.onScrollMove);
				}
			}
			else
			{
				if (self.screen.addEventListener)
					window.removeEventListener("mousemove", self.onScrollMove);
				else
					document.detachEvent("onmousemove", self.onScrollMove);
			}
			
			if (!self.scrollbarOver && !self.isMobile)
				self.onScrollMouseOut();
			
			self.gotoItem2();
		};
		
		this.gotoItem = function(id, animate)
		{
			self.curItemId = id;
			
			if (self.prevCurItemId != self.curItemId)
			{
				if (animate)
				{
					FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerDO);
					FWDU3DCarModTweenMax.to(self.scrollbarHandlerDO, .8, {x : Math.floor(self.curItemId * (self.trackWidth - self.handlerWidth) / (self.totalItems - 1)), ease : Expo.easeOut});
				}
				else
				{
					self.scrollbarHandlerDO.setX(Math.floor(self.curItemId * (self.trackWidth - self.handlerWidth) / (self.totalItems - 1)));
				}
				
				self.scrollbarHandlerTextDO.setInnerHTML((self.curItemId+1) + "/" + self.totalItems);
			}
			
			self.prevCurItemId = self.curItemId;
		};
		
		this.gotoItem2 = function()
		{
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerDO);
			FWDU3DCarModTweenMax.to(self.scrollbarHandlerDO, .8, {x : Math.floor(self.curItemId * (self.trackWidth - self.handlerWidth) / (self.totalItems - 1)), ease : Expo.easeOut});
				
			self.scrollbarHandlerTextDO.setInnerHTML((self.curItemId+1) + "/" + self.totalItems);
		};

		// ##############################//
		/* destroy */
		// ##############################//
		this.destroy = function()
		{
			clearTimeout(self.setTextPositionId);
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.scrollbarHandlerOverDO.screen.removeEventListener("MSPointerOver", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.removeEventListener("MSPointerOut", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.removeEventListener("MSPointerDown", self.onScrollMouseDown);
				}
				else
				{
					self.scrollbarHandlerOverDO.screen.removeEventListener("touchstart", self.onScrollMouseDown);
				}
			}
			else
			{
				self.scrollbarHandlerOverDO.setButtonMode(true);
				
				if (self.screen.removeEventListener)
				{
					self.scrollbarHandlerOverDO.screen.removeEventListener("mouseover", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.removeEventListener("mouseout", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.removeEventListener("mousedown", self.onScrollMouseDown);
					window.removeEventListener("mouseup", self.onScrollMouseUp);
				}
				else
				{
					self.scrollbarHandlerOverDO.screen.detachEvent("onmouseover", self.onScrollMouseOver);
					self.scrollbarHandlerOverDO.screen.detachEvent("onmouseout", self.onScrollMouseOut);
					self.scrollbarHandlerOverDO.screen.detachEvent("onmousedown", self.onScrollMouseDown);
					document.detachEvent("onmouseup", self.onScrollMouseUp);
				}
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					window.removeEventListener("MSPointerUp", self.onScrollMouseUp);
					window.removeEventListener("MSPointerMove", self.onScrollMove);
				}
				else
				{
					window.removeEventListener("touchend", self.onScrollMouseUp);
					window.removeEventListener("touchmove", self.onScrollMove);
				}
			}
			else
			{
				if (self.screen.addEventListener)
					window.removeEventListener("mousemove", self.onScrollMove);
				else
					document.detachEvent("onmousemove", self.onScrollMove);
			}
			
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerLeftNDO);
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerCenterNDO);
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerRightNDO);
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerDO);
			FWDU3DCarModTweenMax.killTweensOf(self.scrollbarHandlerTextDO.screen);
			
			self.scrollbarHandlerDO.destroy();
			self.scrollbarHandlerLeftNDO.destroy();
			self.scrollbarHandlerLeftSDO.destroy();
			self.scrollbarHandlerCenterNDO.destroy();
			self.scrollbarHandlerCenterSDO.destroy();
			self.scrollbarHandlerRightNDO.destroy();
			self.scrollbarHandlerRightSDO.destroy();
			self.scrollbarHandlerTextDO.destroy();
			self.scrollbarHandlerOverDO.destroy();
			self.scrollbarTrackDO.destroy();
			self.scrollbarTrackLeftDO.destroy();
			self.scrollbarTrackCenterDO.destroy();
			self.scrollbarTrackRightDO.destroy();
			
			self.scrollbarHandlerDO = null;
			self.scrollbarHandlerLeftNDO = null;
			self.scrollbarHandlerLeftSDO = null;
			self.scrollbarHandlerCenterNDO = null;
			self.scrollbarHandlerCenterSDO = null;
			self.scrollbarHandlerRightNDO = null;
			self.scrollbarHandlerRightSDO = null;
			self.scrollbarHandlerTextDO = null;
			self.scrollbarHandlerOverDO = null;;
			self.scrollbarTrackDO = null;
			self.scrollbarTrackLeftDO = null;
			self.scrollbarTrackCenterDO = null;
			self.scrollbarTrackRightDO = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarScrollbar.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarScrollbar.setPrototype = function()
	{
		FWDU3DCarScrollbar.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarScrollbar.MOVE = "onMove";

	FWDU3DCarScrollbar.prototype = null;
	window.FWDU3DCarScrollbar = FWDU3DCarScrollbar;
}(window));