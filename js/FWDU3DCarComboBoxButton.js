/* FWDU3DCarComboBoxButton */
(function (){
var FWDU3DCarComboBoxButton = function(
			label1, 
			backgroundNormalColor1,
			backgroundSelectedColor1,
			backgroundNormalColor2,
			backgroundSelectedColor2,
			textNormalColor,
			textSelectedColor,
			id,
			totalHeight
		){
		
		var self = this;
		var prototype = FWDU3DCarComboBoxButton.prototype;
		
		this.bk_sdo = null;
		this.text_sdo = null;
		this.dumy_sdo = null;
		
		this.label1_str = label1;
		this.backgroundNormalColor_str1 = backgroundNormalColor1;
		this.backgroundSelectedColor_str1 = backgroundSelectedColor1;
		this.backgroundNormalColor_str2 = backgroundNormalColor2;
		this.backgroundSelectedColor_str2 = backgroundSelectedColor2;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		
		this.totalWidth = 400;
		this.totalHeight = totalHeight;
		this.id = id;
		
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		this.isDisabled_bl = false;
		
		this.colorObj = {color1:self.backgroundNormalColor_str1, color2:self.backgroundNormalColor_str2};
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.bk_sdo = new FWDU3DCarSimpleDisplayObject("div");
			self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str1, self.backgroundNormalColor_str2);
			self.addChild(self.bk_sdo);
			
			self.text_sdo = new FWDU3DCarSimpleDisplayObject("div");
			self.text_sdo.getStyle().whiteSpace = "nowrap";
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.setOverflow("visible");
			self.text_sdo.setDisplay("inline-block");
			self.text_sdo.getStyle().fontFamily = "Arial";
			self.text_sdo.getStyle().fontSize= "13px";
			self.text_sdo.getStyle().padding = "6px";
			self.text_sdo.getStyle().color = self.normalColor_str;
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.text_sdo.screen.innerText = self.label1_str;
			}
			else
			{
				self.text_sdo.setInnerHTML(self.label1_str);
			}
			
			self.addChild(self.text_sdo);
			
			self.dumy_sdo = new FWDU3DCarSimpleDisplayObject("div");
			if(FWDU3DCarUtils.isIE){
				self.dumy_sdo.setBkColor("#FF0000");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onclick", self.onClick);
			}
		};
		
		self.onMouseOver = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDU3DCarModTweenMax.killTweensOf(self.text_sdo);
				self.setSelectedState(true);
				self.dispatchEvent(FWDU3DCarComboBoxButton.MOUSE_OVER);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDU3DCarModTweenMax.killTweensOf(self.text_sdo);
				self.setNormalState(true);
				self.dispatchEvent(FWDU3DCarComboBoxButton.MOUSE_OUT);
			}
		};
		
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDU3DCarComboBoxButton.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDU3DCarComboBoxButton.MOUSE_DOWN, {e:e});
		};
		
		//###########################################//
		/* set selected / normal state */
		//###########################################//
		this.setSelectedState = function(animate){
			if(animate){
				FWDU3DCarModTweenMax.to(self.colorObj, .6, {colorProps:{color1:self.backgroundSelectedColor_str1, color2:self.backgroundSelectedColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDU3DCarModTweenMax.to(self.text_sdo.screen, .6, {css:{color:self.textSelectedColor_str}, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundSelectedColor_str, self.backgroundNormalColor_str);
				self.text_sdo.getStyle().color = self.textSelectedColor_str;
			}
		};
		
		this.setNormalState = function(animate){
			if(animate){
				FWDU3DCarModTweenMax.to(self.colorObj, .6, {colorProps:{color1:self.backgroundNormalColor_str1, color2:self.backgroundNormalColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDU3DCarModTweenMax.to(self.text_sdo.screen, .6, {css:{color:self.textNormalColor_str}, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str, self.backgroundSelectedColor_str);
				self.text_sdo.getStyle().color = self.textNormalColor_str;
			}
		};
		
		this.applyProps = function()
		{
			self.bk_sdo.setCSSGradient(self.colorObj.color1, self.colorObj.color2);
		};

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			self.bk_sdo.setWidth(self.totalWidth);
			self.bk_sdo.setHeight(self.totalHeight);
			if(FWDU3DCarUtils.isIEAndLessThen9 || FWDU3DCarUtils.isSafari){
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2) - 1);
			}else{
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2));
			}
			self.text_sdo.setHeight(self.totalHeight + 2);
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.getMaxTextWidth = function(){
			return self.text_sdo.getWidth();
		};
		
		//##############################//
		/* disable / enable */
		//#############################//
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			self.setSelectedState(true);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setNormalState(true);
			self.setButtonMode(true);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.removeEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.removeEventListener){
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("click", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onclick", self.onClick);
			}
			
			FWDU3DCarModTweenMax.killTweensOf(self.text_sdo.screen);
			FWDU3DCarModTweenMax.killTweensOf(self.bk_sdo.screen);
			
			self.text_sdo.destroy();
			self.bk_sdo.destroy();
			self.dumy_sdo.destroy();
			
			self.bk_sdo = null;
			self.text_sdo = null;
			self.dumy_sdo = null;
			
			self.label1_str = null;
			self.normalColor_str = null;
			self.textSelectedColor_str = null;
			self.disabledColor_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarComboBoxButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarComboBoxButton.setPrototype = function(){
		FWDU3DCarComboBoxButton.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarComboBoxButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDU3DCarComboBoxButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDU3DCarComboBoxButton.MOUSE_OVER = "onMouseOver";
	FWDU3DCarComboBoxButton.MOUSE_OUT = "onMouseOut";
	FWDU3DCarComboBoxButton.MOUSE_DOWN = "onMouseDown";
	FWDU3DCarComboBoxButton.CLICK = "onClick";
	
	FWDU3DCarComboBoxButton.prototype = null;
	window.FWDU3DCarComboBoxButton = FWDU3DCarComboBoxButton;
}(window));