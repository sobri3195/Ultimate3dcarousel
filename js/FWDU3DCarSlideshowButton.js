/* FWDU3DCarSlideshowButton */
(function(window)
{
	var FWDU3DCarSlideshowButton = function(data)
	{
		var self = this;
		var prototype = FWDU3DCarSlideshowButton.prototype;

		this.playButtonNImg = data.playButtonNImg;
		this.playButtonSImg = data.playButtonSImg;
		this.pauseButtonImg = data.pauseButtonImg;
		this.timerButtonImg = data.slideshowTimerImg;

		this.playButtonDO;
		this.playButtonNDO;
		this.playButtonSDO;
		
		this.pauseButtonDO;
		
		this.timerButtonDO;
		this.timerButtonBgDO;
		this.timerButtonTextDO;
		
		this.delay = data.slideshowDelay;
		this.autoplay = data.autoplay;
		this.curSeconds = data.slideshowDelay/1000;
		
		this.isPlaying = false;
		this.isCounting = false;
		
		this.btnWidth = self.playButtonNImg.width;
		this.btnHeight = self.playButtonNImg.height;

		this.isMobile = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent = FWDU3DCarUtils.hasPointerEvent;
		
		this.timeoutId;
		this.timerIntervalId;

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
			self.setButtonMode(true);
			self.setWidth(self.btnWidth);
			self.setHeight(self.btnHeight);
			
			self.setPauseButton();
			self.settimerButton();
			self.setPlayButton();

			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}
				else
				{
					self.screen.addEventListener("touchend", self.onClick);
				}
			}
			else
			{
				if (window.addEventListener)
				{
					self.screen.addEventListener("mouseover", self.onMouseOver);
					self.screen.addEventListener("mouseout", self.onMouseOut);
					self.screen.addEventListener("click", self.onClick);
				}
				else
				{
					self.screen.attachEvent("onmouseover", self.onMouseOver);
					self.screen.attachEvent("onmouseout", self.onMouseOut);
					self.screen.attachEvent("onclick", self.onClick);
				}
			}
		};
		
		this.settimerButton = function()
		{
			self.timerButtonDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.timerButtonDO);
			
			self.timerButtonDO.setWidth(self.btnWidth);
			self.timerButtonDO.setHeight(self.btnHeight);
			
			self.timerButtonBgDO = new FWDU3DCarSimpleDisplayObject("img");
			self.timerButtonBgDO.setScreen(self.timerButtonImg);
			self.timerButtonDO.addChild(self.timerButtonBgDO);
			
			self.timerButtonTextDO = new FWDU3DCarDisplayObject("div");
			self.timerButtonDO.addChild(self.timerButtonTextDO);
			
			self.timerButtonTextDO.getStyle().fontSmoothing = "antialiased";
			self.timerButtonTextDO.getStyle().webkitFontSmoothing = "antialiased";
			self.timerButtonTextDO.getStyle().textRendering = "optimizeLegibility";
			
			self.timerButtonTextDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.timerButtonTextDO.getStyle().fontSize = "10px";
			self.timerButtonTextDO.getStyle().color = data.slideshowTimerColor;
			
			if (self.curSeconds < 10)
				self.timerButtonTextDO.setInnerHTML("0" + self.curSeconds);
			else
				self.timerButtonTextDO.setInnerHTML(self.curSeconds);
				
			self.setTextPositionId = setTimeout(self.setTextPosition, 10);
		};
		
		this.setTextPosition = function()
		{
			self.timerButtonTextDO.setX(Math.floor((self.btnWidth - self.timerButtonTextDO.getWidth())/2));
			self.timerButtonTextDO.setY(Math.floor((self.btnHeight - self.timerButtonTextDO.getHeight())/2));
		};
		
		this.setPauseButton = function()
		{
			self.pauseButtonDO = new FWDU3DCarSimpleDisplayObject("img");
			self.pauseButtonDO.setScreen(self.pauseButtonImg);
			self.addChild(self.pauseButtonDO);
			
			self.pauseButtonDO.setWidth(self.btnWidth);
			self.pauseButtonDO.setHeight(self.btnHeight);
		};
		
		this.setPlayButton = function()
		{
			self.playButtonDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.playButtonDO);
			
			self.playButtonSDO = new FWDU3DCarSimpleDisplayObject("img");
			self.playButtonSDO.setScreen(self.playButtonSImg);
			self.playButtonDO.addChild(self.playButtonSDO);
			
			self.playButtonNDO = new FWDU3DCarSimpleDisplayObject("img");
			self.playButtonNDO.setScreen(self.playButtonNImg);
			self.playButtonDO.addChild(self.playButtonNDO);
			
			self.playButtonDO.setWidth(self.btnWidth);
			self.playButtonDO.setHeight(self.btnHeight);
		};

		this.onMouseOver = function()
		{
			if (self.isPlaying)
			{
				FWDU3DCarModTweenMax.to(self.timerButtonDO, .8, {alpha:0, ease : Expo.easeOut});
			}
			else
			{
				FWDU3DCarModTweenMax.to(self.playButtonNDO, .8, {alpha:0, ease : Expo.easeOut});
			}
		};

		this.onMouseOut = function()
		{
			if (self.isPlaying)
			{
				FWDU3DCarModTweenMax.to(self.timerButtonDO, .8, {alpha:1, ease : Expo.easeOut});
			}
			else
			{
				FWDU3DCarModTweenMax.to(self.playButtonNDO, .8, {alpha:1, ease : Expo.easeOut});
			}
		};

		this.onClick = function(e)
		{
			if (self.isPlaying)
			{
				self.stop();
				
				self.dispatchEvent(FWDU3DCarSlideshowButton.PAUSE_CLICK);
			}
			else
			{
				self.start();
				
				self.dispatchEvent(FWDU3DCarSlideshowButton.PLAY_CLICK);
			}
			
			if (!self.isMobile)
			{
				self.onMouseOver();
			}
		};
		
		this.start = function()
		{
			self.isPlaying = true;
			self.isCounting = true;
			self.playButtonDO.setAlpha(0);
			self.curSeconds = self.delay/1000;
			
			clearTimeout(self.timeoutId);
			clearInterval(self.timerIntervalId);
			self.timeoutId = setTimeout(self.onTimeHandler, self.delay);
			self.timerIntervalId = setInterval(self.onTickHandler, 1000);
			
			if (self.curSeconds < 10)
				self.timerButtonTextDO.setInnerHTML("0" + self.curSeconds);
			else
				self.timerButtonTextDO.setInnerHTML(self.curSeconds);
		};
		
		this.stop = function()
		{
			self.isPlaying = false;
			self.isCounting = false;
			self.playButtonDO.setAlpha(1);
			
			clearTimeout(self.timeoutId);
			clearInterval(self.timerIntervalId);
		};
		
		this.resetCounter = function()
		{
			self.isCounting = false;
			
			clearTimeout(self.timeoutId);
			clearInterval(self.timerIntervalId);
			
			self.curSeconds = self.delay/1000;
			
			if (self.curSeconds < 10)
				self.timerButtonTextDO.setInnerHTML("0" + self.curSeconds);
			else
				self.timerButtonTextDO.setInnerHTML(self.curSeconds);
		};
		
		this.onTimeHandler = function()
		{
			self.isCounting = false;
			
			clearTimeout(self.timeoutId);
			clearInterval(self.timerIntervalId);
			
			self.onTickHandler();
			self.dispatchEvent(FWDU3DCarSlideshowButton.TIME);
		};
		
		this.onTickHandler = function()
		{
			self.curSeconds--;
			
			if (self.curSeconds < 10)
				self.timerButtonTextDO.setInnerHTML("0" + self.curSeconds);
			else
				self.timerButtonTextDO.setInnerHTML(self.curSeconds);
		};

		// ##############################//
		/* destroy */
		// ##############################//
		this.destroy = function()
		{
			clearTimeout(self.timeoutId);
			clearTimeout(self.setTextPositionId);
			clearInterval(self.timerIntervalId);
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}
				else
				{
					self.screen.removeEventListener("touchend", self.onClick);
				}
			}
			else
			{
				if (window.addEventListener)
				{
					self.screen.removeEventListener("mouseover", self.onMouseOver);
					self.screen.removeEventListener("mouseout", self.onMouseOut);
					self.screen.removeEventListener("click", self.onClick);
				}
				else
				{
					self.screen.detachEvent("onmouseover", self.onMouseOver);
					self.screen.detachEvent("onmouseout", self.onMouseOut);
					self.screen.detachEvent("onclick", self.onClick);
				}
			}
			
			FWDU3DCarModTweenMax.killTweensOf(self.timerButtonDO);
			FWDU3DCarModTweenMax.killTweensOf(self.playButtonNDO);
			
			self.playButtonDO.destroy();
			self.playButtonNDO.destroy();
			self.playButtonSDO.destroy();
			
			self.pauseButtonDO.destroy();
			
			self.timerButtonDO.destroy();
			self.timerButtonBgDO.destroy();
			self.timerButtonTextDO.destroy();
			
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarSlideshowButton.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarSlideshowButton.setPrototype = function()
	{
		FWDU3DCarSlideshowButton.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarSlideshowButton.PLAY_CLICK = "onPlayClick";
	FWDU3DCarSlideshowButton.PAUSE_CLICK = "onPauseClick";
	FWDU3DCarSlideshowButton.TIME = "onTime";

	FWDU3DCarSlideshowButton.prototype = null;
	window.FWDU3DCarSlideshowButton = FWDU3DCarSlideshowButton;
}(window));