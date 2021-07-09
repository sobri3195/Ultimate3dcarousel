/* combo box */
(function (window){
	
	var FWDU3DCarPageComboBox = function(props_obj){
		
		var self = this;
		var prototype = FWDU3DCarPageComboBox.prototype;
		
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
		
		this.finalX;
		this.finalY;
		this.totalButtons = self.categories_ar.length;
		this.curId = props_obj.startAtCategory;
		this.horizontalMargins = props_obj.comboBoxHorizontalMargins;
		this.verticalMargins = props_obj.comboBoxVerticalMargins;
		this.buttonsHolderWidth = 0;
		this.buttonsHolderHeight = 0;
		this.totalWidth = props_obj.totalWidth;
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
		
			self.setupMainContainers();
			self.getMaxWidthResizeAndPositionId_to = setTimeout(
					function(){
						self.getMaxWidthResizeAndPosition(),
						self.setButtonsState();}
						, 100);
			setTimeout(self.showFirstTime, 120);
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

			self.dispatchEvent(FWDU3DCarPageComboBox.BUTTON_PRESSED, {id:self.curId});
		};
		
		this.openMenuHandler = function(){
			if(self.isShowed_bl) return;
			self.selector_do.disable();
			self.show(true);
			self.startToCheckOpenedMenu();
			
			self.dispatchEvent(FWDU3DCarPageComboBox.OPEN);
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
			
			self.selector_do.setText(self.categories_ar[self.curId]);
		};
		
		this.setValue = function(id)
		{
			self.curId = id;
			self.setButtonsStateBasedOnId();
		};
		
		this.enable = function()
		{
			self.setAlpha(1);
			self.selector_do.enable();
		};
		
		this.disable = function()
		{
			self.setAlpha(.5);
			self.disableId = setTimeout(self.selector_do.disable, 100);
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
			self.totalButtonsHeight = 0;
			
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
		
		//#####################################//
		/* hide / show */
		//####################################//
		this.showFirstTime = function(){
			self.setVisible(true);
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
			clearTimeout(self.disableId);
			
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
			self.upArrowN_str = null;
			self.upArrowS_str = null;
			
			props_obj = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDU3DCarPageComboBox.prototype = null;
		};
	};
	
	/* set prototype */
	FWDU3DCarPageComboBox.setPrototype =  function(){
		FWDU3DCarPageComboBox.prototype = new FWDU3DCarDisplayObject("div");
	};

	FWDU3DCarPageComboBox.OPEN = "open";
	FWDU3DCarPageComboBox.HIDE_COMPLETE = "infoWindowHideComplete";
	FWDU3DCarPageComboBox.BUTTON_PRESSED = "buttonPressed";

	FWDU3DCarPageComboBox.prototype = null;
	window.FWDU3DCarPageComboBox = FWDU3DCarPageComboBox;
	
}(window));