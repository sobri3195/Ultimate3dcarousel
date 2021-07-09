/* FWDU3DCarComplexButton */
(function (window){
var FWDU3DCarComplexButton = function(
			n1Img, 
			s1Img, 
			n2Img, 
			s2Img, 
			hasTouchSupport_bl,
			disptachMainEvent_bl
		){
		
		var self = this;
		var prototype = FWDU3DCarComplexButton.prototype;
		
		this.n1Img = n1Img;
		this.s1Img = s1Img;
		this.n2Img = n2Img;
		this.s2Img = s2Img;
		
		this.firstButton_do;
		this.n1_do;
		this.s1_do;
		this.secondButton_do;
		this.n2_do;
		this.s2_do;
		
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		this.currentState = 1;
		this.isDisabled_bl = false;
		this.isMaximized_bl = false;
		this.disptachMainEvent_bl = disptachMainEvent_bl;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			this.setButtonMode(true);
			this.setWidth(this.n1Img.width);
			this.setHeight(this.n1Img.height);
			
			this.setupMainContainers();
			this.firstButton_do.setX(3000);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			this.firstButton_do = new FWDU3DCarDisplayObject("div");
			this.addChild(this.firstButton_do);
			this.n1_do = new FWDU3DCarDisplayObject("img");	
			this.n1_do.setScreen(this.n1Img);
			this.s1_do = new FWDU3DCarDisplayObject("img");
			this.s1_do.setScreen(this.s1Img);
			this.firstButton_do.addChild(this.s1_do);
			this.firstButton_do.addChild(this.n1_do);
			this.firstButton_do.setWidth(this.n1Img.width);
			this.firstButton_do.setHeight(this.n1Img.height);
			
			this.secondButton_do = new FWDU3DCarDisplayObject("div");
			this.addChild(this.secondButton_do);
			this.n2_do = new FWDU3DCarDisplayObject("img");	
			this.n2_do.setScreen(this.n2Img);
			this.s2_do = new FWDU3DCarDisplayObject("img");
			this.s2_do.setScreen(this.s2Img);
			this.secondButton_do.addChild(this.s2_do);
			this.secondButton_do.addChild(this.n2_do);
			this.secondButton_do.setWidth(this.n2Img.width);
			this.secondButton_do.setHeight(this.n2Img.height);
			
			this.addChild(this.firstButton_do);
			this.addChild(this.secondButton_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onClick);
			}
		};
		
		this.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDU3DCarModTweenMax.killTweensOf(self.n1_do);
				FWDU3DCarModTweenMax.killTweensOf(self.n2_do);
				FWDU3DCarModTweenMax.to(self.n1_do, .8, {alpha:0, ease:Expo.easeOut});
				FWDU3DCarModTweenMax.to(self.n2_do, .8, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				var dl = 0;
				if(self.isMaximized_bl) dl = 1;
				FWDU3DCarModTweenMax.to(self.n1_do, .8, {alpha:1, delay:dl, ease:Expo.easeOut});	
				FWDU3DCarModTweenMax.to(self.n2_do, .8, {alpha:1, delay:dl, ease:Expo.easeOut});	
			}
		};
		
		this.onMouseDown = function(e){
			if(self.disptachMainEvent_bl){
				self.dispatchEvent(FWDU3DCarComplexButton.CLICK);
			}else{
				if(!self.isDisabled_bl) self.toggleButton();
			}
		};
			
		this.onClick = function(e){
			if(self.disptachMainEvent_bl){
				self.dispatchEvent(FWDU3DCarComplexButton.CLICK);
			}else{
				if(!self.isDisabled_bl) self.toggleButton();
			}
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		this.toggleButton = function(){
			if(this.currentState == 1){
				this.firstButton_do.setX(0);
				this.secondButton_do.setX(3000);
				this.currentState = 0;
				this.dispatchEvent(FWDU3DCarComplexButton.SECOND_BUTTON_CLICK);
			}else{
				this.firstButton_do.setX(3000);
				this.secondButton_do.setX(0);
				this.currentState = 1;
				this.dispatchEvent(FWDU3DCarComplexButton.FIRST_BUTTON_CLICK);
			}
		};
		
		/* set second buttons state */
		this.setSecondButtonState = function(){
			this.firstButton_do.setX(0);
			this.secondButton_do.setX(3000);
			this.currentState = 0;
		};
		
		//##############################//
		/* destroy */
		//##############################//
		this.destroy = function(){
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.removeEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.removeEventListener){	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mouseup", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmouseup", self.onClick);
			}
			
			FWDU3DCarModTweenMax.killTweensOf(self.n1_do);
			FWDU3DCarModTweenMax.killTweensOf(self.n2_do);
			
			self.firstButton_do.destroy();
			self.n1_do.destroy();
			self.s1_do.destroy();
			self.secondButton_do.destroy();
			self.n2_do.destroy();
			self.s2_do.destroy();
			
			self.firstButton_do = null;
			self.n1_do = null;
			self.s1_do = null;
			self.secondButton_do = null;
			self.n2_do = null;
			self.s2_do = null;
			
			self.n1Img = null;
			self.s1Img = null;
			self.n2Img = null;
			self.s2Img = null;
			
			n1Img = null;
			s1Img = null;
			n2Img = null;
			s2Img = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarComplexButton.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDU3DCarComplexButton.setPrototype = function(){
		FWDU3DCarComplexButton.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDU3DCarComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDU3DCarComplexButton.CLICK = "onClick";
	
	FWDU3DCarComplexButton.prototype = null;
	window.FWDU3DCarComplexButton = FWDU3DCarComplexButton;
}(window));