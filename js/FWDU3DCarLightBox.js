(function (window){
	
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
	
}(window));