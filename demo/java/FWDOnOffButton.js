/* FWDU3DCarOnOffButton */
(function (window){
var FWDU3DCarOnOffButton = function(bWidth, bHeight, btnWidth, skinPath, value)
{
		var self = this;
		var prototype = FWDU3DCarOnOffButton.prototype;
		
		this.bgImgUrl = skinPath + "/background.png";
		
		this.btnNImgUrl = skinPath + "/buttonNormal.png";
		this.btnSImgUrl = skinPath + "/buttonSelected.png";
		
		this.bgDO;
		
		this.btnDO;
		this.btnNDO;
		this.btnSDO;
		
		this.value = value;
		
		this.btnCurX = 0;
		this.lastMouseX = 0;
		this.mouseX = 0;
		
		this.isDragged = false;
		this.isTouchMoved = false;
		
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function()
		{
			this.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function()
		{
			self.bgDO = new FWDU3DCarSimpleDisplayObject("img");
			self.bgDO.screen.src = self.bgImgUrl;
			
			self.bgDO.setWidth(bWidth);
			self.bgDO.setHeight(bHeight);
			
			self.addChild(self.bgDO);
			
			self.btnDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.btnDO);
			
			self.btnDO.setWidth(btnWidth);
			self.btnDO.setHeight(bHeight);
			
			self.btnSDO = new FWDU3DCarSimpleDisplayObject("img");
			self.btnSDO.screen.src = self.btnSImgUrl;
			
			self.btnSDO.setWidth(btnWidth);
			self.btnSDO.setHeight(bHeight);
			
			self.btnDO.addChild(self.btnSDO);
			
			self.btnNDO = new FWDU3DCarSimpleDisplayObject("img");
			self.btnNDO.screen.src = self.btnNImgUrl;
			
			self.btnNDO.setWidth(btnWidth);
			self.btnNDO.setHeight(bHeight);
			
			self.btnDO.addChild(self.btnNDO);

			self.setWidth(bWidth);
			self.setHeight(bHeight);
			
			self.enable();
			
			if (self.value)
			{
				self.btnCurX = bWidth - btnWidth;
			}
			else
			{
				self.btnCurX = 0;
			}
			
			self.btnDO.setX(self.btnCurX);
			
			self.bgDO.screen.ontouchstart = null;
			self.btnNDO.screen.ontouchstart = null;
			self.btnSDO.screen.ontouchstart = null;
		};
		
		this.onMouseOver = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDU3DCarModTweenMax.to(self.btnNDO, .4, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onMouseOut = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDU3DCarModTweenMax.to(self.btnNDO, .4, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		this.onMouseDown = function(e)
		{
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.lastMouseX = vmc.screenX;
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					window.addEventListener("MSPointerMove", self.onMouseMove);
					window.addEventListener("MSPointerUp", self.onMouseUp);
				}
				else
				{
					window.addEventListener("touchmove", self.onMouseMove);
					window.addEventListener("touchend", self.onMouseUp);
				}
			}
			else if (self.screen.addEventListener)
			{
				window.addEventListener("mousemove", self.onMouseMove);
				window.addEventListener("mouseup", self.onMouseUp);
			}
			else if (self.screen.attachEvent)
			{
				window.attachEvent("onmousemove", self.onMouseMove);
				window.attachEvent("onmouseup", self.onMouseUp);
			}
		};
		
		this.onMouseMove = function(e)
		{
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.mouseX = vmc.screenX;
			
			var dx = self.mouseX - self.lastMouseX;
			var newX = self.btnCurX + dx;
			
			if (newX < 0)
			{
				newX = 0;
			}
			else if (newX > bWidth - btnWidth)
			{
				newX = bWidth - btnWidth;
			}
			
			self.btnDO.setX(newX);
			
			self.isDragged = true;
		};
			
		this.onMouseUp = function(e)
		{
			var newVal;
			
			if (self.isDragged)
			{
				if (self.btnDO.getX() < (bWidth - btnWidth)/2)
				{
					newVal = false;
				}
				else
				{
					newVal = true;
				}
			}
			else
			{
				newVal = !self.value;
			}
			
			if (newVal)
			{
				self.btnCurX = bWidth - btnWidth;
			}
			else
			{
				self.btnCurX = 0;
			}
			
			FWDU3DCarModTweenMax.to(self.btnDO, .2, {x:self.btnCurX, ease:Expo.easeOut});
			
			if (self.value != newVal)
			{
				self.dispatchEvent(FWDU3DCarOnOffButton.CHANGE, {value:newVal});
			}
			
			self.value = newVal;
			
			self.isDragged = false;
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					window.removeEventListener("MSPointerMove", self.onMouseMove);
					window.removeEventListener("MSPointerUp", self.onMouseUp);
				}
				else
				{
					window.removeEventListener("touchend", self.onMouseUp);
					window.removeEventListener("touchmove", self.onMouseMove);
					window.removeEventListener("touchmove", self.sliderMobileDragMoveTest);
				}
			}
			else if (self.screen.addEventListener)
			{
				window.removeEventListener("mousemove", self.onMouseMove);
				window.removeEventListener("mouseup", self.onMouseUp);
			}
			else if (self.screen.attachEvent)
			{
				window.detachEvent("onmousemove", self.onMouseMove);
				window.detachEvent("onmouseup", self.onMouseUp);
			}
		};
		
		this.onButtonBgPress = function()
		{
			if (self.isTouchMoved)
			{
				self.isTouchMoved = false;
				
				return;
			}
			
			newVal = !self.value;
			
			if (newVal)
			{
				self.btnCurX = bWidth - btnWidth;
			}
			else
			{
				self.btnCurX = 0;
			}
			
			FWDU3DCarModTweenMax.to(self.btnDO, .2, {x:self.btnCurX, ease:Expo.easeOut});
			
			if (self.value != newVal)
			{
				self.dispatchEvent(FWDU3DCarOnOffButton.CHANGE, {value:newVal});
			}
			
			self.value = newVal;
		};
		
		this.enable = function()
		{
			this.setButtonMode(true);
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					self.btnDO.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.btnDO.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.btnDO.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onMouseUp);
				}
				else
				{
					self.btnDO.screen.addEventListener("touchstart", self.sliderMobileDragStartTest);
					self.bgDO.screen.addEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.bgDO.screen.addEventListener("touchend", self.onButtonBgPress);
				}
			}
			else if (self.screen.addEventListener)
			{
				self.btnDO.screen.addEventListener("mouseover", self.onMouseOver);
				self.btnDO.screen.addEventListener("mouseout", self.onMouseOut);
				self.btnDO.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}
			else if (self.screen.attachEvent)
			{
				self.btnDO.screen.attachEvent("onmouseover", self.onMouseOver);
				self.btnDO.screen.attachEvent("onmouseout", self.onMouseOut);
				self.btnDO.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
			
			self.setAlpha(1);
		};
		
		this.disable = function()
		{
			this.setButtonMode(false);
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					self.btnDO.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.btnDO.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.btnDO.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onMouseUp);
					window.removeEventListener("MSPointerUp", self.onMouseUp);
				}
				else
				{
					self.btnDO.screen.removeEventListener("touchstart", self.sliderMobileDragStartTest);
					self.bgDO.screen.removeEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.bgDO.screen.removeEventListener("touchend", self.onButtonBgPress);
				}
			}
			else if (self.screen.removeEventListener)
			{
				self.btnDO.screen.removeEventListener("mouseover", self.onMouseOver);
				self.btnDO.screen.removeEventListener("mouseout", self.onMouseOut);
				self.btnDO.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("mouseup", self.onMouseUp);
				window.removeEventListener("mouseup", self.onMouseUp);
			}
			else if (self.screen.detachEvent)
			{
				self.btnDO.screen.detachEvent("onmouseover", self.onMouseOver);
				self.btnDO.screen.detachEvent("onmouseout", self.onMouseOut);
				self.btnDO.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onmouseup", self.onMouseUp);
				window.detachEvent("onmouseup", self.onMouseUp);
			}
			
			self.setAlpha(.5);
		};
		
		this.sliderMobileDragStartTest = function(e)
		{
			var vmc = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.lastPressedX = vmc.screenX;
			self.lastPressedY = vmc.screenY;
			
			self.lastMouseX = vmc.screenX;
			
			window.addEventListener("touchmove", self.sliderMobileDragMoveTest);
			window.addEventListener("touchend", self.onMouseUp);
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
				
				window.addEventListener("touchmove", self.onMouseMove);
			}
			
			window.removeEventListener("touchmove", self.sliderMobileDragMoveTest);
		};
		
		this.sliderMobileDragMoveTest2 = function(e)
		{
			self.isTouchMoved = true;
		};
		
		this.setValue = function(newValue)
		{
			self.value = newValue;
			
			if (self.value)
			{
				self.btnCurX = bWidth - btnWidth;
			}
			else
			{
				self.btnCurX = 0;
			}
			
			FWDU3DCarModTweenMax.to(self.btnDO, .2, {x:self.btnCurX, ease:Expo.easeOut});
		};
		
		//##############################//
		/* destroy */
		//##############################//
		this.destroy = function()
		{
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					self.btnDO.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.btnDO.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.btnDO.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onMouseUp);
					window.removeEventListener("MSPointerUp", self.onMouseUp);
				}
				else
				{
					self.btnDO.screen.removeEventListener("touchstart", self.sliderMobileDragStartTest);
					self.bgDO.screen.removeEventListener("touchmove", self.sliderMobileDragMoveTest2);
					self.bgDO.screen.removeEventListener("touchend", self.onButtonBgPress);
				}
			}
			else if (self.screen.removeEventListener)
			{
				self.btnDO.screen.removeEventListener("mouseover", self.onMouseOver);
				self.btnDO.screen.removeEventListener("mouseout", self.onMouseOut);
				self.btnDO.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("mouseup", self.onMouseUp);
				window.removeEventListener("mouseup", self.onMouseUp);
			}
			else if (self.screen.detachEvent)
			{
				self.btnDO.screen.detachEvent("onmouseover", self.onMouseOver);
				self.btnDO.screen.detachEvent("onmouseout", self.onMouseOut);
				self.btnDO.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onmouseup", self.onMouseUp);
				window.detachEvent("onmouseup", self.onMouseUp);
			}
			
			self.bgDO.destroy();
			self.bgDO = null;
			
			self.btnNDO.destroy();
			self.btnNDO = null;
			
			self.btnSDO.destroy();
			self.btnSDO = null;
			
			self.btnDO.destroy();
			self.btnDO = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarOnOffButton.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDU3DCarOnOffButton.setPrototype = function(){
		FWDU3DCarOnOffButton.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarOnOffButton.CHANGE = "onChange";
	
	FWDU3DCarOnOffButton.prototype = null;
	window.FWDU3DCarOnOffButton = FWDU3DCarOnOffButton;
}(window));