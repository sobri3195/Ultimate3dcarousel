/* FWDU3DCarSlider */
(function(window)
{
	var FWDU3DCarSlider = function(propsObj)
	{
		var self = this;
		var prototype = FWDU3DCarSlider.prototype;

		this.sliderHandlerDO;
		this.sliderHandlerNDO;
		this.sliderHandlerSDO;
		
		this.sliderTrackDO;
		this.sliderTrackLeftDO;
		this.sliderTrackCenterDO;
		this.sliderTrackRightDO;
		
		this.sliderProgressDO;
		this.sliderProgressLeftDO;
		this.sliderProgressCenterDO;
		
		this.sliderWidth = propsObj.sliderWidth;
		this.sliderHeight = propsObj.sliderHeight;
		this.handlerWidth = propsObj.handlerWidth;
		this.trackHeight = propsObj.trackHeight;
		this.trackMarginWidth = propsObj.trackMarginWidth;
		this.progressHeight = propsObj.progressHeight;

		this.minValue = propsObj.minValue;
		this.maxValue = propsObj.maxValue;
		this.value = propsObj.value;
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.isPressed = false;
		this.isEnabled = false;

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
			self.setWidth(self.sliderWidth + self.handlerWidth);
			self.setHeight(self.sliderHeight);
			
			self.curPosX = Math.floor((self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth);
			
			self.setTrack();
			self.setProgress();
			self.setHandler();
			
			self.enable();
		};
		
		this.setTrack = function()
		{
			self.sliderTrackDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.sliderTrackDO);
			
			self.sliderTrackDO.setWidth(self.sliderWidth);
			self.sliderTrackDO.setHeight(self.trackHeight);
			
			self.sliderTrackDO.setX(self.handlerWidth/2);
			self.sliderTrackDO.setY((self.sliderHeight-self.trackHeight)/2);
			
			self.sliderTrackLeftDO = new FWDU3DCarSimpleDisplayObject("img");
			self.sliderTrackLeftDO.screen.src = propsObj.skinPath + "/trackLeft.png";
			self.sliderTrackDO.addChild(self.sliderTrackLeftDO);
			
			self.sliderTrackLeftDO.setWidth(self.trackMarginWidth);
			self.sliderTrackLeftDO.setHeight(self.trackHeight);
			
			self.sliderTrackCenterDO = new FWDU3DCarSimpleDisplayObject("div");
			self.sliderTrackCenterDO.screen.style.backgroundImage = "url(" + propsObj.skinPath + "/trackCenter.png" + ")";
			self.sliderTrackCenterDO.screen.style.backgroundRepeat = "repeat-x";
			self.sliderTrackDO.addChild(self.sliderTrackCenterDO);
			
			self.sliderTrackCenterDO.setWidth(self.sliderWidth - 2 * self.trackMarginWidth);
			self.sliderTrackCenterDO.setHeight(self.trackHeight);
			self.sliderTrackCenterDO.setX(self.trackMarginWidth);
			
			self.sliderTrackRightDO = new FWDU3DCarSimpleDisplayObject("img");
			self.sliderTrackRightDO.screen.src = propsObj.skinPath + "/trackRight.png";
			self.sliderTrackDO.addChild(self.sliderTrackRightDO);
			
			self.sliderTrackRightDO.setWidth(self.trackMarginWidth);
			self.sliderTrackRightDO.setHeight(self.trackHeight);
			self.sliderTrackRightDO.setX(self.sliderWidth - self.trackMarginWidth);
		};
		
		this.setProgress = function()
		{
			self.sliderProgressDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.sliderProgressDO);
			
			self.sliderProgressDO.setWidth(self.sliderWidth);
			self.sliderProgressDO.setHeight(self.trackHeight);
			
			self.sliderProgressDO.setX(self.handlerWidth/2);
			self.sliderProgressDO.setY((self.sliderHeight-self.trackHeight)/2);
			
			self.sliderProgressLeftDO = new FWDU3DCarSimpleDisplayObject("img");
			self.sliderProgressLeftDO.screen.src = propsObj.skinPath + "/progressLeft.png";
			self.sliderProgressDO.addChild(self.sliderProgressLeftDO);
			
			self.sliderProgressLeftDO.setWidth(self.trackMarginWidth);
			self.sliderProgressLeftDO.setHeight(self.trackHeight);
			
			self.sliderProgressCenterDO = new FWDU3DCarSimpleDisplayObject("div");
			self.sliderProgressCenterDO.screen.style.backgroundImage = "url(" + propsObj.skinPath + "/progressCenter.png" + ")";
			self.sliderProgressCenterDO.screen.style.backgroundRepeat = "repeat-x";
			self.sliderProgressDO.addChild(self.sliderProgressCenterDO);
			
			self.sliderProgressCenterDO.setWidth(self.curPosX - self.trackMarginWidth);
			self.sliderProgressCenterDO.setHeight(self.trackHeight);
			self.sliderProgressCenterDO.setX(self.trackMarginWidth);
		};
		
		this.setHandler = function()
		{
			self.sliderHandlerDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.sliderHandlerDO);
			
			self.sliderHandlerDO.setWidth(self.handlerWidth);
			self.sliderHandlerDO.setHeight(self.sliderHeight);
			
			self.sliderHandlerDO.setX(self.curPosX);
			
			self.sliderHandlerSDO = new FWDU3DCarSimpleDisplayObject("img");
			self.sliderHandlerSDO.screen.src = propsObj.skinPath + "/handlerSelected.png";
			self.sliderHandlerDO.addChild(self.sliderHandlerSDO);
			
			self.sliderHandlerSDO.setWidth(self.handlerWidth);
			self.sliderHandlerSDO.setHeight(self.sliderHeight);
			
			self.sliderHandlerNDO = new FWDU3DCarSimpleDisplayObject("img");
			self.sliderHandlerNDO.screen.src = propsObj.skinPath + "/handlerNormal.png";
			self.sliderHandlerDO.addChild(self.sliderHandlerNDO);
			
			self.sliderHandlerNDO.setWidth(self.handlerWidth);
			self.sliderHandlerNDO.setHeight(self.sliderHeight);
		};
		
		this.setSize = function(newWidth)
		{
			if (newWidth == self.sliderWidth)
				return;
			
			self.sliderWidth = newWidth;
			
			self.setWidth(self.sliderWidth + self.handlerWidth);
			
			self.curPosX = Math.floor((self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth);
			
			self.sliderTrackDO.setWidth(self.sliderWidth);
			self.sliderTrackCenterDO.setWidth(self.sliderWidth - 2 * self.trackMarginWidth);
			self.sliderTrackRightDO.setX(self.sliderWidth - self.trackMarginWidth);
			self.sliderProgressDO.setWidth(self.sliderWidth);
			self.sliderProgressCenterDO.setWidth(self.curPosX - self.trackMarginWidth);
			self.sliderHandlerDO.setX(self.curPosX);
		};
		
		this.onScrollMouseOver = function()
		{
			self.sliderOver = true;
			
			FWDU3DCarModTweenMax.to(self.sliderHandlerNDO, .8, {alpha:0, ease : Expo.easeOut});
		};
		
		this.onScrollMouseOut = function()
		{
			self.sliderOver = false;
			
			if (self.isPressed)
				return;
			
			FWDU3DCarModTweenMax.to(self.sliderHandlerNDO, .8, {alpha:1, ease : Expo.easeOut});;
		};
		
		this.onScrollMouseDown = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			self.curScrollX = self.sliderHandlerDO.getX() + self.handlerWidth/2;
			self.lastPressedX = self.mouseX;
			
			self.isPressed = true;
				
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
				
			newX = Math.max(newX, self.handlerWidth/2);
			newX = Math.min(self.sliderWidth + self.handlerWidth/2, newX);

			newValue = Math.floor(self.minValue + (self.maxValue - self.minValue) * ((newX - self.handlerWidth/2) / self.sliderWidth));
			
			if (newValue != self.value)
			{
				self.value = newValue;
				self.curPosX = Math.floor(newX - self.handlerWidth/2);
				
				self.sliderHandlerDO.setX(self.curPosX);
				self.sliderProgressCenterDO.setWidth(Math.max(self.curPosX - self.trackMarginWidth, 0));
				
				self.dispatchEvent(FWDU3DCarSlider.CHANGE, {value:self.value});
			}
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
			
			if (!self.sliderOver && !self.isMobile)
				self.onScrollMouseOut();
		};
		
		this.onTrackMouseDown = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			self.rect = self.screen.getBoundingClientRect();
			
			var newX = self.mouseX - self.rect.left;
			
			newX = Math.max(newX, self.handlerWidth/2);
			newX = Math.min(self.sliderWidth + self.handlerWidth/2, newX);

			newValue = Math.floor(self.minValue + (self.maxValue - self.minValue) * ((newX - self.handlerWidth/2) / self.sliderWidth));
			
			if (newValue != self.value)
			{
				self.value = newValue;
				self.curPosX = Math.floor(newX - self.handlerWidth/2);
				
				self.sliderHandlerDO.setX(self.curPosX);
				self.sliderProgressCenterDO.setWidth(Math.max(self.curPosX - self.trackMarginWidth, 0));
				
				self.dispatchEvent(FWDU3DCarSlider.CHANGE, {value:self.value});
			}
		};
		
		this.setValue = function(newValue)
		{
			if (newValue != self.value)
			{
				self.value = newValue;
				self.curPosX = Math.floor((self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth);
				
				self.sliderHandlerDO.setX(self.curPosX);
				self.sliderProgressCenterDO.setWidth(Math.max(self.curPosX - self.trackMarginWidth, 0));
			}
		};
		
		this.enable = function()
		{
			if (self.isEnabled)
				return;
			
			self.isEnabled = true;
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderHandlerDO.screen.addEventListener("MSPointerOver", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.addEventListener("MSPointerOut", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.addEventListener("MSPointerDown", self.onScrollMouseDown);
				}
				else
				{
					self.sliderHandlerDO.screen.addEventListener("touchstart", self.onScrollMouseDown);
				}
			}
			else
			{
				self.sliderHandlerDO.setButtonMode(true);
				
				if (self.screen.addEventListener)
				{
					self.sliderHandlerDO.screen.addEventListener("mouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.addEventListener("mouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.addEventListener("mousedown", self.onScrollMouseDown);
					window.addEventListener("mouseup", self.onScrollMouseUp);
				}
				else
				{
					self.sliderHandlerDO.screen.attachEvent("onmouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.attachEvent("onmouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.attachEvent("onmousedown", self.onScrollMouseDown);
					document.attachEvent("onmouseup", self.onScrollMouseUp);
				}
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderProgressDO.screen.addEventListener("MSPointerDown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.addEventListener("touchstart", self.onTrackMouseDown);
				}
			}
			else
			{
				self.sliderProgressDO.setButtonMode(true);
				
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.addEventListener("mousedown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.attachEvent("onmousedown", self.onTrackMouseDown);
				}
			}
			
			self.setAlpha(1);
		};
		
		this.disable = function()
		{
			if (!self.isEnabled)
				return;
			
			self.isEnabled = false;
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderHandlerDO.screen.removeEventListener("MSPointerOver", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.removeEventListener("MSPointerOut", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.removeEventListener("MSPointerDown", self.onScrollMouseDown);
				}
				else
				{
					self.sliderHandlerDO.screen.removeEventListener("touchstart", self.onScrollMouseDown);
				}
			}
			else
			{
				self.sliderHandlerDO.setButtonMode(false);
				
				if (self.screen.addEventListener)
				{
					self.sliderHandlerDO.screen.removeEventListener("mouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.removeEventListener("mouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.removeEventListener("mousedown", self.onScrollMouseDown);
					window.removeEventListener("mouseup", self.onScrollMouseUp);
				}
				else
				{
					self.sliderHandlerDO.screen.detachEvent("onmouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.detachEvent("onmouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.detachEvent("onmousedown", self.onScrollMouseDown);
					document.detachEvent("onmouseup", self.onScrollMouseUp);
				}
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderProgressDO.screen.removeEventListener("MSPointerDown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.removeEventListener("touchstart", self.onTrackMouseDown);
				}
			}
			else
			{
				self.sliderProgressDO.setButtonMode(false);
				
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.removeEventListener("mousedown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.detachEvent("onmousedown", self.onTrackMouseDown);
				}
			}
			
			self.setAlpha(.5);
		};

		// ##############################//
		/* destroy */
		// ##############################//
		this.destroy = function()
		{
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderHandlerDO.screen.removeEventListener("MSPointerOver", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.removeEventListener("MSPointerOut", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.removeEventListener("MSPointerDown", self.onScrollMouseDown);
				}
				else
				{
					self.sliderHandlerDO.screen.removeEventListener("touchstart", self.onScrollMouseDown);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.sliderHandlerDO.screen.removeEventListener("mouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.removeEventListener("mouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.removeEventListener("mousedown", self.onScrollMouseDown);
					window.removeEventListener("mouseup", self.onScrollMouseUp);
				}
				else
				{
					self.sliderHandlerDO.screen.detachEvent("onmouseover", self.onScrollMouseOver);
					self.sliderHandlerDO.screen.detachEvent("onmouseout", self.onScrollMouseOut);
					self.sliderHandlerDO.screen.detachEvent("onmousedown", self.onScrollMouseDown);
					document.detachEvent("onmouseup", self.onScrollMouseUp);
				}
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.sliderProgressDO.screen.removeEventListener("MSPointerDown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.removeEventListener("touchstart", self.onTrackMouseDown);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.removeEventListener("mousedown", self.onTrackMouseDown);
				}
				else
				{
					self.sliderProgressDO.screen.detachEvent("onmousedown", self.onTrackMouseDown);
				}
			}
			
			FWDU3DCarModTweenMax.killTweensOf(self.sliderHandlerNDO);
			
			self.sliderHandlerDO.destroy();
			self.sliderHandlerNDO.destroy();
			self.sliderHandlerSDO.destroy();
			self.sliderTrackDO.destroy();
			self.sliderTrackLeftDO.destroy();
			self.sliderTrackCenterDO.destroy();
			self.sliderTrackRightDO.destroy();
			self.sliderProgressDO.destroy();
			self.sliderProgressLeftDO.destroy();
			self.sliderProgressCenterDO.destroy();
			
			self.sliderHandlerDO = null;
			self.sliderHandlerNDO = null;
			self.sliderHandlerSDO = null;
			self.sliderTrackDO = null;
			self.sliderTrackLeftDO = null;
			self.sliderTrackCenterDO = null;
			self.sliderTrackRightDO = null;
			self.sliderProgressDO = null;
			self.sliderProgressLeftDO = null;
			self.sliderProgressCenterDO = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarSlider.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarSlider.setPrototype = function()
	{
		FWDU3DCarSlider.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarSlider.CHANGE = "onChange";

	FWDU3DCarSlider.prototype = null;
	window.FWDU3DCarSlider = FWDU3DCarSlider;
}(window));