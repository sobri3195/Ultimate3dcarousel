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
}(window));