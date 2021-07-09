/* 3DCoverflow */
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