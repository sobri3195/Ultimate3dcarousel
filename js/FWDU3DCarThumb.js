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
}(window));