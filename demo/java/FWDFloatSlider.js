/* FWDU3DCarFloatSlider */
(function(window)
{
	var FWDU3DCarFloatSlider = function(propsObj)
	{
		var self = this;
		var prototype = FWDU3DCarFloatSlider.prototype;

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

		this.incrementStep = propsObj.incrementStep * 100;
		this.minValue = propsObj.minValue * (100/self.incrementStep);
		this.maxValue = propsObj.maxValue * (100/self.incrementStep);
		this.value = propsObj.value * (100/self.incrementStep);
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.isPressed = false;
		this.isEnabled = false;
		this.isTouchMoved = false;

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
			
			self.curPosX = (self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth;
			
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
			
			self.sliderHandlerNDO.screen.ontouchstart = null;
			self.sliderHandlerSDO.screen.ontouchstart = null;
		};
		
		this.setSize = function(newWidth)
		{
			if (newWidth == self.sliderWidth)
				return;
			
			self.sliderWidth = newWidth;
			
			self.setWidth(self.sliderWidth + self.handlerWidth);
			
			self.curPosX = (self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth;
			
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
			
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = vmc.screenX;
			self.mouseY = vmc.screenY;
			
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
			if(e.preventDefault) e.preventDefault();
			
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = vmc.screenX;
			self.mouseY = vmc.screenY;
			
			var dx = self.mouseX - self.lastPressedX;
			var newX = self.curScrollX + dx;
				
			newX = Math.max(newX, self.handlerWidth/2);
			newX = Math.min(self.sliderWidth + self.handlerWidth/2, newX);
			
			self.curPosX = newX - self.handlerWidth/2;
				
			self.sliderHandlerDO.setX(self.curPosX);
			self.sliderProgressCenterDO.setWidth(Math.max(self.curPosX - self.trackMarginWidth, 0));

			newValue = Math.round(self.minValue + (self.maxValue - self.minValue) * ((newX - self.handlerWidth/2) / self.sliderWidth));
			
			if (newValue != self.value)
			{
				self.value = newValue;
				
				self.dispatchEvent(FWDU3DCarFloatSlider.CHANGE, {value:self.value/(100/self.incrementStep)});
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
					window.removeEventListener("touchmove", self.sliderMobileDragMoveTest);
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
		
		this.onTrackPress = function(e)
		{
			if (self.isTouchMoved)
			{
				self.isTouchMoved = false;
				
				return;
			}
			
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);

			self.mouseX = vmc.screenX;
			self.mouseY = vmc.screenY;
			
			self.rect = self.screen.getBoundingClientRect();
			
			var newX = self.mouseX - self.rect.left;
			
			newX = Math.max(newX, self.handlerWidth/2);
			newX = Math.min(self.sliderWidth + self.handlerWidth/2, newX);
			
			self.curPosX = newX - self.handlerWidth/2;
				
			self.sliderHandlerDO.setX(self.curPosX);
			self.sliderProgressCenterDO.setWidth(Math.max(self.curPosX - self.trackMarginWidth, 0));

			newValue = Math.round(self.minValue + (self.maxValue - self.minValue) * ((newX - self.handlerWidth/2) / self.sliderWidth));
			
			if (newValue != self.value)
			{
				self.value = newValue;
				
				self.dispatchEvent(FWDU3DCarFloatSlider.CHANGE, {value:self.value/(100/self.incrementStep)});
			}
		};
		
		this.setValue = function(nv)
		{
			var newValue = nv * (100/self.incrementStep);
			
			if (newValue != self.value)
			{
				self.value = newValue;
				self.curPosX = (self.value - self.minValue) / (self.maxValue - self.minValue) * self.sliderWidth;
				
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
					self.sliderHandlerDO.screen.addEventListener("touchstart", self.sliderMobileDragStartTest);
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
					self.sliderProgressDO.screen.addEventListener("MSPointerDown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.addEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.sliderProgressDO.screen.addEventListener("touchend", self.onTrackPress);
				}
			}
			else
			{
				self.sliderProgressDO.setButtonMode(true);
				
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.addEventListener("mousedown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.attachEvent("onmousedown", self.onTrackPress);
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
					self.sliderHandlerDO.screen.removeEventListener("touchstart", self.sliderMobileDragStartTest);
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
					self.sliderProgressDO.screen.removeEventListener("MSPointerDown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.removeEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.sliderProgressDO.screen.removeEventListener("touchend", self.onTrackPress);
				}
			}
			else
			{
				self.sliderProgressDO.setButtonMode(false);
				
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.removeEventListener("mousedown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.detachEvent("onmousedown", self.onTrackPress);
				}
			}
			
			self.setAlpha(.5);
		};
		
		this.sliderMobileDragStartTest = function(e)
		{
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.lastPressedX = vmc.screenX;
			self.lastPressedY = vmc.screenY;
			
			self.mouseX = vmc.screenX;
			self.mouseY = vmc.screenY;
			
			self.curScrollX = self.sliderHandlerDO.getX() + self.handlerWidth/2;
			
			self.isPressed = true;
			
			window.addEventListener("touchmove", self.sliderMobileDragMoveTest);
			window.addEventListener("touchend", self.onScrollMouseUp);
		};
		
		this.sliderMobileDragMoveTest = function(e)
		{
			if (e.touches.length != 1) return;
			
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.mX = vmc.screenX;
			self.mY = vmc.screenY;
			
			var angle = Math.atan2(self.mY - self.lastPressedY, self.mX - self.lastPressedX);
			var posAngle = Math.abs(angle) * 180 / Math.PI;

			if ((posAngle > 120) || (posAngle < 60))
			{
				if(e.preventDefault) e.preventDefault();
				
				window.addEventListener("touchmove", self.onScrollMove);
			}
			
			window.removeEventListener("touchmove", self.sliderMobileDragMoveTest);
		};
		
		this.sliderMobileDragMoveTest2 = function(e)
		{
			self.isTouchMoved = true;
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
					self.sliderHandlerDO.screen.removeEventListener("touchstart", self.sliderMobileDragStartTest);
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
					self.sliderProgressDO.screen.removeEventListener("MSPointerDown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.removeEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.sliderProgressDO.screen.removeEventListener("touchend", self.onTrackPress);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.sliderProgressDO.screen.removeEventListener("mousedown", self.onTrackPress);
				}
				else
				{
					self.sliderProgressDO.screen.detachEvent("onmousedown", self.onTrackPress);
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
			FWDU3DCarFloatSlider.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarFloatSlider.setPrototype = function()
	{
		FWDU3DCarFloatSlider.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarFloatSlider.CHANGE = "onChange";

	FWDU3DCarFloatSlider.prototype = null;
	window.FWDU3DCarFloatSlider = FWDU3DCarFloatSlider;
}(window));