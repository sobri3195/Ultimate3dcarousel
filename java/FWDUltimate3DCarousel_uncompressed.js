/*!
 * VERSION: beta 1.2.0
 * DATE: 2013-03-01
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";var t=/(\d|\.)+/g,e={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},i=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},s=function(s){if(""===s||null==s||"none"===s)return e.transparent;if(e[s])return e[s];if("number"==typeof s)return[s>>16,255&s>>8,255&s];if("#"===s.charAt(0))return 4===s.length&&(s="#"+s.charAt(1)+s.charAt(1)+s.charAt(2)+s.charAt(2)+s.charAt(3)+s.charAt(3)),s=parseInt(s.substr(1),16),[s>>16,255&s>>8,255&s];if("hsl"===s.substr(0,3)){s=s.match(t);var r=Number(s[0])%360/360,n=Number(s[1])/100,a=Number(s[2])/100,o=.5>=a?a*(n+1):a+n-a*n,h=2*a-o;return s.length>3&&(s[3]=Number(s[3])),s[0]=i(r+1/3,h,o),s[1]=i(r,h,o),s[2]=i(r-1/3,h,o),s}return s.match(t)||e.transparent};window._gsDefine.plugin({propName:"colorProps",priority:-1,API:2,init:function(t,e){this._target=t;var i,r,n,a;for(i in e)n=s(e[i]),this._firstPT=a={_next:this._firstPT,p:i,f:"function"==typeof t[i],n:i,r:!1},r=s(a.f?t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]():t[i]),a.s=Number(r[0]),a.c=Number(n[0])-a.s,a.gs=Number(r[1]),a.gc=Number(n[1])-a.gs,a.bs=Number(r[2]),a.bc=Number(n[2])-a.bs,(a.rgba=r.length>3||n.length>3)&&(a.as=4>r.length?1:Number(r[3]),a.ac=(4>n.length?1:Number(n[3]))-a.as),a._next&&(a._next._prev=a);return!0},set:function(t){for(var e,i=this._firstPT;i;)e=(i.rgba?"rgba(":"rgb(")+(i.s+t*i.c>>0)+", "+(i.gs+t*i.gc>>0)+", "+(i.bs+t*i.bc>>0)+(i.rgba?", "+(i.as+t*i.ac):"")+")",i.f?this._target[i.p](e):this._target[i.p]=e,i=i._next}})}),window._gsDefine&&window._gsQueue.pop()();/* combo box */
(function (window){
	
	var FWDU3DCarComboBox = function(parent, props_obj){
		
		var self = this;
		var prototype = FWDU3DCarComboBox.prototype;
		
		this.categories_ar = props_obj.categories_ar;
		this.buttons_ar = [];
		
		this.mainHolder_do = null;
		this.selector_do = null;
		this.mainButtonsHolder_do = null;
		this.buttonsHolder_do = null;
		
		this.arrowW = props_obj.arrowW;
		this.arrowH = props_obj.arrowH;
		
		this.arrowN_str = props_obj.arrowN_str;
		this.arrowS_str = props_obj.arrowS_str;
		
		this.selectorLabel_str = props_obj.selectorLabel;
		this.selectorBkColorN_str1 = props_obj.selectorBackgroundNormalColor1;
		this.selectorBkColorS_str1 = props_obj.selectorBackgroundSelectedColor1;
		this.selectorBkColorN_str2 = props_obj.selectorBackgroundNormalColor2;
		this.selectorBkColorS_str2 = props_obj.selectorBackgroundSelectedColor2;
		this.selectorTextColorN_str = props_obj.selectorTextNormalColor;
		this.selectorTextColorS_str = props_obj.selectorTextSelectedColor;
		this.itemBkColorN_str1 = props_obj.buttonBackgroundNormalColor1;
		this.itemBkColorS_str1 = props_obj.buttonBackgroundSelectedColor1;
		this.itemBkColorN_str2 = props_obj.buttonBackgroundNormalColor2;
		this.itemBkColorS_str2 = props_obj.buttonBackgroundSelectedColor2;
		this.itemTextColorN_str = props_obj.buttonTextNormalColor;
		this.itemTextColorS_str = props_obj.buttonTextSelectedColor;
		this.shadowColor_str = props_obj.shadowColor;
		this.position_str = props_obj.position;
		
		this.finalX;
		this.finalY;
		this.totalButtons = self.categories_ar.length;
		this.curId = props_obj.startAtCategory;
		this.horizontalMargins = props_obj.comboBoxHorizontalMargins;
		this.verticalMargins = props_obj.comboBoxVerticalMargins;
		this.buttonsHolderWidth = 0;
		this.buttonsHolderHeight = 0;
		this.totalWidth = 0;
		this.buttonHeight = 26;
		this.totalButtonsHeight = 0;
		this.sapaceBetweenButtons = 0;
		this.borderRadius = props_obj.comboBoxCornerRadius;
		
		this.hideMenuTimeOutId_to;
		this.getMaxWidthResizeAndPositionId_to;
		
		this.isShowed_bl = false;
		this.isOpened_bl = false;
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		
		this.init = function(){
			self.setVisible(false);
			
			self.setZ(200000);
		
			self.setupMainContainers();
			self.getMaxWidthResizeAndPositionId_to = setTimeout(
					function(){
						self.getMaxWidthResizeAndPosition(),
						self.setButtonsState();
						self.position();
						self.showFirstTime();}
						, 200);
		};
		
		//#####################################//
		/* setup main containers */
		//####################################//
		this.setupMainContainers = function(){
			var button_do;
			
			self.mainHolder_do = new FWDU3DCarDisplayObject("div");
			self.mainHolder_do.setOverflow("visible");
			self.addChild(self.mainHolder_do);
			
			self.mainButtonsHolder_do = new FWDU3DCarDisplayObject("div");
			self.mainButtonsHolder_do.setY(self.buttonHeight);
			self.mainHolder_do.addChild(self.mainButtonsHolder_do);
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div");
			self.mainButtonsHolder_do.addChild(self.buttonsHolder_do);
			
			FWDU3DCarComboBoxSelector.setPrototype();
			self.selector_do = new FWDU3DCarComboBoxSelector(
					self.arrowW,
					self.arrowH,
					self.arrowN_str,
					self.arrowS_str,
					self.selectorLabel_str,
					self.selectorBkColorN_str1,
					self.selectorBkColorS_str1,
					self.selectorBkColorN_str2,
					self.selectorBkColorS_str2,
					self.selectorTextColorN_str,
					self.selectorTextColorS_str,
					self.buttonHeight);
			self.mainHolder_do.addChild(self.selector_do);
			self.selector_do.setNormalState(false);
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderTopLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderTopRightRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
				self.getStyle().borderRadius = self.borderRadius + "px";
			}
			self.selector_do.addListener(FWDU3DCarComboBoxSelector.MOUSE_DOWN, self.openMenuHandler);
			
			for(var i=0; i<self.totalButtons; i++){
				FWDU3DCarComboBoxButton.setPrototype();
				button_do = new FWDU3DCarComboBoxButton(
						self.categories_ar[i],
						self.itemBkColorN_str1,
						self.itemBkColorS_str1,
						self.itemBkColorN_str2,
						self.itemBkColorS_str2,
						self.itemTextColorN_str,
						self.itemTextColorS_str,
						i,
						self.buttonHeight);
				self.buttons_ar[i] = button_do;
				button_do.addListener(FWDU3DCarComboBoxButton.MOUSE_DOWN, self.buttonOnMouseDownHandler);
				self.buttonsHolder_do.addChild(button_do);
			}
			
			if(self.borderRadius != 0){
				button_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				button_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
			}
		};
		
		this.buttonOnMouseDownHandler = function(e){
		
			self.curId = e.target.id;
			self.setButtonsStateBasedOnId();
			
			clearTimeout(self.hideMenuTimeOutId_to);
			
			self.hide(true);
			
			self.selector_do.enable(); 
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
				}else{
					window.removeEventListener("touchstart", self.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.removeEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", self.checkOpenedMenu);
				}
			}

			self.dispatchEvent(FWDU3DCarComboBox.BUTTON_PRESSED, {id:self.curId});
		};
		
		this.openMenuHandler = function(){
			if(self.isShowed_bl) return;
			self.selector_do.disable();
			self.show(true);
			self.startToCheckOpenedMenu();
			
			self.dispatchEvent(FWDU3DCarComboBox.OPEN);
		};
		
		//#######################################//
		/* Disable or enable buttons */
		//#######################################//
		this.setButtonsStateBasedOnId = function(){
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(i == self.curId){
					button_do.disable();
				}else{
					button_do.enable();
				}
			}
		};
		
		this.setValue = function(id)
		{
			self.curId = id;
			self.setButtonsStateBasedOnId();
		};
		
		//#######################################//
		/* Start to check if mouse is over menu */
		//#######################################//
		this.startToCheckOpenedMenu = function(e){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerDown", self.checkOpenedMenu);
				}else{
					window.addEventListener("touchstart", self.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.checkOpenedMenu);
				}
			}
		};
		
		this.checkOpenedMenu = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);		
			
			if(!FWDU3DCarUtils.hitTest(self.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				
				if(self.isMobile_bl){
					self.hide(true);
					self.selector_do.enable();
				}else{
					clearTimeout(self.hideMenuTimeOutId_to);
					self.hideMenuTimeOutId_to = setTimeout(function(){
						self.hide(true);
						self.selector_do.enable();}, 
						1000);
				}
				
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
					}else{
						window.removeEventListener("touchstart", self.checkOpenedMenu);
					}
				}else{
					if(window.addEventListener){
						window.removeEventListener("mousemove", self.checkOpenedMenu);
					}else if(document.attachEvent){
						document.detachEvent("onmousemove", self.checkOpenedMenu);
					}
				}
			}else{
				clearTimeout(self.hideMenuTimeOutId_to);
			}
		};
		
		
		
		//########################################//
		/* Get max width and position */
		//#######################################//
		self.getMaxWidthResizeAndPosition = function(){
			
			var button_do;
			var finalX;
			var finalY;
			self.totalWidth = 0;
			self.totalButtonsHeight = 0;
			
			self.totalWidth = self.selector_do.getMaxTextWidth() + 20;
			
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(button_do.getMaxTextWidth() > self.totalWidth) self.totalWidth = button_do.getMaxTextWidth();
			};
			
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				button_do.setY((i * (button_do.totalHeight + self.sapaceBetweenButtons)));
				button_do.totalWidth =  self.totalWidth;
				button_do.setWidth(self.totalWidth);
				button_do.centerText();
			}
			
			self.totalButtonsHeight = button_do.getY() + button_do.totalHeight;
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.buttonHeight);
			self.mainButtonsHolder_do.setWidth(self.totalWidth);
			self.selector_do.totalWidth =  self.totalWidth;
			self.selector_do.setWidth(self.totalWidth);
			self.selector_do.centerText();
			self.buttonsHolder_do.setWidth(self.totalWidth);
			self.buttonsHolder_do.setHeight(self.totalButtonsHeight);
			self.hide(false, true);
		};
		
		//#####################################//
		/* disable or enable buttons based on id */
		//####################################//
		this.setButtonsState = function(){
			var button_do;
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(i ==  self.curId){
					button_do.disable(true);
				}else{
					button_do.enable(true);
				}
			}
		};
		
		//######################################//
		/* position */
		//######################################//
		this.position = function(){
			if(self.position_str == "topleft"){
				self.finalX = Math.max((parent.stageWidth - parent.originalWidth)/2 + self.horizontalMargins, self.horizontalMargins);
				self.finalY = self.verticalMargins;
			}else if(self.position_str == "topright"){
				self.finalX = Math.min((parent.originalWidth - parent.stageWidth)/2 + parent.stageWidth - self.totalWidth - self.horizontalMargins, parent.stageWidth - self.totalWidth - self.horizontalMargins);
				self.finalY = self.verticalMargins;
			}
			
			if (FWDU3DCarUtils.isAndroid)
			{
				self.setX(Math.floor(self.finalX));
				self.setY(Math.floor(self.finalY-1));
				setTimeout(self.posCombobox, 100);
			}
			else
			{
				self.posCombobox();
			}
		};
		
		this.posCombobox = function()
		{
			self.setX(Math.floor(self.finalX));
			self.setY(Math.floor(self.finalY));
		};
		
		//#####################################//
		/* hide / show */
		//####################################//
		this.showFirstTime = function(){
			self.setVisible(true);
			if(self.position_str == "topleft" || self.position_str == "topright"){
				self.mainHolder_do.setY( -(self.verticalMargins + self.buttonHeight));
			}
			self.getStyle().boxShadow = "0px 0px 3px " + self.shadowColor_str;
			FWDU3DCarModTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});	
		};
		
		this.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			FWDU3DCarModTweenMax.killTweensOf(this);
			self.isShowed_bl = false;
			
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
			}
			
			if(animate){
				FWDU3DCarModTweenMax.to(self.buttonsHolder_do, .6, {y:- self.totalButtonsHeight, ease:Expo.easeInOut});	
				FWDU3DCarModTweenMax.to(self.mainButtonsHolder_do, .6, {h:0, ease:Expo.easeInOut});	
				FWDU3DCarModTweenMax.to(self, .6, {h:self.buttonHeight, ease:Expo.easeInOut});	
			}else{
				self.buttonsHolder_do.setY(self.buttonHeight - self.totalButtonsHeight);
				self.mainButtonsHolder_do.setHeight(0);
				self.setHeight(self.buttonHeight);
			}
		};

		this.show = function(animate, overwrite){
			if(self.isShowed_bl && !overwrite) return;
			FWDU3DCarModTweenMax.killTweensOf(this);
			self.isShowed_bl = true;
			
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = 0 + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = 0 + "px";
			}
			
			if(animate){
				FWDU3DCarModTweenMax.to(self.buttonsHolder_do, .6, {y:0, ease:Expo.easeInOut});
				FWDU3DCarModTweenMax.to(self.mainButtonsHolder_do, .6, {h:self.totalButtonsHeight + self.buttonHeight, ease:Expo.easeInOut});	
				FWDU3DCarModTweenMax.to(self, .6, {h:self.totalButtonsHeight + self.buttonHeight, ease:Expo.easeInOut});	
			}else{
				self.buttonsHolder_do.setY(self.buttonHeight);
				self.mainButtonsHolder_do.setHeight(self.buttonHeight + self.buttonHeight);
				self.setHeight(self.buttonHeight + self.buttonHeight);
			}
		};
		
		this.init();
		
		//#################################//
		/* destroy */
		//################################//
		this.destroy = function(){
			
			if(self.isMobile_bl){
				window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
				window.removeEventListener("touchstart", self.checkOpenedMenu);
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.checkOpenedMenu);
				}
			}
			
			clearTimeout(self.hideMenuTimeOutId_to);
			clearTimeout(self.getMaxWidthResizeAndPositionId_to);
			
			FWDU3DCarModTweenMax.killTweensOf(self);
			FWDU3DCarModTweenMax.killTweensOf(self.mainHolder_do);
			FWDU3DCarModTweenMax.killTweensOf(self.buttonsHolder_do);	
			FWDU3DCarModTweenMax.killTweensOf(self.mainButtonsHolder_do);
			
			
			//for(var i=0; i<self.totalButtons; i++) self.buttons_ar[i].destroy();
			
			
			
			self.mainHolder_do.destroy();
			self.selector_do.destroy();
			self.mainButtonsHolder_do.destroy();
			self.buttonsHolder_do.destroy();
			
			self.categories_ar = null;
			self.buttons_ar = null;
			self.mainHolder_do = null;
			self.selector_do = null;
			self.mainButtonsHolder_do = null;
			self.buttonsHolder_do = null;
			self.upArrowN_img = null;
			self.upArrowS_img = null;
			
			parent = null;
			props_obj = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarComboBox.prototype = null;
		};
	};
	
	/* set prototype */
	FWDU3DCarComboBox.setPrototype =  function(){
		FWDU3DCarComboBox.prototype = new FWDU3DCarDisplayObject3D("div");
	};

	FWDU3DCarComboBox.OPEN = "open";
	FWDU3DCarComboBox.HIDE_COMPLETE = "infoWindowHideComplete";
	FWDU3DCarComboBox.BUTTON_PRESSED = "buttonPressed";

	FWDU3DCarComboBox.prototype = null;
	window.FWDU3DCarComboBox = FWDU3DCarComboBox;
	
}(window));/* FWDU3DCarComboBoxButton */
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
}(window));/* FWDU3DCarComboBoxSelector */
(function (){
var FWDU3DCarComboBoxSelector = function(
			arrowW,
			arrowH,
			arrowN_str,
			arrowS_str,
			label1, 
			backgroundNormalColor1,
			backgroundSelectedColor1,
			backgroundNormalColor2,
			backgroundSelectedColor2,
			textNormalColor,
			textSelectedColor,
			totalHeight
		){
		
		var self = this;
		var prototype = FWDU3DCarComboBoxSelector.prototype;
		
		this.arrowN_sdo = null;
		this.arrowS_sdo = null;
		
		this.arrowN_str = arrowN_str;
		this.arrowS_str = arrowS_str;
		
		this.label1_str = label1;
		this.backgroundNormalColor_str1 = backgroundNormalColor1;
		this.backgroundNormalColor_str2 = backgroundNormalColor2;
		this.backgroundSelectedColor_str1 = backgroundSelectedColor1;
		this.backgroundSelectedColor_str2 = backgroundSelectedColor2;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		
		this.totalWidth = 400;
		this.totalHeight = totalHeight;
		this.arrowWidth = arrowW;
		this.arrowHeight = arrowH;
		
		this.bk_sdo = null;
		this.text_sdo = null;
		this.dumy_sdo = null;
		
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
			
			self.arrowN_sdo = new FWDU3DCarSimpleDisplayObject("div");
			self.arrowN_sdo.screen.style.backgroundImage = "url(" + self.arrowN_str + ")";
			self.arrowS_sdo = new FWDU3DCarSimpleDisplayObject("div");
			self.arrowS_sdo.screen.style.backgroundImage = "url(" + self.arrowS_str + ")";
			self.arrowS_sdo.setAlpha(0);
			self.addChild(self.arrowN_sdo);
			self.addChild(self.arrowS_sdo);
			
			self.arrowN_sdo.setWidth(self.arrowWidth);
			self.arrowN_sdo.setHeight(self.arrowHeight);

			self.arrowS_sdo.setWidth(self.arrowWidth);
			self.arrowS_sdo.setHeight(self.arrowHeight);
			
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
				self.dispatchEvent(FWDU3DCarComboBoxSelector.MOUSE_OVER);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDU3DCarModTweenMax.killTweensOf(self.text_sdo);
				self.setNormalState(true);
				self.dispatchEvent(FWDU3DCarComboBoxSelector.MOUSE_OUT);
			}
		};
		
		self.onClick = function(e){
			if(self.isDeveleper_bl){
				window.open("http://www.webdesign-flash.ro", "_blank");
				return;
			}
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDU3DCarComboBoxSelector.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDU3DCarComboBoxSelector.MOUSE_DOWN, {e:e});
		};
		
		//###########################################//
		/* set selected / normal state */
		//###########################################//
		this.setSelectedState = function(animate){
			if(animate){
				FWDU3DCarModTweenMax.to(self.colorObj, .6, {colorProps:{color1:self.backgroundSelectedColor_str1, color2:self.backgroundSelectedColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDU3DCarModTweenMax.to(self.text_sdo.screen, .6, {css:{color:self.textSelectedColor_str}, ease:Quart.easeOut});
				FWDU3DCarModTweenMax.to(self.arrowS_sdo, .6, {alpha:1, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundSelectedColor_str, self.backgroundNormalColor_str);
				self.text_sdo.getStyle().color = self.textSelectedColor_str;
				self.arrowS_sdo.alpha = 1;
			}
		};
		
		this.setNormalState = function(animate){
			if(animate){
				FWDU3DCarModTweenMax.to(self.colorObj, .6, {colorProps:{color1:self.backgroundNormalColor_str1, color2:self.backgroundNormalColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDU3DCarModTweenMax.to(self.text_sdo.screen, .6, {css:{color:self.textNormalColor_str}, ease:Quart.easeOut});
				FWDU3DCarModTweenMax.to(self.arrowS_sdo, .6, {alpha:0, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str, self.backgroundSelectedColor_str);
				self.text_sdo.getStyle().color = self.textNormalColor_str;
				self.arrowS_sdo.alpha = 0;
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
			
			if(FWDU3DCarUtils.isIEAndLessThen9){
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2) - 1);
			}else{
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2));
			}
			self.text_sdo.setHeight(self.totalHeight + 2);
			
			self.arrowN_sdo.setX(self.totalWidth - self.arrowWidth - 4);
			self.arrowN_sdo.setY(Math.round((self.totalHeight - self.arrowHeight)/2));
			self.arrowS_sdo.setX(self.totalWidth - self.arrowWidth - 4);
			self.arrowS_sdo.setY(Math.round((self.totalHeight - self.arrowHeight)/2));
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
			self.setSelectedState(true);
			if(FWDU3DCarUtils.hasTransform2d){
				FWDU3DCarModTweenMax.to(self.arrowN_sdo.screen, .6, {css:{rotation:180}, ease:Quart.easeOut});
				FWDU3DCarModTweenMax.to(self.arrowS_sdo.screen, .6, {css:{rotation:180}, ease:Quart.easeOut});
			}
			self.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setNormalState(true);
			if(FWDU3DCarUtils.hasTransform2d){
				FWDU3DCarModTweenMax.to(self.arrowN_sdo.screen, .6, {css:{rotation:0}, ease:Quart.easeOut});
				FWDU3DCarModTweenMax.to(self.arrowS_sdo.screen, .6, {css:{rotation:0}, ease:Quart.easeOut});
			}
			self.setButtonMode(true);
		};
		
		this.setText = function(text)
		{
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.text_sdo.screen.innerText = text;
			}
			else
			{
				self.text_sdo.setInnerHTML(text);
			}
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				self.screen.removeEventListener("touchstart", self.onMouseDown);
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
			
			
			FWDU3DCarModTweenMax.killTweensOf(self.text_sdo);
			FWDU3DCarModTweenMax.killTweensOf(self.colorObj);
			self.text_sdo.destroy();
			
			self.dumy_sdo.destroy();
			
			self.text_sdo = null;
			self.dumy_sdo = null;
			
			self.label1_str = null;
			self.normalColor_str = null;
			self.textSelectedColor_str = null;
			self.disabledColor_str = null;
			
			label1 = null;
			normalColor = null;
			selectedColor = null;
			disabledColor = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarComboBoxSelector.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarComboBoxSelector.setPrototype = function(){
		FWDU3DCarComboBoxSelector.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarComboBoxSelector.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDU3DCarComboBoxSelector.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDU3DCarComboBoxSelector.MOUSE_OVER = "onMouseOver";
	FWDU3DCarComboBoxSelector.MOUSE_OUT = "onMouseOut";
	FWDU3DCarComboBoxSelector.MOUSE_DOWN = "onMouseDown";
	FWDU3DCarComboBoxSelector.CLICK = "onClick";
	
	FWDU3DCarComboBoxSelector.prototype = null;
	window.FWDU3DCarComboBoxSelector = FWDU3DCarComboBoxSelector;
}(window));/* FWDU3DCarComplexButton */
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
}(window));/* Context menu */
(function (){
	var FWDU3DCarContextMenu = function(e, showMenu){
		
		var self = this;
		this.parent = e;
		this.url = "http://www.webdesign-flash.ro";
		this.menu_do = null;
		this.normalMenu_do = null;
		this.selectedMenu_do = null;
		this.over_do = null;
		
		this.showMenu_bl = showMenu;
		
		this.init = function(){
			if(this.parent.screen.addEventListener){
				this.parent.screen.addEventListener("contextmenu", this.contextMenuHandler);
			}else{
				this.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler);
			}
		};
		
		this.contextMenuHandler = function(e){	
			if(!self.showMenu_bl){
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}	
				return;
			}
			
			if(self.url.indexOf("sh.r") == -1) return;
			self.setupMenus();
			self.parent.addChild(self.menu_do);
			self.menu_do.setVisible(true);
			self.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		this.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			var screenX =  viewportMouseCoordinates.screenX;
			var screenY =  viewportMouseCoordinates.screenY;
			
			if(!FWDU3DCarUtils.hitTest(self.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				}
				self.menu_do.setX(-500);
			}
		};
		
		/* setup menus */
		this.setupMenus = function(){
			if(this.menu_do) return;
			this.menu_do = new FWDU3DCarDisplayObject("div");
			self.menu_do.setX(-500);
			this.menu_do.getStyle().width = "100%";
			
			this.normalMenu_do = new FWDU3DCarDisplayObject("div");
			this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.normalMenu_do.getStyle().padding = "4px";
			this.normalMenu_do.getStyle().fontSize = "12px";
			this.normalMenu_do.getStyle().color = "#000000";
			this.normalMenu_do.setInnerHTML("&#0169; made by FWDU3DCar");
			this.normalMenu_do.setBkColor("#FFFFFF");
			
			this.selectedMenu_do = new FWDU3DCarDisplayObject("div");
			this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.selectedMenu_do.getStyle().padding = "4px";
			this.selectedMenu_do.getStyle().fontSize = "12px";
			this.selectedMenu_do.getStyle().color = "#FFFFFF";
			this.selectedMenu_do.setInnerHTML("&#0169; made by FWDU3DCar");
			this.selectedMenu_do.setBkColor("#000000");
			this.selectedMenu_do.setAlpha(0);
			
			this.over_do = new FWDU3DCarDisplayObject("div");
			this.over_do.setBkColor("#FF0000");
			this.over_do.setAlpha(0);
			
			this.menu_do.addChild(this.normalMenu_do);
			this.menu_do.addChild(this.selectedMenu_do);
			this.menu_do.addChild(this.over_do);
			this.parent.addChild(this.menu_do);
			this.over_do.setWidth(this.selectedMenu_do.getWidth());
			this.menu_do.setWidth(this.selectedMenu_do.getWidth());
			this.over_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setVisible(false);
			
			this.menu_do.setButtonMode(true);
			this.menu_do.screen.onmouseover = this.mouseOverHandler;
			this.menu_do.screen.onmouseout = this.mouseOutHandler;
			this.menu_do.screen.onclick = this.onClickHandler;
			
			
		};
		
		this.mouseOverHandler = function(){
			if(self.url.indexOf("w.we") == -1) self.menu_do.visible = false;
			FWDU3DCarModTweenMax.to(self.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.mouseOutHandler = function(){
			FWDU3DCarModTweenMax.to(self.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.onClickHandler = function(){
			window.open(self.url, "_blank");
		};
		
		/* position buttons */
		this.positionButtons = function(e){
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > self.parent.getWidth() - self.menu_do.getWidth() - 2){
				finalX = localX - self.menu_do.getWidth() - 2;
			}
			
			if(finalY > self.parent.getHeight() - self.menu_do.getHeight() - 2){
				finalY = localY - self.menu_do.getHeight() - 2;
			}
			self.menu_do.setX(finalX);
			self.menu_do.setY(finalY);
		};
		
		/* destory */
		this.destroy = function(){
		
			if(window.removeEventListener){
				window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				self.parent.screen.removeEventListener("contextmenu", self.contextMenuHandler);
			}else{
				document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				self.parent.screen.detachEvent("oncontextmenu", self.contextMenuHandler);
			}
			
			if(this.menu_do){
				FWDU3DCarModTweenMax.killTweensOf(self.normalMenu_do);
				FWDU3DCarModTweenMax.killTweensOf(self.selectedMenu_do);
				self.normalMenu_do.destroy();
				self.selectedMenu_do.destroy();
				self.over_do.destroy();
				self.menu_do.destroy();
			}
			
			self.parent = null;
			self.menu_do = null;
			self.normalMenu_do = null;
			self.selectedMenu_do = null;
			self.over_do = null;
			self = null;
		};
		
		this.init();
	};
	
	
	FWDU3DCarContextMenu.prototype = null;
	window.FWDU3DCarContextMenu = FWDU3DCarContextMenu;
	
}(window));
/* Data */
(function(window)
{
	var FWDU3DCarData = function(props)
	{
		var self = this;
		var prototype = FWDU3DCarData.prototype;

		this.propsObj = props;
		this.rootElement = null;
		this.graphicsPathsAr = [];
		this.dataListAr = [];
		this.lightboxAr = [];
		this.categoriesAr = [];
		
		this.totalGraphics;
		
		this.countLoadedGraphics = 0;

		this.parseDelayId;

		// ###################################//
		/* init */
		// ###################################//
		this.init = function()
		{
			self.parseDelayId = setTimeout(self.parseProperties, 100);
		};

		this.parseProperties = function()
		{
			var errorMessage;

			// check for carouselDataListDivId property.
			if (!self.propsObj.carouselDataListDivId)
			{
				errorMessage = "Coverflow data list id is not defined in FWDU3DCar3DCoverflow constructor function!";
				self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text : errorMessage});
				
				return;
			};

			// set the root element of the carousel list.
			self.rootElement = FWDU3DCarUtils.getChildById(self.propsObj.carouselDataListDivId);
			
			if (!self.rootElement)
			{
				errorMessage = "Make sure that the div with the id <font color='#FFFFFF'>" + self.propsObj.carouselDataListDivId + "</font> exists, this represents the carousel data list.";
				self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text : errorMessage});
				
				return;
			}
			
			// set main properties.
			self.backgroundColor = self.propsObj.backgroundColor || "transparent";
			self.carRadiusX = self.propsObj.carouselXRadius || 0;
			self.carRadiusY = self.propsObj.carouselYRadius || 0;
			self.carouselTopology = self.propsObj.carouselTopology;
			self.carouselXRotation = self.propsObj.carouselXRotation;
			self.carouselYOffset = self.propsObj.carouselYOffset || 0;
			self.showContextMenu = self.propsObj.showContextMenu == "yes" ? true : false;
			self.addKeyboardSupport = self.propsObj.addKeyboardSupport == "yes" ? true : false;
			
			self.showCenterImg = self.propsObj.showCenterImage == "yes" ? true : false;
			self.centerImgPath = self.propsObj.centerImagePath;
			self.centerImgYOffset = self.propsObj.centerImageYOffset || 0;
			
			//thumbs properties.
			self.thumbWidth = self.propsObj.thumbnailWidth || 400;
			self.thumbHeight = self.propsObj.thumbnailHeight || 266;
			self.thumbBorderSize = self.propsObj.thumbnailBorderSize || 0;
			self.thumbMinAlpha = self.propsObj.thumbnailMinimumAlpha || .3;
			self.thumbBackgroundColor = self.propsObj.thumbnailBackgroundColor || "transparent";
			self.thumbBorderColor1 = self.propsObj.thumbnailBorderColor1 || "transparent";
			self.thumbBorderColor2 = self.propsObj.thumbnailBorderColor2 || "transparent";
			self.transparentImages = self.propsObj.transparentImages == "yes" ? true : false;
			self.maxNumberOfThumbsOnMobile = self.propsObj.maxNumberOfThumbnailsOnMobile || 15;
			self.showGradient = self.propsObj.showThumbnailsGradient == "yes" ? true : false;
			self.showThumbnailsHtmlContent = self.propsObj.showThumbnailsHtmlContent == "yes" ? true : false;
			self.textBackgroundColor = self.propsObj.textBackgroundColor || "transparent";
			self.textBackgroundOpacity = self.propsObj.textBackgroundOpacity || 1;
			self.showText = self.propsObj.showText == "yes" ? true : false;
			self.showTextBackgroundImage = self.propsObj.showTextBackgroundImage == "yes" ? true : false;
			self.showBoxShadow = self.propsObj.showThumbnailBoxShadow == "yes" ? true : false;
			self.thumbBoxShadowCss = self.propsObj.thumbnailBoxShadowCss;
			self.showDisplay2DAlways = self.propsObj.showDisplay2DAlways == "yes" ? true : false;
			self.carouselStartPosition = self.propsObj.carouselStartPosition;
			
			// controls properties.
			self.showScrollbar = self.propsObj.showScrollbar == "yes" ? true : false;
			self.disableScrollbarOnMobile = self.propsObj.disableScrollbarOnMobile == "yes" ? true : false;
			self.disableNextAndPrevButtonsOnMobile = self.propsObj.disableNextAndPrevButtonsOnMobile == "yes" ? true : false;
			self.enableMouseWheelScroll = self.propsObj.enableMouseWheelScroll == "yes" ? true : false;
			self.controlsMaxWidth = self.propsObj.controlsMaxWidth || 800;
			self.handlerWidth = self.propsObj.scrollbarHandlerWidth || 300;
			self.scrollbarTextColorNormal = self.propsObj.scrollbarTextColorNormal || "#777777";
			self.scrollbarTextColorSelected = self.propsObj.scrollbarTextColorSelected || "#FFFFFF";
			self.slideshowDelay = self.propsObj.slideshowDelay || 5000;
			self.autoplay = self.propsObj.autoplay == "yes" ? true : false;
			self.showPrevButton = self.propsObj.showPrevButton == "yes" ? true : false;
			self.showNextButton = self.propsObj.showNextButton == "yes" ? true : false;
			self.showSlideshowButton = self.propsObj.showSlideshowButton == "yes" ? true : false;
			self.slideshowTimerColor = self.propsObj.slideshowTimerColor || "#777777";
			self.controlsPos = self.propsObj.controlsPosition == "top" ? true : false;
			
			//reflection
			self.showRefl = self.propsObj.showReflection == "yes" ? true : false;
			self.reflHeight = self.propsObj.reflectionHeight || 100;
			self.reflDist = self.propsObj.reflectionDistance || 0;
			self.reflAlpha = self.propsObj.reflectionOpacity || .5;
			
			// combobox
			self.showComboBox = self.propsObj.showComboBox == "yes" ? true : false;
			self.showAllCategories = self.propsObj.showAllCategories == "no" ? false : true;
			self.allCategoriesLabel = self.propsObj.allCategoriesLabel || null;
			self.selectLabel = self.propsObj.selectLabel || "not defined!";
			self.selectorBackgroundNormalColor1 = self.propsObj.selectorBackgroundNormalColor1;
			self.selectorBackgroundNormalColor2 = self.propsObj.selectorBackgroundNormalColor2;
			self.selectorBackgroundSelectedColor1 = self.propsObj.selectorBackgroundSelectedColor1;
			self.selectorBackgroundSelectedColor2 = self.propsObj.selectorBackgroundSelectedColor2;
			self.selectorTextNormalColor = self.propsObj.selectorTextNormalColor;
			self.selectorTextSelectedColor = self.propsObj.selectorTextSelectedColor;
			self.buttonBackgroundNormalColor1 = self.propsObj.buttonBackgroundNormalColor1;
			self.buttonBackgroundNormalColor2 = self.propsObj.buttonBackgroundNormalColor2;
			self.buttonBackgroundSelectedColor1 = self.propsObj.buttonBackgroundSelectedColor1;
			self.buttonBackgroundSelectedColor2 = self.propsObj.buttonBackgroundSelectedColor2;
			self.buttonTextNormalColor = self.propsObj.buttonTextNormalColor;
			self.buttonTextSelectedColor = self.propsObj.buttonTextSelectedColor;
			self.comboBoxShadowColor = self.propsObj.comboBoxShadowColor || "#000000";
			self.comboBoxHorizontalMargins = self.propsObj.comboBoxHorizontalMargins || 0;
			self.comboBoxVerticalMargins = self.propsObj.comboBoxVerticalMargins || 0;
			self.comboBoxCornerRadius = self.propsObj.comboBoxCornerRadius || 0;
			
			if ((self.propsObj.comboBoxPosition == "topleft") || (self.propsObj.comboBoxPosition == "topright"))
			{
				self.comboBoxPosition = FWDU3DCarUtils.trim(self.propsObj.comboBoxPosition).toLowerCase();
			}
			else
			{
				self.comboBoxPosition = "topleft";
			}
			
			//lightbox
			self.addLightBoxKeyboardSupport_bl = self.propsObj.addLightBoxKeyboardSupport; 
			self.addLightBoxKeyboardSupport_bl = self.addLightBoxKeyboardSupport_bl == "no" ? false : true;
			
			self.showLightBoxNextAndPrevButtons_bl = self.propsObj.showLightBoxNextAndPrevButtons; 
			self.showLightBoxNextAndPrevButtons_bl = self.showLightBoxNextAndPrevButtons_bl == "no" ? false : true;
			
			self.showInfoWindowByDefault_bl = self.propsObj.showLightBoxInfoWindowByDefault; 
			self.showInfoWindowByDefault_bl = self.showInfoWindowByDefault_bl == "yes" ? true : false;
			
			self.lightBoxVideoAutoPlay_bl = self.propsObj.lightBoxVideoAutoPlay; 
			self.lightBoxVideoAutoPlay_bl = self.lightBoxVideoAutoPlay_bl == "yes" ? true : false;
		
			self.showLightBoxZoomButton_bl = self.propsObj.showLightBoxZoomButton; 
			self.showLightBoxZoomButton_bl = self.showLightBoxZoomButton_bl == "no" ? false : true;
			
			self.showLightBoxInfoButton_bl = self.propsObj.showLightBoxInfoButton;
			self.showLightBoxInfoButton_bl = self.showLightBoxInfoButton_bl == "no" ? false : true;
			
			self.showLightBoxSlideShowButton_bl =  self.propsObj.showLightBoxSlideShowButton;
			self.showLightBoxSlideShowButton_bl =  self.showLightBoxSlideShowButton_bl == "no" ? false : true;
			
			self.slideShowAutoPlay_bl = self.propsObj.slideShowAutoPlay;
			self.slideShowAutoPlay_bl = self.slideShowAutoPlay_bl == "yes" ? true : false;
			
			self.lightBoxVideoWidth = self.propsObj.lightBoxVideoWidth || 640;
			self.lightBoxVideoHeight = self.propsObj.lightBoxVideoHeight || 480;
			self.lightBoxIframeWidth = self.propsObj.lightBoxIframeWidth || 800;
			self.lightBoxIframeHeight = self.propsObj.lightBoxIframeHeight || 600;
			
			self.lightBoxInfoWindowBackgroundColor_str =  self.propsObj.lightBoxInfoWindowBackgroundColor || "transparent";
			self.lightBoxBackgroundColor_str = self.propsObj.lightBoxBackgroundColor || "transparent";
			self.lightBoxInfoWindowBackgroundOpacity =  self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxBackgroundOpacity = self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxMainBackgroundOpacity = self.propsObj.lightBoxMainBackgroundOpacity || 1;
			self.lightBoxItemBorderColor_str1 = self.propsObj.lightBoxItemBorderColor1 || "transparent";
			self.lightBoxItemBorderColor_str2 = self.propsObj.lightBoxItemBorderColor2 || "transparent";
			self.lightBoxItemBackgroundColor_str = self.propsObj.lightBoxItemBackgroundColor || "transparent";
			self.lightBoxBorderSize = self.propsObj.lightBoxBorderSize || 0;
			self.lightBoxBorderRadius = self.propsObj.lightBoxBorderRadius || 0;
			self.lightBoxSlideShowDelay = self.propsObj.lightBoxSlideShowDelay || 4000;
			
			// parse datalist.
			var dataListAr = FWDU3DCarUtils.getChildrenFromAttribute(self.rootElement, "data-cat");
			
			if (!dataListAr)
			{
				errorMessage = "At least one datalist ul tag with the attribute <font color='#FFFFFF'>data-cat</font> must be defined.";
				self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:errorMessage});
				return;
			}
			
			var totalDataLists = dataListAr.length;
			var allCatAr = [];
			var allMediaAr = [];
			var mediaAr;
			var dataAr;
			var childKidsAr;
			var curUlElem;
			var totalChildren;
			var totalInnerChildren;
			var dataListChildrenAr;
			var mediaKid;
			var attributeMissing;
			var dataListPositionError;
			var positionError;

			for (var i=0; i<totalDataLists; i++)
			{
				curUlElem = dataListAr[i];
				dataAr = [];
				mediaAr = [];
				dataListChildrenAr = FWDU3DCarUtils.getChildren(curUlElem);
				totalChildren = dataListChildrenAr.length;

				for (var j=0; j<totalChildren; j++)
				{
					var obj = {};
					var child = dataListChildrenAr[j];
					var childKidsAr = FWDU3DCarUtils.getChildren(child);
					
					dataListPositionError = i + 1;
					positionError = j + 1;
					
					totalInnerChildren = childKidsAr.length;
					
					if (self.showThumbnailsHtmlContent)
					{
						//check for data-html-content attribute.
						hasError = true;
						
						for (var k=0; k<totalInnerChildren; k++)
						{
							attributeMissing = "data-html-content";
							
							if(FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-html-content"))
							{
								hasError = false;
								obj.htmlContent = childKidsAr[k].innerHTML;
								
								break;
							}
						}
						
						if (hasError)
						{
							errorMessage = "Element with attribute <font color='#FFFFFF'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FFFFFF'>" + dataListPositionError + "</font> at position - <font color='#FFFFFF'>" + positionError + "</font> in the datalist ul element.";
							self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:errorMessage});
							return;
						}
					}
					else
					{
						// check for data-thumbnail-path attribute.
						var hasError = true;
						
						for (var k=0; k<totalInnerChildren; k++)
						{
							attributeMissing = "data-thumbnail-path";
							
							if (FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-thumbnail-path"))
							{
								hasError = false;
								obj.thumbPath = FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(childKidsAr[k], "data-thumbnail-path"));
								
								break;
							}
						}
						
						if (hasError)
						{
							errorMessage = "Element with attribute <font color='#FFFFFF'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FFFFFF'>" + dataListPositionError + "</font> at position - <font color='#FFFFFF'>" + positionError + "</font> in the datalist ul element.";
							self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:errorMessage});
							return;
						}
					}
					
					if (self.showText)
					{
						// check for data-thumbnail-text attribute.
						var hasError = true;
						
						for (var k=0; k<totalInnerChildren; k++)
						{
							attributeMissing = "data-thumbnail-text";
							
							if (FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-thumbnail-text"))
							{
								hasError = false;
								obj.thumbText = childKidsAr[k].innerHTML;
								mediaKid = childKidsAr[k];
								
								break;
							}
						}
						
						if (hasError)
						{
							errorMessage = "Element with attribute <font color='#FFFFFF'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FFFFFF'>" + dataListPositionError + "</font> at position - <font color='#FFFFFF'>" + positionError + "</font> in the datalist ul element.";
							self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text : errorMessage});
							return;
						}
						
						obj.textTitleOffset = parseInt(FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(mediaKid, "data-thumbnail-text-title-offset")));
						obj.textDescriptionOffsetTop = parseInt(FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(mediaKid, "data-thumbnail-text-offset-top")));
						obj.textDescriptionOffsetBottom = parseInt(FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(mediaKid, "data-thumbnail-text-offset-bottom")));
						
						if (FWDU3DCarUtils.trim(obj.thumbText) == "")
						{
							obj.emptyText = true;
						}
						else
						{
							obj.emptyText = false;
						}
					}
					
					//check for data-type attribute.
					hasError = true;
					
					for (var k=0; k<totalInnerChildren; k++)
					{
						attributeMissing = "data-type";
						
						if (FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-type"))
						{
							hasError = false;
							obj.mediaType = FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(childKidsAr[k], "data-type"));
							
							break;
						}
					}
					
					if (hasError)
					{
						errorMessage = "Element with attribute <font color='#FFFFFF'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FFFFFF'>" + dataListPositionError + "</font> at position - <font color='#FFFFFF'>" + positionError + "</font> in the datalist ul element.";
						self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:errorMessage});
						return;
					}
					
					if (obj.mediaType != "none")
					{
						//check for data-url attribute.
						hasError = true;
						
						for (var k=0; k<totalInnerChildren; k++)
						{
							attributeMissing = "data-url";
							
							if (FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-url"))
							{
								hasError = false;
								mediaKid = childKidsAr[k];
								
								break;
							}
						}
						
						if (hasError)
						{
							errorMessage = "Element with attribute <font color='#FFFFFF'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FFFFFF'>" + dataListPositionError + "</font> at position - <font color='#FFFFFF'>" + positionError + "</font> in the datalist ul element.";
							self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:errorMessage});
							return;
						}
					}
					
					mediaKid = childKidsAr[k];
					
					//set arrays for lightbox.
					var secondObj = {};
					
					secondObj.dataType = FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(mediaKid, "data-type"));
					secondObj.url = FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(mediaKid, "data-url"));
					secondObj.target = FWDU3DCarUtils.getAttributeValue(mediaKid, "data-target");
					secondObj.info = FWDU3DCarUtils.getAttributeValue(mediaKid, "data-info");
					
					if(!secondObj.target) secondObj.target = "_blank";
					
					//check for data-info attribute.
					for (var k=0; k<totalInnerChildren; k++)
					{
						if(FWDU3DCarUtils.hasAttribute(childKidsAr[k], "data-info"))
						{
							secondObj.infoText = childKidsAr[k].innerHTML;
							break;
						}
					}
					
					obj.secondObj = secondObj;
					
					if ((obj.mediaType != "link") && (obj.mediaType != "none"))
					{
						mediaAr.push(secondObj);
						allMediaAr.push(secondObj);
					}
					
					dataAr[j] = obj;
					allCatAr.push(obj);
				}
				
				self.categoriesAr[i] = FWDU3DCarUtils.getAttributeValue(curUlElem, "data-cat") || "not defined!";
				self.dataListAr[i] = dataAr;
				self.lightboxAr[i] = mediaAr;
			}
			
			if (self.showAllCategories)
			{
				self.categoriesAr.unshift(self.allCategoriesLabel);
				self.dataListAr.unshift(allCatAr);
				self.lightboxAr.unshift(allMediaAr);
				
				totalDataLists++;
			}
			
			self.startAtCategory = self.propsObj.startAtCategory || 1;
			if(isNaN(self.startAtCategory)) self.startAtCategory = 1;
			if(self.startAtCategory <= 0) self.startAtCategory = 1;
			if(self.startAtCategory > totalDataLists) self.startAtCategory = totalDataLists;
			
			self.startAtCategory -= 1;
			
			if (!self.propsObj.skinPath)
			{
				self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:"Coverflow graphics skin path is not defined in FWDU3DCar3DCoverflow constructor function!"});
				return;
			}
			
			//set carousel graphics.
			var preloaderPath = self.propsObj.skinPath + "/preloader.png";
			self.thumbGradientLeftPath = self.propsObj.skinPath + "/gradientLeft.png";
			self.thumbGradientRightPath = self.propsObj.skinPath + "/gradientRight.png";
			self.thumbTitleGradientPath = self.propsObj.skinPath + "/textGradient.png";
			var nextButtonNPath = self.propsObj.skinPath + "/nextButtonNormalState.png";
			var nextButtonSPath = self.propsObj.skinPath + "/nextButtonSelectedState.png";
			var prevButtonNPath = self.propsObj.skinPath + "/prevButtonNormalState.png";
			var prevButtonSPath = self.propsObj.skinPath + "/prevButtonSelectedState.png";
			var playButtonNPath = self.propsObj.skinPath + "/playButtonNormalState.png";
			var playButtonSPath = self.propsObj.skinPath + "/playButtonSelectedState.png";
			var pauseButtonPath = self.propsObj.skinPath + "/pauseButtonSelectedState.png";
			var handlerLeftNPath = self.propsObj.skinPath + "/handlerLeftNormal.png";
			var handlerLeftSPath = self.propsObj.skinPath + "/handlerLeftSelected.png";
			self.handlerCenterNPath = self.propsObj.skinPath + "/handlerCenterNormal.png";
			self.handlerCenterSPath = self.propsObj.skinPath + "/handlerCenterSelected.png";
			var handlerRightNPath = self.propsObj.skinPath + "/handlerRightNormal.png";
			var handlerRightSPath = self.propsObj.skinPath + "/handlerRightSelected.png";
			var trackLeftPath = self.propsObj.skinPath + "/trackLeft.png";
			self.trackCenterPath = self.propsObj.skinPath + "/trackCenter.png";
			var trackRightPath = self.propsObj.skinPath + "/trackRight.png";
			var slideshowTimerPath = self.propsObj.skinPath + "/slideshowTimer.png";
			var slideShowPreloaderPath_str = self.propsObj.skinPath + "/slideShowPreloader.png";
			var lightboxCloseButtonN_str = self.propsObj.skinPath + "/closeButtonNormalState.png";
			var lightboxCloseButtonS_str = self.propsObj.skinPath + "/closeButtonSelectedState.png";
			var lightboxNextButtonN_str = self.propsObj.skinPath + "/lightboxNextButtonNormalState.png";
			var lightboxNextButtonS_str = self.propsObj.skinPath + "/lightboxNextButtonSelectedState.png";
			var lightboxPrevButtonN_str = self.propsObj.skinPath + "/lightboxPrevButtonNormalState.png";
			var lightboxPrevButtonS_str = self.propsObj.skinPath + "/lightboxPrevButtonSelectedState.png";
			var lightboxPlayButtonN_str = self.propsObj.skinPath + "/lightboxPlayButtonNormalState.png";
			var lightboxPlayButtonS_str = self.propsObj.skinPath + "/lightboxPlayButtonSelectedState.png";
			var lightboxPauseButtonN_str = self.propsObj.skinPath + "/lightboxPauseButtonNormalState.png";
			var lightboxPauseButtonS_str = self.propsObj.skinPath + "/lightboxPauseButtonSelectedState.png";
			var lightboxMaximizeButtonN_str = self.propsObj.skinPath + "/maximizeButtonNormalState.png";
			var lightboxMaximizeButtonS_str = self.propsObj.skinPath + "/maximizeButtonSelectedState.png";
			var lightboxMinimizeButtonN_str = self.propsObj.skinPath + "/minimizeButtonNormalState.png";
			var lightboxMinimizeButtonS_str = self.propsObj.skinPath + "/minimizeButtonSelectedState.png";
			var lightboxInfoButtonOpenN_str = self.propsObj.skinPath + "/infoButtonOpenNormalState.png";
			var lightboxInfoButtonOpenS_str = self.propsObj.skinPath + "/infoButtonOpenSelectedState.png";
			var lightboxInfoButtonCloseN_str = self.propsObj.skinPath + "/infoButtonCloseNormalPath.png";
			var lightboxInfoButtonCloseS_str = self.propsObj.skinPath + "/infoButtonCloseSelectedPath.png";
			self.comboboxArrowIconN_str = self.propsObj.skinPath + "/comboboxArrowNormal.png";
			self.comboboxArrowIconS_str = self.propsObj.skinPath + "/comboboxArrowSelected.png";
			
			self.graphicsPathsAr.push(preloaderPath);
			self.graphicsPathsAr.push(self.thumbGradientLeftPath);
			self.graphicsPathsAr.push(self.thumbGradientRightPath);
			self.graphicsPathsAr.push(self.thumbTitleGradientPath);
			self.graphicsPathsAr.push(nextButtonNPath);
			self.graphicsPathsAr.push(nextButtonSPath);
			self.graphicsPathsAr.push(prevButtonNPath);
			self.graphicsPathsAr.push(prevButtonSPath);
			self.graphicsPathsAr.push(playButtonNPath);
			self.graphicsPathsAr.push(playButtonSPath);
			self.graphicsPathsAr.push(pauseButtonPath);
			self.graphicsPathsAr.push(handlerLeftNPath);
			self.graphicsPathsAr.push(handlerLeftSPath);
			self.graphicsPathsAr.push(self.handlerCenterNPath);
			self.graphicsPathsAr.push(self.handlerCenterSPath);
			self.graphicsPathsAr.push(handlerRightNPath);
			self.graphicsPathsAr.push(handlerRightSPath);
			self.graphicsPathsAr.push(trackLeftPath);
			self.graphicsPathsAr.push(self.trackCenterPath);
			self.graphicsPathsAr.push(trackRightPath);
			self.graphicsPathsAr.push(slideshowTimerPath);
			
			//lightbox
			self.graphicsPathsAr.push(preloaderPath);
			self.graphicsPathsAr.push(lightboxCloseButtonN_str);
			self.graphicsPathsAr.push(lightboxCloseButtonS_str);
			self.graphicsPathsAr.push(lightboxNextButtonN_str);
			self.graphicsPathsAr.push(lightboxNextButtonS_str);
			self.graphicsPathsAr.push(lightboxPrevButtonN_str);
			self.graphicsPathsAr.push(lightboxPrevButtonS_str);
			self.graphicsPathsAr.push(lightboxPlayButtonN_str);
			self.graphicsPathsAr.push(lightboxPlayButtonS_str);
			self.graphicsPathsAr.push(lightboxPauseButtonN_str);
			self.graphicsPathsAr.push(lightboxPauseButtonS_str);
			self.graphicsPathsAr.push(lightboxMaximizeButtonN_str);
			self.graphicsPathsAr.push(lightboxMaximizeButtonS_str);
			self.graphicsPathsAr.push(lightboxMinimizeButtonN_str);
			self.graphicsPathsAr.push(lightboxMinimizeButtonS_str);
			self.graphicsPathsAr.push(lightboxInfoButtonOpenN_str);
			self.graphicsPathsAr.push(lightboxInfoButtonOpenS_str);
			self.graphicsPathsAr.push(lightboxInfoButtonCloseN_str);
			self.graphicsPathsAr.push(lightboxInfoButtonCloseS_str);
			self.graphicsPathsAr.push(slideShowPreloaderPath_str);
			
			//combobox
			self.graphicsPathsAr.push(self.comboboxArrowIconN_str);
			self.graphicsPathsAr.push(self.comboboxArrowIconS_str);
			
			self.totalGraphics = self.graphicsPathsAr.length;
			
			//Remove datalist element.
			try
			{
				self.rootElement.parentNode.removeChild(self.rootElement);
			}
			catch(e){};

			self.loadGraphics();
		};

		/* load carousel graphics */
		this.loadGraphics = function()
		{
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
			}

			var imagePath = self.graphicsPathsAr[self.countLoadedGraphics];

			self.image = new Image();
			self.image.onload = self.onImageLoadHandler;
			self.image.onerror = self.onImageLoadErrorHandler;
			self.image.src = imagePath;
		};

		this.onImageLoadHandler = function(e)
		{
			if (self.countLoadedGraphics == 0)
			{
				self.mainPreloaderImg = self.image;
			}
			else if (self.countLoadedGraphics == 1)
			{
				self.thumbGradientLeftImg = self.image;
			}
			else if (self.countLoadedGraphics == 2)
			{
				self.thumbGradientRightImg = self.image;
			}
			else if (self.countLoadedGraphics == 3)
			{
				self.thumbTitleGradientImg = self.image;
			}
			else if (self.countLoadedGraphics == 4)
			{
				self.nextButtonNImg = self.image;
				
				self.dispatchEvent(FWDU3DCarData.PRELOADER_LOAD_DONE);
			}
			else if (self.countLoadedGraphics == 5)
			{
				self.nextButtonSImg = self.image;
			}
			else if (self.countLoadedGraphics == 6)
			{
				self.prevButtonNImg = self.image;
			}
			else if (self.countLoadedGraphics == 7)
			{
				self.prevButtonSImg = self.image;
			}
			else if (self.countLoadedGraphics == 8)
			{
				self.playButtonNImg = self.image;
			}
			else if (self.countLoadedGraphics == 9)
			{
				self.playButtonSImg = self.image;
			}
			else if (self.countLoadedGraphics == 10)
			{
				self.pauseButtonImg = self.image;
			}
			else if (self.countLoadedGraphics == 11)
			{
				self.handlerLeftNImg = self.image;
			}
			else if (self.countLoadedGraphics == 12)
			{
				self.handlerLeftSImg = self.image;
			}
			else if (self.countLoadedGraphics == 13)
			{
				self.handlerCenterNImg = self.image;
			}
			else if (self.countLoadedGraphics == 14)
			{
				self.handlerCenterSImg = self.image;
			}
			else if (self.countLoadedGraphics == 15)
			{
				self.handlerRightNImg = self.image;
			}
			else if (self.countLoadedGraphics == 16)
			{
				self.handlerRightSImg = self.image;
			}
			else if (self.countLoadedGraphics == 17)
			{
				self.trackLeftImg = self.image;
			}
			else if (self.countLoadedGraphics == 18)
			{
				self.trackCenterImg = self.image;
			}
			else if (self.countLoadedGraphics == 19)
			{
				self.trackRightImg = self.image;
			}
			else if (self.countLoadedGraphics == 20)
			{
				self.slideshowTimerImg = self.image;
			}
			else if (self.countLoadedGraphics == 21)
			{
				self.lightboxPreloader_img = self.image;
			}
			else if (self.countLoadedGraphics == 22)
			{
				self.lightboxCloseButtonN_img = self.image;
			}
			else if (self.countLoadedGraphics == 23)
			{
				self.lightboxCloseButtonS_img = self.image;
			}
			else if (self.countLoadedGraphics == 24)
			{
				self.lightboxNextButtonN_img = self.image;
			}
			else if (self.countLoadedGraphics == 25)
			{
				self.lightboxNextButtonS_img = self.image;
			}
			else if (self.countLoadedGraphics == 26)
			{
				self.lightboxPrevButtonN_img = self.image;
			}
			else if (self.countLoadedGraphics == 27)
			{
				self.lightboxPrevButtonS_img = self.image;
			}
			else if (self.countLoadedGraphics == 28)
			{
				self.lightboxPlayN_img = self.image;
			}
			else if (self.countLoadedGraphics == 29)
			{
				self.lightboxPlayS_img = self.image;
			}
			else if (self.countLoadedGraphics == 30)
			{
				self.lightboxPauseN_img = self.image;
			}
			else if (self.countLoadedGraphics == 31)
			{
				self.lightboxPauseS_img = self.image;
			}
			else if (self.countLoadedGraphics == 32)
			{
				self.lightboxMaximizeN_img = self.image;
			}
			else if (self.countLoadedGraphics == 33)
			{
				self.lightboxMaximizeS_img = self.image;
			}
			else if (self.countLoadedGraphics == 34)
			{
				self.lightboxMinimizeN_img = self.image;
			}
			else if (self.countLoadedGraphics == 35)
			{
				self.lightboxMinimizeS_img = self.image;
			}
			else if (self.countLoadedGraphics == 36)
			{
				self.lightboxInfoOpenN_img = self.image;
			}
			else if (self.countLoadedGraphics == 37)
			{
				self.lightboxInfoOpenS_img = self.image;
			}
			else if (self.countLoadedGraphics == 38)
			{
				self.lightboxInfoCloseN_img = self.image;
			}
			else if (self.countLoadedGraphics == 39)
			{
				self.lightboxInfoCloseS_img = self.image;
			}
			else if (self.countLoadedGraphics == 40)
			{
				self.slideShowPreloader_img = self.image;
			}
			else if (self.countLoadedGraphics == 41)
			{
				self.comboboxArrowIconN_img = self.image;
			}
			else if (self.countLoadedGraphics == 42)
			{
				self.comboboxArrowIconS_img = self.image;
			}

			self.countLoadedGraphics++;
			
			if (self.countLoadedGraphics < self.totalGraphics)
			{
				self.loadGraphics();
			}
			else
			{
				self.dispatchEvent(FWDU3DCarData.LOAD_DONE);
			}
		};

		this.onImageLoadErrorHandler = function(e)
		{
			var message = "Graphics image not found! <font color='#FFFFFF'>" + self.graphicsPathsAr[self.countLoadedGraphics] + "</font>";

			var err = {text : message};
			
			self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, err);
		};
		
		/* check if element with and attribute exists or throw error */
		this.checkForAttribute = function(e, attr)
		{
			var test = FWDU3DCarUtils.getChildFromNodeListFromAttribute(e, attr);
			
			test = test ? FWDU3DCarUtils.trim(FWDU3DCarUtils.getAttributeValue(test, attr)) : undefined;
			
			if (!test)
			{
				self.dispatchEvent(FWDU3DCarData.LOAD_ERROR, {text:"Element  with attribute <font color='#FFFFFF'>" + attr + "</font> is not defined."});
				return;
			}
			
			return test;
		};

		/* destroy */
		this.destroy = function()
		{
			clearTimeout(self.parseDelayId);
			
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
				self.image.src = "";
			}

			self.propsObj = null;
			self.imagesAr = null;
			self.graphicsPathsAr = null;
			self.dataListAr = [];
			self.lightboxAr = [];
			self.categoriesAr = [];
			
			if(this.mainPreloaderImg) this.mainPreloaderImg.src = "";
			if(this.thumbGradientLeftImg) this.thumbGradientLeftImg.src = "";
			if(this.thumbGradientRightImg) this.thumbGradientRightImg.src = "";
			if(this.thumbTitleGradientImg) this.thumbTitleGradientImg.src = "";
			if(this.nextButtonNImg) this.nextButtonNImg.src = "";
			if(this.nextButtonSImg) this.nextButtonSImg.src = "";
			if(this.prevButtonNImg) this.prevButtonNImg.src = "";
			if(this.prevButtonSImg) this.prevButtonSImg.src = "";
			if(this.playButtonNImg) this.playButtonNImg.src = "";
			if(this.playButtonSImg) this.playButtonSImg.src = "";
			if(this.pauseButtonNImg) this.pauseButtonNImg.src = "";
			if(this.pauseButtonSImg) this.pauseButtonSImg.src = "";
			if(this.handlerLeftNImg) this.handlerLeftNImg.src = "";
			if(this.handlerLeftSImg) this.handlerLeftSImg.src = "";
			if(this.handlerCenterNImg) this.handlerCenterNImg.src = "";
			if(this.handlerCenterSImg) this.handlerCenterSImg.src = "";
			if(this.handlerRightNImg) this.handlerRightNImg.src = "";
			if(this.handlerRightSImg) this.handlerRightSImg.src = "";
			if(this.trackLeftImg) this.trackLeftImg.src = "";
			if(this.trackCenterImg) this.trackCenterImg.src = "";
			if(this.trackRightImg) this.trackRightImg.src = "";
			if(this.slideshowTimerImg) this.slideshowTimerImg.src = "";
			
			this.mainPreloaderImg = null;
			this.thumbGradientLeftImg = null;
			this.thumbGradientRightImg = null;
			this.thumbTitleGradientImg = null;
			this.nextButtonNImg = null;
			this.nextButtonSImg = null;
			this.prevButtonNImg = null;
			this.prevButtonSImg = null;
			this.playButtonNImg = null;
			this.playButtonSImg = null;
			this.pauseButtonNImg = null;
			this.pauseButtonSImg = null;
			this.handlerLeftNImg = null;
			this.handlerLeftSImg = null;
			this.handlerCenterNImg = null;
			this.handlerCenterSImg = null;
			this.handlerRightNImg = null;
			this.handlerRightSImg = null;
			this.trackLeftImg = null;
			this.trackCenterImg = null;
			this.trackRightImg = null;
			this.slideshowTimerImg = null;
			
			//lightbox
			if(this.lightboxCloseButtonN_img) this.lightboxCloseButtonN_img.src = "";
			if(this.lightboxCloseButtonS_img) this.lightboxCloseButtonS_img.src = "";
			if(this.lightboxNextButtonN_img) this.lightboxNextButtonN_img.src = "";
			if(this.lightboxNextButtonS_img) this.lightboxNextButtonS_img.src = "";
			if(this.lightboxPrevButtonN_img) this.lightboxPrevButtonN_img.src = "";
			if(this.lightboxPrevButtonS_img) this.lightboxPrevButtonS_img.src = "";
			if(this.lightboxPlayN_img) this.lightboxPlayN_img.src = "";
			if(this.lightboxPlayS_img) this.lightboxPlayS_img.src = "";
			if(this.lightboxPauseN_img) this.lightboxPauseN_img.src = "";
			if(this.lightboxPauseS_img) this.lightboxPauseS_img.src = "";
			if(this.lightboxMaximizeN_img) this.lightboxMaximizeN_img.src = "";
			if(this.lightboxMaximizeS_img) this.lightboxMaximizeS_img.src = "";
			if(this.lightboxMinimizeN_img) this.lightboxMinimizeN_img.src = "";
			if(this.lightboxMinimizeS_img) this.lightboxMinimizeS_img.src = "";
			if(this.lightboxInfoOpenN_img) this.lightboxInfoOpenN_img.src = "";
			if(this.lightboxInfoOpenS_img) this.lightboxInfoOpenS_img.src = "";
			if(this.lightboxInfoCloseN_img) this.lightboxInfoCloseN_img.src = "";
			if(this.lightboxInfoCloseS_img) this.lightboxInfoCloseS_img.src = "";
			
			this.lightboxCloseButtonN_img = null;
			this.lightboxCloseButtonS_img = null;
			this.lightboxNextButtonN_img = null;
			this.lightboxNextButtonS_img = null;
			this.lightboxPrevButtonN_img = null;
			this.lightboxPrevButtonS_img = null;
			this.lightboxPlayN_img = null;
			this.lightboxPlayS_img = null;
			this.lightboxPauseN_img = null;
			this.lightboxPauseS_img = null;
			this.lightboxMaximizeN_img = null;
			this.lightboxMaximizeS_img = null;
			this.lightboxMinimizeN_img = null;
			this.lightboxMinimizeS_img = null;
			this.lightboxInfoOpenN_img = null;
			this.lightboxInfoOpenS_img = null;
			this.lightboxInfoCloseN_img = null;
			this.lightboxInfoCloseS_img = null;
			
			//combobox
			if(this.comboboxArrowIconN_img) this.comboboxArrowIconN_img.src = "";
			if(this.comboboxArrowIconS_img) this.comboboxArrowIconS_img.src = "";
			
			this.comboboxArrowIconN_img = null
			this.comboboxArrowIconN_img = null

			self.image = null;
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarData.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarData.setPrototype = function()
	{
		FWDU3DCarData.prototype = new FWDU3DCarEventDispatcher();
	};

	FWDU3DCarData.prototype = null;
	FWDU3DCarData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDU3DCarData.LOAD_DONE = "onLoadDone";
	FWDU3DCarData.LOAD_ERROR = "onLoadError";

	window.FWDU3DCarData = FWDU3DCarData;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDU3DCarDisplayObject = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		
		this.hasTransform3d_bl = FWDU3DCarUtils.hasTransform3d;
		this.hasTransform2d_bl = FWDU3DCarUtils.hasTransform2d;
		if(FWDU3DCarUtils.isFirefox) self.hasTransform3d_bl = false;
		if(FWDU3DCarUtils.isFirefox) self.hasTransform2d_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";

			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			//this.screen.style.backfaceVisibility = "hidden";
			//this.screen.style.webkitBackfaceVisibility = "hidden";
			//this.screen.style.MozBackfaceVisibility = "hidden";

			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl && !FWDU3DCarUtils.isAndroid){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setZIndex = function(val)
		{
			self.screen.style.zIndex = val;
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDU3DCarUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = "";
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform3d_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDU3DCarDisplayObject = FWDU3DCarDisplayObject;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDU3DCarDisplayObject3D = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.angleX = 0;
		this.angleY = 0;
		this.angleZ = 0;
		this.perspective = 0;
		this.zIndex = 0;
		this.scale = 1;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl = FWDU3DCarUtils.hasTransform3d;
		this.hasTransform2d_bl = FWDU3DCarUtils.hasTransform2d;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			//this.screen.style.backfaceVisibility = "hidden";
			//this.screen.style.webkitBackfaceVisibility = "hidden";
			//this.screen.style.MozBackfaceVisibility = "hidden";
			this.screen.style.MozImageRendering = "optimizeSpeed";	
			this.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ")";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ")";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setZ = function(val){
			self.z = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}
		};
		
		this.getZ = function(){
			return  self.z;
		};
		
		this.setAngleX = function(val){
			self.angleX = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}
		};
		
		this.getAngleX = function(){
			return  self.angleX;
		};
		
		this.setAngleY = function(val){
			self.angleY = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}
		};
		
		this.getAngleY = function(){
			return  self.angleY;
		};
		
		this.setAngleZ = function(val){
			self.angleZ = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}
		};
		
		this.getAngleZ = function(){
			return  self.angleZ;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px)" +
						" rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", 1)";
			}
			else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setPerspective = function(val){
			self.perspective = val;
			self.screen.style.perspective = self.perspective + "px";
			self.screen.style.WebkitPerspective = self.perspective + "px";
			self.screen.style.MozPerspective = self.perspective + "px";
			self.screen.style.msPerspective = self.perspective + "px";
			self.screen.style.OPerspective = self.perspective + "px";
		};
		
		this.setPreserve3D = function(){
			this.screen.style.transformStyle = "preserve-3d";
			this.screen.style.WebkitTransformStyle = "preserve-3d";
			this.screen.style.MozTransformStyle = "preserve-3d";
			this.screen.style.msTransformStyle = "preserve-3d";
			this.screen.style.OTransformStyle = "preserve-3d";
		};
		
		this.setZIndex = function(val)
		{
			self.zIndex = val;
			self.screen.style.zIndex = self.zIndex;
		};
		
		this.getZIndex = function()
		{
			return self.zIndex;
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		this.setCSSGradient = function(color1, color2)
		{
			if (FWDU3DCarUtils.isIEAndLessThen10)
			{
				self.setBkColor(color1);
			}
			else
			{
				self.screen.style.backgroundImage = "-webkit-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-moz-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-ms-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-o-linear-gradient(top, " + color1 + ", " + color2 + ")";
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDU3DCarUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDU3DCarUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = "";
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform3d_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDU3DCarDisplayObject3D = FWDU3DCarDisplayObject3D;
}(window));(function (){
	
	var FWDU3DCarEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    };
	    
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
			
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	};	
	
	window.FWDU3DCarEventDispatcher = FWDU3DCarEventDispatcher;
}(window));/* Info screen */
(function (window){
	
	var FWDU3DCarInfo = function(){
		
		var self = this;
		var prototype = FWDU3DCarInfo.prototype;
		
		/* init */
		this.init = function(){
			this.setWidth(500);
			this.setBkColor("#FF0000");
			this.getStyle().padding = "10px";
		};
		
		this.showText = function(txt){
			this.setInnerHTML(txt);
		};
		
		/* destroy */
		this.destroy = function(){

			prototype.destroy();
			FWDU3DCarInfo.prototype = null;
			self = null;
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDU3DCarInfo.setPrototype = function(){
		FWDU3DCarInfo.prototype = new FWDU3DCarDisplayObject("div", "relative");
	};
	
	FWDU3DCarInfo.prototype = null;
	window.FWDU3DCarInfo = FWDU3DCarInfo;
}(window));/* Image manager */
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
	
}(window));(function (window){
	
	var FWDU3DCarLightBox = function(props){
		
		var self = this;
		var prototype = FWDU3DCarLightBox.prototype;
		
		this.image_img;
		this.closeN_img = props.closeN_img;
		this.closeS_img = props.closeS_img;
		this.nextN_img = props.nextN_img;
		this.nextS_img = props.nextS_img;
		this.prevN_img = props.prevN_img;
		this.prevS_img = props.prevS_img;
		this.maximizeN_img = props.maximizeN_img;
		this.maximizeS_img = props.maximizeS_img;
		this.minimizeN_img = props.minimizeN_img;
		this.minimizeS_img = props.minimizeS_img;
		this.infoOpenN_img = props.infoOpenN_img;
		this.infoOpenS_img = props.infoOpenS_img;	
		this.infoCloseN_img = props.infoCloseN_img;
		this.infoCloseS_img = props.infoCloseS_img;
		
		this.pauseN_img = props.pauseN_img;
		this.pauseS_img = props.pauseS_img;
		this.playN_img = props.playN_img;
		this.playS_img = props.playS_img;
		
		this.preloaderImg = props.lightboxPreloader_img;
		this.slideShowPreloader_img = props.slideShowPreloader_img;
		
		this.info_do;
		this.infoWindow_do;
		this.preloader_do;
		this.slideShowPreloader_do;
		this.customContextMenu;
		this.timerManager;
		
		this.bk_do;
		this.mainItemsHolder_do;
		this.itemsBackground_do;
		this.itemsBorder_do;
		this.itemsHolder_do;
		this.currentItem_do;
		this.prevItem_do;
		this.closeButton_do;
		this.nextButton_do;	
		this.prevButton_do;
		this.zoomButton_do;
		this.infoButton_do;	
		this.slideshowButtton_do;
		
		this.data_ar = props.data_ar;
		this.buttons_ar;
		
		this.backgroundColor_str = props.backgroundColor_str;
		this.transitionDirection_str = "next";
		this.mediaType_str;
		
		this.backgroundOpacity = props.backgroundOpacity;
		this.infoWindowBackgroundOpacity = props.infoWindowBackgroundOpacity || 1;
		
		this.videoWidth = props.videoWidth;
		this.videoHeight = props.videoHeight;
		this.iframeWidth = props.iframeWidth;
		this.iframeHeight = props.iframeHeight;
		
		this.slideShowDelay = props.slideShowDelay;
		this.slideshowPreloaderHeight = 29;
		this.iframeW;
		this.iframeH;
		this.borderSize = props.borderSize || 0;
		this.borderRadius = props.borderRadius || 0;
		this.transitionTotalDuration = 1200;
		this.buttonWidth = this.closeN_img.width;
		this.buttonHeight = this.closeN_img.height;
		this.totalItems = this.data_ar.length;
		
		this.originalW;
		this.originalH;
		this.finalX;
		this.finalY;
		this.finalWidth;
		this.finalHeight;
		this.videoIdOrIframeUrl;
		this.percentX;
		this.percentY;
		this.globalXMousePosition;
		this.globalYMousePosition;
		this.lastPressedX;
		this.lastPressedY;
		this.friction = .9;
		this.vx;
		this.vy;
	
		this.type_str;
		this.prevType_str;
		this.borderColor_str1 = props.borderColor_str1 || "#FFFFFF";
		this.borderColor_str2 = props.borderColor_str2 || "#FFFFFF";
		this.itemBackgroundColor_str = props.itemBackgroundColor_str || "#222222";
		this.infoWindowBackgroundColor = props.infoWindowBackgroundColor || "transparent";
		
		this.id;
		this.scrollOffestX;
		this.scrollOffsetY;
	
		this.updateImageWhenMaximized_int;
		this.transitionDoneId_to;
		this.transitionShapeDoneId_to;
		this.showVideoId_to;
		this.maximizeCompleteTimeOutId_to;
		this.minimizeCompleteTimeOutId_to;
		this.showFirstTimeWithDelayId_to;
		this.resizeHandlerId1_to;
		this.resizeHandlerId2_to;
		this.orientationChangeId_to;
		
		this.isShowed_bl = false;
		this.isTweeningOnShowOrHide_bl = false;
		this.firstTimeShowed_bl = true;
		this.isTweening_bl = false;
		this.addKeyboardSupport_bl =  props.addKeyboardSupport_bl == false ? false : true;
		this.showContextMenu_bl = props.showContextMenu == false ? false : true;
		this.showNextAndPrevButtons_bl = props.showNextAndPrevButtons == false ? false : true;
		this.showZoomButton_bl = props.showZoomButton == false ? false : true;
		this.showInfoButton_bl = props.showInfoButton == false ? false : true;
		this.showSlideshowButton_bl = props.showSlideshowButton == false ? false : true;
		this.slideShowAutoPlay_bl = props.slideShowAutoPlay == false ? false : true;
		this.showInfoWindowByDefault_bl = props.showInfoWindowByDefault == true ? true : false; 
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		this.isMaximized_bl = false;
		this.isFirstItemShowed_bl = false;
		this.allowToPressKey_bl = true;
		this.isLoading_bl = false;
		this.videoAutoPlay_bl = props.lightBoxVideoAutoPlay;
		this.forceRoundBorderToIframe_bl = false;
		this.isIframe_bl = false;
		this.orintationChanceComplete_bl = true;
	
		//###############################################//
		/* Init lighbox.*/
		//###############################################//
		this.init =  function(){	
			self.getStyle().msTouchAction = "none";
			self.getStyle().webkitTapHighlightColor =  "rgba(0, 0, 0, 0)";  
			this.setupInfo();
			this.setupBackgorundAndMainItemHolder();
			this.setupPreloader();
			this.setupCloseButton();
			if(this.showNextAndPrevButtons_bl) this.setupNextAndPrevButtons();
			if(this.showZoomButton_bl) this.setupZoomButton();
			
			if(this.showInfoButton_bl){
				this.setupInfoButton();
			}
			
			if(this.showInfoButton_bl || this.showInfoWindowByDefault_bl){
				this.setupInfoWindow();
			}
			
			if(this.showSlideshowButton_bl){
				this.setupTimerManager();
				this.setupSlideShowPreloader();
				this.setupSlideshowButton();
			}
			
			this.setupContextMenu();
		
			this.buttons_ar = [];
			this.buttons_ar.push(this.closeButton_do);
			if(this.infoButton_do) this.buttons_ar.push(this.infoButton_do);
			if(this.showSlideshowButton_bl) this.buttons_ar.push(this.slideshowButtton_do);
			if(this.zoomButton_do) this.buttons_ar.push(this.zoomButton_do);
			if(this.showNextAndPrevButtons_bl) this.buttons_ar.push(this.nextButton_do);
		};
		
		//###############################################//
		/* Update list */
		//###############################################//
		this.updateData = function(data_ar){
			self.data_ar = data_ar;
			self.totalItems = self.data_ar.length;
		};
		
		//###############################################//
		/* Reize handler....*/
		//###############################################//
		this.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onScrollHandler);
				window.addEventListener("orientationchange", self.orientationChance);
				if(FWDU3DCarUtils.isFirefox){
					document.addEventListener("fullscreenchange", self.onFullScreenChange);
					document.addEventListener("mozfullscreenchange", self.onFullScreenChange);
				}
			}else if(window.attachEvent){
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.onScrollHandler);
			}
			
			self.resizeHandler();
			self.resizeHandlerId2_to = setTimeout(function(){self.resizeHandler();}, 100);
		};
		
		this.onFullScreenChange = function(){
			self.resizeHandler();
			clearTimeout(self.resizeHandlerId2_to);
			self.resizeHandlerId2_to = setTimeout(function(){self.resizeHandler();}, 50);
		};
		
		self.onScrollHandler = function(e){
			if(!self.orintationChanceComplete_bl) return;
			var scrollOffsets = FWDU3DCarUtils.getScrollOffsets();
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
		};
	
		self.onResizeHandler = function(e){
			if(self.isMobile_bl){
				clearTimeout(self.resizeHandlerId2_to);
				self.resizeHandlerId2_to = setTimeout(function(){self.resizeHandler();}, 200);
			}else{
				self.resizeHandler();
				clearTimeout(self.resizeHandlerId2_to);
				self.resizeHandlerId2_to = setTimeout(function(){self.resizeHandler();}, 50);
			}	
		};
		
		this.orientationChance = function(){
			self.orintationChanceComplete_bl = false;
			
			clearTimeout(self.resizeHandlerId2_to);
			clearTimeout(self.orientationChangeId_to);
			
			self.orientationChangeId_to = setTimeout(function(){
				self.orintationChanceComplete_bl = true; 
				self.resizeHandler();
				}, 1000);
			
			self.setX(0);
			self.setWidth(0);
		};
		
		
		this.resizeHandler = function(){
			
			if(!self.orintationChanceComplete_bl) return;
			
		    var viewPortSize = FWDU3DCarUtils.getViewportSize();
			var scrollOffsets = FWDU3DCarUtils.getScrollOffsets();
			
			if(self.stageWidth == viewPortSize.w && self.stageHeight == viewPortSize.h) return;
			
			self.isTweening_bl = false;
			self.stageWidth = viewPortSize.w;
			self.stageHeight = viewPortSize.h;
			self.scrollOffestX = scrollOffsets.x;
			self.scrollOffsetY = scrollOffsets.y;
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
			if(self.isMobile_bl){
				self.setWidth(self.stageWidth);
				self.setHeight(self.stageHeight);
			}else{
				self.setWidth(self.stageWidth - .5);
				self.setHeight(self.stageHeight - .5);
			}
			self.positionPreloader();
			self.resizeCurrentItem();
			self.positionButtons(false);
		
			if(self.infoWindow_do && self.infoWindow_do.isShowed_bl) self.infoWindow_do.resize(self.finalWidth, self.finalHeight, false);
		};
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		this.setupContextMenu = function(){
			this.customContextMenu = new FWDU3DCarContextMenu(this, this.showContextMenu_bl);
		};
		
		//###############################################//
		/* Disable scroll and touch events for the main browser scrollbar.*/
		//###############################################//
		this.disableBrowserScrollBars = function(){
			if(this.isMobile_bl){
				window.addEventListener("touchmove", this.mouseDummyHandler);
			}else{
				if(window.addEventListener){
					window.addEventListener ("mousewheel", this.mouseDummyHandler);
					window.addEventListener('DOMMouseScroll', this.mouseDummyHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmousewheel", this.mouseDummyHandler);
				}
			}
		};
		
		this.mouseDummyHandler = function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		//###############################################//
		/* Setup background.*/
		//###############################################//
		this.setupInfo = function(){
			FWDU3DCarInfo.setPrototype();
			this.info_do = new FWDU3DCarInfo();
		};
		
		//###############################################//
		/* Setup background.*/
		//###############################################//
		this.setupBackgorundAndMainItemHolder = function(){
			this.bk_do = new FWDU3DCarDisplayObject("div");
			
			this.bk_do.setBackfaceVisibility();
			
			this.bk_do.setResizableSizeAfterParent();
			this.bk_do.setBkColor(this.backgroundColor_str);
			
			this.mainItemsHolder_do = new FWDU3DCarDisplayObject("div");	
			this.itemsBorder_do = new FWDU3DCarSimpleDisplayObject("div");
			this.itemsBorder_do.setCSSGradient(self.borderColor_str1, self.borderColor_str2);
	
			this.itemsBackground_do = new FWDU3DCarDisplayObject("div");
			this.itemsBackground_do.setBkColor(self.itemBackgroundColor_str);
			this.itemsHolder_do = new FWDU3DCarDisplayObject("div");
			this.itemsHolder_do.setOverflow("visible");
		
			this.mainItemsHolder_do.addChild(this.itemsBorder_do);
			this.mainItemsHolder_do.addChild(this.itemsBackground_do);
			this.mainItemsHolder_do.addChild(this.itemsHolder_do);
			
			this.addChild(this.bk_do);
			this.addChild(this.mainItemsHolder_do);
		};
		
		this.addCloseEventsWhenBkIsPressed = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.bk_do.screen.addEventListener("MSPointerDown", self.onBkMouseDown);
				}else{
					self.bk_do.screen.addEventListener("touchstart", self.onBkMouseDown);
				}
			}else if(self.bk_do.screen.addEventListener){	
				self.bk_do.screen.addEventListener("mousedown", self.onBkMouseDown);
			}else if(self.bk_do.screen.attachEvent){
				self.bk_do.screen.attachEvent("onmousedown", self.onBkMouseDown);
			}
		};
		
		this.onBkMouseDown = function(e){
			self.hide();
		};
		
		//###############################################//
		/* Show.*/
		//###############################################//
		this.show = function(id){
			
			if(this.isShowed_bl) return;
			this.isShowed_bl = true;
			this.isTweeningOnShowOrHide_bl = true;
			this.getStyle().zIndex = 100000002;
			this.disableBrowserScrollBars();
			if(this.addKeyboardSupport_bl) this.addKeyboardSupport();
			this.hideButtons(false);
			
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(this.screen);
			}else{
				document.documentElement.appendChild(this.screen);
				//if(this.isFullScreenByDefault_bl ==  false) document.documentElement.style.overflowX = "hidden";
			}
	
			this.id = id;
			this.startResizeHandler();
			
			
			this.bk_do.setAlpha(0);
			FWDU3DCarModTweenMax.to(this.bk_do, .8, {alpha:this.backgroundOpacity, ease:Quint.easeOut, onComplete:this.onShowComplete});	
			this.showFirstTimeWithDelayId_to = setTimeout(function(){self.showCurrentItem();}, 100);
			
			this.dispatchEvent(FWDU3DCarLightBox.SHOW_START);
		};
		
		this.onShowComplete = function(){
			self.isTweeningOnShowOrHide_bl = false;
			self.addCloseEventsWhenBkIsPressed();
		};
		
		//####################################//
		/* show current item. */
		//####################################//
		this.showCurrentItem = function(){	 
			if(self == null) return;
		
			this.type_str = this.data_ar[this.id].url;
			
			if (!this.type_str)
			{
				this.addChild(this.info_do);
				this.info_do.showText("The data URL isn't formatted correctly! Please note that it must be an image path, a Youtube video or a Vimeo video URL.");
				
				return;
			}
			
			if(this.data_ar[this.id].dataType.toLowerCase() == "iframe"){
				this.iframeW = this.iframeWidth;
				this.iframeH = this.iframeHeight;
				this.videoIdOrIframeUrl = this.type_str;
				this.type_str = FWDU3DCarLightBox.IFRAME;
				if(self.forceRoundBorderToIframe_bl && self.borderRadius != 0){
					self.itemsBorder_do.getStyle().borderRadius = self.borderRadius + "px";
				}else if(self.borderRadius != 0){
					 self.itemsBorder_do.getStyle().borderRadius = "0px";
					 self.itemsBackground_do.getStyle().borderRadius = "0px";
				}
				self.isIframe_bl = true;
			}else if(this.type_str.toLowerCase().indexOf(".jpg") != -1 
					|| this.type_str.toLowerCase().indexOf(".png") != -1 
					|| this.type_str.toLowerCase().indexOf(".jpeg") != -1){
				this.type_str = FWDU3DCarLightBox.IMAGE;
			}else if(this.type_str.toLowerCase().indexOf("http://www.youtube") != -1
					|| this.type_str.toLowerCase().indexOf("http://youtube") != -1
					|| this.type_str.toLowerCase().indexOf("youtube.com") != -1){
				args = FWDU3DCarUtils.getUrlArgs(this.type_str);
				if(!args.v){
					this.addChild(this.info_do);
					this.info_do.showText("Make sure that the Youtube URL is formatted correctly, probably the <font color='#FFFFFF'>v</font> variable from the URL is missing, this represents the video id.");
					return;
				}
				this.iframeW = this.videoWidth;
				this.iframeH = this.videoHeight;
				this.videoIdOrIframeUrl = args.v;
				this.type_str = FWDU3DCarLightBox.YOUTUBE;
				if(self.forceRoundBorderToIframe_bl && self.borderRadius != 0){
					self.itemsBorder_do.getStyle().borderRadius = self.borderRadius + "px";
				}else if(self.borderRadius != 0){
					 self.itemsBorder_do.getStyle().borderRadius = "0px";
					 self.itemsBackground_do.getStyle().borderRadius = "0px";
				}
				
			}else if(this.type_str.toLowerCase().indexOf("http://www.vimeo") != -1
					|| this.type_str.toLowerCase().indexOf("http://vimeo") != -1
					|| this.type_str.toLowerCase().indexOf("vimeo.com") != -1){
				this.iframeW = this.videoWidth;
				this.iframeH = this.videoHeight;
				this.videoIdOrIframeUrl = this.type_str.substr(this.type_str.lastIndexOf("/") + 1);
				this.type_str = FWDU3DCarLightBox.VIMEO;
				if(self.forceRoundBorderToIframe_bl && self.borderRadius != 0){
					self.itemsBorder_do.getStyle().borderRadius = self.borderRadius + "px";
				}else if(self.borderRadius != 0){
					 self.itemsBorder_do.getStyle().borderRadius = "0px";
					 self.itemsBackground_do.getStyle().borderRadius = "0px";
				}
			}
			else
			{
				this.addChild(this.info_do);
				this.info_do.showText("The data URL isn't formatted correctly! Please note that it must be an image path, a Youtube video or a Vimeo video URL.");
				
				return;
			}
			
			this.createItem();
		};
		
		//####################################//
		/* create main item */
		//####################################//
		this.createItem = function(){		
			clearTimeout(this.transitionShapeDoneId_to);
			clearTimeout(this.showVideoId_to);
			this.preloader_do.hide(true);
			
			if(this.showSlideshowButton_bl) this.timerManager.stop();
			
			if(this.contains(this.info_do)) this.removeChild(this.info_do);
			if(this.image_img){
				this.image_img.onload = null;
				this.image_img.onerror = null;
				this.image_img = null;
			}
			
			if(this.infoButton_do) this.infoButton_do.isDisabled_bl = true;
			
			if(this.type_str == FWDU3DCarLightBox.IMAGE){
				if(this.prevItem_do){
					if(this.opacityType == "filter" && this.prevItem_do.type != "img"){
						this.prevItem_do.setVisible(false);
					}else if(this.isMobile_bl || this.prevItem_do.type != "img"){
						this.cleanChildren(0);
					}
				}
				this.loadImage();
			}else if(this.type_str == FWDU3DCarLightBox.YOUTUBE || this.type_str == FWDU3DCarLightBox.VIMEO || this.type_str == FWDU3DCarLightBox.IFRAME){
				this.isTweening_bl = true;
				if(this.firstTimeShowed_bl){
					this.createIframeHolder();
					this.resizeCurrentItem();
					this.showItemFirstTime();
					this.showVideoId_to = setTimeout(this.showIframeContent, 900);
					this.prevItem_do = self.currentItem_do;	
				}else{
					if(this.prevItem_do){
						if(this.opacityType == "filter" && this.prevItem_do.type != "img"){
							this.prevItem_do.setVisible(false);
						}else if(this.isMobile_bl || this.prevItem_do.type != "img"){
							this.cleanChildren(0);
						}else{
							FWDU3DCarModTweenMax.to(this.prevItem_do, .8, {alpha:0});
						}	
					}
					
					this.createIframeHolder();
					this.resizeCurrentItem(true);
					
					this.positionButtons(true);
					this.animMainDos();
					this.showVideoId_to = setTimeout(this.showIframeContent, 900);
					if(this.showZoomButton_bl && (this.type_str == FWDU3DCarLightBox.YOUTUBE || this.type_str == FWDU3DCarLightBox.VIMEO || self.type_str == FWDU3DCarLightBox.IFRAME)){
						var index = FWDU3DCarUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
						if(index != -1){
							this.buttons_ar.splice(index,1);
							this.removeChild(this.zoomButton_do);
						}
					}
					
					this.prevItem_do = self.currentItem_do;	
				}
				if(self.infoWindow_do){
					if(this.mainItemsHolder_do.contains(self.infoWindow_do) && this.infoWindow_do.isShowed_bl){
						this.infoWindow_do.setText(this.data_ar[self.id].infoText, this.finalWidth, this.finalHeight, false, this.type_str != FWDU3DCarLightBox.IMAGE);
					};
				}
			}
			this.prevType_str = this.type_str;
		};
		
		this.createIframeHolder = function(){
			this.currentItem_do = new FWDU3DCarDisplayObject("div");
			
			if(this.type_str == FWDU3DCarLightBox.IFRAME && this.isMobile_bl){
				this.currentItem_do.getStyle().overflow = "scroll";
				this.currentItem_do.getStyle().webkitOverflowScrolling = "touch";
			}
			
			this.originalWidth = self.iframeW;
			this.originalHeight = self.iframeH;
			this.itemsHolder_do.addChild(self.currentItem_do);
		};
		
		//####################################//
		/* load image_img */
		//####################################//
		this.loadImage = function(){
			this.isLoading_bl = true;
			this.preloader_do.show();
		
			var imagePath = this.data_ar[this.id].url;
			this.image_img = new Image();
			this.image_img.onload = this.imageLoadComplete;
			this.image_img.onerror = this.imageLoadError;
			this.image_img.src = imagePath;
			
			this.addChild(this.preloader_do);
		};
		
		this.imageLoadComplete = function(e){
			
			if(self.prevItem_do){
				if(!self.isMobile_bl && self.prevItem_do.type == "img") FWDU3DCarModTweenMax.to(self.prevItem_do, .6, {alpha:0});
			}
			
			self.originalWidth = self.image_img.width;
			self.originalHeight = self.image_img.height;
			
			self.currentItem_do = new FWDU3DCarDisplayObject("img");
			self.currentItem_do.setScreen(self.image_img);
			if(self.borderRadius != 0) self.currentItem_do.getStyle().borderRadius = self.borderRadius + "px";
			if(self.borderRadius != 0) self.itemsBorder_do.getStyle().borderRadius = self.borderRadius + "px";
			if(self.borderRadius != 0) self.itemsBackground_do.getStyle().borderRadius = self.borderRadius + "px";
			
			
			if(self.firstTimeShowed_bl){
				self.transitionTotalDuration = 800;
				self.resizeCurrentItem(false);
				self.showItemFirstTime();
			}else{
				
				self.transitionTotalDuration = 1400;
				
				self.resizeCurrentItem(true);
				self.currentItem_do.setWidth(self.finalWidth - (self.borderSize * 2));
				self.currentItem_do.setHeight(self.finalHeight - (self.borderSize * 2));
				self.currentItem_do.setAlpha(0);
				FWDU3DCarModTweenMax.to(self.currentItem_do, .6, {alpha:1, delay:.8});
				
				self.addZoomButtonBackToButtonsArray();
			
				self.animMainDos();
				self.positionButtons(true);
			}
			
			if(self.infoWindow_do && self.infoWindow_do.isShowed_bl){
				self.infoWindow_do.setText(self.data_ar[self.id].infoText, self.finalWidth, self.finalHeight, true, self.type_str != FWDU3DCarLightBox.IMAGE);
			};
			
			if(self.showSlideshowButton_bl) self.timerManager.stop();
			self.preloader_do.hide(true);
			self.prevItem_do = self.currentItem_do;
			self.isTweening_bl = true;
			self.isLoading_bl = false;
			self.transitionShapeDoneId_to = setTimeout(self.transitionShapeDoneHandler, 800);
			self.transitionDoneId_to = setTimeout(self.transitionDoneHandler, self.transitionTotalDuration);
			
			self.itemsHolder_do.addChild(self.currentItem_do);
		};
		
		this.transitionDoneHandler = function(){
			if(self.showSlideshowButton_bl) self.timerManager.start();
			self.isTweening_bl = false;
			self.cleanChildren(1);
		};
		
		this.transitionShapeDoneHandler = function(){
			if(self.infoButton_do) self.infoButton_do.isDisabled_bl = false;
		};
		
		this.imageLoadError = function(){
			var message = "Image can't be loaded probably the path is incorrect <font color='#FFFFFF'>" + self.data_ar[self.id].url + "</font>";
			self.addChild(self.info_do);
			self.info_do.showText(message);
		};
		
		//#######################################//
		/* animate main divs */
		//#######################################//
		this.animMainDos = function(){
			FWDU3DCarModTweenMax.to(this.mainItemsHolder_do, .8, {delay:.1,x:self.finalX, y:self.finalY, w:self.finalWidth, h:self.finalHeight, ease:Expo.easeInOut});
			FWDU3DCarModTweenMax.to(this.itemsBackground_do, .8, {delay:.1, x:self.borderSize, y:self.borderSize, w:self.finalWidth - (self.borderSize * 2), h:self.finalHeight - (self.borderSize * 2), ease:Expo.easeInOut});
			FWDU3DCarModTweenMax.to(this.itemsBorder_do, .8, {delay:.1, w:self.finalWidth, h:self.finalHeight, ease:Expo.easeInOut});
			FWDU3DCarModTweenMax.to(this.itemsHolder_do, .8, {delay:.1, x:self.borderSize, y:self.borderSize, w:self.finalWidth - (self.borderSize * 2), h:self.finalHeight - (self.borderSize * 2), ease:Expo.easeInOut});
			if(!this.isMobile_bl && this.prevItem_do.type == "img") FWDU3DCarModTweenMax.to(self.prevItem_do, .8, {delay:.1, x: (self.finalWidth -  (self.borderSize * 2) - self.prevItem_do.getWidth())/2, y:(self.finalHeight -  (self.borderSize * 2) - self.prevItem_do.getHeight())/2, ease:Expo.easeInOut});
		};
		
		//####################################//
		/* load youtube and viemo video  */
		//####################################//
		this.showIframeContent = function(){
		
			self.isTweening_bl = false;
			if(self.showSlideshowButton_bl) self.timerManager.start();
			if(self.infoButton_do) self.infoButton_do.isDisabled_bl = false;
			self.cleanChildren(1);
		
			var iFrame = document.createElement("iframe");	
			iFrame.width = "100%";
			iFrame.height = "100%";
			iFrame.frameBorder = 0;
			
			iFrame.allowfullscreen = true;
			if(self.type_str == FWDU3DCarLightBox.YOUTUBE){
				if(self.videoAutoPlay_bl){
					iFrame.src = "http://www.youtube.com/embed/" + self.videoIdOrIframeUrl + "?wmode=transparent&autoplay=1";
				}else{
					iFrame.src = "http://www.youtube.com/embed/" + self.videoIdOrIframeUrl + "?wmode=transparent";
				}
			}else if(self.type_str == FWDU3DCarLightBox.VIMEO){
				if(self.videoAutoPlay_bl){
					iFrame.src = "http://player.vimeo.com/video/" + self.videoIdOrIframeUrl + "?autoplay=1";
				}else{
					iFrame.src = "http://player.vimeo.com/video/" + self.videoIdOrIframeUrl;
				}
			}else if(self.type_str == FWDU3DCarLightBox.IFRAME){
				iFrame.src = self.videoIdOrIframeUrl;
			}
			
			self.currentItem_do.screen.appendChild(iFrame);
			self.resizeCurrentItem();
		};
	
		//####################################//
		/* show item first time */
		//####################################//
		this.showItemFirstTime = function(){
			this.firstTimeShowed_bl = false;
			
			this.showButtons();
			this.mainItemsHolder_do.setX(this.stageWidth/2);
			this.mainItemsHolder_do.setY(this.stageHeight/2);
			this.mainItemsHolder_do.setWidth(0);
			this.mainItemsHolder_do.setHeight(0);
			this.currentItem_do.setAlpha(0);
			this.itemsBorder_do.setAlpha(0);
			if(this.showInfoWindowByDefault_bl) this.showInfoWindowOnStart();
			
			FWDU3DCarModTweenMax.to(this.currentItem_do, .8, {alpha:1, delay:.9, ease:Quint.easeOut});
			FWDU3DCarModTweenMax.to(this.itemsBorder_do, .8, {alpha:1, delay:.7, ease:Quint.easeOut});
			FWDU3DCarModTweenMax.to(this.mainItemsHolder_do, .8, {x:this.finalX, y:this.finalY, w:this.finalWidth, h:this.finalHeight, ease:Expo.easeInOut});
			
			if(this.showZoomButton_bl && (this.type_str == FWDU3DCarLightBox.YOUTUBE || this.type_str == FWDU3DCarLightBox.VIMEO || self.type_str == FWDU3DCarLightBox.IFRAME)){
				var index = FWDU3DCarUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
				if(index != -1){
					this.buttons_ar.splice(index, 1);
					this.removeChild(this.zoomButton_do);
				}
			}
			
		};
		
		//####################################//
		/* clean children */
		//####################################//
		this.cleanChildren = function(index){
			var child;
			var inChild;
			while(self.itemsHolder_do.getNumChildren() > index){
				child = self.itemsHolder_do.getChildAt(0);
				FWDU3DCarModTweenMax.killTweensOf(child);
				self.itemsHolder_do.removeChild(child);
				if(self.opacityType == "opacity" && child.type != "img") child.setInnerHTML("");
				child.destroy();
			};
			child = null;
		};
		
		//####################################//
		/* resize current image continer */
		//####################################//
		this.resizeCurrentItem = function(onlySetData){
			
			if(!this.currentItem_do) return;
		
			var containerWidth = this.stageWidth - 10;
			var containerHeight = this.stageHeight - 10;
			
			var scaleX = containerWidth/this.originalWidth;
			var scaleY = containerHeight/this.originalHeight;
			var totalScale = 0;
			
			if(scaleX <= scaleY){
				totalScale = scaleX;
			}else if(scaleX >= scaleY){
				totalScale = scaleY;
			}
			
			if(scaleX >= 1 && scaleY >=1) totalScale = 1;
			
			
			this.finalWidth = Math.round((this.originalWidth * totalScale));
			this.finalHeight = Math.round((this.originalHeight * totalScale));
			
			if(this.finalWidth > (this.stageWidth - (this.buttonWidth * 2) - 4)){
				this.finalWidth = (this.stageWidth - (this.buttonWidth * 2) - 4);
				this.finalHeight = Math.round(this.originalHeight * (this.finalWidth/this.originalWidth));
			}
			
			this.finalX = Math.floor((containerWidth  -  this.finalWidth)/2) + 5;
			this.finalY = Math.floor((containerHeight -  this.finalHeight)/2) + 5;
			
			if(onlySetData) return;
			
			FWDU3DCarModTweenMax.killTweensOf(this.mainItemsHolder_do);
			this.mainItemsHolder_do.setX(this.finalX);
			this.mainItemsHolder_do.setY(this.finalY);
			this.mainItemsHolder_do.setWidth(this.finalWidth);
			this.mainItemsHolder_do.setHeight(this.finalHeight);
			
			FWDU3DCarModTweenMax.killTweensOf(this.itemsBackground_do);
			this.itemsBackground_do.setX(this.borderSize);
			this.itemsBackground_do.setY(this.borderSize);
			this.itemsBackground_do.setWidth(this.finalWidth - (this.borderSize * 2));
			this.itemsBackground_do.setHeight(this.finalHeight - (this.borderSize * 2));
			
			FWDU3DCarModTweenMax.killTweensOf(this.itemsBorder_do);
			this.itemsBorder_do.setX(0);
			this.itemsBorder_do.setY(0);
			this.itemsBorder_do.setWidth(this.finalWidth);
			this.itemsBorder_do.setHeight(this.finalHeight);
			this.itemsBorder_do.setAlpha(1);
			
			FWDU3DCarModTweenMax.killTweensOf(this.currentItem_do);
			if(this.isMaximized_bl){
				scaleX = this.stageWidth/this.originalWidth;
				scaleY = this.stageHeight/this.originalHeight;
				
				if(scaleX >= scaleY){
					totalScale = scaleX;
				}else if(scaleX <= scaleY){
					totalScale = scaleY;
				}
				this.currentItem_do.setX(parseInt((this.stageWidth - (this.originalWidth * totalScale))/2));
				this.currentItem_do.setY(parseInt((this.stageHeight - (this.originalHeight * totalScale))/2));
				this.currentItem_do.setWidth(parseInt(this.originalWidth * totalScale));
				this.currentItem_do.setHeight(parseInt(this.originalHeight * totalScale));
			}else{
				this.currentItem_do.setAlpha(1);
				this.currentItem_do.setX(0);
				this.currentItem_do.setY(0);
				this.currentItem_do.setWidth(this.finalWidth - (this.borderSize * 2));
				this.currentItem_do.setHeight(this.finalHeight - (this.borderSize * 2));
			}
			
			this.itemsHolder_do.setX(this.borderSize);
			this.itemsHolder_do.setY(this.borderSize);
			this.itemsHolder_do.setWidth(this.finalWidth - (this.borderSize * 2));
			this.itemsHolder_do.setHeight(this.finalHeight - (this.borderSize * 2));
			
		};
		
		//###################################//
		/* go to next / prev item */
		//###################################//
		this.goToNextItem = function(){
			if(this.isTweening_bl) return;
			this.transitionDirection_str = "next";
			this.id ++;
			if(this.id > this.totalItems - 1){
				this.id = 0;
			}
		
			this.showCurrentItem();
		};
		
		this.goToPrevItem = function(){
			if(this.isTweening_bl) return;
			this.transitionDirection_str = "prev";
			this.id --;
			if(this.id < 0){
				this.id = this.totalItems - 1;
			}
			this.showCurrentItem();
		};
		
		//#############################################//
		/* maximize / minimize */
		//#############################################//
		this.maximizeOrMinimize = function(){
			
			if(this.isLoading_bl || self.isTweeningOnShowOrHide_bl) return;
			
			if(this.timerManager) this.timerManager.stop();
			
			var scaleX;
			var scaleY;
			var finalX;
			var finalY;
			var finalWidth;
			var finalHeight;
			var totalScale;
			
			clearTimeout(this.maximizeCompleteTimeOutId_to);
			clearTimeout(this.minimizeCompleteTimeOutId_to);
			FWDU3DCarModTweenMax.killTweensOf(this.currentItem_do);
			
			if(this.isMaximized_bl){
				this.isMaximized_bl = false;
				this.isTweening_bl = true;
				if(this.isMobile_bl){
					this.removeEventsForScrollngImageOnMobile();
				}else{
					this.removeEventsForScrollngImageOnDesktop();
				}
				
				this.bk_do.setAlpha(this.backgroundOpacity);
				this.mainItemsHolder_do.setVisible(true);
				this.closeButton_do.setVisible(true);
				
				if(self.nextButton_do){
					this.nextButton_do.setVisible(true);
					this.prevButton_do.setVisible(true);
				}
				
				if(this.infoButton_do) this.infoButton_do.setVisible(true);
				
				if(this.slideshowButtton_do){
					this.slideshowButtton_do.setVisible(true);
				}
				
				this.currentItem_do.setX(this.currentItem_do.getX() - this.finalX - this.borderSize);
				this.currentItem_do.setY(this.currentItem_do.getY() - this.finalY - this.borderSize);
				this.positionButtons(true);
				if(this.slideShowPreloader_do) this.positionSlideShowPreloader(false);
				
				FWDU3DCarModTweenMax.to(this.currentItem_do, .8, {x:0, y:0, w:this.finalWidth - (this.borderSize * 2), h:this.finalHeight - (this.borderSize * 2), ease:Expo.easeInOut});
				this.minimizeCompleteTimeOutId_to = setTimeout(this.minimizeCompleteHandler, 800);
				this.mainItemsHolder_do.setOverflow("visible");
				this.zoomButton_do.isMaximized_bl = false;
				
				this.itemsHolder_do.addChild(this.currentItem_do);
				this.addChild(this.mainItemsHolder_do);
				this.addChild(this.zoomButton_do);
				
				this.dispatchEvent(FWDU3DCarLightBox.MINIMIZE_START);
			}else{
		
				this.isMaximized_bl = true;
				this.isTweening_bl = true;
				
				if(self.borderRadius != 0) self.currentItem_do.getStyle().borderRadius = "";
				
				scaleX = this.stageWidth/this.originalWidth;
				scaleY = this.stageHeight/this.originalHeight;
				totalScale = 0;
				
				if(scaleX >= scaleY){
					totalScale = scaleX;
				}else if(scaleX <= scaleY){
					totalScale = scaleY;
				}
				
				finalWidth = parseInt(this.originalWidth * totalScale);
				finalHeight = parseInt(this.originalHeight * totalScale);
				finalX = parseInt((this.stageWidth - finalWidth)/2);
				finalY = parseInt((this.stageHeight - finalHeight)/2);
		
				this.currentItem_do.setAlpha(1);
				
				this.currentItem_do.setX(this.currentItem_do.getGlobalX());
				this.currentItem_do.setY(this.currentItem_do.getGlobalY());
				
				if(this.isMobile_bl){
					FWDU3DCarModTweenMax.to(this.zoomButton_do, .8, {x:this.stageWidth -  this.buttonWidth, y:1, ease:Expo.easeInOut});
					FWDU3DCarModTweenMax.to(this.currentItem_do, .8, { x:finalX, y:finalY, w:finalWidth, h:finalHeight, ease:Expo.easeInOut});
				}else{
					this.zoomButton_do.isMaximized_bl = true;
					if(scaleX >= scaleY){
						FWDU3DCarModTweenMax.to(this.currentItem_do, .8, {x:finalX, w:finalWidth, h:finalHeight, ease:Expo.easeInOut});
					}else if(scaleX < scaleY){
						FWDU3DCarModTweenMax.to(this.currentItem_do, .8, {y:finalY, w:finalWidth, h:finalHeight, ease:Expo.easeInOut});
					}
					this.addEventsForScrollngImageOnDesktop();
				}
				
				if(self.infoWindow_do) if(self.infoButton_do.currentState == 0) this.infoWindow_do.hide(false);
				this.itemsHolder_do.removeChild(this.currentItem_do);
				this.addChild(this.currentItem_do);
				this.addChild(this.zoomButton_do);
				this.maximizeCompleteTimeOutId_to = setTimeout(this.maximizeCompleteHandler, 800);
			}
		};
		
		this.maximizeCompleteHandler = function(){
			self.bk_do.setAlpha(1);
			self.mainItemsHolder_do.setVisible(false);
			self.closeButton_do.setVisible(false);
			
			if(self.nextButton_do){
				self.nextButton_do.setVisible(false);
				self.prevButton_do.setVisible(false);
			}
			
			if(self.infoButton_do) self.infoButton_do.setVisible(false);
			
			if(self.slideshowButtton_do){
				self.slideshowButtton_do.setVisible(false);
				self.slideShowPreloader_do.setX(3000);
			}
			self.dispatchEvent(FWDU3DCarLightBox.MAXIMIZE_COMPLETE);
			if(self.isMobile_bl) self.addEventsForScrollngImageOnMobile();
		};
		
		this.minimizeCompleteHandler = function(){
			if(self.infoWindow_do) if(self.infoButton_do.currentState ==  0) self.infoWindow_do.show(true);
			if(self.showSlideshowButton_bl) self.timerManager.start();
			self.mainItemsHolder_do.setOverflow("hidden");
			if(self.borderRadius != 0) self.currentItem_do.getStyle().borderRadius = self.borderRadius + "px";
			self.itemsHolder_do.removeChild(self.currentItem_do);
			self.itemsHolder_do.addChild(self.currentItem_do);
			self.isTweening_bl = false;
		};
		
		//##############################################//
		/* add events to scroll the image on pc */
		//##############################################//
		this.addEventsForScrollngImageOnDesktop = function(){
			this.updateImageWhenMaximized_int = setInterval(this.updateMaximizedImageHandler, 16);
			if(window.addEventListener){
				window.addEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler);
			}else{
				document.attachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler);
			}
		};
		
		this.removeEventsForScrollngImageOnDesktop = function(){
			clearInterval(this.updateImageWhenMaximized_int);
			if(window.addEventListener){
				window.removeEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler);
			}else{
				document.detachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler);
			}
		};
	
		this.updateMaximizeImageOnMouseMovedHandler = function(e){
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			var scrollOffsets = FWDU3DCarUtils.getScrollOffsets();
			
			self.globalXMousePosition = viewportMouseCoordinates.screenX;
			self.globalYMousePosition = viewportMouseCoordinates.screenY;
		
			FWDU3DCarModTweenMax.to(self.zoomButton_do, .2, {x:self.globalXMousePosition - parseInt(self.buttonWidth/2), y:self.globalYMousePosition - parseInt(self.buttonHeight/2)});
		};
		
		this.updateMaximizedImageHandler = function(){
			
			var targetX;
			var targetY;
			
			self.percentX = self.globalXMousePosition/self.stageWidth;
			self.percentY = self.globalYMousePosition/self.stageHeight;
			if(self.percentX > 1) self.percentX = 1;
			if(self.percentY > 1) self.percentY = 1;
			
			var scaleX = self.stageWidth/self.originalWidth;
			var scaleY = self.stageHeight/self.originalHeight;
		
			if(scaleX <= scaleY){
				targetX = Math.round(((self.stageWidth - self.currentItem_do.getWidth()) * self.percentX));
				if(isNaN(targetX)) return;
				FWDU3DCarModTweenMax.to(self.currentItem_do, .4, {x:targetX});
			}else {
				targetY = Math.round(((self.stageHeight - self.currentItem_do.getHeight()) * self.percentY));
				if(isNaN(targetY)) return;
				FWDU3DCarModTweenMax.to(self.currentItem_do, .4, {y:targetY});
			}
		};
		
		//##############################################//
		/* add events to scroll the image on mobile */
		//##############################################//
		this.addEventsForScrollngImageOnMobile = function(){
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerDown", self.onTouchStartScrollImage);
				window.addEventListener("MSPointerUp", self.onTouchEndScrollImage);
			}else{
				window.addEventListener("touchstart", self.onTouchStartScrollImage);
				window.addEventListener("touchend", self.onTouchEndScrollImage);
			}
		
			clearInterval(this.updateImageWhenMaximized_int);
			this.updateImageWhenMaximized_int = setInterval(this.updateMaximizedImageMobileHandler, 16);
		};
		
		this.removeEventsForScrollngImageOnMobile = function(){
			clearInterval(self.updateImageWhenMaximized_int);
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerDown", self.onTouchStartScrollImage);
				window.removeEventListener("MSPointerUp", self.onTouchEndScrollImage);
				window.removeEventListener("MSPointerMove", self.onTouchMoveScrollImage);
			}else{
				window.removeEventListener("touchstart", self.onTouchStartScrollImage);
				window.removeEventListener("touchend", self.onTouchEndScrollImage);	
				window.removeEventListener("touchmove", self.onTouchMoveScrollImage);
			}
		};
		
		this.onTouchStartScrollImage =  function(e){
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);	
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerMove", self.onTouchMoveScrollImage);
			}else{
				window.addEventListener("touchmove", self.onTouchMoveScrollImage);
			}
			
			self.lastPresedX = viewportMouseCoordinates.screenX;
			self.lastPresedY = viewportMouseCoordinates.screenY;
			
			e.preventDefault();
		};
		
		this.onTouchEndScrollImage = function(e){
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerMove", self.onTouchMoveScrollImage);
			}else{
				window.removeEventListener("touchmove", self.onTouchMoveScrollImage);
			}
			self.isDragging_bl = false;
		};
		
		this.onTouchMoveScrollImage = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);	
			var scaleX = self.stageWidth/self.originalWidth;
			var scaleY = self.stageHeight/self.originalHeight;
			var toAddX = 0;
			var toAddY = 0;
			self.isDragging_bl = true;	
			
			if(scaleX < scaleY){
				//x
				toAddX = viewportMouseCoordinates.screenX - self.lastPresedX;
				self.lastPresedX = viewportMouseCoordinates.screenX;
				self.currentItem_do.setX(self.currentItem_do.getX() + toAddX);
			}else if(scaleX > scaleY){
				//y
				toAddY = viewportMouseCoordinates.screenY - self.lastPresedY;
				self.lastPresedY = viewportMouseCoordinates.screenY;
				
				self.currentItem_do.setY(self.currentItem_do.getY() + toAddY);
			}else{
				toAddX = viewportMouseCoordinates.screenX - self.lastPresedX;
				self.lastPresedX = viewportMouseCoordinates.screenX;
				self.currentItem_do.setX(self.currentItem_do.getX() + toAddX);
				
				toAddY = viewportMouseCoordinates.screenY - self.lastPresedY;
				self.lastPresedY = viewportMouseCoordinates.screenY;
				self.currentItem_do.setY(self.currentItem_do.getY() + toAddY);
			}
			
			self.vx = toAddX  * 2;
			self.vy = toAddY  * 2;
		};
		
		this.updateMaximizedImageMobileHandler = function(){
			
			var tempX;
			var tempY;
			var curX;
			var curY;
			var tempW;
			var tempH;
			
			if(!self.isDragging_bl){
				
				self.vy *= self.friction;
				self.vx *= self.friction;
				curX = self.currentItem_do.getX();
				curY = self.currentItem_do.getY();
				tempX = curX +  self.vx;
				tempY = curY +  self.vy;
				tempW = self.currentItem_do.getWidth();
				tempH = self.currentItem_do.getHeight();
				
				if(isNaN(tempX) || isNaN(tempY)) return;
				
				self.currentItem_do.setX(tempX);
				self.currentItem_do.setY(tempY);
				
				if(curY >= 0){
					self.vy2 = (0 - curY) * .3;
					self.vy *= self.friction;
					self.currentItem_do.setY(curY + self.vy2);
				}else if(curY <= self.stageHeight - tempH){
					self.vy2 = (self.stageHeight - tempH - curY) * .5;
					self.vy *= self.friction;
					self.currentItem_do.setY(curY + self.vy2);
				}
				
				if(curX >= 0){
					self.vx2 = (0 - curX) * .3;
					self.vx *= self.friction;
					self.currentItem_do.setX(curX + self.vx2);
				}else if(curX <= self.stageWidth - tempW){
					self.vx2 = (self.stageWidth - tempW - curX) * .5;
					self.vx *= self.friction;
					self.currentItem_do.setX(curX + self.vx2);
				}
			}
		};
		
		
		//#############################################//
		/* setup close button */
		//#############################################//
		this.setupCloseButton = function(){
			FWDU3DCarSimpleButton.setPrototype();
			this.closeButton_do = new FWDU3DCarSimpleButton(this.closeN_img, this.closeS_img, this.isMobile_bl);
			this.closeButton_do.addListener(FWDU3DCarSimpleButton.CLICK, this.closeButtonOnClickHandler);
			this.addChild(this.closeButton_do);
		};
			
		this.closeButtonOnClickHandler = function(e){
			self.hide();
		};
		
		//####################################//
		/* setup next and prev buttons */
		//###################################//
		this.setupNextAndPrevButtons = function(){
			//next button
			FWDU3DCarSimpleButton.setPrototype();
			this.nextButton_do = new FWDU3DCarSimpleButton(this.nextN_img, this.nextS_img, this.isMobile_bl);
			this.nextButton_do.addListener(FWDU3DCarSimpleButton.CLICK, this.nextButtonOnClickHandler);
		
			//prev button
			FWDU3DCarSimpleButton.setPrototype();
			this.prevButton_do = new FWDU3DCarSimpleButton(this.prevN_img, this.prevS_img, this.isMobile_bl);
			this.prevButton_do.addListener(FWDU3DCarSimpleButton.CLICK, this.prevButtonOnClickHandler);
			
			this.addChild(this.nextButton_do);
			this.addChild(this.prevButton_do);
		};
		
		this.nextButtonOnClickHandler = function(e){
			self.goToNextItem();
		};
		
		this.prevButtonOnClickHandler = function(e){
			self.goToPrevItem();
		};
		
		//#############################################//
		/* setup zoom button */
		//#############################################//
		this.setupZoomButton = function(){
			FWDU3DCarComplexButton.setPrototype();
			this.zoomButton_do = new FWDU3DCarComplexButton(this.minimizeN_img, this.minimizeS_img, this.maximizeN_img, this.maximizeS_img, this.isMobile_bl, true);			
			this.zoomButton_do.addListener(FWDU3DCarComplexButton.CLICK, this.onZoomButtonClickHandler);
			this.addChild(this.zoomButton_do);
		};
			
		this.onZoomButtonClickHandler = function(e){
			if(self.isLoading_bl) return;
			self.zoomButton_do.toggleButton();
			self.maximizeOrMinimize();
		};
		
		this.addZoomButtonBackToButtonsArray = function(){
			if(this.showZoomButton_bl){
				var index = FWDU3DCarUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
				if(index == -1){
					if(this.buttons_ar.length > 1){
						this.zoomButton_do.setX(this.buttons_ar[this.buttons_ar.length -2].finalX);
						this.zoomButton_do.setY(this.buttons_ar[this.buttons_ar.length -2].finalY + this.buttonHeight + 1);
						this.buttons_ar.splice(this.buttons_ar.length -1, 0, this.zoomButton_do);
					}else{
						this.zoomButton_do.setX(self.buttons_ar[this.buttons_ar.length -1].finalX);
						this.zoomButton_do.setY(self.buttons_ar[this.buttons_ar.length -1].finalY + this.buttonHeight + 1);
						this.buttons_ar.push(this.zoomButton_do);
					}
					this.addChild(this.zoomButton_do);
				}
			}
		};
		
		//#############################################//
		/* setup info button */
		//#############################################//
		this.setupInfoButton = function(){
			FWDU3DCarComplexButton.setPrototype();
			this.infoButton_do = new FWDU3DCarComplexButton(this.infoCloseN_img, this.infoCloseS_img, this.infoOpenN_img, this.infoOpenS_img, this.isMobile_bl, false);
			this.infoButton_do.addListener(FWDU3DCarComplexButton.FIRST_BUTTON_CLICK, this.onHideInfoButtonPressedHandler);
			this.infoButton_do.addListener(FWDU3DCarComplexButton.SECOND_BUTTON_CLICK, this.onShowInfoButtonPressedHandler);
			this.addChild(this.infoButton_do);
		};
		
		this.onShowInfoButtonPressedHandler = function(e){
			self.infoWindow_do.setText(self.data_ar[self.id].infoText, self.finalWidth, self.finalHeight, false, self.type_str != FWDU3DCarLightBox.IMAGE);
			self.mainItemsHolder_do.addChild(self.infoWindow_do);
		};
		
		this.onHideInfoButtonPressedHandler = function(e){
			self.infoWindow_do.hide(true);
		};
		
		this.showInfoWindowOnStart = function(){
			if(!self.infoWindow_do) return;
			if(this.infoButton_do) this.infoButton_do.setSecondButtonState();
			self.infoWindow_do.setText(self.data_ar[self.id].infoText, self.finalWidth, self.finalHeight, false, self.type_str != FWDU3DCarLightBox.IMAGE);
			if(!self.mainItemsHolder_do.contains(self.infoWindow_do)) self.mainItemsHolder_do.addChild(self.infoWindow_do);
		};
		
		//###############################################//
		/* Setup info window.*/
		//###############################################//
		this.setupInfoWindow = function(){
			FWDU3DCarInfoWindow.setPrototype();
			this.infoWindow_do = new FWDU3DCarInfoWindow(this.borderSize, this.infoWindowBackgroundColor, this.infoWindowBackgroundOpacity, this.borderRadius, this.isMobile_bl);
		};
		
		//#############################################//
		/* setup slideshow button */
		//#############################################//
		this.setupSlideshowButton = function(){
			FWDU3DCarComplexButton.setPrototype();
			this.slideshowButtton_do = new FWDU3DCarComplexButton(this.pauseN_img, this.pauseS_img, this.playN_img, this.playS_img, this.isMobile_bl, false);
			this.slideshowButtton_do.addListener(FWDU3DCarComplexButton.FIRST_BUTTON_CLICK, this.onStopSlideShowHandler);
			this.slideshowButtton_do.addListener(FWDU3DCarComplexButton.SECOND_BUTTON_CLICK, this.onStartSlideShowHandler);
		
			if(this.slideShowAutoPlay_bl) {
				this.timerManager.isStopped_bl = false;
				this.slideShowPreloader_do.show(true);
				this.slideshowButtton_do.setSecondButtonState();
			}
			
			this.addChild(this.slideshowButtton_do);
		};
			
		this.onStopSlideShowHandler = function(e){		
			self.timerManager.isStopped_bl = true;
			self.slideShowPreloader_do.hide(true);
			self.timerManager.stop();
		};
		
		this.onStartSlideShowHandler = function(e){
			self.timerManager.isStopped_bl = false;
			self.slideShowPreloader_do.show(true);
			if(!self.isLoading_bl) self.timerManager.start();
		};
		
		//###############################################//
		/* Setup timer manager.*/
		//###############################################//
		this.setupTimerManager = function(){
			FWDU3DCarTimerManager.setProtptype();
			this.timerManager = new FWDU3DCarTimerManager(this.slideShowDelay, this.slideShowAutoPlay_bl);
			this.timerManager.addListener(FWDU3DCarTimerManager.START, this.onTimerManagerStartHandler);
			this.timerManager.addListener(FWDU3DCarTimerManager.STOP, this.onTimerManagerStopHandler);
			this.timerManager.addListener(FWDU3DCarTimerManager.TIME, this.onTimerManagerTimeHandler);
		};
		
		this.onTimerManagerStartHandler = function(){
			if(!self.timerManager.isStopped_bl) self.slideShowPreloader_do.animIn();
		};
		
		this.onTimerManagerStopHandler = function(){
			self.slideShowPreloader_do.animOut();
		};
		
		this.onTimerManagerTimeHandler = function(){
			self.goToNextItem();
			self.slideShowPreloader_do.animOut();
		};
		
		
		//###############################################//
		/* Setup slideshow preloader.*/
		//###############################################//
		this.setupSlideShowPreloader = function(){
			FWDU3DCarSlideShowPreloader.setPrototype();
			this.slideShowPreloader_do = new FWDU3DCarSlideShowPreloader(this.slideShowPreloader_img, 31, this.slideshowPreloaderHeight, 11, this.slideShowDelay);
			this.addChild(this.slideShowPreloader_do);
		};
		
		this.positionSlideShowPreloader = function(animate){
			if(!this.slideShowPreloader_do) return;
			this.slideShowPreloader_do.finalX = this.finalX + this.finalWidth;
			this.slideShowPreloader_do.finalY = this.finalY + this.finalHeight - this.slideshowPreloaderHeight;
			FWDU3DCarModTweenMax.killTweensOf(this.slideShowPreloader_do);
			if(animate){
				FWDU3DCarModTweenMax.to(this.slideShowPreloader_do, .8, {x:this.slideShowPreloader_do.finalX, y:this.slideShowPreloader_do.finalY, delay:.1, ease:Expo.easeInOut});
			}else{
				this.slideShowPreloader_do.setX(this.slideShowPreloader_do.finalX);
				this.slideShowPreloader_do.setY(this.slideShowPreloader_do.finalY);
			}
		};
		
		
		//###############################################//
		/* Position buttons.*/
		//###############################################//
		this.positionButtons = function(animate){
			
			var button;
			var totalButtons = this.buttons_ar.length;
			var spacerV = 1;
			var offsetX = this.finalX + this.finalWidth;
			var offsetY = this.finalY;
			var nextButtonFinalY = 0;
		
			for(var i=0; i<totalButtons; i++){
				button = this.buttons_ar[i];
				FWDU3DCarModTweenMax.killTweensOf(button);
				
				button.finalY = offsetY + (i * (this.buttonHeight + 1));
				
				if(button == this.nextButton_do){
					button.finalY = Math.round((this.stageHeight - this.buttonHeight)/2);
					if(button.finalY < this.buttons_ar[i-1].finalY + this.buttonHeight + 1) button.finalY = this.buttons_ar[i-1].finalY + this.buttonHeight + 1;
				}
				
				button.finalX = offsetX;
				if(isNaN(button.finalX)) return
				if(button){
					if(animate){
						FWDU3DCarModTweenMax.to(button, .8, {x:button.finalX, y:button.finalY, delay:.1, ease:Expo.easeInOut});
					}else{
						button.setX(button.finalX);
						button.setY(button.finalY);
					}	
				}
			}
			
			if(this.showNextAndPrevButtons_bl){
				FWDU3DCarModTweenMax.killTweensOf(this.prevButton_do);
				if(animate){
					FWDU3DCarModTweenMax.to(this.prevButton_do, .8, {x:this.finalX - this.buttonWidth, y:Math.round((this.stageHeight - this.buttonHeight)/2), delay:.1, ease:Expo.easeInOut});
				}else{
					this.prevButton_do.setX(this.finalX - this.buttonWidth);
					this.prevButton_do.setY(Math.round((this.stageHeight - this.buttonHeight)/2));
				}	
			}
			
			if(this.isMaximized_bl && this.zoomButton_do && this.isMobile_bl){
				FWDU3DCarModTweenMax.killTweensOf(this.zoomButton_do);
				this.zoomButton_do.setX(this.stageWidth -  this.buttonWidth);
				this.zoomButton_do.setY(1);
			}
			
			this.positionSlideShowPreloader(animate);
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		this.setupPreloader = function(){
			FWDU3DCarPreloader.setPrototype();
			this.preloader_do = new FWDU3DCarPreloader(this.preloaderImg, 70, 41, 13, 50);
			this.preloader_do.addListener(FWDU3DCarPreloader.HIDE_COMPLETE, this.onPreloaderHideCompleteHandler);
		};
		
		this.positionPreloader = function(){
			if(this.preloader_do){
				this.preloader_do.setX(parseInt((this.stageWidth - this.preloader_do.getWidth())/2));
				this.preloader_do.setY(Math.round((this.stageHeight - this.preloader_do.getHeight())/2));
			}
		};
		
		this.onPreloaderHideCompleteHandler = function(){
			self.removeChild(self.preloader_do);
		};
		
		//####################################//
		/* add keyboard support */
		//####################################//
		this.addKeyboardSupport = function(){
			if(document.addEventListener){
				document.addEventListener("keydown",  this.onKeyDownHandler);	
				document.addEventListener("keyup",  this.onKeyUpHandler);	
			}else{
				document.attachEvent("onkeydown",  this.onKeyDownHandler);	
				document.attachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.onKeyDownHandler = function(e){
			if(e.keyCode == 39){	
				self.goToNextItem();
			}else if(e.keyCode == 37){
				self.goToPrevItem();
			}
			
			if(document.removeEventListener){
				document.removeEventListener("keydown",  self.onKeyDownHandler);
			}else{
				document.detachEvent("onkeydown",  self.onKeyDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		this.onKeyUpHandler = function(e){
			if(document.addEventListener){
				document.addEventListener("keydown",  self.onKeyDownHandler);	
			}else{
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		//####################################//
		/* hide */
		//###################################//
		this.hide = function(){
			if(self.isTweening_bl) return;
			self.isTweeningOnShowOrHide_bl = true;
			
			if(this.image_img){
				this.image_img.onload = null;
				this.image_img.onerror = null;
			}
			
			this.clearMainEventsIntervalsAndTimeOuts();
			
			if(this.type_str == FWDU3DCarLightBox.YOUTUBE || this.type_str == FWDU3DCarLightBox.VIMEO || self.type_str == FWDU3DCarLightBox.IFRAME){
				if(this.opacityType == "filter"){
					this.currentItem_do.setVisible(false);
				} else{
					this.itemsHolder_do.removeChild(this.currentItem_do);
				}
					
				FWDU3DCarModTweenMax.to(this.itemsBorder_do, .9, {alpha:0, ease:Quint.easeOut});
				FWDU3DCarModTweenMax.to(this.mainItemsHolder_do, .9, {x:this.stageWidth/2, y:this.stageHeight/2, w:0, h:0, ease:Expo.easeInOut});
				FWDU3DCarModTweenMax.to(this.bk_do, .9, {alpha:0, delay:.9, ease:Quint.easeOut, onComplete:this.onHideComplete});
			}else if(this.type_str == FWDU3DCarLightBox.IMAGE){
				if(this.currentItem_do && this.currentItem_do.screen){
					FWDU3DCarModTweenMax.killTweensOf(this.currentItem_do);
					FWDU3DCarModTweenMax.to(this.currentItem_do, .7, {alpha:0, ease:Quint.easeOut});
				}
				
				FWDU3DCarModTweenMax.to(this.itemsBorder_do, .9, {alpha:0, delay:.1, ease:Quint.easeOut});
				FWDU3DCarModTweenMax.to(this.mainItemsHolder_do, .9, {x:this.stageWidth/2, y:this.stageHeight/2, w:0, h:0, delay:.2, ease:Expo.easeInOut});
				FWDU3DCarModTweenMax.to(this.bk_do, .9, {alpha:0, delay:1.2, ease:Quint.easeOut, onComplete:this.onHideComplete});
			}
			
			this.preloader_do.hide(true);
			this.hideButtons(true);
			
			this.currentItem_do = null;
			this.prevItem_do = null;
			this.isTweening_bl = true;
			this.firstTimeShowed_bl = true;
			self.dispatchEvent(FWDU3DCarLightBox.HIDE_START);
		};
		
		this.hideButtons = function(animate){
			if(animate){
				FWDU3DCarModTweenMax.to(this.closeButton_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
				if(this.infoButton_do) FWDU3DCarModTweenMax.to(this.infoButton_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
				if(this.slideshowButtton_do) FWDU3DCarModTweenMax.to(this.slideshowButtton_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
				if(this.zoomButton_do) FWDU3DCarModTweenMax.to(this.zoomButton_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
				if(this.nextButton_do){
					FWDU3DCarModTweenMax.to(this.nextButton_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
					FWDU3DCarModTweenMax.to(this.prevButton_do, .8, {x:- this.buttonWidth, ease:Expo.easeInOut});
				}
				if(this.slideShowPreloader_do) FWDU3DCarModTweenMax.to(this.slideShowPreloader_do, .8, {x:this.stageWidth, ease:Expo.easeInOut});
			}else{
				this.closeButton_do.setVisible(false);
				if(this.infoButton_do) this.infoButton_do.setVisible(false);
				if(this.zoomButton_do) this.zoomButton_do.setVisible(false);
				if(this.slideshowButtton_do) this.slideshowButtton_do.setVisible(false);
				
				if(this.nextButton_do){
					this.nextButton_do.setVisible(false);
					this.prevButton_do.setVisible(false);
				}
			
				if(this.slideShowPreloader_do) this.slideShowPreloader_do.image_do.setVisible(false);
			}
		};
		
		this.showButtons = function(){
			
			this.positionButtons(false);
			this.closeButton_do.setVisible(true);
			this.closeButton_do.setX(this.stageWidth);
			
			if(this.infoButton_do){
				this.infoButton_do.setVisible(true);
				this.infoButton_do.setX(this.stageWidth);
			}
			
			if(this.zoomButton_do && (this.type_str != FWDU3DCarLightBox.YOUTUBE || this.type_str != FWDU3DCarLightBox.VIMEO || self.type_str == FWDU3DCarLightBox.IFRAME)){
				this.zoomButton_do.setVisible(true);
				this.zoomButton_do.setX(this.stageWidth);
			}
			
			if(this.slideshowButtton_do){
				this.slideshowButtton_do.setVisible(true);
				this.slideshowButtton_do.setX(this.stageWidth);
			}
			
			if(this.nextButton_do){
				this.nextButton_do.setVisible(true);
				this.nextButton_do.setX(this.stageWidth);
				this.prevButton_do.setVisible(true);
				this.prevButton_do.setX(- this.buttonWidth);
			}
			
			if(this.slideShowPreloader_do){
				this.slideShowPreloader_do.image_do.setX(0);
				this.slideShowPreloader_do.setX(this.stageWidth);
				this.slideShowPreloader_do.image_do.setVisible(true);
			}
			
			this.positionButtons(true);
		};
		
		this.onHideComplete = function(){
			self.isShowed_bl = false;
			self.isTweeningOnShowOrHide_bl = false;
			self.stageWidth = 0;
			//if(navigator.userAgent.toLowerCase().indexOf("msie 7") == -1 && !this.isFullScreenByDefault_bl) document.documentElement.style.overflowX = "auto";
			if(self.isMobile_bl){
				window.removeEventListener("touchmove", self.mouseDummyHandler);
			}else{
				if(window.removeEventListener){
					window.removeEventListener ("mousewheel", self.mouseDummyHandler);
					window.removeEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
			self.addZoomButtonBackToButtonsArray();
			self.screen.parentNode.removeChild(self.screen);
			self.dispatchEvent(FWDU3DCarLightBox.HIDE_COMPLETE);
		};
		
		//####################################//
		/* clear main events */
		//###################################//
		this.clearMainEventsIntervalsAndTimeOuts = function(){
			clearInterval(this.updateImageWhenMaximized_int);
			clearTimeout(this.transitionDoneId_to);
			clearTimeout(this.transitionShapeDoneId_to);
			clearTimeout(this.showVideoId_to);
			clearTimeout(this.maximizeCompleteTimeOutId_to);
			clearTimeout(this.minimizeCompleteTimeOutId_to);
			clearTimeout(this.showFirstTimeWithDelayId_to);
			clearTimeout(this.resizeHandlerId1_to);
			clearTimeout(this.resizeHandlerId2_to);
			clearTimeout(this.orientationChangeId_to);
			
			this.removeEventsForScrollngImageOnDesktop();
			if(this.timerManager) this.timerManager.stop();
			
			if(this.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerDown", self.onTouchStartScrollImage);
					window.removeEventListener("MSPointerUp", self.onTouchEndScrollImage);
					window.removeEventListener("MSPointerMove", self.onTouchMoveScrollImage);
					self.bk_do.screen.removeEventListener("MSPointerDown", self.onBkMouseDown);
				}
				
				window.removeEventListener("touchstart", self.onTouchStartScrollImage);
				window.removeEventListener("touchend", self.onTouchEndScrollImage);	
				window.removeEventListener("touchmove", self.onTouchMoveScrollImage);
				self.bk_do.screen.removeEventListener("touchstart", self.onBkMouseDown);
			}else{
				if(window.addEventListener){
					window.removeEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler);
					self.bk_do.screen.removeEventListener("mousedown", self.onBkMouseDown);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler);
					self.bk_do.screen.detachEvent("onmousedown", self.onBkMouseDown);
				}
			}
			
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onScrollHandler);
				window.removeEventListener("orientationchange", self.orientationChance);
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onScrollHandler);
			}	
			
			if(this.addKeyboardSupport_bl){
				if(document.removeEventListener){
					document.removeEventListener("keydown",  this.onKeyDownHandler);	
					document.removeEventListener("keyup",  this.onKeyUpHandler);	
				}else if(document.attachEvent){
					document.detachEvent("onkeydown",  this.onKeyDownHandler);	
					document.detachEvent("onkeyup",  this.onKeyUpHandler);	
				}
			}
		};
		
		//####################################//
		/* destroy */
		//####################################//
		this.destroy = function(){
			
			if(self.isMobile_bl){
				window.removeEventListener("touchmove", self.mouseDummyHandler);
			}else{
				if(window.removeEventListener){
					window.removeEventListener ("mousewheel", self.mouseDummyHandler);
					window.removeEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
			
			if(this.image_img){
				this.image_img.onload = null;
				this.image_img.onerror = null;
			}
			
			if(this.slideShowPreloader_do){
				FWDU3DCarModTweenMax.killTweensOf(this.slideShowPreloader_do);
				this.slideShowPreloader_do.destroy();
			}
			
			this.info_do.destroy();
			if(this.infoWindow_do) this.infoWindow_do.destroy();
			if(this.timerManager) this.timerManager.destroy();
			
			this.preloader_do.destroy();
			if(this.customContextMenu) this.customContextMenu.destroy();
			this.clearMainEventsIntervalsAndTimeOuts();
			
			this.cleanChildren(0);
		
			if(this.nextButton_do){
				FWDU3DCarModTweenMax.killTweensOf(this.nextButton_do);
				FWDU3DCarModTweenMax.killTweensOf(this.prevButton_do);
			
				this.nextButton_do.destroy();
				this.prevButton_do.destroy();
			}
			
			if(this.closeButton_do){
				FWDU3DCarModTweenMax.killTweensOf(this.closeButton_do);
				this.closeButton_do.destroy();
			}
			
			if(this.zoomButton_do){
				FWDU3DCarModTweenMax.killTweensOf(this.zoomButton_do);
				this.zoomButton_do.destroy();
			}
			
			if(this.infoButton_do){
				FWDU3DCarModTweenMax.killTweensOf(this.infoButton_do);
				this.infoButton_do.destroy();
			}
			
			if(this.slideshowButtton_do){
				FWDU3DCarModTweenMax.killTweensOf(this.slideshowButtton_do);
				this.slideshowButtton_do.destroy();
			}
			
			if(this.currentItem_do){
				if(this.contains(this.currentItem_do)){
					FWDU3DCarModTweenMax.killTweensOf(this.currentItem_do);
					this.currentItem_do.destroy();
				}
			}
			
			FWDU3DCarModTweenMax.killTweensOf(this.mainItemsHolder_do);
			FWDU3DCarModTweenMax.killTweensOf(this.bk_do);
			FWDU3DCarModTweenMax.killTweensOf(this.itemsBackground_do);
			FWDU3DCarModTweenMax.killTweensOf(this.itemsBorder_do);
			FWDU3DCarModTweenMax.killTweensOf(this.itemsHolder_do);
			
			this.mainItemsHolder_do.destroy();
			this.bk_do.destroy();
			this.itemsBackground_do.destroy();
			this.itemsBorder_do.destroy();
			this.itemsHolder_do.destroy();
			
			this.image_img = null;
			this.closeN_img = null;
			this.closeS_img = null;
			this.nextN_img = null;
			this.nextS_img = null;
			this.prevN_img = null;
			this.prevS_img = null;
			this.maximizeN_img = null;
			this.maximizeS_img = null;
			this.minimizeN_img = null;
			this.minimizeS_img = null;
			this.pauseN_img = null;
			this.pauseS_img = null;
			this.playN_img = null;
			this.playS_img = null;
			this.infoOpenN_img = null;
			this.infoOpenS_img = null;	
			this.infoCloseN_img = null;
			this.infoCloseS_img = null;
			this.preloaderImg = null;
			
			this.info_do = null;
			this.infoWindow_do = null;
			this.slideShowPreloader_do = null;
			this.timerManager = null;
			this.bk_do = null;
			this.mainItemsHolder_do = null;
			this.itemsBackground_do = null;
			this.itemsBorder_do = null;
			this.itemsHolder_do = null;
			this.currentItem_do = null;
			this.prevItem_do = null;
			this.closeButton_do = null;	
			this.nextButton_do = null;	
			this.prevButton_do = null;
			this.zoomButton_do = null;
			this.slideshowButtton_do = null;
			
			this.data_ar = null;
			props = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarLightBox.prototype = null;
		};
	
		
		this.init();
	};
	
	/* set prototype */
	FWDU3DCarLightBox.setPrototype =  function(){
		FWDU3DCarLightBox.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarLightBox.YOUTUBE = "youtube";
	FWDU3DCarLightBox.VIMEO = "vimeo";
	FWDU3DCarLightBox.IMAGE = "image_img";
	FWDU3DCarLightBox.IFRAME = "htmlIframe";
	FWDU3DCarLightBox.MAXIMIZE_COMPLETE = "maximizeComplete";
	FWDU3DCarLightBox.MINIMIZE_START = "minimizeStart";
	FWDU3DCarLightBox.SHOW_START = "showStart";
	FWDU3DCarLightBox.HIDE_COMPLETE = "hideComplete";
	FWDU3DCarLightBox.HIDE_START = "hideStart";
	
	
	FWDU3DCarLightBox.prototype = null;
	window.FWDU3DCarLightBox = FWDU3DCarLightBox;
	
}(window));/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, FWDU3DCarModTweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

(window._gsQueue || (window._gsQueue = [])).push( function() {

	"use strict";

	window._gsDefine("FWDU3DCarModTweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		var _slice = [].slice,
			FWDU3DCarModTweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
			},
			_isSelector = function(v) {
				return (v.jquery || (v.length && v[0] && v[0].nodeType && v[0].style));
			},
			p = FWDU3DCarModTweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];

		FWDU3DCarModTweenMax.version = "1.9.7";
		p.constructor = FWDU3DCarModTweenMax;
		p.kill()._gc = false;
		FWDU3DCarModTweenMax.killTweensOf = FWDU3DCarModTweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		FWDU3DCarModTweenMax.getTweensOf = TweenLite.getTweensOf;
		FWDU3DCarModTweenMax.ticker = TweenLite.ticker;
	
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio, p;
			if (resetDuration && this.timeline && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted) {
				if (resetDuration) {
					this._initted = false;
				} else {
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._time;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else if (this._time > 0) {
						this._initted = false;
						this._init();
						var inv = 1 / (1 - curRatio),
							pt = this._firstPT, endValue;
						while (pt) {
							endValue = pt.s + pt.c; 
							pt.c *= inv;
							pt.s = endValue - pt.c;
							pt = pt._next;
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle, 
				isComplete, callback, pt, cycleDuration, r, type, pow;
			if (time >= totalDur) {
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = this._duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				
				if (this._repeat !== 0) {
					cycleDuration = this._duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = this._duration - this._time;
					}
					if (this._time > this._duration) {
						this._time = this._duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				
				if (this._easeType) {
					r = this._time / this._duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
				
			}
				
			if (prevTime === this._time && !force) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			
			if (!this._active) if (!this._paused) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}
			
			pt = this._firstPT;
			
			while (pt) 
			{
				if (pt.f) 
				{
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} 
				else 
				{
					var newVal = pt.c * this.ratio + pt.s;
				
					if (pt.p == "x")
					{
						pt.t.setX(newVal);
					}
					else if (pt.p == "y")
					{
						pt.t.setY(newVal);
					}
					else if (pt.p == "z")
					{
						pt.t.setZ(newVal);
					}
					else if (pt.p == "angleX")
					{
						pt.t.setAngleX(newVal);
					}
					else if (pt.p == "angleY")
					{
						pt.t.setAngleY(newVal);
					}
					else if (pt.p == "angleZ")
					{
						pt.t.setAngleZ(newVal);
					}
					else if (pt.p == "w")
					{
						pt.t.setWidth(newVal);
					}
					else if (pt.p == "h")
					{
						pt.t.setHeight(newVal);
					}
					else if (pt.p == "alpha")
					{
						pt.t.setAlpha(newVal);
					}
					else if (pt.p == "scale")
					{
						pt.t.setScale2(newVal);
					}
					else
					{
						pt.t[pt.p] = newVal;
					}
				}
				
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
			}
			if (callback) if (!this._gc) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		FWDU3DCarModTweenMax.to = function(target, duration, vars) {
			return new FWDU3DCarModTweenMax(target, duration, vars);
		};
		
		FWDU3DCarModTweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDU3DCarModTweenMax(target, duration, vars);
		};
		
		FWDU3DCarModTweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDU3DCarModTweenMax(target, duration, toVars);
		};
		
		FWDU3DCarModTweenMax.staggerTo = FWDU3DCarModTweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = vars.delay || 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, vars.onCompleteParams || _blankArray);
					}
					onCompleteAll.apply(onCompleteAllScope || this, onCompleteAllParams || _blankArray);
				},
				l, copy, i, p;
			if (!(targets instanceof Array)) {
				if (typeof(targets) === "string") {
					targets = TweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice.call(targets, 0);
				}
			}
			l = targets.length;
			for (i = 0; i < l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				copy.delay = delay;
				if (i === l - 1 && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new FWDU3DCarModTweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		FWDU3DCarModTweenMax.staggerFrom = FWDU3DCarModTweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return FWDU3DCarModTweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		FWDU3DCarModTweenMax.staggerFromTo = FWDU3DCarModTweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return FWDU3DCarModTweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		FWDU3DCarModTweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDU3DCarModTweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		FWDU3DCarModTweenMax.set = function(target, vars) {
			return new FWDU3DCarModTweenMax(target, 0, vars);
		};
		
		FWDU3DCarModTweenMax.isTweening = function(target) {
			var a = TweenLite.getTweensOf(target),
				i = a.length,
				tween;
			while (--i > -1) {
				tween = a[i];
				if (tween._active || (tween._startTime === tween._timeline._time && tween._timeline._active)) {
					return true;
				}
			}
			return false;
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof TweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = FWDU3DCarModTweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		FWDU3DCarModTweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		FWDU3DCarModTweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLite._tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = TweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent, 0);
			}
			if (parent instanceof Array) {
				i = parent.length;
				while (--i > -1) {
					FWDU3DCarModTweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			if (tweens === undefined) {
				tweens = true;
			}
			if (delayedCalls === undefined) {
				delayedCalls = true;
			}
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		FWDU3DCarModTweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		FWDU3DCarModTweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated FWDU3DCarModTweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return FWDU3DCarModTweenMax;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					i = _paramProps.length,
					j, a;
				while (--i > -1) {
					a = v[_paramProps[i]];
					if (a) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = v[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (v.tweens instanceof Array) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_slice = _blankArray.slice,
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.9.7";
		p.constructor = TimelineLite;
		p.kill()._gc = false;

		p.to = function(target, duration, vars, position) {
			return duration ? this.add( new TweenLite(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( TweenLite.from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			return duration ? this.add( TweenLite.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope}),
				i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			if (!(targets instanceof Array) && targets.length && targets[0] && targets[0].nodeType && targets[0].style) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice.call(targets, 0);
			}
			stagger = stagger || 0;
			for (i = 0; i < targets.length; i++) {
				if (vars.startAt) {
					vars.startAt = _copy(vars.startAt);
				}
				tl.to(targets[i], duration, _copy(vars), i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if (value instanceof Array) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if ((child = value[i]) instanceof Array) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is neither a tween, timeline, function, nor a string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly.
			if (this._gc) if (!this._paused) if (this._time === this._duration) if (this._time < this.duration()) {
				//in case any of the anscestors had completed but should now be enabled...
				tl = this;
				while (tl._gc && tl._timeline) {
					if (tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //also enables them
					} else {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore instanceof Array) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target),
				i = tweens.length,
				a = [],
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);
	







	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_blankArray = [],
			_easeNone = new Ease(null, null, 1, 0),
			_getGlobalPaused = function(tween) {
				while (tween) {
					if (tween._paused) {
						return true;
					}
					tween = tween._timeline;
				}
				return false;
			},
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.9.7";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (position == null) {
				this._kill(null, callback);
			} else {
				var a = this.getTweensOf(callback, false),
					i = a.length,
					time = this._parseTimeOrLabel(position);
				while (--i > -1) {
					if (a[i]._startTime === time) {
						a[i]._enabled(false, false);
					}
				}
			}
			return this;
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, overwrite:2, useFrames:this.usesFrames(), immediateRender:false}, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], onCompleteScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration;
			if (time >= totalDur) {
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (dur === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.000001; //to avoid occasional floating point rounding errors
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && this._rawPrevTime > 0 && !this._locked)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (dur === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0;  //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.000001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}
			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.00001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
					}
				}
				if (wrap) {
					prevTime = (backwards) ? dur + 0.000001 : -0.000001;
					this.render(prevTime, true, false);
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
				this._locked = false;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				//note: we cannot just check tween.active because timelines that contain paused children will continue to have "active" set to true even after the playhead passes their end point (technically a timeline can only be considered complete after all of its children have completed too, but paused tweens are...well...just waiting and until they're unpaused we don't know where their end point will be).
				if (!tween._paused) if (tween._timeline._time >= tween._startTime) if (tween._timeline._time < tween._startTime + tween._totalDuration / tween._timeScale) if (!_getGlobalPaused(tween._timeline)) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};

		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_DEG2RAD = Math.PI / 180,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			Segment = function(a, b, c, d) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors. For example, if you set an object's position to 4.945, Flash will make it 4.9
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = a[j+1].da / _r2[j] + a[j].da / _r1[j];
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = window._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._round = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
							}
						}
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._round[p]) {
								val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0;
							}
							if (func[p]) {
								target[p](val);
							} else {
								if (p == "x")
								{
									target.setX(val);
								}
								else if (p == "y")
								{
									target.setY(val);
								}
								else if (p == "z")
								{
									target.setZ(val);
								}
								else if (p == "angleX")
								{
									target.setAngleX(val);
								}
								else if (p == "angleY")
								{
									target.setAngleY(val);
								}
								else if (p == "angleZ")
								{
									target.setAngleZ(val);
								}
								else if (p == "w")
								{
									target.setWidth(val);
								}
								else if (p == "h")
								{
									target.setHeight(val);
								}
								else if (p == "alpha")
								{
									target.setAlpha(val);
								}
								else if (p == "scale")
								{
									target.setScale2(val);
								}
								else
								{
									target[p] = val;
								}
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = Math.atan2(y2 - y1, x2 - x1) * conv + add;

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = window._gsDefine.globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate) * _DEG2RAD;
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,true]] : (data.end.x != null) ? [["x","y","rotation",i,true]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._roundProps = function(lookup, value) {
			var op = this._overwriteProps,
				i = op.length;
			while (--i > -1) {
				if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {
					this._round[op[i]] = value;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
			},
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.9.7";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p};


		var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			//_clrNumExp = /(?:\b(?:(?:rgb|rgba|hsl|hsla)\(.+?\))|\B#.+?\b)/, //only finds rgb(), rgba(), hsl(), hsla() and # (hexadecimal) values but NOT color names like red, blue, etc.
			//_tinyNumExp = /\b\d+?e\-\d+?\b/g, //finds super small numbers in a string like 1e-20. could be used in matrix3d() to fish out invalid numbers and replace them with 0. After performing speed tests, however, we discovered it was slightly faster to just cut the numbers at 5 decimal places with a particular algorithm.
			_NaNExp = /[^\d\-\.]/g,
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/,
			_opacityValExp = /opacity:([^;]*)/,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_doc = document,
			_tempDiv = _doc.createElement("div"),
			_tempImg = _doc.createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = navigator.userAgent,
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					d = _doc.createElement("div"), a;

				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
				_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);

				(/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent);
				_ieVers = parseFloat( RegExp.$1 );

				d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
				a = d.getElementsByTagName("a")[0];
				return a ? /^0.55/.test(a.style.opacity) : false;
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (window.console) {
					console.log(s);
				}
			},
			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			//@private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t, null))) {
					t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					rv = (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (t.currentStyle) {
					cs = t.currentStyle;
					rv = cs[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					pix;
				if (neg) {
					v = -v;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
					if (sfx === "%" || !node.appendChild) {
						node = t.parentNode || _doc.body;
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			//@private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
						}
					} else { //Opera behaves differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							s[i] = cs[i];
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						s[i.replace(_camelExp, _camelFunc)] = cs[i];
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation * _RAD2DEG;
				s.skewX = tr.skewX * _RAD2DEG;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX * _RAD2DEG;
					s.rotationY = tr.rotationY * _RAD2DEG;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			//@private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			//@private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v == null || v === "" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
				if (y == null) {
					y = "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || isNaN(parseFloat(x))) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN().
					x = "50%";
				}
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
				}
				return x + " " + y + ((a.length > 2) ? " " + a[2] : "");
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b);
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) + d : parseFloat(v);
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result;
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v * _DEG2RAD;
				} else {
					cap = Math.PI * 2;
					split = v.split("_");
					dif = Number(split[0].replace(_NaNExp, "")) * ((v.indexOf("rad") === -1) ? _DEG2RAD : 1) - ((v.charAt(1) === "=") ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order.
			 */
			_parseColor = function(v) {
				var c1, c2, c3, h, s, l;
				if (!v || v === "") {
					return _colorLookup.black;
				}
				if (typeof(v) === "number") {
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing commma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					return _colorLookup[v];
				}
				if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						c1 = v.charAt(1),
						c2 = v.charAt(2),
						c3 = v.charAt(3);
						v = "#" + c1 + c1 + c2 + c2 + c3 + c3;
					}
					v = parseInt(v.substr(1), 16);
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.substr(0, 3) === "hsl") {
					v = v.match(_numExp);
					h = (Number(v[0]) % 360) / 360;
					s = Number(v[1]) / 100;
					l = Number(v[2]) / 100;
					c2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
					c1 = l * 2 - c2;
					if (v.length > 3) {
						v[3] = Number(v[3]);
					}
					v[0] = _hue(h + 1 / 3, c1, c2);
					v[1] = _hue(h, c1, c2);
					v[2] = _hue(h - 1 / 3, c1, c2);
					return v;
				}
				v = v.match(_numExp) || _colorLookup.transparent;
				v[0] = Number(v[0]);
				v[1] = Number(v[1]);
				v[2] = Number(v[2]);
				if (v.length > 3) {
					v[3] = Number(v[3]);
				}
				return v;
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			//@private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens  which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = proxy.rotation;
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method.
				if (v === 1) {
					mpt = d.firstMPT;
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt.e = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.e = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || "css_" + p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, rgba, temp, cv, str;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);

					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && (bv.charAt(0) === "#" || _colorLookup[bv] || _rgbhslExp.test(bv))) {
						str = ev.charAt(ev.length - 1) === "," ? ")," : ")"; //if there's a comma at the end, retain it.
						bv = _parseColor(bv);
						ev = _parseColor(ev);
						rgba = (bv.length + ev.length > 6);
						if (rgba && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								rgba = false;
							}
							pt.appendXtra((rgba ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
								.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
								.appendXtra("", bv[2], ev[2] - bv[2], (rgba ? "," : str), true);
							if (rgba) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += pt.l ? " " + bv : bv;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && l) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = (window.GreenSockGlobals || window).com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							e = (ei === -1) ? ea : ba;
							e[i] += " " + kwd;
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object) t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};








		//transform-related methods and properties
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = function(t, cs, rec) {
				var tm = rec ? t._gsTransform || {skewY:0} : {skewY:0},
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					minPI = -Math.PI + 0.0001,
					maxPI = Math.PI - 0.0001,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					s, m, i, n, dec, scaleX, scaleY, rotation, skewX, difX, difY, difR, difS;
				if (_transformProp) {
					s = _getStyle(t, _transformPropCSS, cs, true);
				} else if (t.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = t.currentStyle.filter.match(_ieGetMatrixExp);
					if (s && s.length === 4) {
						s = [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",");
					} else if (tm.x != null) { //if the element already has a _gsTransform, use that.
						return tm;
					} else {
						s = "";
					}
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				if (m.length === 16) {

					//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
					var a13 = m[8], a23 = m[9], a33 = m[10],
						a14 = m[12], a24 = m[13], a34 = m[14];

					//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
					if (tm.zOrigin) {
						a34 = -tm.zOrigin;
						a14 = a13*a34-m[12];
						a24 = a23*a34-m[13];
						a34 = a33*a34+tm.zOrigin-m[14];
					}

					//only parse from the matrix if we MUST because not only is it usually unnecessary due to the fact that we store the values in the _gsTransform object, but also because it's impossible to accurately interpret rotationX, rotationY, and rotationZ if all are applied, so it's much better to rely on what we store. However, we must parse the first time that an object is tweened. We also assume that if the position has changed, the user must have done some styling changes outside of CSSPlugin, thus we force a parse in that scenario.
					if (!rec || tm.rotationX == null) {
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a43 = m[11],
							angle = tm.rotationX = Math.atan2(a32, a33),
							xFlip = (angle < minPI || angle > maxPI),
							t1, t2, t3, cos, sin, yFlip, zFlip;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							//t4 = a42*cos+a43*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
							//a42 = t4;
						}
						//rotationY
						angle = tm.rotationY = Math.atan2(a13, a11);
						if (angle) {
							yFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							//t4 = a41*cos-a43*sin;
							//a13 = a11*sin+a13*cos;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
							//a41 = t4;
						}
						//rotationZ
						angle = tm.rotation = Math.atan2(a21, a22);
						if (angle) {
							zFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							a11 = a11*cos+a12*sin;
							t2 = a21*cos+a22*sin;
							a22 = a21*-sin+a22*cos;
							a32 = a31*-sin+a32*cos;
							a21 = t2;
						}

						if (zFlip && xFlip) {
							tm.rotation = tm.rotationX = 0;
						} else if (zFlip && yFlip) {
							tm.rotation = tm.rotationY = 0;
						} else if (yFlip && xFlip) {
							tm.rotationY = tm.rotationX = 0;
						}

						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						tm.skewX = 0;
						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
					}

				} else if ((!_supports3D || m.length === 0 || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY)) && !(tm.x !== undefined && _getStyle(t, "display", cs) === "none")) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
					var k = (m.length >= 6),
						a = k ? m[0] : 1,
						b = m[1] || 0,
						c = m[2] || 0,
						d = k ? m[3] : 1;

					tm.x = m[4] || 0;
					tm.y = m[5] || 0;
					scaleX = Math.sqrt(a * a + b * b);
					scaleY = Math.sqrt(d * d + c * c);
					rotation = (a || b) ? Math.atan2(b, a) : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
					skewX = (c || d) ? Math.atan2(c, d) + rotation : tm.skewX || 0;
					difX = scaleX - Math.abs(tm.scaleX || 0);
					difY = scaleY - Math.abs(tm.scaleY || 0);
					if (Math.abs(skewX) > Math.PI / 2 && Math.abs(skewX) < Math.PI * 1.5) {
						if (invX) {
							scaleX *= -1;
							skewX += (rotation <= 0) ? Math.PI : -Math.PI;
							rotation += (rotation <= 0) ? Math.PI : -Math.PI;
						} else {
							scaleY *= -1;
							skewX += (skewX <= 0) ? Math.PI : -Math.PI;
						}
					}
					difR = (rotation - tm.rotation) % Math.PI; //note: matching ranges would be very small (+/-0.0001) or very close to Math.PI (+/-3.1415).
					difS = (skewX - tm.skewX) % Math.PI;
					//if there's already a recorded _gsTransform in place for the target, we should leave those values in place unless we know things changed for sure (beyond a super small amount). This gets around ambiguous interpretations, like if scaleX and scaleY are both -1, the matrix would be the same as if the rotation was 180 with normal scaleX/scaleY. If the user tweened to particular values, those must be prioritized to ensure animation is consistent.
					if (tm.skewX === undefined || difX > min || difX < -min || difY > min || difY < -min || (difR > minPI && difR < maxPI && (difR * rnd) | 0 !== 0) || (difS > minPI && difS < maxPI && (difS * rnd) | 0 !== 0)) {
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
					}
					if (_supports3D) {
						tm.rotationX = tm.rotationY = tm.z = 0;
						tm.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
						tm.scaleZ = 1;
					}
				}
				tm.zOrigin = zOrigin;

				//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
				for (i in tm) {
					if (tm[i] < min) if (tm[i] > -min) {
						tm[i] = 0;
					}
				}
				//DEBUG: _log("parsed rotation: "+(tm.rotationX*_RAD2DEG)+", "+(tm.rotationY*_RAD2DEG)+", "+(tm.rotation*_RAD2DEG)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
				}
				return tm;
			},
			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation,
					skew = ang + t.skewX,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x,
					oy = t.y,
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(") === -1) {
					style.removeAttribute("filter");
				}
			},
			_set3DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					perspective = t.perspective,
					a11 = t.scaleX, a12 = 0, a13 = 0, a14 = 0,
					a21 = 0, a22 = t.scaleY, a23 = 0, a24 = 0,
					a31 = 0, a32 = 0, a33 = t.scaleZ, a34 = 0,
					a41 = 0, a42 = 0, a43 = (perspective) ? -1 / perspective : 0,
					angle = t.rotation,
					zOrigin = t.zOrigin,
					rnd = 100000,
					cos, sin, t1, t2, t3, t4, ffProp, n, sfx;

				if (_isFirefox) { //Firefox has a bug that causes 3D elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(this.t, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(this.t, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}

				if (angle || t.skewX) {
					t1 = a11*Math.cos(angle);
					t2 = a22*Math.sin(angle);
					angle -= t.skewX;
					a12 = a11*-Math.sin(angle);
					a22 = a22*Math.cos(angle);
					a11 = t1;
					a21 = t2;
				}
				angle = t.rotationY;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a11*cos;
					t2 = a21*cos;
					t3 = a33*-sin;
					t4 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = a33*cos;
					a43 *= cos;
					a11 = t1;
					a21 = t2;
					a31 = t3;
					a41 = t4;
				}
				angle = t.rotationX;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					t3 = a32*cos+a33*sin;
					t4 = a42*cos+a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a32*-sin+a33*cos;
					a43 = a42*-sin+a43*cos;
					a12 = t1;
					a22 = t2;
					a32 = t3;
					a42 = t4;
				}
				if (zOrigin) {
					a34 -= zOrigin;
					a14 = a13*a34;
					a24 = a23*a34;
					a34 = a33*a34+zOrigin;
				}
				//we round the x, y, and z slightly differently to allow even larger values.
				a14 = (t1 = (a14 += t.x) - (a14 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a14 : a14;
				a24 = (t1 = (a24 += t.y) - (a24 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a24 : a24;
				a34 = (t1 = (a34 += t.z) - (a34 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a34 : a34;
				style[_transformProp] = "matrix3d(" + [ (((a11 * rnd) | 0) / rnd), (((a21 * rnd) | 0) / rnd), (((a31 * rnd) | 0) / rnd), (((a41 * rnd) | 0) / rnd), (((a12 * rnd) | 0) / rnd), (((a22 * rnd) | 0) / rnd), (((a32 * rnd) | 0) / rnd), (((a42 * rnd) | 0) / rnd), (((a13 * rnd) | 0) / rnd), (((a23 * rnd) | 0) / rnd), (((a33 * rnd) | 0) / rnd), (((a43 * rnd) | 0) / rnd), a14, a24, a34, (perspective ? (1 + (-a34 / perspective)) : 1) ].join(",") + ")";
			},
			_set2DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					targ = this.t,
					style = targ.style,
					ffProp, t1, n, sfx, ang, skew, rnd, sx, sy;
				if (_isFirefox) { //Firefox has a bug that causes elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(targ, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(targ, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}
				if (!t.rotation && !t.skewX) {
					style[_transformProp] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")";
				} else {
					ang = t.rotation;
					skew = ang - t.skewX;
					rnd = 100000;
					sx = t.scaleX * rnd;
					sy = t.scaleY * rnd;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
					style[_transformProp] = "matrix(" + (((Math.cos(ang) * sx) | 0) / rnd) + "," + (((Math.sin(ang) * sx) | 0) / rnd) + "," + (((Math.sin(skew) * -sy) | 0) / rnd) + "," + (((Math.cos(skew) * sy) | 0) / rnd) + "," + t.x + "," + t.y + ")";
				}
			};

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			if (cssp._transform) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			var m1 = cssp._transform = _getTransform(t, _cs, true),
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				m2, skewY, copy, orig, has3D, hasChange, dr;

			if (typeof(v.transform) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = style.cssText;
				style[_transformProp] = v.transform;
				style.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				m2 = _getTransform(t, null, false);
				style.cssText = copy;
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal((v.scaleZ != null) ? v.scaleZ : v.scale, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : (m1.rotation * _RAD2DEG), m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : (m1.rotationX * _RAD2DEG) || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : (m1.rotationY * _RAD2DEG) || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = (v.skewX == null) ? m1.skewX : _parseAngle(v.skewX, m1.skewX);

				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				m2.skewY = (v.skewY == null) ? m1.skewY : _parseAngle(v.skewY, m1.skewY);
				if ((skewY = m2.skewY - m1.skewY)) {
					m2.skewX += skewY;
					m2.rotation += skewY;
				}
			}

			has3D = (m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					p = _transformOriginProp;
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, "css_transformOrigin");
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = style[p] = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = style[p] = orig;
					}

				//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}

			if (hasChange) {
				cssp._transformType = (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1)) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp <img>'s src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition}); //note: backgroundPosition doesn't support interpreting between px and % (start and end values should use the same units) because doing so would require determining the size of the image itself and that can't be done quickly.
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:_parsePosition});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
				return this.parseComplex(t.style, this.format(_getStyle(t, "borderTopWidth", _cs, false, "0px") + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), this.format(e), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter,
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || "alpha(opacity=100)"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("opacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8)
						t.filter += " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				vb;
			e = parseFloat(e);
			if (p === "autoAlpha") {
				vb = _getStyle(t, "visibility", _cs);
				if (b === 1 && vb === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
					b = 0;
				}
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "visible" : "hidden"), ((e === 0) ? "hidden" : "visible"));
				pt.xs0 = "visible";
				cssp._overwriteProps.push(pt.n);
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = (p === "autoAlpha") ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.className = (v === 0) ? this.b : this.e;
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.className !== this.e) {
					this.t.className = this.e;
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.className,
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			if (cssp._tween._duration) { //if it's a zero-duration tween, there's no need to tween anything or parse the data. In fact, if we switch classes temporarily (which we must do for proper parsing) and the class has a transition applied, it could cause a quick flash to the end state and back again initially in some browsers.
				t.className = pt.e;
				difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
				t.className = b;
				pt.data = difData.firstMPT;
				t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
				pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			}
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration) { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that).
				var all = (this.e === "all"),
					s = this.t.style,
					a = all ? s.cssText.split(";") : this.e.split(","),
					i = a.length,
					transformParse = _specialProps.transform.parse,
					p;
				while (--i > -1) {
					p = a[i];
					if (all) {
						p = p.substr(0, p.indexOf(":")).split(" ").join("");
					}
					if (_specialProps[p]) {
						p = (_specialProps[p].parse === transformParse) ? _transformProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
					}
					_removeProp(s, p);
				}
			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = target;
			this._tween = tween;
			this._vars = vars;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;

			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					style.zIndex = 0;
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}
			this._firstPT = pt = this.parse(target, vars, null);

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							style.zIndex = 0;
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						style.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden");
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = (threeD && _supports3D) ? _set3DTransformRatio : _transformProp ? _set2DTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);

				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && (es.indexOf(" ") !== -1 || es.indexOf(",") !== -1)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.substr((en + "").length) || "" : "";
						}

						if (esfx === "") {
							esfx = _suffixMap[p] || bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn || bn === 0) {
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (bn > 100) { //extremely rare
									bn = 100;
								}
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em") {
								bn /= _convertToPixels(target, p, 1, "em");

							//otherwise convert to pixels.
							} else {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, "css_" + p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, "css_" + p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;

			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.e;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transformType = (threeD || this._transformType === 3) ? 3 : 2;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.css_autoAlpha || lookup.css_alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.css_opacity = 1;
				if (copy.css_autoAlpha) {
					copy.css_visibility = 1;
				}
			}
			if (lookup.css_className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};




		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true);
			_getChildStyles(target, e);
			tween.render(0, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					results.push( TweenLite.to(targets[i], duration, difs) );
				}
			}
			return results;
		};


		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = window._gsDefine.plugin({
				propName: "roundProps",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps instanceof Array) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = 1;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._roundProps(lookup, true);
					} else if (pt.n === prop) {
						this._add(pt.t, prop, pt.s, pt.c);
						//remove from linked list
						if (next) {
							next._prev = pt._prev;
						}
						if (pt._prev) {
							pt._prev._next = next;
						} else if (tween._firstPT === pt) {
							tween._firstPT = next;
						}
						pt._next = pt._prev = null;
						tween._propLookup[prop] = rpt;
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, true);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "attr",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			var p;
			if (typeof(target.setAttribute) !== "function") {
				return false;
			}
			this._target = target;
			this._proxy = {};
			for (p in value) {
				this._addTween(this._proxy, p, parseFloat(target.getAttribute(p)), value[p], p);
				this._overwriteProps.push(p);
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			this._super.setRatio.call(this, ratio);
			var props = this._overwriteProps,
				i = props.length,
				p;
			while (--i > -1) {
				p = props[i];
				this._target.setAttribute(p, this._proxy[p] + "");
			}
		}

	});










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "directionalRotation",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					split = (value[p] + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	window._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (window.GreenSockGlobals || window),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + 1;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return ((this._p2 * p) >> 0) * this._p1;
		};
		p.config = SteppedEase.config = function(steps) {
			return new SteppedEase(steps);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = amplitude || 1;
					this._p2 = period || def;
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * _2PI / this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ) *0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


}); 











/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window) {

		"use strict";
		var _globals = window.GreenSockGlobals || window,
			_namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_slice = [].slice,
			_emptyFunc = function() {},
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/FWDU3DCarModTweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = null; //reset it back to null so that the next load of FWDU3DCarModTweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/FWDU3DCarModTweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").join("/"), [], function() { return cl; });
							} else if (typeof(module) !== "undefined" && module.exports){ //node
								module.exports = cl;
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener.up) {
						listener.c.call(listener.s || t, {type:type, target:t});
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();};

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame),
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					_self.time = (_getTime() - _startTime) / 1000;
					var id = _id,
						overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						_self.dispatchEvent("tick");
					}
					if (manual !== true && id === _id) { //make sure the ids match in case the "tick" dispatch triggered something that caused the ticker to shut down or change _useRAF or something like that.
						_id = _req(_tick);
					}
				};

			EventDispatcher.call(_self);
			this.time = this.frame = 0;
			this.tick = function() {
				_tick(true);
			};

			this.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			this.wake = function() {
				if (_id !== null) {
					_self.sleep();
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			this.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			this.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF && (!_id || _self.frame < 5)) {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(this.vars.delay) || 0;
				this._timeScale = 1;
				this._active = (this.vars.immediateRender === true);
				this.data = this.vars.data;
				this._reversed = (this.vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) {
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;

		p.play = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (arguments.length) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function() {

		};

		p.invalidate = function() {
			return this;
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if (type == null) {
				return null;
			} else if (type.substr(0,2) === "on") {
				var v = this.vars,
					i;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = params;
					v[type + "Scope"] = scope;
					if (params) {
						i = params.length;
						while (--i > -1) {
							if (params[i] === "{self}") {
								params = v[type + "Params"] = params.concat(); //copying the array avoids situations where the same array is passed to multiple tweens/timelines and {self} doesn't correctly point to each individual instance.
								params[i] = this;
							}
						}
					}
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a FWDU3DCarModTweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the anscestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					if (!tl._active) {
						//in case any of the anscestors had completed but should now be enabled...
						while (tl._timeline) {
							tl.totalTime(tl._totalTime, true);
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time) {
					this.render(time, suppressEvents, false);
				}
			}
			return this;
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || 0.000001; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(this._totalTime, true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			if (value != this._paused) if (this._timeline) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				var raw = this._timeline.rawTime(),
					elapsed = raw - this._pauseTime;
				if (!value && this._timeline.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = (!value && this._totalTime > 0 && this._totalTime < this._totalDuration);
				if (!value && elapsed !== 0 && this._duration !== 0) {
					this.render(this._totalTime, true, true);
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}
				tween.timeline = null;

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};


/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target[0] && target[0].nodeType && target[0].style)),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice.call(target, 0);
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ[0] && targ[0].nodeType && targ[0].style) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary...
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice.call(targ, 0));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this.render(-this._delay, false, true);
				}
			}, true),
			_isSelector = function(v) {
				return (v.length && v[0] && v[0].nodeType && v[0].style);
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "x" || p === "y" || p === "width" || p === "height" || p === "className") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = false;

		TweenLite.version = "1.9.7";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = true;
		TweenLite.selector = window.$ || window.jQuery || function(e) { if (window.$) { TweenLite.selector = window.$; return window.$(e); } return window.document ? window.document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e) : e; };

		var _internals = TweenLite._internals = {}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = TweenLite._tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline();

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;

		Animation._updateRoot = function() {
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
					var i, a, p;
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},

			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) if (curTween._enabled(false, false)) {
								changed = true;
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + 0.0000000001,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},

			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime,
					min = 0.0000000001; //we use this to protect from rounding errors.
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * min)) ? min : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + min) ? 0 : t - reference - min;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				ease = v.ease,
				i, initPlugins, pt, p;
			if (v.startAt) {
				v.startAt.overwrite = 0;
				v.startAt.immediateRender = true;
				this._startAt = TweenLite.to(this.target, 0, v.startAt);
				if (v.immediateRender) {
					this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					if (this._time === 0 && dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && v.immediateRender && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt = null;
				} else if (this._time === 0) {
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					this._startAt = TweenLite.to(this.target, 0, pt);
					return;
				}
			}
			if (!ease) {
				this._ease = TweenLite.defaultEase;
			} else if (ease instanceof Ease) {
				this._ease = (v.easeParams instanceof Array) ? ease.config.apply(ease, v.easeParams) : ease;
			} else {
				this._ease = (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps) {
			var p, i, initPlugins, plugin, a, pt, v;
			if (target == null) {
				return false;
			}
			if (!this.vars.css) if (target.style) if (target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity)
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				if (_reservedProps[p]) {
					if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams") if ((a = this.vars[p])) {
						i = a.length;
						while (--i > -1) {
							if (a[i] === "{self}") {
								a = this.vars[p] = a.concat(); //copy the array in case the user referenced the same array in multiple tweens/timelines (each {self} should be unique)
								a[i] = this;
							}
						}
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}

				} else {
					this._firstPT = propLookup[p] = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					v = this.vars[p];
					pt.c = (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : (Number(v) - pt.s) || 0;
				}
				if (pt) if (pt._next) {
					pt._next._prev = pt;
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				isComplete, callback, pt;
			if (time >= this._duration) {
				this._totalTime = this._time = this._duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}

			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / this._duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / this._duration);
				}

			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}

			if (!this._active) if (!this._paused) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}

			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}

			if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}

		};

		p._kill = function(vars, target) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i])) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (vars == null || vars._tempKill !== true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = null;
			this._overwrittenProps = null;
			this._onUpdate = null;
			this._startAt = null;
			this._initted = this._active = this._notifyPluginsOfEnabled = false;
			this._propLookup = (this._targets) ? {} : [];
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
			var a = TweenLite.getTweensOf(target),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};

		TweenLite.getTweensOf = function(target) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i]));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.9.1";
		TweenPlugin.API = 2;
		p._firstPT = null;

		p._addTween = function(target, prop, start, end, overwriteProp, round) {
			var c, pt;
			if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0)+"1", 10) * Number(end.substr(2)))) {
				this._firstPT = pt = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) === "function"), n:overwriteProp || prop, r:round};
				if (pt._next) {
					pt._next._prev = pt;
				}
			}
		};

		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0; //about 4x faster than Math.round()
				} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
					val = 0;
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
		};

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._roundProps = function(lookup, value) {
			var pt = this._firstPT;
			while (pt) {
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: com.greensock." + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})(window);/* Thumb */
(function (window){
	
	var FWDU3DCarPreloader = function(imageSource_img, segmentWidth, segmentHeight, totalSegments, animDelay){
		
		var self  = this;
		var prototype = FWDU3DCarPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_sdo = null;
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.animDelay = animDelay || 300;
		this.count = 0;
		
		this.delayTimerId_int;
		this.isShowed_bl = true;
		
		//###################################//
		/* init */
		//###################################//
		this.init = function(){
			this.setWidth(this.segmentWidth);
			this.setHeight(this.segmentHeight);
		
			this.image_sdo = new FWDU3DCarSimpleDisplayObject("img");
			this.image_sdo.setScreen(this.imageSource_img);
			this.addChild(this.image_sdo);
			
			this.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.start = function(){
			clearInterval(this.delayTimerId_int);
			this.delayTimerId_int = setInterval(this.updatePreloader, this.animDelay);
		};
		
		this.stop = function(){
			clearInterval(this.delayTimerId_int);
		};
		
		this.updatePreloader = function(){
			self.count++;
			if(self.count > self.totalSegments - 1) self.count = 0;
			var posX = self.count * self.segmentWidth;
			self.image_sdo.setX(-posX);
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		this.show = function(){
			self.setVisible(true);
			self.start();
			FWDU3DCarModTweenMax.killTweensOf(self);
			self.setAlpha(0);
			FWDU3DCarModTweenMax.to(self, 1, {alpha:1});
			self.isShowed_bl = true;
		};
		
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			FWDU3DCarModTweenMax.killTweensOf(self);
			if(animate){
				FWDU3DCarModTweenMax.to(self, 1, {alpha:0, onComplete:self.onHideComplete});
			}else{
				self.setVisible(false);
				self.setAlpha(0);
				self.stop();
			}
			self.isShowed_bl = false;
		};
		
		this.onHideComplete = function(){
			self.setVisible(false);
			self.stop();
			self.dispatchEvent(FWDU3DCarPreloader.HIDE_COMPLETE);
		};
		
		//###################################//
		/* destroy */
		//##################################//
		this.destroy = function(){
	
			FWDU3DCarModTweenMax.killTweensOf(self);
			self.stop();
			
			self.image_sdo.destroy();
			
			self.imageSource_img = null;
			self.image_sdo = null;
			imageSource_img = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarPreloader.prototype = null;
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDU3DCarPreloader.setPrototype = function(){
    	FWDU3DCarPreloader.prototype = new FWDU3DCarDisplayObject("div");
    };
    
    FWDU3DCarPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDU3DCarPreloader.prototype = null;
	window.FWDU3DCarPreloader = FWDU3DCarPreloader;
}(window));/* FWDU3DCarScrollbar */
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
}(window));/* FWDU3DCarSimpleButton */
(function (window){
var FWDU3DCarSimpleButton = function(nImg, sImg){
		
		var self = this;
		var prototype = FWDU3DCarSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sImg = sImg;
		
		this.n_do;
		this.s_do;
		
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent_bl = FWDU3DCarUtils.hasPointerEvent;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			this.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			this.n_do = new FWDU3DCarSimpleDisplayObject("img");	
			this.n_do.setScreen(this.nImg);
			this.s_do = new FWDU3DCarSimpleDisplayObject("img");
			this.s_do.setScreen(this.sImg);
			this.addChild(this.s_do);
			this.addChild(this.n_do);
			
			this.setWidth(this.nImg.width);
			this.setHeight(this.nImg.height);
			this.setButtonMode(true);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onClick);
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
				FWDU3DCarModTweenMax.to(self.n_do, .9, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDU3DCarModTweenMax.to(self.n_do, .9, {alpha:1, ease:Expo.easeOu});	
			}
		};
			
		this.onClick = function(e){
			self.dispatchEvent(FWDU3DCarSimpleButton.CLICK);
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
					self.screen.removeEventListener("touchstart", self.onClick);
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
			
			FWDU3DCarModTweenMax.killTweensOf(self.n_do);
			self.n_do.destroy();
			self.s_do.destroy();
			
			self.nImg = null;
			self.sImg = null;
			self.n_do = null;
			self.s_do = null;
			
			nImg = null;
			sImg = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarSimpleButton.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDU3DCarSimpleButton.setPrototype = function(){
		FWDU3DCarSimpleButton.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarSimpleButton.CLICK = "onClick";
	
	FWDU3DCarSimpleButton.prototype = null;
	window.FWDU3DCarSimpleButton = FWDU3DCarSimpleButton;
}(window));/* Simple Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDU3DCarSimpleDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		this.isMobile_bl = FWDU3DCarUtils.isMobile;
		
		this.hasTransform3d_bl = FWDU3DCarUtils.hasTransform3d;
		this.hasTransform2d_bl = FWDU3DCarUtils.hasTransform2d;
		if(FWDU3DCarUtils.isFirefox) self.hasTransform3d_bl = false;
		if(FWDU3DCarUtils.isFirefox) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setDisplay(self.display);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
				self.setSelectable(false);
			}
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(e){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl && !FWDU3DCarUtils.isAndroid){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			
			if (self.w < 0)
			{
				return;
			}
				
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.setCSSGradient = function(color1, color2)
		{
			if (FWDU3DCarUtils.isIEAndLessThen10)
			{
				self.setBkColor(color1);
			}
			else
			{
				self.screen.style.backgroundImage = "-webkit-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-moz-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-ms-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-o-linear-gradient(top, " + color1 + ", " + color2 + ")";
			}
		};
		
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function()
		{
			if (self.type == "img")
			{
				self.screen.onload = null;
				self.screen.onerror = null;
				self.screen.src = "";
			}
		};
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
			
			type = null;
			position = null;
			overflow = null;
			display = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDU3DCarSimpleDisplayObject = FWDU3DCarSimpleDisplayObject;
}(window));/* FWDU3DCarSlideshowButton */
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
}(window));/* Slideshow preloader */
(function (window){
	
	var FWDU3DCarSlideShowPreloader = function(imageSource_img, segmentWidth, segmentHeight, totalSegments, duration){
		
		var self  = this;
		var prototype = FWDU3DCarSlideShowPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_do = null;
		this.tweenObj = {currentPos:0};
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.duration = duration/1000;
		this.delayTimerId_int;
		
		//###################################//
		/* init */
		//###################################//
		this.init = function(){
			this.setWidth(this.segmentWidth);
			this.setHeight(this.segmentHeight);
		
			this.image_do = new FWDU3DCarDisplayObject("img");
			this.image_do.setScreen(this.imageSource_img);
			this.addChild(this.image_do);
			this.onUpdateHandler();
			this.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.animIn = function(){
			FWDU3DCarModTweenMax.killTweensOf(this.tweenObj);
			this.currentPos = 0;
			FWDU3DCarModTweenMax.to(this.tweenObj, this.duration, {currentPos:1, ease:Linear.easeNone, onUpdate:this.onUpdateHandler});
		};
		
		this.animOut = function(){
			FWDU3DCarModTweenMax.killTweensOf(this.tweenObj);
			FWDU3DCarModTweenMax.to(this.tweenObj, .8, {currentPos:0, onUpdate:this.onUpdateHandler});
		};
		
		this.onUpdateHandler = function(){
			var posX = Math.round((self.tweenObj.currentPos/1) * (self.totalSegments - 1)) * self.segmentWidth;
			self.image_do.setX(-posX);
		};
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		this.show = function(){
			this.setVisible(true);
			if(this.opacityType == "opacity"){
				FWDU3DCarModTweenMax.killTweensOf(this.image_do);
				FWDU3DCarModTweenMax.to(this.image_do, 1, {alpha:1});
			}else{
				this.setWidth(this.segmentWidth);
			}
		};
		
		this.hide = function(animate){
			if(animate){
				if(this.opacityType == "opacity"){
					FWDU3DCarModTweenMax.killTweensOf(this.image_do);
					FWDU3DCarModTweenMax.to(this.image_do, 1, {alpha:0});
				}else{
					this.setWidth(0);
				}
			}else{
				if(this.opacityType == "opacity"){
					FWDU3DCarModTweenMax.killTweensOf(this.image_do);
					this.setVisible(false);
					this.image_do.setAlpha(0);
				}else{
					this.setWidth(0);
				}
			}
		};
		
		//###################################//
		/* destroy */
		//##################################//
		this.destroy = function(){
			FWDU3DCarModTweenMax.killTweensOf(this);
			FWDU3DCarModTweenMax.killTweensOf(this.tweenObj);
			FWDU3DCarModTweenMax.killTweensOf(this.image_do);
			
			this.image_do.destroy();
			
			this.imageSource_img = null;
			this.image_do = null;
			this.tweenObj = null;
			imageSource_img = null;
			
			this.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarSlideShowPreloader.prototype = null;
		};
		
		this.init();
	};
	
	FWDU3DCarSlideShowPreloader.HIDE_COMPLETE
	
	FWDU3DCarSlideShowPreloader.setPrototype = function(){
		FWDU3DCarSlideShowPreloader.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarSlideShowPreloader.prototype = null;
	window.FWDU3DCarSlideShowPreloader = FWDU3DCarSlideShowPreloader;
	
}(window));
/* thumb */
(function(window)
{
	var FWDU3DCarThumb = function(id, data, parent)
	{
		var self = this;
		var prototype = FWDU3DCarThumb.prototype;

		this.id = id;
		this.borderSize = data.thumbBorderSize;
		this.backgroundColor = data.thumbBackgroundColor;
		this.borderColor1 = data.thumbBorderColor1;
		this.borderColor2 = data.thumbBorderColor2;

		this.mainDO = null;
		this.borderDO = null;
		this.bgDO = null;
		this.imageHolderDO = null;
		this.imageDO = null;
		this.htmlContentDO = null;
		this.reflCanvasDO = null;
		
		this.textHolderDO = null;
		this.textGradientDO = null;
		this.textDO = null;
		
		this.thumbWidth = data.thumbWidth;
		this.thumbHeight = data.thumbHeight;
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.pos;
		this.thumbScale = 1;
		
		this.showBoxShadow = data.showBoxShadow;
		
		this.curDataListAr;
		
		this.isOver = false;
		this.hasText = false;
		
		this.isMobile = FWDU3DCarUtils.isMobile;
		this.hasPointerEvent = FWDU3DCarUtils.hasPointerEvent;

		/* init */
		this.init = function()
		{
			self.setupScreen();
		};

		/* setup screen */
		this.setupScreen = function()
		{
			self.mainDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.mainDO);
			
			self.mainDO.setWidth(self.thumbWidth);
			self.mainDO.setHeight(self.thumbHeight);
			
			self.setWidth(self.thumbWidth);
			self.setHeight(self.thumbHeight);
			
			if (data.showThumbnailsHtmlContent || !data.transparentImages)
			{
				self.borderDO = new FWDU3DCarSimpleDisplayObject("div");
				self.bgDO = new FWDU3DCarSimpleDisplayObject("div");
				
				self.mainDO.addChild(self.borderDO);
				self.mainDO.addChild(self.bgDO);
				
				self.borderDO.setWidth(self.thumbWidth);
				self.borderDO.setHeight(self.thumbHeight);
				
				self.bgDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.bgDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.bgDO.setX(self.borderSize);
				self.bgDO.setY(self.borderSize);

				self.borderDO.setCSSGradient(self.borderColor1, self.borderColor2);
				
				self.bgDO.setBkColor(self.backgroundColor);
				
				if (FWDU3DCarUtils.isAndroid)
				{
					self.borderDO.setBackfaceVisibility();
					self.bgDO.setBackfaceVisibility();
				}
			}
			else
			{
				self.borderSize = 0;
			}
			
			self.imageHolderDO = new FWDU3DCarDisplayObject("div");
			self.mainDO.addChild(self.imageHolderDO);
			
			self.curDataListAr = parent.curDataListAr;
			
			if (!self.isMobile && (self.curDataListAr[self.id].mediaType != "none"))
			{
				self.mainDO.setButtonMode(true);
			}
			
			if (FWDU3DCarUtils.isAndroid)
			{
				self.setBackfaceVisibility();
				self.mainDO.setBackfaceVisibility();
				self.imageHolderDO.setBackfaceVisibility();
			}
			
			if (self.showBoxShadow)
			{
				self.mainDO.screen.style.boxShadow = data.thumbBoxShadowCss;
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.addEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.addEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.mainDO.screen.addEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.attachEvent("onclick", self.onMouseClickHandler);
				}
			}
		};
		
		this.addReflection = function()
		{
			if (!self.imageDO || self.isMobile || FWDU3DCarUtils.isIEAndLessThen9)
				return;
			
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			self.reflCanvasDO = new FWDU3DCarSimpleDisplayObject("canvas");
			self.addChild(self.reflCanvasDO);
			
			self.reflCanvasDO.screen.width = self.thumbWidth;
			self.reflCanvasDO.screen.height = parent.reflHeight;
			
			var context = self.reflCanvasDO.screen.getContext("2d");
		   
			context.save();
					
			context.translate(0, self.thumbHeight);
			context.scale(1, -1);
			
			if (data.showThumbnailsHtmlContent || !data.transparentImages)
			{
				context.fillStyle = self.borderColor1;
				context.fillRect(0, 0, self.thumbWidth, self.thumbHeight);
			}
			
			context.drawImage(self.imageDO.screen, self.borderSize, self.borderSize, imgW, imgH);

			context.restore();
			
			context.globalCompositeOperation = "destination-out";
			var gradient = context.createLinearGradient(0, 0, 0, parent.reflHeight);
			
			gradient.addColorStop(0, "rgba(255, 255, 255, " + (1-parent.reflAlpha) + ")");
			gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");

			context.fillStyle = gradient;
			context.fillRect(0, 0, self.thumbWidth, parent.reflHeight + 2);
			
			self.setWidth(self.thumbWidth);
			self.reflCanvasDO.setY(self.thumbHeight + parent.reflDist);
		};

		this.addImage = function(image)
		{
			self.imageDO = new FWDU3DCarSimpleDisplayObject("img");
			self.imageDO.setScreen(image);
			self.imageHolderDO.addChild(self.imageDO);
			
			self.imageDO.screen.ontouchstart = null;
			
			if (FWDU3DCarUtils.isAndroid)
			{
				self.imageDO.setBackfaceVisibility();
			}
			
			self.imageDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			self.imageHolderDO.setX(self.borderSize);
			self.imageHolderDO.setY(self.borderSize);
			
			self.imageHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			if (parent.showRefl)
			{
				self.addReflection();
			}
		};
		
		this.addHtmlContent = function()
		{
			self.htmlContentDO = new FWDU3DCarSimpleDisplayObject("div");
			self.htmlContentDO.setInnerHTML(self.curDataListAr[self.id].htmlContent);
			self.imageHolderDO.addChild(self.htmlContentDO);
			
			if (FWDU3DCarUtils.isAndroid)
			{
				self.htmlContentDO.setBackfaceVisibility();
			}
			
			self.htmlContentDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.htmlContentDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			self.imageHolderDO.setX(self.borderSize);
			self.imageHolderDO.setY(self.borderSize);
			
			self.imageHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
		};
		
		this.addText = function(textHolderDO, textGradientDO, textDO)
		{
			if (self.curDataListAr[self.id].emptyText)
				return;
			
			self.textHolderDO = textHolderDO;
			self.textGradientDO = textGradientDO;
			self.textDO = textDO;
			
			self.textHolderDO.setX(self.borderSize);
			self.textHolderDO.setY(self.borderSize);
			
			self.mainDO.addChild(self.textHolderDO);
			self.textDO.setInnerHTML(self.curDataListAr[self.id].thumbText);
			
			self.textTitleOffset = self.curDataListAr[self.id].textTitleOffset;
			self.textDescriptionOffsetTop = self.curDataListAr[self.id].textDescriptionOffsetTop;
			self.textDescriptionOffsetBottom = self.curDataListAr[self.id].textDescriptionOffsetBottom;
			
			self.textGradientDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset);
			self.textDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop);
			
			self.textHolderDO.setAlpha(0);

			self.setTextHeightId = setTimeout(self.setTextHeight, 10);
		};
		
		this.setTextHeight = function()
		{
			if (!self.textHolderDO)
				return;
			
			self.textHeight = self.textDO.getHeight();
			
			FWDU3DCarModTweenMax.to(self.textHolderDO, .8, {alpha:1, ease:Expo.easeOut});
			
			self.hasText = true;
			
			self.checkThumbOver();
		};
		
		this.removeText = function()
		{
			if (self.textHolderDO)
			{
				FWDU3DCarModTweenMax.to(self.textHolderDO, .6, {alpha:0, ease:Expo.easeOut, onComplete:self.removeTextFinish});
			}
		};
		
		this.removeTextFinish = function()
		{
			FWDU3DCarModTweenMax.killTweensOf(self.textHolderDO);
			FWDU3DCarModTweenMax.killTweensOf(self.textGradientDO);
			FWDU3DCarModTweenMax.killTweensOf(self.textDO);
			
			self.mainDO.removeChild(self.textHolderDO);
			self.textHolderDO = null;
			self.textGradientDO = null;
			self.textDO = null;
			
			self.isOver = false;
			self.hasText = false;
		};
		
		this.checkThumbOver = function()
		{
			if (!self.hasText)
				return;

			if ((parent.thumbMouseX >= 0) && (parent.thumbMouseX <= self.thumbWidth) && (parent.thumbMouseY >= 0) && (parent.thumbMouseY <= self.thumbHeight))
			{
				self.onThumbOverHandler();
			}
			else
			{
				self.onThumbOutHandler();
			}
		};
		
		this.onThumbOverHandler = function()
		{
			if (!self.isOver)
			{
				self.isOver = true;

				FWDU3DCarModTweenMax.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textDescriptionOffsetTop - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
				FWDU3DCarModTweenMax.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
			}
		};

		this.onThumbOutHandler = function()
		{
			if (self.isOver)
			{
				self.isOver = false;
				
				FWDU3DCarModTweenMax.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset, ease:Expo.easeOut});
				FWDU3DCarModTweenMax.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop, ease:Expo.easeOut});
			}
		};
		
		this.showThumb3D = function()
		{
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			self.imageHolderDO.setX(parseInt(self.thumbWidth/2));
			self.imageHolderDO.setY(parseInt(self.thumbHeight/2));
			
			self.imageHolderDO.setWidth(0);
			self.imageHolderDO.setHeight(0);
			
			FWDU3DCarModTweenMax.to(self.imageHolderDO, .8, {x:self.borderSize, y:self.borderSize, w:imgW, h:imgH, ease:Expo.easeInOut});
			
			if (data.showThumbnailsHtmlContent)
			{
				self.htmlContentDO.setWidth(imgW);
				self.htmlContentDO.setHeight(imgH);
				
				self.htmlContentDO.setX(-parseInt(imgW/2));
				self.htmlContentDO.setY(-parseInt(imgH/2));
				
				FWDU3DCarModTweenMax.to(self.htmlContentDO, .8, {x:0, y:0, ease:Expo.easeInOut});
			}
			else
			{
				self.imageDO.setWidth(imgW);
				self.imageDO.setHeight(imgH);
				
				self.imageDO.setX(-parseInt(imgW/2));
				self.imageDO.setY(-parseInt(imgH/2));
				
				FWDU3DCarModTweenMax.to(self.imageDO, .8, {x:0, y:0, ease:Expo.easeInOut});
				
				if (self.reflCanvasDO)
				{
					self.reflCanvasDO.setAlpha(0);
					FWDU3DCarModTweenMax.to(self.reflCanvasDO, .8, {alpha:1, ease:Expo.easeInOut});
				}
			}
		};
		
		this.showThumb2D = function()
		{
			if (!FWDU3DCarUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * self.thumbScale);
				var scaleH = Math.floor(self.thumbHeight * self.thumbScale);
				var borderScale = Math.floor(self.borderSize * self.thumbScale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
			
				var imgW = scaleW - borderScale * 2;
				var imgH = scaleH - borderScale * 2;
				
				self.imageHolderDO.setX(parseInt(scaleW/2));
				self.imageHolderDO.setY(parseInt(scaleH/2));
				
				self.imageHolderDO.setWidth(0);
				self.imageHolderDO.setHeight(0);
				
				FWDU3DCarModTweenMax.to(self.imageHolderDO, .8, {x:borderScale, y:borderScale, w:imgW, h:imgH, ease:Expo.easeInOut});
				
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(imgW);
						self.htmlContentDO.setHeight(imgH);
						
						self.htmlContentDO.setX(-parseInt(imgW/2));
						self.htmlContentDO.setY(-parseInt(imgH/2));
						
						FWDU3DCarModTweenMax.to(self.htmlContentDO, .8, {x:0, y:0, ease:Expo.easeInOut});
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(imgW);
						self.imageDO.setHeight(imgH);
						
						self.imageDO.setX(-parseInt(imgW/2));
						self.imageDO.setY(-parseInt(imgH/2));
						
						FWDU3DCarModTweenMax.to(self.imageDO, .8, {x:0, y:0, ease:Expo.easeInOut});
						
						if (self.reflCanvasDO)
						{
							FWDU3DCarModTweenMax.to(self.reflCanvasDO, .8, {alpha:1, ease:Expo.easeInOut});
						}
					}
				}
			}
			else
			{
				self.setScale2(self.thumbScale);
				
				var imgW = self.thumbWidth - self.borderSize * 2;
				var imgH = self.thumbHeight - self.borderSize * 2;
				
				self.imageHolderDO.setX(parseInt(self.thumbWidth/2));
				self.imageHolderDO.setY(parseInt(self.thumbHeight/2));
				
				self.imageHolderDO.setWidth(0);
				self.imageHolderDO.setHeight(0);
				
				FWDU3DCarModTweenMax.to(self.imageHolderDO, .8, {x:self.borderSize, y:self.borderSize, w:imgW, h:imgH, ease:Expo.easeInOut});
				
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(imgW);
						self.htmlContentDO.setHeight(imgH);
						
						self.htmlContentDO.setX(-parseInt(imgW/2));
						self.htmlContentDO.setY(-parseInt(imgH/2));
						
						FWDU3DCarModTweenMax.to(self.htmlContentDO, .8, {x:0, y:0, ease:Expo.easeInOut});
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(imgW);
						self.imageDO.setHeight(imgH);
						
						self.imageDO.setX(-parseInt(imgW/2));
						self.imageDO.setY(-parseInt(imgH/2));
						
						FWDU3DCarModTweenMax.to(self.imageDO, .8, {x:0, y:0, ease:Expo.easeInOut});
						
						if (self.reflCanvasDO)
						{
							FWDU3DCarModTweenMax.to(self.reflCanvasDO, .8, {alpha:1, ease:Expo.easeInOut});
						}
					}
				}
			}
		};
		
		this.showThumbIntro2D = function(scale, del)
		{
			self.thumbScale = scale;

			if (!FWDU3DCarUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * scale);
				var scaleH = Math.floor(self.thumbHeight * scale);
				var borderScale = Math.floor(self.borderSize * scale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
				
				var imgW = scaleW - borderScale * 2;
				var imgH = scaleH - borderScale * 2;
				
				self.setWidth(scaleW);
				self.setHeight(scaleH);
				
				self.mainDO.setWidth(scaleW);
				self.mainDO.setHeight(scaleH);
				
				if (self.borderDO)
				{
					self.borderDO.setWidth(scaleW);
					self.borderDO.setHeight(scaleH);
				}
				
				if (self.bgDO)
				{
					self.bgDO.setX(borderScale);
					self.bgDO.setY(borderScale);
					
					self.bgDO.setWidth(imgW);
					self.bgDO.setHeight(imgH);
				}
				
				self.setX(-self.thumbWidth/2);
				self.setY(-self.thumbHeight/2);
				
				FWDU3DCarModTweenMax.to(self, .8, {x:Math.floor(self.newX + (self.thumbWidth - scaleW)/2), y:-Math.floor(scaleH/2), alpha:self.newAlpha, delay:del, ease:Expo.easeOut});
			}
			else
			{
				self.setScale2(self.thumbScale);
				
				self.setX(-self.thumbWidth/2);
				self.setY(-self.thumbHeight/2);

				FWDU3DCarModTweenMax.to(self, .8, {x:self.newX, y:self.newY, z:self.newZ, scale:self.thumbScale, alpha:self.newAlpha, delay:del, ease:Quart.easeOut});
			}
		};
		
		this.setScale = function(scale, alpha)
		{
			self.thumbScale = scale;
			
			self.setVisible(true);
			
			if (!FWDU3DCarUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * scale);
				var scaleH = Math.floor(self.thumbHeight * scale);
				var borderScale = Math.floor(self.borderSize * scale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
				
				if (self.borderDO)
				{
					self.borderDO.setWidth(scaleW);
					self.borderDO.setHeight(scaleH);
				}
				
				if (self.bgDO)
				{
					self.bgDO.setX(borderScale);
					self.bgDO.setY(borderScale);
					
					self.bgDO.setWidth(scaleW - borderScale * 2);
					self.bgDO.setHeight(scaleH - borderScale * 2);
				}
				
				self.mainDO.setWidth(scaleW);
				self.mainDO.setHeight(scaleH);
				
				self.imageHolderDO.setX(borderScale);
				self.imageHolderDO.setY(borderScale);
				
				self.imageHolderDO.setWidth(scaleW - borderScale * 2);
				self.imageHolderDO.setHeight(scaleH - borderScale * 2);
				
				self.setX(Math.floor(self.newX + (self.thumbWidth - scaleW)/2));
				self.setY(Math.floor(self.newY + (self.thumbHeight - scaleH)/2));
				
				self.setWidth(scaleW);
				self.setHeight(scaleH);
				
				self.setAlpha(alpha);
								
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(scaleW - borderScale * 2);
						self.htmlContentDO.setHeight(scaleH - borderScale * 2);
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(scaleW - borderScale * 2);
						self.imageDO.setHeight(scaleH - borderScale * 2);
					}
				}
			}
			else
			{
				thumb.setX(Math.floor(self.newX));
				thumb.setY(Math.floor(self.newY));
				
				self.setScale2(self.thumbScale);
				self.setAlpha(alpha);
			}
		};
		
		this.update = function()
		{
			if (parent.showRefl)
			{
				if (!self.reflCanvasDO)
				{
					self.addReflection();
				}
				else
				{
					self.reflCanvasDO.setAlpha(1);
					self.reflCanvasDO.setY(self.thumbHeight + parent.reflDist);
				}
			}
			else
			{
				if (self.reflCanvasDO)
				{
					self.reflCanvasDO.setAlpha(0);
				}
			}
		};
		
		this.hide = function(del)
		{
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			FWDU3DCarModTweenMax.to(self.imageHolderDO, .8, {x:parseInt(self.thumbWidth/2), y:parseInt(self.thumbHeight/2), w:0, h:0, delay:del, ease:Expo.easeInOut});
			
			if (data.showThumbnailsHtmlContent)
			{
				if (self.htmlContentDO)
				{
					FWDU3DCarModTweenMax.to(self.htmlContentDO, .8, {x:-parseInt(imgW/2), y:-parseInt(imgH/2), delay:del, ease:Expo.easeInOut});
				}
			}
			else
			{
				if (self.imageDO)
				{
					FWDU3DCarModTweenMax.to(self.imageDO, .8, {x:-parseInt(imgW/2), y:-parseInt(imgH/2), delay:del, ease:Expo.easeInOut});
					
					if (self.reflCanvasDO)
					{
						FWDU3DCarModTweenMax.to(self.reflCanvasDO, .8, {alpha:0, delay:del, ease:Expo.easeInOut});
					}
				}
			}
		};

		this.onMouseClickHandler = function()
		{
			self.dispatchEvent(FWDU3DCarThumb.CLICK, {id:self.id});
		};
		
		this.onMouseTouchHandler = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			self.dispatchEvent(FWDU3DCarThumb.CLICK, {id:self.id});
		};
		
		this.enable = function()
		{
			if (self.isEnabled)
				return;
				
			self.isEnabled = true;
			
			if (!self.isMobile && (self.curDataListAr[self.id].mediaType != "none"))
			{
				self.mainDO.setButtonMode(true);
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.addEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.addEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.mainDO.screen.addEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.attachEvent("onclick", self.onMouseClickHandler);
				}
			}
		};
		
		this.disable = function()
		{
			if (!self.isEnabled)
				return;
		
			self.isEnabled = false;
			
			self.mainDO.setButtonMode(false);
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.removeEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.removeEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.removeEventListener)
				{
					self.mainDO.screen.removeEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.detachEvent("onclick", self.onMouseClickHandler);
				}
			}
		};
		
		/* destroy */
		this.destroy = function()
		{
			FWDU3DCarModTweenMax.killTweensOf(self);
			FWDU3DCarModTweenMax.killTweensOf(self.mainDO);
			FWDU3DCarModTweenMax.killTweensOf(self.imageHolderDO);
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.removeEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.removeEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.mainDO.screen.removeEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.detachEvent("onclick", self.onMouseClickHandler);
				}
			}
			
			clearTimeout(self.setTextHeightId);
			
			if (self.imageDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.imageDO);
				self.imageDO.disposeImage();
				self.imageDO.destroy();
			}
			
			if (self.htmlContentDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.htmlContentDO);
				self.htmlContentDO.destroy();
				self.htmlContentDO = null;
			}

			if (self.bgDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.bgDO);
				self.bgDO.destroy();
				self.bgDO = null;
			}
			
			if (self.borderDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.borderDO);
				self.borderDO.destroy();
				self.borderDO = null;
			}
			
			if (self.htmlContentDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.htmlContentDO);
				self.htmlContentDO.destroy();
			}
			
			if (self.textGradientDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textGradientDO);
				self.textGradientDO = null;
			}
			
			if (self.textDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textDO);
				self.textDO = null;
			}
			
			if (self.textHolderDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textHolderDO);
				self.textHolderDO = null
			}

			self.imageHolderDO.destroy();
			self.mainDO.destroy();

			self.imageHolderDO = null;
			self.imageDO = null;
			self.htmlContentDO = null;
			
			self.mainDO = null;
			self.borderDO = null;
			self.bgDO = null;
			self.imageHolderDO = null;
			self.imageDO = null;
			self.htmlContentDO = null;
			self.textHolderDO = null;
			self.textGradientDO = null;
			self.textDO = null;
			
			self.id = null;
			self.data = null;
			self.parent = null;
			self.backgroundColor = null;
			self.borderColor = null;
			
			self.screen.innerHTML = "";
			prototype.destroy();
			prototype = null;
			self = null;
			FWDU3DCarThumb.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDU3DCarThumb.setPrototype = function()
	{
		FWDU3DCarThumb.prototype = new FWDU3DCarDisplayObject3D("div", "absolute", "visible");
	};

	FWDU3DCarThumb.CLICK = "click";

	FWDU3DCarThumb.prototype = null;
	window.FWDU3DCarThumb = FWDU3DCarThumb;
}(window));/* thumbs manager */
(function(window)
{
	var FWDU3DCarThumbsManager = function(data, parent)
	{
		var self = this;
		var prototype = FWDU3DCarThumbsManager.prototype;

		this.data = data;
		this.parent = parent;
		
		this.stageWidth = parent.stageWidth;
		this.stageHeight = parent.stageHeight;
		
		this.thumbsHolderDO;

		this.totalThumbs;
		this.thumbsAr = [];
		
		this.dataListId = data.startAtCategory;
		
		this.topologiesAr = ["normal", "ring", "star"];
		
		this.curDataListAr;
		
		this.dragCurId;
		this.prevCurId;
		this.curId;
		
		this.thumbWidth = data.thumbWidth;
		this.thumbHeight = data.thumbHeight;
		
		this.borderSize = data.thumbBorderSize;
		
		this.perspective = self.thumbWidth * 4;
		
		this.carRadiusX = data.carRadiusX;
		this.carRadiusY = data.carRadiusY;
		
		this.carouselXRot = data.carouselXRotation;
		this.carYOffset = data.carouselYOffset;
		
		this.focalLength = 250;
		
		this.thumbMinAlpha = data.thumbMinAlpha;
		
		this.countLoadedThumbsLeft;
		this.countLoadedThumbsRight;
		
		this.controlsDO;
		this.prevButtonDO;
		this.nextButtonDO;
		this.scrollbarDO;
		this.slideshowButtonDO;
		
		this.controlsHeight = self.data.nextButtonNImg.height;
		this.showText = self.data.showText;
		
		this.thumbXSpace3D = self.data.thumbXSpace3D;
		this.thumbXOffset3D = self.data.thumbXOffset3D;
		this.thumbZSpace3D = self.data.thumbZSpace3D;
		this.thumbZOffset3D = self.data.thumbZOffset3D;
		this.thumbYAngle3D = self.data.thumbYAngle3D;
		this.thumbXSpace2D = self.data.thumbXSpace2D;
		this.thumbXOffset2D = self.data.thumbXOffset2D;
		
		this.topology = data.carouselTopology;
		
		this.textDO;
		this.textHolderDO;
		this.textGradientDO;
		this.thumbOverDO;
		
		this.showRefl = data.showRefl;
		this.reflHeight = data.reflHeight;
		this.reflDist = data.reflDist;
		this.reflAlpha = data.reflAlpha;
		
		this.showCenterImg = data.showCenterImg;
		this.centerImgPath = data.centerImgPath;
		this.centerImgYOffset = data.centerImgYOffset;
		
		this.centerImgDO;
		
		this.isThumbOver = false;
		this.hasThumbText = false;
		
		this.introFinished = false;
		this.isPlaying = false;
		this.disableThumbClick = false;
		this.isTextSet = false;
		this.allowToSwitchCat = false;
		
		this.hasPointerEvent = FWDU3DCarUtils.hasPointerEvent;
		this.isMobile = FWDU3DCarUtils.isMobile;

		this.loadWithDelayIdLeft;
		this.loadWithDelayIdRight;
		this.slideshowTimeoutId;
		this.textTimeoutId;
		this.zSortingId;
		this.hideThumbsFinishedId;
		this.loadHtmlContentsId;
		this.loadImagesId;
		this.setTextHeightId;
		this.setIntroFinishedId;
		this.showControlsId;

		/* init */
		this.init = function()
		{
			self.holderDO = new FWDU3DCarDisplayObject3D("div");
			self.addChild(self.holderDO);
			
			self.holderDO.setWidth(self.stageWidth);
			self.holderDO.setHeight(self.stageHeight - self.controlsHeight);
			
			self.thumbsHolderDO = new FWDU3DCarDisplayObject3D("div", "absolute", "visible");
			self.holderDO.addChild(self.thumbsHolderDO);
			
			self.thumbsHolderDO.setZ(100000);
			
			if (FWDU3DCarUtils.isIEAndLessThen10)
			{
				self.carRadiusX /= 1.5;
			}
			
			self.thumbsHolderDO.setPerspective(self.perspective);
			
			self.thumbsHolderDO.setX(Math.floor(self.stageWidth/2));
			
			if (self.data.controlsPos)
			{
				self.thumbsHolderDO.setY(Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2 + self.controlsHeight + self.carYOffset));
			}
			else
			{
				self.thumbsHolderDO.setY(Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2) + self.carYOffset);
			}
			
			if ((!self.isMobile && !FWDU3DCarUtils.isSafari) || FWDU3DCarUtils.isAndroidAndWebkit)
			{
				self.thumbsHolderDO.setPreserve3D();
			}
			
			self.thumbsHolderDO.setAngleX(-self.carouselXRot);
			
			if (!self.isMobile)
			{
				if (self.screen.addEventListener)
				{
					window.addEventListener("mousemove", self.onThumbMove);
				}
				else
				{
					document.attachEvent("onmousemove", self.onThumbMove);
				}
			}
			
			if (self.hasPointerEvent)
			{
				window.addEventListener("MSPointerMove", self.onThumbMove);
			}
			
			self.showScrollbar = data.showScrollbar;
			self.showNextButton = data.showNextButton;
			self.showPrevButton = data.showPrevButton;
			
			if (self.isMobile)
			{
				if (data.disableScrollbarOnMobile)
				{
					self.showScrollbar = false;
				}
				
				if (data.disableNextAndPrevButtonsOnMobile)
				{
					self.showNextButton = false;
					self.showPrevButton = false;
				}	
			}
			
			if (self.showText)
			{
				self.setupText();
				
				if (self.isMobile)
				{
					self.setupThumbOver();
				}
			}
			
			self.showCurrentCat(-1);
			
			self.setupControls();
		};
		
		this.onThumbMove = function(e)
		{
			if (!self.textHolderDO)
				return;
			
			if (self.disableThumbClick)
				return;
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);
			
			self.thumbMouseX = viewportMouseCoordinates.screenX - parent.rect.left - (self.stageWidth - self.thumbWidth)/2;
			self.thumbMouseY = viewportMouseCoordinates.screenY - parent.rect.top - (self.stageHeight - data.prevButtonNImg.height - self.thumbHeight)/2;
			
			if (self.isTextSet)
			{
				if (self.isMobile)
				{
					self.checkThumbOver();
				}
				else
				{
					self.thumbsAr[self.curId].checkThumbOver();
				}
			}
		};
		
		//##############################################//
		/* show current cat */
		//##############################################//
		this.showCurrentCat = function(id)
		{
			if ((id != self.dataListId) && (id >= 0))
			{
				self.allowToSwitchCat = false;
				self.hideCurrentCat();
				self.dataListId = id;
				
				return;
			}
			
			self.thumbsAr = [];
			self.curDataListAr = self.data.dataListAr[self.dataListId];
			self.totalThumbs = self.curDataListAr.length;
			
			if (self.isMobile)
			{
				 self.totalThumbs = Math.min(self.totalThumbs, data.maxNumberOfThumbsOnMobile);
			}
			
			switch (self.data.coverflowStartPosition)
			{
				case "left":
					self.curId = 0;
					break;
				case "right":
					self.curId = self.totalThumbs-1;
					break;
				default:
					self.curId = Math.floor((self.totalThumbs-1)/2);
			}
			
			if (self.showScrollbar && self.scrollbarDO)
			{
				self.scrollbarDO.totalItems = self.totalThumbs;
				self.scrollbarDO.curItemId = self.curId;
				self.scrollbarDO.gotoItem2();
			}
			
			self.setupThumbs();
			
			self.prevCurId = self.curId;
			
			self.startIntro();
		};
		
		//################################################//
		/* hide current cat */
		//################################################//
		this.hideCurrentCat = function()
		{
			clearTimeout(self.loadWithDelayIdLeft);
			clearTimeout(self.loadWithDelayIdRight);
			clearTimeout(self.textTimeoutId);
			clearInterval(self.zSortingId);
			clearTimeout(self.hideThumbsFinishedId);
			clearTimeout(self.loadHtmlContentsId);
			clearTimeout(self.loadImagesId);
			clearTimeout(self.setTextHeightId);
			clearTimeout(self.setIntroFinishedId);
			clearTimeout(self.showControlsId);
			
			self.stopSlideshow();
			
			self.disableThumbClick = true;
			
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
			}
			
			if (self.imageLeft)
			{
				self.imageLeft.onload = null;
				self.imageLeft.onerror = null;
			}
			
			if (self.imageRight)
			{
				self.imageRight.onload = null;
				self.imageRight.onerror = null;
			}
			
			self.hideThumbs();
		};
		
		this.hideThumbs = function()
		{
			var delay;
			var delayDelta;
			var newX = -self.thumbWidth/2;
			var maxNrOfSideThumbs = Math.max(self.totalThumbs - self.curId, self.curId);
			
			delayDelta = Math.floor(1000/maxNrOfSideThumbs);
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				if (i == self.curId)
				{
					self.hideThumbsFinishedId = setTimeout(self.hideThumbsFinished, 500);
				}
				else
				{
					delay = Math.abs(maxNrOfSideThumbs - Math.abs(i - self.curId) + 1) * delayDelta;
					FWDU3DCarModTweenMax.to(thumb, .5, {x:Math.floor(newX), alpha:0, ease:Expo.easeIn});
					thumb.hide(0);
				}
			}
		};
		
		this.hideThumbsFinished = function()
		{
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				if (i == self.curId)
				{
					thumb.hide(0);
					FWDU3DCarModTweenMax.to(thumb, .6, {alpha:0, delay:.2, onComplete:self.allThumbsAreTweened});
					
					if (self.isMobile && self.textHolderDO)
					{
						FWDU3DCarModTweenMax.to(self.textHolderDO, .6, {alpha:0, delay:.2, ease:Expo.easeOut});
						FWDU3DCarModTweenMax.to(self.textGradientDO, .6, {alpha:0, delay:.2, ease:Expo.easeOut});
					}
				}
				else
				{
					thumb.setAlpha(0);
				}
			}
		};
		
		this.allThumbsAreTweened = function()
		{
			self.destroyCurrentCat();
			self.showCurrentCat();
		};
		
		this.destroyCurrentCat = function()
		{
			var thumb;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				FWDU3DCarModTweenMax.killTweensOf(thumb);
				self.thumbsHolderDO.removeChild(thumb);
				thumb.destroy();
				thumb = null;
			}
		};
		
		this.startIntro = function()
		{
			self.disableThumbClick = true;
			
			thumb = self.thumbsAr[self.curId];
			
			var newX = -self.thumbWidth/2;
			var newY = self.carRadiusY * Math.sin(Math.PI/2) - self.thumbHeight/2;
			
			thumb.setX(Math.floor(newX));
			thumb.setY(Math.floor(newY));
			
			thumb.setAlpha(0);
			FWDU3DCarModTweenMax.to(thumb, .8, {alpha:1});
			
			self.thumbsHolderDO.addChild(thumb);
			
			if (self.data.showThumbnailsHtmlContent)
			{
				self.loadCenterHtmlContent();
				self.loadHtmlContentsId = setTimeout(self.loadHtmlContents, 600);
			}
			else
			{
				self.loadCenterImage();
				self.loadImagesId = setTimeout(self.loadImages, 600);
			}
			
			if (self.showCenterImg && !self.centerImgDO)
			{
				self.setupCenterImg();
			}
		};
		
		this.setupCenterImg = function()
		{
			self.centerImage = new Image();
			
			self.centerImage.onerror = self.onCenterImageLoadErrorHandler;
			self.centerImage.onload = self.onCenterImageLoadHandler;
			self.centerImage.src = self.centerImgPath;
		};
		
		this.onCenterImageLoadHandler = function()
		{
			self.centerImgDO = new FWDU3DCarDisplayObject3D("div");
			self.thumbsHolderDO.addChild(self.centerImgDO);
			
			self.centerImg = new FWDU3DCarSimpleDisplayObject("img");
			self.centerImg.setScreen(self.centerImage);
			self.centerImgDO.addChild(self.centerImg);
			
			self.centerImg.screen.ontouchstart = null;
			
			self.centerImgDO.setWidth(self.centerImg.getWidth());
			self.centerImgDO.setHeight(self.centerImg.getHeight());
			
			self.centerImgDO.setX(-Math.floor(self.centerImgDO.getWidth()/2));
			self.centerImgDO.setY(-Math.floor(self.centerImgDO.getHeight()/2) + self.centerImgYOffset);
			
			self.centerImgDO.setZ(-self.carRadiusX);
			
			if (FWDU3DCarUtils.isIE || !FWDU3DCarUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.centerImgDO.setZIndex(Math.floor(self.carRadiusX) + 1);
			}
			
			self.centerImgDO.setScale2(self.centerImgDO.getWidth() / self.centerImgDO.screen.getBoundingClientRect().width);
			
			self.centerImgDO.setAlpha(0);
			FWDU3DCarModTweenMax.to(self.centerImgDO, .8, {alpha:1});
		};
		
		this.onCenterImageLoadErrorHandler = function(e)
		{
			if (!self || !self.data)
				return;

			var message = "Center image can't be loaded, probably the path is incorrect <font color='#FFFFFF'>" + self.centerImgPath + "</font>";

			self.dispatchEvent(FWDU3DCarThumbsManager.LOAD_ERROR, {text : message});
		};

		/* setup thumbs */
		this.setupThumbs = function()
		{
			var thumb;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				FWDU3DCarThumb.setPrototype();
				
				thumb = new FWDU3DCarThumb(i, self.data, self);
				
				self.thumbsAr.push(thumb);
				
				thumb.addListener(FWDU3DCarThumb.CLICK, self.onThumbClick);
			}
		};
		
		this.onThumbClick = function(e)
		{
			if (self.disableThumbClick)
				return;
			
			self.curId = e.id;
			
			self.thumbClickHandler();
		};
		
		this.thumbClickHandler = function()
		{
			if (self.curId != self.prevCurId)
			{
				self.gotoThumb();
			}
			else
			{
				var type = self.curDataListAr[self.curId].mediaType;
				var tempId = self.curId;
				
				if (type == "none")
				{
					return;
				}
				
				if (type != "link")
				{
					for (var i=0; i<self.totalThumbs; i++)
					{
						if ((i < self.curId) && ((self.curDataListAr[i].mediaType == "link") || (self.curDataListAr[i].mediaType == "none")))
						{
							tempId -= 1;
						}
					};
				}
				
				if (type == "link")
				{
					window.open(self.curDataListAr[self.curId].secondObj.url, self.curDataListAr[self.curId].secondObj.target);
				}
				else
				{
					self.dispatchEvent(FWDU3DCarThumbsManager.THUMB_CLICK, {id:tempId});
				}
			}
		};
		
		this.resizeHandler = function()
		{
			if ((self.stageWidth == parent.stageWidth) && (self.stageHeight == parent.stageHeight))
					return;
			
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			
			self.holderDO.setWidth(self.stageWidth);
			self.holderDO.setHeight(self.stageHeight - self.controlsHeight);
			
			self.thumbsHolderDO.setX(Math.floor(self.stageWidth/2));
			
			if (self.data.controlsPos)
			{
				self.thumbsHolderDO.setY(Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2 + self.controlsHeight + self.carYOffset));
			}
			else
			{
				self.thumbsHolderDO.setY(Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2) + self.carYOffset);
			}
			
			self.positionControls();
			
			if (self.textHolderDO && self.isMobile)
			{
				self.textHolderDO.setX(Math.floor((self.stageWidth - self.thumbWidth)/2) + self.borderSize);
				self.textHolderDO.setY(Math.floor((self.stageHeight - self.thumbHeight)/2 - self.data.prevButtonNImg.height/2) + self.borderSize);
			}
			
			if (self.thumbOverDO)
			{
				self.thumbOverDO.setX(Math.floor((self.stageWidth - self.thumbWidth)/2));
				self.thumbOverDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.data.prevButtonNImg.height)/2));
			}
		};
		
		this.setupText = function()
		{
			self.textHolderDO = new FWDU3DCarDisplayObject3D("div");
			self.addChild(self.textHolderDO);
			
			if (self.isMobile)
			{
				self.textHolderDO.setZ(200000);
			}
			
			self.textHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.textHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			if (self.isMobile)
			{
				self.textHolderDO.setX(Math.floor((self.stageWidth - self.thumbWidth)/2) + self.borderSize);
				self.textHolderDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.data.prevButtonNImg.height)/2) + self.borderSize);
			}
			else
			{
				self.textHolderDO.setX(-1000);
			}
			
			if (self.data.showTextBackgroundImage)
			{
				self.textGradientDO = new FWDU3DCarSimpleDisplayObject("img");
				self.textHolderDO.addChild(self.textGradientDO);
				
				self.textGradientDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.textGradientDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.textGradientDO.screen.src = data.thumbTitleGradientPath;
			}
			else
			{
				self.textGradientDO = new FWDU3DCarSimpleDisplayObject("div");
				self.textHolderDO.addChild(self.textGradientDO);
				
				self.textGradientDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.textGradientDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.textGradientDO.setBkColor(self.data.textBackgroundColor);
				self.textGradientDO.setAlpha(self.data.textBackgroundOpacity);
			}
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.textHolderDO.addChild(self.textDO);
			
			self.textDO.setWidth(self.thumbWidth - self.borderSize * 2);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
		};
		
		this.setupThumbOver = function()
		{
			self.thumbOverDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.thumbOverDO);
			
			if (!self.isMobile)
			{
				self.thumbOverDO.setButtonMode(true);
			}
			
			if (FWDU3DCarUtils.isIE)
			{
				self.thumbOverDO.setBkColor("#000000");
				self.thumbOverDO.setAlpha(.001);
			}
			
			self.thumbOverDO.setWidth(self.thumbWidth);
			self.thumbOverDO.setHeight(self.thumbHeight);
			
			self.thumbOverDO.setX(Math.floor((self.stageWidth - self.thumbWidth)/2));
			self.thumbOverDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.data.prevButtonNImg.height)/2));
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.thumbOverDO.screen.addEventListener("MSPointerUp", self.onThumbOverTouch);
				}
				else
				{
					self.thumbOverDO.screen.addEventListener("touchend", self.onThumbOverTouch);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.thumbOverDO.screen.addEventListener("click", self.onThumbOverClick);
				}
				else
				{
					self.thumbOverDO.screen.attachEvent("onclick", self.onThumbOverClick);
				}
			}
		};
		
		this.onThumbOverClick = function()
		{
			if (self.disableThumbClick)
				return;
			
			self.thumbClickHandler();
		};
		
		this.onThumbOverTouch = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			if (self.disableThumbClick)
				return;
			
			self.thumbClickHandler();
		};
		
		this.addThumbText = function()
		{
			self.textHolderDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.data.prevButtonNImg.height)/2) + self.borderSize);

			self.textDO.setInnerHTML(self.curDataListAr[self.curId].thumbText);
			
			self.textTitleOffset = self.curDataListAr[self.curId].textTitleOffset;
			self.textDescriptionOffsetTop = self.curDataListAr[self.curId].textDescriptionOffsetTop;
			self.textDescriptionOffsetBottom = self.curDataListAr[self.curId].textDescriptionOffsetBottom;
			
			self.textGradientDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset);
			self.textDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop);
			
			self.textHolderDO.setAlpha(0);
	
			self.setTextHeightId = setTimeout(self.setTextHeight, 10);
		};
	
		this.setTextHeight = function()
		{	
			self.textHeight = self.textDO.getHeight();
			
			FWDU3DCarModTweenMax.to(self.textHolderDO, .8, {alpha:1, ease:Expo.easeOut});
			FWDU3DCarModTweenMax.to(self.textGradientDO, .8, {alpha:1, ease:Expo.easeOut});
			
			self.hasThumbText = true;
			
			self.checkThumbOver();
		};
		
		this.removeThumbText = function()
		{
			if (self.isMobile)
			{
				self.removeTextFinish();
			}
			else
			{
				FWDU3DCarModTweenMax.to(self.textHolderDO, .6, {alpha:0, ease:Expo.easeOut, onComplete:self.removeTextFinish});
			}
		};
		
		this.removeTextFinish = function()
		{
			FWDU3DCarModTweenMax.killTweensOf(self.textHolderDO);
			FWDU3DCarModTweenMax.killTweensOf(self.textGradientDO);
			FWDU3DCarModTweenMax.killTweensOf(self.textDO);
			
			self.hasThumbText = false;
			self.isThumbOver = false;
			
			self.textHolderDO.setY(2000);
		};
		
		this.checkThumbOver = function()
		{
			if (!self.hasThumbText)
				return;
			
			if ((self.thumbMouseX >= 0) && (self.thumbMouseX <= self.thumbWidth) && (self.thumbMouseY >= 0) && (self.thumbMouseY <= self.thumbHeight))
			{
				self.onThumbOverHandler();
			}
			else
			{
				self.onThumbOutHandler();
			}
		};
		
		this.onThumbOverHandler = function()
		{
			if (!self.isThumbOver)
			{
				self.isThumbOver = true;
				
				FWDU3DCarModTweenMax.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textDescriptionOffsetTop - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
				FWDU3DCarModTweenMax.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
			}
		};

		this.onThumbOutHandler = function()
		{
			if (self.isThumbOver)
			{
				self.isThumbOver = false;
				
				FWDU3DCarModTweenMax.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset, ease:Expo.easeOut});
				FWDU3DCarModTweenMax.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop, ease:Expo.easeOut});
			}
		};
		
		this.loadImages = function()
		{
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{	
				self.setupIntro3D();
			}
			else
			{
				self.setupIntro2D();
			}
			
			self.countLoadedThumbsLeft = self.curId - 1;
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbImageLeft, 100);
			
			self.countLoadedThumbsRight = self.curId + 1;
			self.loadWithDelayIdRight = setTimeout(self.loadThumbImageRight, 100);
		};
		
		this.loadCenterImage = function()
		{
			self.imagePath = self.curDataListAr[self.curId].thumbPath;

			self.image = new Image();
			self.image.onerror = self.onImageLoadErrorHandler;
			self.image.onload = self.onImageLoadHandlerCenter;
			self.image.src = self.imagePath;
		};
		
		this.onImageLoadHandlerCenter = function(e)
		{
			var thumb = self.thumbsAr[self.curId];
			
			thumb.addImage(self.image);
			
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			if (self.showText)
			{
				self.isTextSet = true;
				
				if (self.isMobile)
				{
					self.addThumbText();
				}
				else
				{
					thumb.addText(self.textHolderDO, self.textGradientDO, self.textDO);
				}
			}
		};

		this.loadThumbImageLeft = function()
		{
			if (self.countLoadedThumbsLeft < 0)
					return;
			
			self.imagePath = self.curDataListAr[self.countLoadedThumbsLeft].thumbPath;

			self.imageLeft = new Image();
			self.imageLeft.onerror = self.onImageLoadErrorHandler;
			self.imageLeft.onload = self.onImageLoadHandlerLeft;
			self.imageLeft.src = self.imagePath;
		};

		this.onImageLoadHandlerLeft = function(e)
		{
			var thumb = self.thumbsAr[self.countLoadedThumbsLeft];

			thumb.addImage(self.imageLeft);
			
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsLeft--;
			
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbImageLeft, 200);
		};
		
		this.loadThumbImageRight = function()
		{
			if (self.countLoadedThumbsRight > self.totalThumbs-1)
				return;
			
			self.imagePath = self.curDataListAr[self.countLoadedThumbsRight].thumbPath;

			self.imageRight = new Image();
			self.imageRight.onerror = self.onImageLoadErrorHandler;
			self.imageRight.onload = self.onImageLoadHandlerRight;
			self.imageRight.src = self.imagePath;
		};

		this.onImageLoadHandlerRight = function(e)
		{
			var thumb = self.thumbsAr[self.countLoadedThumbsRight];

			thumb.addImage(self.imageRight);

			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsRight++;
			
			self.loadWithDelayIdRight = setTimeout(self.loadThumbImageRight, 200);
		};

		this.onImageLoadErrorHandler = function(e)
		{
			if (!self || !self.data)
				return;

			var message = "Thumb can't be loaded, probably the path is incorrect <font color='#FFFFFF'>" + self.imagePath + "</font>";

			self.dispatchEvent(FWDU3DCarThumbsManager.LOAD_ERROR, {text : message});
		};
		
		this.loadHtmlContents = function()
		{
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{	
				self.setupIntro3D();
			}
			else
			{
				self.setupIntro2D();
			}
			
			self.countLoadedThumbsLeft = self.curId - 1;
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbHtmlContentLeft, 100);
			
			self.countLoadedThumbsRight = self.curId + 1;
			self.loadWithDelayIdRight = setTimeout(self.loadThumbHtmlContentRight, 100);
		};
		
		this.loadCenterHtmlContent = function()
		{
			var thumb = self.thumbsAr[self.curId];

			thumb.addHtmlContent();
			
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			if (self.showText)
			{
				self.isTextSet = true;
				
				if (self.isMobile)
				{
					self.addThumbText();
				}
				else
				{
					thumb.addText(self.textHolderDO, self.textGradientDO, self.textDO);
				}
			}
		};

		this.loadThumbHtmlContentLeft = function()
		{
			if (self.countLoadedThumbsLeft < 0)
					return;
			
			var thumb = self.thumbsAr[self.countLoadedThumbsLeft];

			thumb.addHtmlContent();
			
			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsLeft--;
			
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbHtmlContentLeft, 200);
		};

		this.loadThumbHtmlContentRight = function()
		{
			if (self.countLoadedThumbsRight > self.totalThumbs-1)
				return;
			
			var thumb = self.thumbsAr[self.countLoadedThumbsRight];

			thumb.addHtmlContent();

			if (FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsRight++;
			
			self.loadWithDelayIdRight = setTimeout(self.loadThumbHtmlContentRight, 200);
		};
		
		this.setupIntro3D = function()
		{
			var newX;
			var newY;
			var newZ;
			var newAlpha;
			
			var newAngleY;
			
			var delay;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				newX = -Math.floor(self.thumbWidth/2);
				newY = -Math.floor(self.thumbHeight/2);
				
				if (i != self.curId)
				{
					thumb.setX(Math.floor(newX));
					thumb.setY(Math.floor(newY));
				}
				
				newX = 0;
				newY = 0;
				newZ = 0;
				
				newAlpha = 1;

				newAngleY = 0;
				
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}
				
				thumb.carAngle = (pos / self.totalThumbs) * Math.PI * 2;
				
				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = self.carRadiusY * Math.sin(thumb.carAngle + Math.PI/2);
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;

				if (i != self.curId)
				{
					switch (self.topology)
					{
						case "ring":
							newAngleY = (pos / self.totalThumbs) * 360;
							break;
						case "star":
							newAngleY = (pos / self.totalThumbs) * 360 + 90;
							break;
						default:
							newAngleY = 0;
					}
					
					thumb.setAlpha(0);
				}

				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.floor(newY) - Math.floor(self.thumbHeight/2);
				
				thumb.setZ(Math.floor(newZ));
				thumb.newZ = Math.floor(newZ);
				
				newAlpha = 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2));
				
				delay = Math.abs(i - self.curId) * Math.floor(1000/(self.totalThumbs/2));
				
				FWDU3DCarModTweenMax.to(thumb, .8, {x:Math.floor(newX), y:Math.floor(newY), z:Math.floor(newZ), angleY:newAngleY, alpha:newAlpha, delay:delay/1000, ease:Quart.easeOut});
				
				self.thumbsHolderDO.addChild(thumb);
			}
			
			if (FWDU3DCarUtils.isIE || !FWDU3DCarUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.sortZ();
			}
			
			self.setIntroFinishedId = setTimeout(self.setIntroFinished, delay + 800);
			self.showControlsId = setTimeout(self.showControls, delay);
		};
		
		this.setupIntro2D = function()
		{
			var newX;
			var newY;
			var newZ;
			var newScale;
			var delay;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}
				
				thumb.carAngle = (pos / self.totalThumbs) * Math.PI * 2;
				
				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = 0;
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;
				
				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.floor(newY) - Math.floor(self.thumbHeight/2);
				
				newScale = self.focalLength / (self.focalLength - newZ);
				
				delay = Math.abs(i - self.curId) * Math.floor(1000/self.totalThumbs);
				
				thumb.newX = Math.floor(newX);
				thumb.newY = Math.floor(newY);
				thumb.newZ = Math.floor(newZ);
				
				thumb.newAlpha = 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2));
				
				thumb.showThumbIntro2D(newScale, delay/1000);	
				
				self.thumbsHolderDO.addChild(thumb);
			}
			
			self.sortZ();
			
			self.setIntroFinishedId = setTimeout(self.setIntroFinished, delay + 800);
			self.showControlsId = setTimeout(self.showControls, delay);
		};
		
		this.setIntroFinished = function()
		{
			self.introFinished = true;
			self.allowToSwitchCat = true;
			self.disableThumbClick = false;
			
			self.dispatchEvent(FWDU3DCarThumbsManager.THUMBS_INTRO_FINISH);
			
			if (self.isMobile)
			{
				self.setupMobileDrag();
			}
			
			if (FWDU3DCarUtils.isIE || !FWDU3DCarUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.zSortingId = setInterval(self.sortZ, 16);
			}
			
			if (self.data.autoplay)
			{
				if (self.slideshowButtonDO)
				{
					self.slideshowButtonDO.onClick();
					self.slideshowButtonDO.onMouseOut();
				}
			}
		};
		
		this.setThumbText = function()
		{
			self.isTextSet = true;
			
			if (self.isMobile)
			{
				self.addThumbText();
			}
			else
			{
				self.thumbsAr[self.curId].addText(self.textHolderDO, self.textGradientDO, self.textDO);
			}
		};
		
		this.gotoThumb = function()
		{
			if (!self.introFinished)
				return;

			if (self.showScrollbar && !self.scrollbarDO.isPressed)
			{
				self.scrollbarDO.gotoItem(self.curId, true);
			}

			if (self.isPlaying)
			{
				clearTimeout(self.slideshowTimeoutId);
				self.slideshowTimeoutId = setTimeout(self.startTimeAgain, self.data.transitionDelay);
				
				if (self.slideshowButtonDO.isCounting)
				{
					self.slideshowButtonDO.resetCounter();
				}
			}
			
			if (self.showText)
			{
				if (self.isTextSet)
				{
					self.isTextSet = false;
					
					if (self.isMobile)
					{
						self.removeThumbText();
					}
					else
					{
						 self.thumbsAr[self.prevCurId].removeText();
					}
					
					clearTimeout(self.textTimeoutId);
					self.textTimeoutId = setTimeout(self.setThumbText, 800);
				}
				else
				{
					clearTimeout(self.textTimeoutId);
					self.textTimeoutId = setTimeout(self.setThumbText, 800);
				}
			}
			
			self.prevCurId = self.curId;

			self.reorderCarousel();
			
			self.dispatchEvent(FWDU3DCarThumbsManager.THUMB_CHANGE, {id:self.curId});
		};
		
		this.normAngle = function(angle)
		{
			while (angle < 0)
				angle += 360;
			
			return angle;
		};
		
		this.reorderCarousel = function()
		{
			var moveAmount;
			var angleToAdd = self.normAngle(self.thumbsAr[self.curId].carAngle * (180 / Math.PI)) % 360;
			
			if ((angleToAdd >= 0) && (angleToAdd <= 180))
			{
				moveAmount = -angleToAdd;
			}
			else if (angleToAdd > 180)
			{
				moveAmount = 360 - angleToAdd;
			}
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				var tempAngle = thumb.carAngle + moveAmount * (Math.PI / 180);
				
				var newAngleY = 0;
				var curAngle;
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}

				if (i != self.curId)
				{
					switch (self.topology)
					{
						case "ring":
							newAngleY = (pos / self.totalThumbs) * 360;
							break;
						case "star":
							newAngleY = (pos / self.totalThumbs) * 360 + 90;
							break;
						default:
							newAngleY = 0;
					}
				}
				
				newAngleY = Math.round(newAngleY) % 360;
				curAngle = self.normAngle(Math.round(thumb.getAngleY())) % 360;
				
				if (Math.abs(curAngle - newAngleY) > 180)
				{
					if (curAngle > newAngleY)
					{
						curAngle -= 360;
					}
					else
					{
						newAngleY -= 360;
					}
				}
				
				thumb.setAngleY(curAngle);
				
				FWDU3DCarModTweenMax.killTweensOf(thumb);
				FWDU3DCarModTweenMax.to(thumb, .8, {carAngle:tempAngle, angleY:newAngleY, ease:Quart.easeOut, onUpdate:self.updateCarousel});
			}
		};
		
		this.updateCarousel = function()
		{
			var newX;
			var newY;
			var newZ;
			var newScale;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];

				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = self.carRadiusY * Math.sin(thumb.carAngle + Math.PI/2);
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;
				
				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.round(newY) - Math.floor(self.thumbHeight/2);
				
				if (!FWDU3DCarUtils.isIEAndLessThen10 && FWDU3DCarUtils.hasTransform3d && !self.data.showDisplay2DAlways)
				{
					thumb.setX(Math.floor(newX));
					thumb.setY(Math.floor(newY));
					thumb.setZ(Math.floor(newZ));
					
					thumb.setAlpha(1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2)));
				}
				else
				{
					newScale = self.focalLength / (self.focalLength - newZ);
					
					thumb.newX = Math.floor(newX);
					thumb.newY = Math.floor(newY);
					
					thumb.setScale(newScale, 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2)));
				}
				
				thumb.newZ = Math.floor(newZ);
			}
		};
		
		this.sortZ = function()
		{
			var zIndex;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				zIndex = Math.floor(thumb.newZ);
				
				thumb.setZIndex(zIndex + Math.floor(self.carRadiusX * 2) + 1);
			}
		};
		
		this.setupControls = function()
		{
			self.controlsDO = new FWDU3DCarDisplayObject3D("div");
			self.addChild(self.controlsDO);
			
			self.controlsDO.setZ(200000);
			
			self.controlsWidth = self.data.prevButtonNImg.width;
			
			if (self.showScrollbar)
			{
				self.setupScrollbar();
			}
			
			if (self.showPrevButton)
			{
				self.setupPrevButton();
			}
			
			if (self.showNextButton)
			{
				self.setupNextButton();
			}
			
			if (data.showSlideshowButton)
			{
				self.setupSlideshowButton();
			}
			
			if (self.data.enableMouseWheelScroll)
			{
				self.addMouseWheelSupport();
			}
			
			if (self.data.addKeyboardSupport)
			{
				self.addKeyboardSupport();
			}

			if (self.showScrollbar)
			{
				self.controlsWidth -= self.scrollbarDO.getWidth();
				self.scrollbarDO.scrollbarMaxWidth -=  self.controlsWidth;
				self.scrollbarDO.resize2();
				self.scrollbarDO.resize(self.stageWidth, self.controlsWidth);
				
				var newX = self.scrollbarDO.getX() + self.scrollbarDO.getWidth();

				if (self.showNextButton)
				{
					self.nextButtonDO.setX(newX);
					
					newX += self.nextButtonDO.getWidth();
				}
				
				if (data.showSlideshowButton)
				{
					self.slideshowButtonDO.setX(newX);
				}
			}
			
			if (self.showScrollbar)
			{
				self.controlsDO.setX(Math.floor((self.stageWidth - (self.controlsWidth + self.scrollbarDO.getWidth()))/2));
				self.controlsDO.setWidth(self.controlsWidth + self.scrollbarDO.getWidth());
			}
			else
			{
				self.controlsDO.setX(Math.floor((self.stageWidth - self.controlsWidth)/2));
				self.controlsDO.setWidth(self.controlsWidth);
			}
			
			if (self.data.controlsPos)
			{
				self.controlsDO.setY(-self.controlsHeight);
			}
			else
			{
				self.controlsDO.setY(self.stageHeight);
			}
			
			self.controlsDO.setHeight(self.data.prevButtonNImg.height);
		};
		
		this.showControls = function()
		{
			if (self.data.controlsPos)
			{
				FWDU3DCarModTweenMax.to(self.controlsDO, .8, {y:0, ease : Expo.easeOut});
			}
			else
			{
				FWDU3DCarModTweenMax.to(self.controlsDO, .8, {y:self.stageHeight - self.controlsHeight, ease : Expo.easeOut});
			}
		};
		
		this.positionControls = function()
		{
			if (self.showScrollbar)
			{
				self.scrollbarDO.resize(self.stageWidth, self.controlsWidth);
				
				var newX = self.scrollbarDO.getX() + self.scrollbarDO.getWidth();

				if (self.showNextButton)
				{
					self.nextButtonDO.setX(newX);
					
					newX += self.nextButtonDO.getWidth();
				}
				
				if (data.showSlideshowButton)
				{
					self.slideshowButtonDO.setX(newX);
				}
			}

			if (self.showScrollbar)
			{
				self.controlsDO.setX(Math.floor((self.stageWidth - (self.controlsWidth + self.scrollbarDO.getWidth()))/2));
				self.controlsDO.setWidth(self.controlsWidth + self.scrollbarDO.getWidth());
			}
			else
			{
				self.controlsDO.setX(Math.floor((self.stageWidth - self.controlsWidth)/2));
				self.controlsDO.setWidth(self.controlsWidth);
			}
			
			if (!self.data.controlsPos)
			{
				self.controlsDO.setY(self.stageHeight - self.controlsHeight);
			}
		};
		
		this.setupPrevButton = function()
		{
			FWDU3DCarSimpleButton.setPrototype();
			
			self.prevButtonDO = new FWDU3DCarSimpleButton(self.data.prevButtonNImg, self.data.prevButtonSImg);
			self.prevButtonDO.addListener(FWDU3DCarSimpleButton.CLICK, self.prevButtonOnClickHandler);
			self.controlsDO.addChild(self.prevButtonDO);
		};
		
		this.prevButtonOnClickHandler = function()
		{
			if (self.curId > 0)
			{
				self.curId--;
			}
			else
			{
				self.curId = self.totalThumbs-1;
			}
			
			self.gotoThumb();
		};
		
		this.setupNextButton = function()
		{
			FWDU3DCarSimpleButton.setPrototype();
			
			self.nextButtonDO = new FWDU3DCarSimpleButton(self.data.nextButtonNImg, self.data.nextButtonSImg);
			self.nextButtonDO.addListener(FWDU3DCarSimpleButton.CLICK, self.nextButtonOnClickHandler);
			self.controlsDO.addChild(self.nextButtonDO);
			
			self.nextButtonDO.setX(self.controlsWidth);
			self.controlsWidth += self.nextButtonDO.getWidth();
		};
		
		this.nextButtonOnClickHandler = function()
		{
			if (self.curId < self.totalThumbs-1)
			{
				self.curId++;
			}
			else
			{
				self.curId = 0;
			}
			
			self.gotoThumb();
		};
		
		this.setupSlideshowButton = function()
		{
			FWDU3DCarSlideshowButton.setPrototype();
			
			self.slideshowButtonDO = new FWDU3DCarSlideshowButton(self.data);
			self.slideshowButtonDO.addListener(FWDU3DCarSlideshowButton.PLAY_CLICK, self.onSlideshowButtonPlayClickHandler);
			self.slideshowButtonDO.addListener(FWDU3DCarSlideshowButton.PAUSE_CLICK, self.onSlideshowButtonPauseClickHandler);
			self.slideshowButtonDO.addListener(FWDU3DCarSlideshowButton.TIME, self.onSlideshowButtonTime);
			self.controlsDO.addChild(self.slideshowButtonDO);
			
			self.slideshowButtonDO.setX(self.controlsWidth);
			self.controlsWidth += self.slideshowButtonDO.getWidth();
		};
		
		this.onSlideshowButtonPlayClickHandler = function()
		{
			self.isPlaying = true;
		};
		
		this.onSlideshowButtonPauseClickHandler = function()
		{
			self.isPlaying = false;
			clearTimeout(self.slideshowTimeoutId);
		};
		
		this.startSlideshow = function()
		{
			if (!self.isPlaying)
			{
				self.isPlaying = true;
				
				self.slideshowButtonDO.start();
				self.slideshowButtonDO.onMouseOut();
			}
		};
		
		this.stopSlideshow = function()
		{
			if (self.isPlaying)
			{
				self.isPlaying = false;
				clearTimeout(self.slideshowTimeoutId);
				
				self.slideshowButtonDO.stop();
				self.slideshowButtonDO.onMouseOut();
			}
		};
		
		this.onSlideshowButtonTime = function()
		{
			if (self.curId == self.totalThumbs-1)
			{
				self.curId = 0;
			}
			else
			{
				self.curId++;
			}
			
			self.gotoThumb();
		};
		
		this.startTimeAgain = function()
		{
			self.slideshowButtonDO.start();
		};

		this.setupScrollbar = function()
		{
			FWDU3DCarScrollbar.setPrototype();
			
			self.scrollbarDO = new FWDU3DCarScrollbar(self.data, self.totalThumbs, self.curId);
			self.scrollbarDO.addListener(FWDU3DCarScrollbar.MOVE, self.onScrollbarMove);
			self.controlsDO.addChild(self.scrollbarDO);
			
			self.scrollbarDO.setX(self.controlsWidth);
			self.controlsWidth += self.scrollbarDO.getWidth();
		};
		
		this.onScrollbarMove = function(e)
		{
			self.curId = e.id;
			self.gotoThumb();
		};
		
		this.addMouseWheelSupport = function()
		{
			if (window.addEventListener)
			{
				self.parent.mainDO.screen.addEventListener("mousewheel", self.mouseWheelHandler);
				self.parent.mainDO.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
			}
			else if (document.attachEvent)
			{
				self.parent.mainDO.screen.attachEvent("onmousewheel", self.mouseWheelHandler);
			}
		};
		
		this.mouseWheelHandler = function(e)
		{
			if (!self.introFinished || !self.allowToSwitchCat)
				return;
				
			if (self.showScrollbar && self.scrollbarDO.isPressed)
				return;
			
			var dir = e.detail || e.wheelDelta;	
			
			if (e.wheelDelta)
				dir *= -1;
			
			if (dir > 0)
			{	
				if (self.curId < self.totalThumbs-1)
				{
					self.curId++;
				}
				else
				{
					self.curId = 0;
				}
			}
			else if (dir < 0)
			{
				if (self.curId > 0)
				{
					self.curId--;
				}
				else
				{
					self.curId = self.totalThumbs-1;
				}
			}
			
			self.gotoThumb();
			
			if (e.preventDefault)
			{
				e.preventDefault();
			}
			else
			{
				return false;
			}
		};
		
		//##########################################//
		/* setup mobile drag */
		//##########################################//
		this.setupMobileDrag = function()
		{
			if (self.hasPointerEvent)
			{
				self.parent.mainDO.screen.addEventListener("MSPointerDown", self.mobileDragStartHandler);
			}
			else
			{
				self.parent.mainDO.screen.addEventListener("touchstart", self.mobileDragStartTest);
			}
		};
		
		this.mobileDragStartTest = function(e)
		{
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);	
			
			if (viewportMouseCoordinates.screenY > self.controlsDO.getY())
				return;
			
			self.lastPressedX = viewportMouseCoordinates.screenX;
			self.lastPressedY = viewportMouseCoordinates.screenY;
			
			self.dragCurId = self.curId;
			
			window.addEventListener("touchmove", self.mobileDragMoveTest);
			window.addEventListener("touchend", self.mobileDragEndTest);
		};
		
		this.mobileDragMoveTest = function(e)
		{
			if (e.touches.length != 1) return;
			
			self.disableThumbClick = true;
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);	
			
			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			var angle = Math.atan2(self.mouseY - self.lastPressedY, self.mouseX - self.lastPressedX);
			var posAngle = Math.abs(angle) * 180 / Math.PI;
			
			if ((posAngle > 120) || (posAngle < 60))
			{
				if(e.preventDefault) e.preventDefault();
				
				self.curId = self.dragCurId + Math.floor(-(self.mouseX - self.lastPressedX) / 100);
				
				if (self.curId < 0)
				{
					self.curId = self.totalThumbs-1;
				}
				else if (self.curId > self.totalThumbs-1)
				{
					self.curId = 0;
				}
				
				self.gotoThumb();
			}
			else
			{
				window.removeEventListener("touchmove", self.mobileDragMoveTest);
			}
		};
		
		this.mobileDragEndTest = function(e)
		{
			self.disableThumbClick = false;
			
			window.removeEventListener("touchmove", self.mobileDragMoveTest);
			window.removeEventListener("touchend", self.mobileDragEndTest);
		};
		
		this.mobileDragStartHandler = function(e)
		{
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);		
			
			if (viewportMouseCoordinates.screenY > self.controlsDO.getY())
				return;

			self.lastPressedX = viewportMouseCoordinates.screenX;	
			
			self.dragCurId = self.curId;

			window.addEventListener("MSPointerUp", self.mobileDragEndHandler, false);
			window.addEventListener("MSPointerMove", self.mobileDragMoveHandler);
		};
		
		this.mobileDragMoveHandler = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			self.disableThumbClick = true;
			
			var viewportMouseCoordinates = FWDU3DCarUtils.getViewportMouseCoordinates(e);	
			
			self.mouseX = viewportMouseCoordinates.screenX;;
			
			self.curId = self.dragCurId + Math.floor(-(self.mouseX - self.lastPressedX) / 100);
			
			if (self.curId < 0)
			{
				self.curId = 0;
			}
			else if (self.curId > self.totalThumbs-1)
			{
				self.curId = self.totalThumbs-1;
			}
			
			self.gotoThumb();
		};

		this.mobileDragEndHandler = function(e)
		{
			self.disableThumbClick = false;
			
			window.removeEventListener("MSPointerUp", self.mobileDragEndHandler);
			window.removeEventListener("MSPointerMove", self.mobileDragMoveHandler);
		};
		
		//####################################//
		/* add keyboard support */
		//####################################//
		this.addKeyboardSupport = function()
		{
			if(document.addEventListener){
				document.addEventListener("keydown",  this.onKeyDownHandler);	
				document.addEventListener("keyup",  this.onKeyUpHandler);	
			}else{
				document.attachEvent("onkeydown",  this.onKeyDownHandler);	
				document.attachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.onKeyDownHandler = function(e)
		{
			if (!self.introFinished || !self.allowToSwitchCat)
				return;
				
			if (self.showScrollbar && self.scrollbarDO.isPressed)
				return;
				
			if (parent.lightboxDO && parent.lightboxDO.isShowed_bl)
				return;
				
			if(document.removeEventListener){
				document.removeEventListener("keydown",  self.onKeyDownHandler);
			}else{
				document.detachEvent("onkeydown",  self.onKeyDownHandler);
			}
				
			if (e.keyCode == 39)
			{	
				if (self.curId < self.totalThumbs-1)
				{
					self.curId++;
				}
				else
				{
					self.curId = 0;
				}
				
				self.gotoThumb();
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}
			else if (e.keyCode == 37)
			{
				if (self.curId > 0)
				{
					self.curId--;
				}
				else
				{
					self.curId = self.totalThumbs-1;
				}
					
				self.gotoThumb();
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}
		};
		
		this.onKeyUpHandler = function(e)
		{
			if(document.addEventListener){
				document.addEventListener("keydown",  self.onKeyDownHandler);	
			}else{
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
			}
		};
		
		this.update = function(e)
		{	
			var newCarRadX = e.carRadiusX;
			
			if (FWDU3DCarUtils.isIEAndLessThen10)
			{
				newCarRadX /= 1.5;
			}
			
			FWDU3DCarModTweenMax.to(self, .8, {carRadiusX:newCarRadX, ease:Quart.easeOut});
			FWDU3DCarModTweenMax.to(self, .8, {carRadiusY:e.carRadiusY, ease:Quart.easeOut});
			
			self.carYOffset = e.carYOffset;
			
			self.carouselXRot = e.carouselXRot;
			self.thumbMinAlpha = e.thumbMinAlpha;
			self.topology = self.topologiesAr[e.carouselTopology];
			
			self.showRefl = e.showRefl;
			self.reflDist = e.reflDist;
			
			self.showCenterImg = e.showCenterImg;
			
			if (self.showCenterImg && !self.centerImgDO)
			{
				self.setupCenterImg();
			}
			
			if (self.centerImgDO)
			{
				if (self.showCenterImg)
				{
					self.centerImgDO.setAlpha(1);
				}
				else
				{
					self.centerImgDO.setAlpha(0);
				}
			}
			
			var newY;
			
			if (self.data.controlsPos)
			{
				newY = Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2 + self.controlsHeight + self.carYOffset);
			}
			else
			{
				newY = Math.floor((self.stageHeight - self.data.prevButtonNImg.height)/2) + self.carYOffset;
			}
			
			FWDU3DCarModTweenMax.to(self.thumbsHolderDO, .8, {y:newY, angleX:-self.carouselXRot, ease:Quart.easeOut});
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				self.thumbsAr[i].update();
			}
			
			self.gotoThumb();
		};
		
		/* destroy */
		this.destroy = function()
		{
			clearTimeout(self.loadWithDelayIdLeft);
			clearTimeout(self.loadWithDelayIdRight);
			clearTimeout(self.slideshowTimeoutId);
			clearTimeout(self.textTimeoutId);
			clearInterval(self.zSortingId);
			clearTimeout(self.hideThumbsFinishedId);
			clearTimeout(self.loadHtmlContentsId);
			clearTimeout(self.loadImagesId);
			clearTimeout(self.setTextHeightId);
			clearTimeout(self.setIntroFinishedId);
			clearTimeout(self.showControlsId);
			
			if (!self.isMobile)
			{
				if (self.screen.addEventListener)
				{
					window.removeEventListener("mousemove", self.onThumbMove);
				}
				else
				{
					document.detachEvent("onmousemove", self.onThumbMove);
				}
			}
			
			if (self.hasPointerEvent)
			{
				window.removeEventListener("MSPointerMove", self.onThumbMove);
			}
			
			if (self.hasPointerEvent)
			{
				self.parent.mainDO.screen.removeEventListener("MSPointerDown", self.mobileDragStartHandler);
				window.removeEventListener("MSPointerUp", self.mobileDragEndHandler);
				window.removeEventListener("MSPointerMove", self.mobileDragMoveHandler);
			}
			else
			{
				if (window.addEventListener)
				{
					self.parent.mainDO.screen.removeEventListener("touchstart", self.mobileDragStartTest);
					window.removeEventListener("touchmove", self.mobileDragMoveTest);
					window.removeEventListener("touchend", self.mobileDragEndTest);
				}
			}
			
			if (window.addEventListener)
			{
				self.parent.mainDO.screen.removeEventListener("mousewheel", self.mouseWheelHandler);
				self.parent.mainDO.screen.removeEventListener('DOMMouseScroll', self.mouseWheelHandler);
			}
			else if (document.attachEvent)
			{
				self.parent.mainDO.screen.detachEvent("onmousewheel", self.mouseWheelHandler);
			}
			
			if (self.addKeyboardSupport)
			{
				if(document.removeEventListener){
					document.removeEventListener("keydown",  this.onKeyDownHandler);	
					document.removeEventListener("keyup",  this.onKeyUpHandler);	
				}else if(document.attachEvent){
					document.detachEvent("onkeydown",  this.onKeyDownHandler);	
					document.detachEvent("onkeyup",  this.onKeyUpHandler);	
				}
			}
			
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
				self.image.src = "";
			}

			if (self.imageLeft)
			{
				self.imageLeft.onload = null;
				self.imageLeft.onerror = null;
				self.imageLeft.src = "";
			}
			
			if (self.imageRight)
			{
				self.imageRight.onload = null;
				self.imageRight.onerror = null;
				self.imageRight.src = "";
			}
			
			self.image = null;
			self.imageLeft = null;
			self.imageRight = null;

			/* destroy thumbs */
			for (var i=0; i<self.totalThumbs; i++)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.thumbsAr[i]);
				self.thumbsAr[i].destroy();
				self.thumbsAr[i] = null;
			};

			self.thumbsAr = null;
			
			if (self.prevButtonDO)
			{
				self.prevButtonDO.destroy();
				self.prevButtonDO = null;
			}
			
			if (self.nextButtonDO)
			{
				self.nextButtonDO.destroy();
				self.nextButtonDO = null;
			}
			
			if (self.scrollbarDO)
			{
				self.scrollbarDO.destroy();
				self.scrollbarDO = null;
			}
			
			if (self.slideshowButtonDO)
			{
				self.slideshowButtonDO.destroy();
				self.slideshowButtonDO = null;
			}	
			
			if (self.textGradientDO && self.textGradientDO.screen)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textGradientDO);
				self.textGradientDO.destroy();
				self.textGradientDO = null;
			}
			
			if (self.textDO && self.textDO.screen)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textDO);
				self.textDO.destroy();
				self.textDO = null;
			}
			
			if (self.textHolderDO && self.textHolderDO.screen)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.textHolderDO);
				self.textHolderDO.destroy();
				self.textHolderDO = null;
			}
			
			if (self.thumbOverDO)
			{
				self.thumbOverDO.destroy();
				self.thumbOverDO = null;
			}

			if (self.thumbsHolderDO)
			{
				self.thumbsHolderDO.destroy();
				self.thumbsHolderDO = null;
			}
			
			if (self.controlsDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.controlsDO);
				self.controlsDO.destroy();
				self.controlsDO = null;
			}
			
			self.screen.innerHTML = "";
			self = null;
			prototype.destroy();
			prototype = null;
			FWDU3DCarThumbsManager.prototype = null;
		};
		
		this.init();
	};

	/* set prototype */
	FWDU3DCarThumbsManager.setPrototype = function()
	{
		FWDU3DCarThumbsManager.prototype = new FWDU3DCarDisplayObject3D("div", "relative", "visible");
	};
	
	FWDU3DCarThumbsManager.THUMB_CLICK = "onThumbClick";
	FWDU3DCarThumbsManager.LOAD_ERROR = "onLoadError";
	FWDU3DCarThumbsManager.THUMBS_INTRO_FINISH = "onThumbsIntroFinish";
	FWDU3DCarThumbsManager.THUMB_CHANGE = "onThumbChange";

	window.FWDU3DCarThumbsManager = FWDU3DCarThumbsManager;

}(window));/* Slide show time manager */
(function(window){
	
	var FWDU3DCarTimerManager = function(delay, autoplay){
		
		var self = this;
		var prototpype = FWDU3DCarTimerManager.prototype;
		
		this.timeOutId;
		this.delay = delay;
		this.isStopped_bl = !autoplay;
		
		this.stop = function(){
			clearTimeout(this.timeOutId);
			this.dispatchEvent(FWDU3DCarTimerManager.STOP);
		};
		
		this.start = function(){
			if(!this.isStopped_bl){
				this.timeOutId = setTimeout(this.onTimeHanlder, this.delay);
				this.dispatchEvent(FWDU3DCarTimerManager.START);
			}
		};
		
		this.onTimeHanlder = function(){
			self.dispatchEvent(FWDU3DCarTimerManager.TIME);
		};
		
		/* destroy */
		this.destroy = function(){
			
			clearTimeout(this.timeOutId);
			
			prototpype.destroy();
			self = null;
			prototpype = null;
			FWDU3DCarTimerManager.prototype = null;
		};
	};

	FWDU3DCarTimerManager.setProtptype = function(){
		FWDU3DCarTimerManager.prototype = new FWDU3DCarEventDispatcher();
	};
	
	FWDU3DCarTimerManager.START = "start";
	FWDU3DCarTimerManager.STOP = "stop";
	FWDU3DCarTimerManager.TIME = "time";
	
	FWDU3DCarTimerManager.prototype = null;
	window.FWDU3DCarTimerManager = FWDU3DCarTimerManager;
	
}(window));//FWDU3DCarUtils
(function (window){
	
	var FWDU3DCarUtils = function(){};
	
	FWDU3DCarUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDU3DCarUtils.trim = function(str){
		if (str)
		{
			return str.replace(/\s/g, "");
		}
		else
		{
			return undefined;
		}
	};
			
	FWDU3DCarUtils.trimAndFormatUrl = function(str){
		str = str.toLocaleLowerCase();
		str = str.replace(/ /g, "-");
		str = str.replace(/ä/g, "a");
		str = str.replace(/â/g, "a");
		str = str.replace(/â/g, "a");
		str = str.replace(/à/g, "a");
		str = str.replace(/è/g, "e");
		str = str.replace(/é/g, "e");
		str = str.replace(/ë/g, "e");
		str = str.replace(/ï/g, "i");
		str = str.replace(/î/g, "i");
		str = str.replace(/ù/g, "u");
		str = str.replace(/ô/g, "o");
		str = str.replace(/ù/g, "u");
		str = str.replace(/û/g, "u");
		str = str.replace(/ÿ/g, "y");
		str = str.replace(/ç/g, "c");
		str = str.replace(/œ/g, "ce");
		return str;
	};
	
	FWDU3DCarUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDU3DCarUtils.trim(array[i]);
		};
		return array;
	};

	//#############################################//
	//Array //
	//#############################################//
	FWDU3DCarUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDU3DCarUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDU3DCarUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDU3DCarUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDU3DCarUtils.getChildAt = function (e, n){
		var kids = FWDU3DCarUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDU3DCarUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDU3DCarUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDU3DCarUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDU3DCarUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDU3DCarUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDU3DCarUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDU3DCarUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDU3DCarUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDU3DCarUtils.getAttributeValue = function(e, attr){
		if(!FWDU3DCarUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDU3DCarUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.attributes[attr];
			return  test ? true : false;
		}
	};
	
	FWDU3DCarUtils.insertNodeAt = function(parent, child, n){
		var children = FWDU3DCarUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDU3DCarUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDU3DCarUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return true;
		return false;
	};
	
	FWDU3DCarUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDU3DCarUtils.getViewportSize = function(){
		if(FWDU3DCarUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDU3DCarUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDU3DCarUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDU3DCarUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.changedTouches[0] == undefined ? e.changedTouches.pageX - offsets.x :e.changedTouches[0].pageX - offsets.x,
				screenY:e.changedTouches[0] == undefined ? e.changedTouches.pageY - offsets.y :e.changedTouches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDU3DCarUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled);
	}());
	
	FWDU3DCarUtils.isMobile = (function (){
		if(FWDU3DCarUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i].toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    return false;
	}());
	
	FWDU3DCarUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDU3DCarUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDU3DCarUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDU3DCarUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDU3DCarUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDU3DCarUtils.isIE = (function(){
		var isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1;
		return Boolean(isIE || document.documentElement.msRequestFullscreen);
	}());
	
	FWDU3DCarUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDU3DCarUtils.isIEAndLessThen10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());

	FWDU3DCarUtils.isIEAndMoreThen8 = (function(){
		return FWDU3DCarUtils.isIE9 || FWDU3DCarUtils.isIE10 || FWDU3DCarUtils.isIE11;
	}());
	
	FWDU3DCarUtils.isIE7 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
	}());
	
	FWDU3DCarUtils.isIE8 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());

	FWDU3DCarUtils.isIE9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());
	
	FWDU3DCarUtils.isIE10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 10") != -1;
	}());
	
	FWDU3DCarUtils.isIE11 = (function(){
		var isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1;
		return Boolean(!isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDU3DCarUtils.isIEAndMoreThen9 = (function(){
		return FWDU3DCarUtils.isIE10 || FWDU3DCarUtils.isIE11;
	}());
	
	FWDU3DCarUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;;
	}());
	
	FWDU3DCarUtils.isAndroidAndWebkit = (function(){
		return  (FWDU3DCarUtils.isOpera || FWDU3DCarUtils.isChrome) && FWDU3DCarUtils.isAndroid;
	}());
	
	FWDU3DCarUtils.hasFullScreen = (function(){
		return FWDU3DCarUtils.dumy.requestFullScreen || FWDU3DCarUtils.dumy.mozRequestFullScreen || FWDU3DCarUtils.dumy.webkitRequestFullScreen || FWDU3DCarUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDU3DCarUtils.dumy.style[p] !== 'undefined') {
	    	   FWDU3DCarUtils.dumy.style.position = "absolute";
	    	   position = FWDU3DCarUtils.dumy.getBoundingClientRect().left;
	    	   FWDU3DCarUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDU3DCarUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDU3DCarUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDU3DCarUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDU3DCarUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDU3DCarUtils.dumy);}catch(e){}
	    return false;
	};
	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDU3DCarUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				FWDU3DCarUtils.checkIfHasTransofrms();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				FWDU3DCarUtils.checkIfHasTransofrms();
				if (document.readyState == "complete") callbalk();
			};
		 }
		
	};
	
	FWDU3DCarUtils.checkIfHasTransofrms = function()
	{
		if (FWDU3DCarUtils.isReadyMethodCalled_bl)
			return;
		
		document.documentElement.appendChild(FWDU3DCarUtils.dumy);
		FWDU3DCarUtils.hasTransform3d = get3d();
		FWDU3DCarUtils.hasTransform2d = get2d();
		
		FWDU3DCarUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDU3DCarUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDU3DCarUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDU3DCarUtils.validateEmail = function(mail){  
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
			return true;  
		}  
		return false;  
    }; 
    
	//################################//
	/* resize utils */
	//################################//
	FWDU3DCarUtils.resizeDoWithLimit = function(
			displayObject,
			containerWidth,
			containerHeight,
			doWidth,
			doHeight,
			removeWidthOffset,
			removeHeightOffset,
			offsetX,
			offsetY,
			animate,
			pDuration,
			pDelay,
			pEase
		) {
		var containerWidth = containerWidth - removeWidthOffset;
		var containerHeight = containerHeight - removeHeightOffset;
			
		var scaleX = containerWidth/doWidth;
		var scaleY = containerHeight/doHeight;
		var totalScale = 0;
				
		if(scaleX <= scaleY){
			totalScale = scaleX;
		}else if(scaleX >= scaleY){
			totalScale = scaleY;
		}
			
		var finalWidth = Math.round((doWidth * totalScale));
		var finalHeight = Math.round((doHeight * totalScale));
		var x = Math.floor((containerWidth -  (doWidth * totalScale))/2  + offsetX);
		var y = Math.floor((containerHeight -  (doHeight * totalScale))/2 + offsetY);
			
		if(animate){
			FWDU3DCarModTweenMax.to(displayObject, pDuration, {x:x, y:y, w:finalWidth, h:finalHeight, delay:pDelay, ease:pEase});
		}else{
			displayObject.x = x;
			displayObject.y = y;
			displayObject.w = finalWidth;
			displayObject.h = finalHeight;
		}
	};
	
	//#########################################//
	/* request animation frame */
	//########################################//
	window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame || 
	        window.oRequestAnimationFrame || 
	        window.msRequestAnimationFrame || 
	        function(/* function */ callback, /* DOMElement */ element){
	            return window.setTimeout(callback, 1000 / 60);
	        };
	})();
	
	window.cancelRequestAnimFrame = ( function() {
	    return window.cancelAnimationFrame ||
	        window.webkitCancelRequestAnimationFrame ||
	        window.mozCancelRequestAnimationFrame ||
	        window.oCancelRequestAnimationFrame ||
	        window.msCancelRequestAnimationFrame ||
	        clearTimeout;
	} )();
	
	FWDU3DCarUtils.isReadyMethodCalled_bl = false;
	
	window.FWDU3DCarUtils = FWDU3DCarUtils;
}(window));

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());/* 3DCoverflow */
(function(window)
{
	var FWDUltimate3DCarousel = function(props)
	{
		var self = this;
		
		this.mainDO;
		this.preloaderDO;
		this.customContextMenuDO;
		this.infoDO;
		this.thumbsManagerDO;
		this.bgDO;
		this.thumbsBgDO;
		this.scrollbarBgDO;
		this.comboBoxDO;
		this.disableDO;

		this.stageWidth;
		this.stageHeight;
		this.originalWidth;
		this.originalHeight;
		
		this.resizeHandlerId1;
		this.resizeHandlerId2;
		this.orientationChangeId;
		
		this.rect;
		
		this.listeners = {events_ar:[]};
		
		this.autoScale = false;
		this.doNotExceedOriginalSize = true;
		this.orientationChangeComplete = true;
		this.isFullScreen = false;
		this.preloaderLoaded = false;
		
		this.apiReady = false;

		this.isMobile = FWDU3DCarUtils.isMobile;

		/* init */
		this.init = function()
		{
			TweenLite.ticker.useRAF(false);
			
			self.propsObj = props;

			if (!self.propsObj)
			{
				alert("3DCoverflow properties object is undefined!");
				return;
			}
			
			if (!self.propsObj.displayType)
			{
				alert("Display type is not specified!");
				return;
			}
		
			self.displayType = props.displayType.toLowerCase();
			self.body = document.getElementsByTagName("body")[0];
			
			if (!self.propsObj.carouselHolderDivId)
			{
				alert("Property carouselHolderDivId is not defined in the FWDUltimate3DCarousel object constructor!");
				return;
			}
			
			if (!FWDU3DCarUtils.getChildById(self.propsObj.carouselHolderDivId))
			{
				alert("FWDUltimate3DCarousel holder div is not found, please make sure that the div exists and the id is correct! " + self.propsObj.carouselHolderDivId);
				return;
			}
			
			if (!self.propsObj.carouselWidth)
			{
				alert("The carousel width is not defined, plese make sure that the carouselWidth property is definded in the FWDUltimate3DCarousel constructor!");
				return;
			}
			
			if (!self.propsObj.carouselHeight)
			{
				alert("The carousel height is not defined, plese make sure that the carouselHeight property is definded in the FWDUltimate3DCarousel constructor!");
				return;
			}
		
			self.stageContainer = FWDU3DCarUtils.getChildById(self.propsObj.carouselHolderDivId);
			
			self.autoScale = self.propsObj.autoScale == "yes" ? true : false;
			
			self.originalWidth = self.propsObj.carouselWidth;
			self.originalHeight = self.propsObj.carouselHeight;
			
			self.setupMainDO();
			
			self.setupInfo();
			self.setupData();
			
			self.startResizeHandler();
		};

		// #############################################//
		/* setup main do */
		// #############################################//
		this.setupMainDO = function()
		{
			self.mainDO = new FWDU3DCarDisplayObject("div", "relative");
			self.mainDO.setSelectable(false);
			self.mainDO.setBkColor(self.propsObj.backgroundColor);
			
			self.mainDO.getStyle().msTouchAction = "none";

			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{	
				self.mainDO.getStyle().position = "absolute";
				
				if (FWDU3DCarUtils.isIE7)
				{
					self.body.appendChild(self.mainDO.screen);
				}
				else
				{
					document.documentElement.appendChild(self.mainDO.screen);
				}
			}
			else
			{
				self.stageContainer.appendChild(self.mainDO.screen);
			}
		};
		
		this.setBackgrounds = function()
		{
			if (self.propsObj.backgroundImagePath)
			{
				self.bgDO = new FWDU3DCarDisplayObject("div");
				self.mainDO.addChild(self.bgDO);
				
				self.bgDO.setWidth(self.originalWidth);
				self.bgDO.setHeight(self.originalHeight);
				
				self.bgDO.screen.style.backgroundImage = "url(" + self.propsObj.backgroundImagePath + ")";
				self.bgDO.screen.style.backgroundRepeat = self.propsObj.backgroundRepeat;
				
				self.bgDO.setAlpha(0);
				FWDU3DCarModTweenMax.to(self.bgDO, .8, {alpha:1});
			}

			if (self.propsObj.thumbnailsBackgroundImagePath)
			{
				self.thumbsBgDO = new FWDU3DCarDisplayObject("div");
				self.mainDO.addChild(self.thumbsBgDO);
				
				self.thumbsBgDO.setWidth(self.originalWidth);
				self.thumbsBgDO.setHeight(self.originalHeight - self.data.nextButtonNImg.height);
				
				self.thumbsBgDO.screen.style.backgroundImage = "url(" + self.propsObj.thumbnailsBackgroundImagePath + ")";
				self.thumbsBgDO.screen.style.backgroundRepeat = self.propsObj.backgroundRepeat;
				
				self.thumbsBgDO.setAlpha(0);
				FWDU3DCarModTweenMax.to(self.thumbsBgDO, .8, {alpha:1});
			}

			if (self.propsObj.scrollbarBackgroundImagePath)
			{
				self.scrollbarBgDO = new FWDU3DCarDisplayObject("div");
				self.mainDO.addChild(self.scrollbarBgDO);
				
				self.scrollbarBgDO.setWidth(self.originalWidth);
				self.scrollbarBgDO.setHeight(self.data.nextButtonNImg.height);
				
				self.scrollbarBgDO.screen.style.backgroundImage = "url(" + self.propsObj.scrollbarBackgroundImagePath + ")";
				self.scrollbarBgDO.screen.style.backgroundRepeat = self.propsObj.backgroundRepeat;
				
				self.scrollbarBgDO.setAlpha(0);
				FWDU3DCarModTweenMax.to(self.scrollbarBgDO, .8, {alpha:1});
			}
		};

		// #############################################//
		/* setup info */
		// #############################################//
		this.setupInfo = function()
		{
			FWDU3DCarInfo.setPrototype();
			self.infoDO = new FWDU3DCarInfo();
		};
		
		//#############################################//
		/* resize handler */
		//#############################################//
		this.startResizeHandler = function()
		{
			if (window.addEventListener)
			{
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onScrollHandler);
				window.addEventListener("orientationchange", self.orientationChange);
			}
			else if (window.attachEvent)
			{
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.onScrollHandler);
			}
			
			self.resizeHandlerId2 = setTimeout(self.resizeHandler, 50);
			
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{
				self.resizeHandlerId1 = setTimeout(self.resizeHandler, 800);
			}
		};
		
		this.onResizeHandler = function(e)
		{
			if (self.isMobile)
			{
				clearTimeout(self.resizeHandlerId2);
				self.resizeHandlerId2 = setTimeout(self.resizeHandler, 200);
			}
			else
			{
				self.resizeHandler();
			}	
		};
		
		this.onScrollHandler = function(e)
		{
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{
				self.scrollHandler();
			}
			
			self.rect = self.mainDO.screen.getBoundingClientRect();
		};
		
		this.orientationChange = function()
		{
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{
				self.orientationChangeComplete = false;
				
				clearTimeout(self.scrollEndId);
				clearTimeout(self.resizeHandlerId2);
				clearTimeout(self.orientationChangeId);
				
				self.orientationChangeId = setTimeout(function()
				{
					self.orientationChangeComplete = true; 
					self.resizeHandler();
				}, 1000);
				
				self.mainDO.setX(0);
				self.mainDO.setWidth(0);
			}
		};
		
		//##########################################//
		/* resize and scroll handler */
		//##########################################//
		this.scrollHandler = function()
		{
			if (!self.orientationChangeComplete)
				return;
			
			var scrollOffsets = FWDU3DCarUtils.getScrollOffsets();
		
			self.pageXOffset = scrollOffsets.x;
			self.pageYOffset = scrollOffsets.y;
			
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{	
				if (self.isMobile)
				{
					clearTimeout(self.scrollEndId);
					self.scrollEndId = setTimeout(self.resizeHandler, 200);		
				}
				else
				{
					self.mainDO.setX(self.pageXOffset);
				}
				
				self.mainDO.setY(Math.round(self.stageContainer.getBoundingClientRect().top + self.pageYOffset));
			}
		};
		
		this.resizeHandler = function()
		{
			if (!self.orientationChangeComplete)
				return;
			
			var scrollOffsets = FWDU3DCarUtils.getScrollOffsets();
			var viewportSize = FWDU3DCarUtils.getViewportSize();
			var scale;
			
			self.viewportWidth = parseInt(viewportSize.w);
			self.viewportHeight = parseInt(viewportSize.h);
			self.pageXOffset = parseInt(scrollOffsets.x);
			self.pageYOffset = parseInt(scrollOffsets.y);
			
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{
				self.stageWidth = viewportSize.w;
				self.stageHeight = viewportSize.h;
				
				if (self.autoScale)
				{
					scale = Math.min(self.stageWidth/self.originalWidth, 1);
					self.stageHeight = Math.max(parseInt(scale * self.originalHeight), self.propsObj.thumbnailHeight + 40);
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				else
				{
					self.stageHeight = self.originalHeight;
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				
				self.mainDO.setX(self.pageXOffset);
				self.mainDO.setY(Math.round(self.stageContainer.getBoundingClientRect().top + self.pageYOffset));
			}
			else if (self.displayType == FWDUltimate3DCarousel.AFTER_PARENT)
			{
				self.stageWidth = self.stageContainer.offsetWidth;	
				self.stageHeight = self.stageContainer.offsetHeight;
				
				self.mainDO.setX(0);
				self.mainDO.setY(0);
			}
			else
			{
				if (self.autoScale)
				{
					self.stageContainer.style.width = "100%";
					
					if (self.stageContainer.offsetWidth > self.originalWidth)
					{
						self.stageContainer.style.width = self.originalWidth + "px";
					}
					
					scale = self.stageContainer.offsetWidth/self.originalWidth;
					
					self.stageWidth = parseInt(scale * self.originalWidth);
					self.stageHeight = Math.max(parseInt(scale * self.originalHeight), self.propsObj.thumbnailHeight + 40);
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				else
				{
					self.stageContainer.style.width = "100%";
					
					if (self.stageContainer.offsetWidth > self.originalWidth)
					{
						self.stageContainer.style.width = self.originalWidth + "px";
					}
					
					self.stageWidth = self.stageContainer.offsetWidth;
					self.stageHeight = self.originalHeight;
					self.stageContainer.style.height = self.originalHeight + "px";
				}
				
				self.mainDO.setX(0);
				self.mainDO.setY(0);
			}
			
			self.mainDO.setWidth(self.stageWidth);
			self.mainDO.setHeight(self.stageHeight);
			
			self.rect = self.mainDO.screen.getBoundingClientRect();
		
			self.positionPreloader();
			
			if (self.thumbsManagerDO)
			{
				self.thumbsManagerDO.resizeHandler();
				
				if(!self.thumbsManagerDO.allowToSwitchCat)
				{
					self.disableDO.setWidth(self.stageWidth);
					self.disableDO.setHeight(self.stageHeight);
				}
			}
			
			if (self.preloaderLoaded)
			{
				if (self.propsObj.backgroundImagePath)
				{
					if (self.displayType == FWDUltimate3DCarousel.RESPONSIVE)
					{
						self.bgDO.setX(Math.floor((self.stageWidth - self.originalWidth)/2));
					}
					else
					{
						self.bgDO.setWidth(self.stageWidth);
					}
					
					self.bgDO.setY(Math.floor((self.stageHeight - self.originalHeight)/2));
				}
				
				if (self.propsObj.thumbnailsBackgroundImagePath)
				{
					if (self.displayType == FWDUltimate3DCarousel.RESPONSIVE)
					{
						self.thumbsBgDO.setX(Math.floor((self.stageWidth - self.originalWidth)/2));
					}
					else
					{
						self.thumbsBgDO.setWidth(self.stageWidth);
					}
					
					if (self.data.controlsPos)
					{
						self.thumbsBgDO.setY(Math.floor((self.stageHeight - self.originalHeight)/2 + self.data.nextButtonNImg.height));
					}
					else
					{
						self.thumbsBgDO.setY(Math.floor((self.stageHeight - self.originalHeight)/2));
					}
				}
				
				if (self.propsObj.scrollbarBackgroundImagePath)
				{
					if (self.displayType == FWDUltimate3DCarousel.RESPONSIVE)
					{
						self.scrollbarBgDO.setX(Math.floor((self.stageWidth - self.originalWidth)/2));
					}
					else
					{
						self.scrollbarBgDO.setWidth(self.stageWidth);
					}
						
					if (self.data.controlsPos)
					{
						self.scrollbarBgDO.setY(0);
					}
					else
					{
						self.scrollbarBgDO.setY(Math.floor(self.stageHeight - self.data.nextButtonNImg.height));
					}
				}
			}
			
			if (self.comboBoxDO)
			{
				self.comboBoxDO.position();
			}
		};

		// #############################################//
		/* setup context menu */
		// #############################################//
		this.setupContextMenu = function()
		{
			self.customContextMenuDO = new FWDU3DCarContextMenu(self.mainDO, self.data.showContextMenu);
		};

		// #############################################//
		/* setup data */
		// #############################################//
		this.setupData = function()
		{
			FWDU3DCarData.setPrototype();
			
			self.data = new FWDU3DCarData(self.propsObj);
			self.data.addListener(FWDU3DCarData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDU3DCarData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDU3DCarData.LOAD_DONE, self.dataLoadComplete);
		};

		this.onPreloaderLoadDone = function()
		{
			self.setBackgrounds();
			self.setupPreloader();
			self.positionPreloader();
			
			if (!self.isMobile)
			{
				self.setupContextMenu();
			}
			
			self.preloaderLoaded = true;
			self.resizeHandler();
		};

		this.dataLoadError = function(e, text)
		{
			self.mainDO.addChild(self.infoDO);
			self.infoDO.showText(e.text);
		};

		this.dataLoadComplete = function(e)
		{
			self.dispatchEvent(FWDUltimate3DCarousel.DATA_LOADED);
			
			if (self.data.showDisplay2DAlways)
			{
				FWDU3DCarUtils.hasTransform3d = false;
			}

			self.preloaderDO.hide(true);
			self.setupThumbsManager();
			
			if (self.data.showComboBox)
			{
				self.setupComboBox();
			}
			
			if (!self.data.enableHtmlContent)
			{
				self.setupLightBox();
			}
		
			self.setupDisable();
		};

		// #############################################//
		/* setup preloader */
		// #############################################//
		this.setupPreloader = function()
		{
			FWDU3DCarPreloader.setPrototype();
			
			self.preloaderDO = new FWDU3DCarPreloader(self.data.mainPreloaderImg, 70, 41, 13, 50);
			self.mainDO.addChild(self.preloaderDO);
			
			self.preloaderDO.show();
		};

		this.positionPreloader = function()
		{
			if (self.preloaderDO)
			{
				self.preloaderDO.setX(parseInt((self.stageWidth - self.preloaderDO.getWidth()) / 2));
				
				if (self.data.controlsPos)
				{
					self.preloaderDO.setY(parseInt((self.stageHeight - self.preloaderDO.getHeight() - self.data.nextButtonNImg.height) / 2 + self.data.nextButtonNImg.height) + 7);
				}
				else
				{
					self.preloaderDO.setY(parseInt((self.stageHeight - self.preloaderDO.getHeight() - self.data.nextButtonNImg.height) / 2) + 7);
				}
			}
		};

		// ###########################################//
		/* setup thumbs manager */
		// ###########################################//
		this.setupThumbsManager = function()
		{
			FWDU3DCarThumbsManager.setPrototype();
			
			self.thumbsManagerDO = new FWDU3DCarThumbsManager(self.data, self);
			self.thumbsManagerDO.addListener(FWDU3DCarThumbsManager.THUMB_CLICK, self.onThumbsManagerThumbClick);
			self.thumbsManagerDO.addListener(FWDU3DCarThumbsManager.LOAD_ERROR, self.onThumbsManagerLoadError);
			self.thumbsManagerDO.addListener(FWDU3DCarThumbsManager.THUMBS_INTRO_FINISH, self.onThumbsManagerIntroFinish);
			self.thumbsManagerDO.addListener(FWDU3DCarThumbsManager.THUMB_CHANGE, self.onThumbsManagerThumbChange);
			self.mainDO.addChild(self.thumbsManagerDO);
			
			if (self.stageWidth)
			{
				self.thumbsManagerDO.resizeHandler();
			}
		};
		
		this.onThumbsManagerThumbClick = function(e)
		{
			if (!self.data.enableHtmlContent)
			{
				if (!self.lightboxDO.isShowed_bl)
				{
					self.thumbsManagerDO.stopSlideshow();
					self.lightboxDO.show(e.id);
				}
			}
		};

		this.onThumbsManagerLoadError = function(e)
		{
			self.mainDO.addChild(self.infoDO);
			self.infoDO.showText(e.text);
		};
		
		this.onThumbsManagerIntroFinish = function()
		{
			self.enableAll();
			self.dispatchEvent(FWDUltimate3DCarousel.INTRO_FINISH);
			
			self.apiReady = true;
			self.dispatchEvent(FWDUltimate3DCarousel.IS_API_READY);
			
			self.dispatchEvent(FWDUltimate3DCarousel.CATEGORY_CHANGE, {id:self.thumbsManagerDO.dataListId});
		};
		
		this.onThumbsManagerThumbChange = function(e)
		{
			self.dispatchEvent(FWDUltimate3DCarousel.THUMB_CHANGE, {id:e.id});
		};
		
		this.update = function(e)
		{
			self.thumbsManagerDO.update(e);
		};
		
		//#############################################//
		/* setup combobox */
		//############################################//
		this.setupComboBox = function()
		{
			FWDU3DCarComboBox.setPrototype();
			
			self.comboBoxDO = new FWDU3DCarComboBox(self, 
			{
				arrowW:self.data.comboboxArrowIconN_img.width,
				arrowH:self.data.comboboxArrowIconN_img.height,
				arrowN_str:self.data.comboboxArrowIconN_str,
				arrowS_str:self.data.comboboxArrowIconS_str,
				categories_ar:self.data.categoriesAr,
				selectorLabel:self.data.selectLabel,
				position:self.data.comboBoxPosition,
				startAtCategory:self.data.startAtCategory,
				comboBoxHorizontalMargins:self.data.comboBoxHorizontalMargins,
				comboBoxVerticalMargins:self.data.comboBoxVerticalMargins,
				comboBoxCornerRadius:self.data.comboBoxCornerRadius,
				selectorBackgroundNormalColor1:self.data.selectorBackgroundNormalColor1,
				selectorBackgroundSelectedColor1:self.data.selectorBackgroundSelectedColor1,
				selectorBackgroundNormalColor2:self.data.selectorBackgroundNormalColor2,
				selectorBackgroundSelectedColor2:self.data.selectorBackgroundSelectedColor2,
				selectorTextNormalColor:self.data.selectorTextNormalColor,
				selectorTextSelectedColor:self.data.selectorTextSelectedColor,
				buttonBackgroundNormalColor1:self.data.buttonBackgroundNormalColor1,
				buttonBackgroundSelectedColor1:self.data.buttonBackgroundSelectedColor1,
				buttonBackgroundNormalColor2:self.data.buttonBackgroundNormalColor2,
				buttonBackgroundSelectedColor2:self.data.buttonBackgroundSelectedColor2,
				buttonTextNormalColor:self.data.buttonTextNormalColor,
				buttonTextSelectedColor:self.data.buttonTextSelectedColor,
				shadowColor:self.data.comboBoxShadowColor
			});
			
			self.comboBoxDO.addListener(FWDU3DCarComboBox.BUTTON_PRESSED, self.onComboboxButtonPressHandler);
			self.mainDO.addChild(self.comboBoxDO);
		};
		
		this.onComboboxButtonPressHandler = function(e)
		{
			if (self.thumbsManagerDO.allowToSwitchCat)
			{
				self.disableAll();
				self.thumbsManagerDO.showCurrentCat(e.id);
				self.dispatchEvent(FWDUltimate3DCarousel.INTRO_START);
				
				if (!self.data.enableHtmlContent)
				{
					self.lightboxDO.updateData(self.data.lightboxAr[e.id]);
				}
				
				self.apiReady = false;
			}
		};
		
		//#############################################//
		/* setup lightbox */
		//#############################################//
		this.setupLightBox = function()
		{
			FWDU3DCarLightBox.setPrototype();
			
			this.lightboxDO = new FWDU3DCarLightBox(
			{
				//main data array
				data_ar:self.data.lightboxAr[self.data.startAtCategory],
				//skin
				lightboxPreloader_img:this.data.lightboxPreloader_img,
				slideShowPreloader_img:this.data.slideShowPreloader_img,
				closeN_img:this.data.lightboxCloseButtonN_img,
				closeS_img:this.data.lightboxCloseButtonS_img,
				nextN_img:this.data.lightboxNextButtonN_img,
				nextS_img:this.data.lightboxNextButtonS_img,
				prevN_img:this.data.lightboxPrevButtonN_img,
				prevS_img:this.data.lightboxPrevButtonS_img,
				maximizeN_img:this.data.lightboxMaximizeN_img,
				maximizeS_img:this.data.lightboxMaximizeS_img,
				minimizeN_img:this.data.lightboxMinimizeN_img,
				minimizeS_img:this.data.lightboxMinimizeS_img,
				infoOpenN_img:this.data.lightboxInfoOpenN_img,
				infoOpenS_img:this.data.lightboxInfoOpenS_img,
				infoCloseN_img:this.data.lightboxInfoCloseN_img,
				infoCloseS_img:this.data.lightboxInfoCloseS_img,
				playN_img:this.data.lightboxPlayN_img,
				playS_img:this.data.lightboxPlayS_img,
				pauseN_img:this.data.lightboxPauseN_img,
				pauseS_img:this.data.lightboxPauseS_img,
				//properties
				showContextMenu:self.data.showContextMenu,
				addKeyboardSupport_bl:self.data.addLightBoxKeyboardSupport_bl,
				showNextAndPrevButtons:self.data.showLighBoxNextAndPrevButtons_bl,
				showZoomButton:self.data.showLightBoxZoomButton_bl,
				showInfoButton:self.data.showLightBoxInfoButton_bl,
				showSlideshowButton:self.data.showLighBoxSlideShowButton_bl,
				slideShowAutoPlay:self.data.slideShowAutoPlay_bl,
				showInfoWindowByDefault:self.data.showInfoWindowByDefault_bl,
				lightBoxVideoAutoPlay:self.data.lightBoxVideoAutoPlay_bl,
				infoWindowBackgroundColor:self.data.lightBoxInfoWindowBackgroundColor_str,
				infoWindowBackgroundOpacity:self.data.lightBoxInfoWindowBackgroundOpacity,
				backgroundColor_str:self.data.lightBoxBackgroundColor_str,
				backgroundOpacity:self.data.lightBoxMainBackgroundOpacity,
				itemBackgroundColor_str:self.data.lightBoxItemBackgroundColor_str,
				borderColor_str1:self.data.lightBoxItemBorderColor_str1,
				borderColor_str2:self.data.lightBoxItemBorderColor_str2,
				borderSize:self.data.lightBoxBorderSize,
				borderRadius:self.data.lightBoxBorderRadius,
				slideShowDelay:self.data.lightBoxSlideShowDelay,
				videoWidth:self.data.lightBoxVideoWidth,
				videoHeight:self.data.lightBoxVideoHeight,
				iframeWidth:self.data.lightBoxIframeWidth,
				iframeHeight:self.data.lightBoxIframeHeight
			});
		};
		
		//##############################################//
		/* setup disable */
		//#############################################//
		this.setupDisable = function()
		{
			self.disableDO = new FWDU3DCarDisplayObject3D("div");
			
			self.disableDO.setZ(300000);
			
			if (FWDU3DCarUtils.isIE)
			{
				self.disableDO.setBkColor("#000000");
				self.disableDO.setAlpha(.001);
			}
			
			self.mainDO.addChild(self.disableDO);
			
			self.disableAll();
		};
		
		this.disableAll = function()
		{
			self.disableDO.setWidth(self.stageWidth);
			self.disableDO.setHeight(self.stageHeight);
		};
		
		this.enableAll = function()
		{
			self.disableDO.setWidth(0);
			self.disableDO.setHeight(0);
		};
		
		//#############################################//
		/* API functions */
		//#############################################//
		this.isAPIReady = function()
		{
			return self.apiReady;
		};
		
		this.getCurrentCategoryId = function()
		{
			if (self.apiReady)
			{
				return self.thumbsManagerDO.dataListId;
			}
		};
		
		this.switchCategory = function(id)
		{
			if (self.apiReady)
			{
				if ((id >= 0) && (id < self.data.dataListAr.length))
				{
					self.disableAll();
					self.thumbsManagerDO.showCurrentCat(id);
					self.dispatchEvent(FWDUltimate3DCarousel.INTRO_START);
					
					if (!self.data.enableHtmlContent && self.lightboxDO)
					{
						self.lightboxDO.updateData(self.data.lightboxAr[id]);
					}
					
					if (self.comboBoxDO)
					{
						self.comboBoxDO.setValue(id);
					}
					
					self.apiReady = false;
				}
			}
		};
		
		this.getCurrentThumbId = function()
		{
			if (self.apiReady)
			{
				return self.thumbsManagerDO.curId;
			}
		};
		
		this.gotoThumb = function(id)
		{
			if (self.apiReady)
			{
				if(id != self.thumbsManagerDO.curId)
				{
					if (id < 0)
					{
						id = self.thumbsManagerDO.totalThumbs-1;
					}
					
					if (id > self.thumbsManagerDO.totalThumbs-1)
					{
						id = 0;
					}
					
					self.thumbsManagerDO.curId = id;
					self.thumbsManagerDO.gotoThumb();
				}
			}
		};
		
		this.isSlideshowPlaying = function()
		{
			return self.thumbsManagerDO.isPlaying;
		};
		
		this.startSlideshow = function()
		{
			if (self.apiReady)
			{
				self.thumbsManagerDO.startSlideshow();
			}
		};
		
		this.stopSlideshow = function()
		{
			if (self.apiReady)
			{
				self.thumbsManagerDO.stopSlideshow();
			}
		};
		
		//#############################################//
		/* Event dispatcher */
		//#############################################//
		this.addListener = function (type, listener)
		{
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props)
	    {
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener)
	   {
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };

		/* destroy */
		this.destroy = function()
		{
			if (window.removeEventListener)
			{
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onScrollHandler);
				window.removeEventListener("orientationchange", self.orientationChance);
			}
			else if (window.detachEvent)
			{
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onScrollHandler);
			}
			
			clearTimeout(self.scrollEndId);
			clearTimeout(self.resizeHandlerId1);
			clearTimeout(self.resizeHandlerId2);
			clearTimeout(self.orientationChangeId);
			
			if (self.data)
			{
				self.data.destroy();
			}

			if (self.customContextMenuDO)
			{
				self.customContextMenuDO.destroy();
			}

			if (self.infoDO)
			{
				self.infoDO.destroy();
			}

			if (self.preloaderDO)
			{
				self.preloaderDO.destroy();
			}
			
			if (self.thumbsManagerDO)
			{
				self.thumbsManagerDO.destroy();
			}
			
			if (self.bgDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.bgDO);
				self.bgDO.destroy();
			}
			
			if (self.thumbsBgDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.thumbsBgDO);
				self.thumbsBgDO.destroy();
			}
			
			if (self.scrollbarBgDO)
			{
				FWDU3DCarModTweenMax.killTweensOf(self.scrollbarBgDO);
				self.scrollbarBgDO.destroy();
			}
			
			if (self.comboBoxDO)
			{
				self.comboBoxDO.destroy();
			}
			
			if (self.disableDO)
			{
				self.disableDO.destroy();
			}
			
			if (self.displayType == FWDUltimate3DCarousel.FLUID_WIDTH)
			{	
				if (FWDU3DCarUtils.isIE7)
				{
					self.body.removeChild(self.mainDO.screen);
				}
				else
				{
					document.documentElement.removeChild(self.mainDO.screen);
				}
			}
			else
			{
				self.stageContainer.removeChild(self.mainDO.screen);
			}
			
			if (self.mainDO)
			{
				self.mainDO.screen.innerHTML = "";
				self.mainDO.destroy();
			}
			
			self.listeners = null;
			self.preloaderDO = null;
			self.customContextMenuDO = null;
			self.infoDO = null;
			self.thumbsManagerDO = null;
			self.bgDO = null;
			self.thumbsBgDO = null;
			self.scrollbarBgDO = null;
			self.comboBoxDO = null;
			self.disableDO = null;
			self.mainDO = null;
			self = null;
		};

		this.init();
	};

	FWDUltimate3DCarousel.RESIZE = "resize";
	FWDUltimate3DCarousel.LIGHTBOX = "lightbox";
	FWDUltimate3DCarousel.RESPONSIVE = "responsive";
	FWDUltimate3DCarousel.FLUID_WIDTH = "fluidwidth";
	FWDUltimate3DCarousel.AFTER_PARENT = "afterparent";
	
	FWDUltimate3DCarousel.INTRO_START = "onsIntroStart";
	FWDUltimate3DCarousel.INTRO_FINISH = "onsIntroFinish";
	FWDUltimate3DCarousel.DATA_LOADED = "onDataLoaded";
	FWDUltimate3DCarousel.IS_API_READY = "isAPIReady";
	FWDUltimate3DCarousel.CATEGORY_CHANGE = "categoryChanged";
	FWDUltimate3DCarousel.THUMB_CHANGE = "thumbChanged";
	
	window.FWDUltimate3DCarousel = FWDUltimate3DCarousel;

}(window));