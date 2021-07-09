/* thumbs manager */
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

}(window));