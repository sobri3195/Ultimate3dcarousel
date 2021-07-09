/* FWDU3DCarSlidersMenu */
(function (window){
var FWDU3DCarSlidersMenu = function(parent, sValues, data)
{
		var self = this;
		var prototype = FWDU3DCarSlidersMenu.prototype;
		
		this.parent = parent;
		this.slidersValues = sValues;
		this.data = data;
		
		this.menuButtons_ar = [];

		this.buttonsHolder_do = null;
		
		this.stageWidth;
		this.stageHeight;
		this.maxWidth = 970;
		this.buttonsHolderWidth = 200;
		this.buttonsBarOriginalHeight = 70;
		this.totalHeight = 0;
		this.buttonsBarTotalHeight = 200;
		this.totalButtons;
		this.totalHeight = 200;
		this.spacerWidth = 2;
		this.spacerHeight = 11;
		this.hSpace = 2;
		this.vSpace = 28;
		this.minMarginXSpace = 12;
		this.startY = 8;

		this.init = function()
		{
			self.parent.style.height = "10px";
			self.parent.appendChild(self.screen);
			
			if (FWDU3DCarUtils.isIE9)
			{
				if (data.showThumbnailsHtmlContent)
				{
					self.nrOfSliders = 4;
					self.totalButtons = 6;
					
					self.setupSliderButtons5();
				}
				else
				{
					self.nrOfSliders = 5;
					self.totalButtons = 8;
					
					self.setupSliderButtons6();
				}
			}
			else if (FWDU3DCarUtils.isIE8)
			{
				self.nrOfSliders = 4;
				self.totalButtons = 6;
					
				self.setupSliderButtons5();
			}
			else if (!FWDU3DCarUtils.isMobile && !data.showThumbnailsHtmlContent)
			{
				if (FWDU3DCarUtils.isIE)
				{
					self.nrOfSliders = 5;
					self.totalButtons = 9;
						
					self.setupSliderButtons4();
				}
				else
				{
					self.nrOfSliders = 6;
					self.totalButtons = 10;
						
					self.setupSliderButtons1();
				}
			}
			else
			{
				if (!FWDU3DCarUtils.isMobile && !FWDU3DCarUtils.isIE)
				{
					self.nrOfSliders = 5;
					self.totalButtons = 8;
					
					self.setupSliderButtons2();
				}
				else
				{
					self.nrOfSliders = 4;
					self.totalButtons = 7;
					
					self.setupSliderButtons3();
				}
			}
			
			self.positionSlidersId = setTimeout(self.positionSliderButtons, 50);
		};
			
		this.positionAndResize = function(viewportWidth)
		{
			if (self.viewportWidth == viewportWidth) return;
		
			self.viewportWidth = viewportWidth;
			self.stageWidth = viewportWidth;
			
			self.positionSliderButtons();
		};
		
		this.setupSliderButtons1 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = -30;
						propsObj.sliderMaxValue = 30;
						propsObj.sliderValue = self.slidersValues[3];
						propsObj.text = "Carousel X rotation";
						propsObj.id = 3;
						break;
					case 4:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 5:
						propsObj.value = self.slidersValues[5];
						propsObj.data = self.data;
						propsObj.text = "Carousel topology";
						propsObj.id = 5;
						break;
					case 6:
						propsObj.value = self.slidersValues[6];
						propsObj.text = "Show reflection";
						propsObj.id = 6;
						break;
					case 7:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 100;
						propsObj.sliderValue = self.slidersValues[7];
						propsObj.text = "Reflection distance";
						propsObj.id = 7;
						break;
					case 8:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 9:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[5]);
		};
		
		this.setupSliderButtons2 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = -30;
						propsObj.sliderMaxValue = 30;
						propsObj.sliderValue = self.slidersValues[3];
						propsObj.text = "Carousel X rotation";
						propsObj.id = 3;
						break;
					case 4:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 5:
						propsObj.value = self.slidersValues[5];
						propsObj.data = self.data;
						propsObj.text = "Carousel topology";
						propsObj.id = 5;
						break;
					case 6:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 7:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[5]);
		};
		
		this.setupSliderButtons3 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 4:
						propsObj.value = self.slidersValues[5];
						propsObj.data = self.data;
						propsObj.text = "Carousel topology";
						propsObj.id = 5;
						break;
					case 5:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 6:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[4]);
		};
		
		this.setupSliderButtons4 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 4:
						propsObj.value = self.slidersValues[5];
						propsObj.data = self.data;
						propsObj.text = "Carousel topology";
						propsObj.id = 5;
						break;
					case 5:
						propsObj.value = self.slidersValues[6];
						propsObj.text = "Show reflection";
						propsObj.id = 6;
						break;
					case 6:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 100;
						propsObj.sliderValue = self.slidersValues[7];
						propsObj.text = "Reflection distance";
						propsObj.id = 7;
						break;
					case 7:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 8:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[4]);
		};
		
		this.setupSliderButtons5 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 4:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 5:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[4]);
		};
		
		this.setupSliderButtons6 = function()
		{	
			var sliderButton;
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDU3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.sliderMinValue = 400;
						propsObj.sliderMaxValue = 1000;
						propsObj.sliderValue = self.slidersValues[0];
						propsObj.text = "Carousel X radius";
						propsObj.id = 0;
						break;
					case 1:
						propsObj.sliderMinValue = -400;
						propsObj.sliderMaxValue = 400;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Carousel Y radius";
						propsObj.id = 1;
						break;
					case 2:
						propsObj.sliderMinValue = -200;
						propsObj.sliderMaxValue = 200;
						propsObj.sliderValue = self.slidersValues[2];
						propsObj.text = "Carousel Y offset";
						propsObj.id = 2;
						break;
					case 3:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 1;
						propsObj.sliderValue = self.slidersValues[4];
						propsObj.incrementStep = .01;
						propsObj.text = "Thumbs minimum alpha";
						propsObj.id = 4;
						break;
					case 4:
						propsObj.value = self.slidersValues[6];
						propsObj.text = "Show reflection";
						propsObj.id = 6;
						break;
					case 5:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 100;
						propsObj.sliderValue = self.slidersValues[7];
						propsObj.text = "Reflection distance";
						propsObj.id = 7;
						break;
					case 6:
						propsObj.value = self.slidersValues[8];
						propsObj.text = "Show center image";
						propsObj.id = 8;
						break;
					case 7:
						propsObj.text = "Configuration reset";
						propsObj.id = 9;
						break;
				}
				
				sliderButton = new FWDU3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDU3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
			
			self.buttonsHolder_do.addChild(self.menuButtons_ar[4]);
		};
		
		this.sliderButtonChangeHandler = function()
		{
			if (FWDU3DCarUtils.isIE9)
			{
				if (data.showThumbnailsHtmlContent)
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						thumbMinAlpha:self.menuButtons_ar[3].value,
						showCenterImg:self.menuButtons_ar[4].value
					});
				}
				else
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						thumbMinAlpha:self.menuButtons_ar[3].value,
						showRefl:self.menuButtons_ar[4].value,
						reflDist:self.menuButtons_ar[5].value,
						showCenterImg:self.menuButtons_ar[6].value
					});
				}
			}
			else if (FWDU3DCarUtils.isIE8)
			{
				self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
				{
					carRadiusX:self.menuButtons_ar[0].value,
					carRadiusY:self.menuButtons_ar[1].value,
					carYOffset:self.menuButtons_ar[2].value,
					thumbMinAlpha:self.menuButtons_ar[3].value,
					showCenterImg:self.menuButtons_ar[4].value
				});
			}
			else if (!FWDU3DCarUtils.isMobile && !data.showThumbnailsHtmlContent)
			{
				if (FWDU3DCarUtils.isIE)
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						thumbMinAlpha:self.menuButtons_ar[3].value,
						carouselTopology:self.menuButtons_ar[4].value,
						showRefl:self.menuButtons_ar[5].value,
						reflDist:self.menuButtons_ar[6].value,
						showCenterImg:self.menuButtons_ar[7].value
					});
				}
				else
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						carouselXRot:self.menuButtons_ar[3].value,
						thumbMinAlpha:self.menuButtons_ar[4].value,
						carouselTopology:self.menuButtons_ar[5].value,
						showRefl:self.menuButtons_ar[6].value,
						reflDist:self.menuButtons_ar[7].value,
						showCenterImg:self.menuButtons_ar[8].value
					});
				}
			}
			else
			{
				if (!FWDU3DCarUtils.isMobile && !FWDU3DCarUtils.isIE)
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						carouselXRot:self.menuButtons_ar[3].value,
						thumbMinAlpha:self.menuButtons_ar[4].value,
						carouselTopology:self.menuButtons_ar[5].value,
						showCenterImg:self.menuButtons_ar[6].value
					});
				}
				else
				{
					self.dispatchEvent(FWDU3DCarSlidersMenu.CHANGE,
					{
						carRadiusX:self.menuButtons_ar[0].value,
						carRadiusY:self.menuButtons_ar[1].value,
						carYOffset:self.menuButtons_ar[2].value,
						thumbMinAlpha:self.menuButtons_ar[3].value,
						carouselTopology:self.menuButtons_ar[4].value,
						showCenterImg:self.menuButtons_ar[5].value
					});
				}
			}
		};
		
		this.reset = function()
		{
			if (FWDU3DCarUtils.isIE9)
			{
				if (data.showThumbnailsHtmlContent)
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[4]);
					self.menuButtons_ar[4].setValue(self.slidersValues[8]);
				}
				else
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[4]);
					self.menuButtons_ar[4].setValue(self.slidersValues[6]);
					self.menuButtons_ar[5].setValue(self.slidersValues[7]);
					self.menuButtons_ar[6].setValue(self.slidersValues[8]);
				}
			}
			else if (FWDU3DCarUtils.isIE8)
			{
				self.menuButtons_ar[0].setValue(self.slidersValues[0]);
				self.menuButtons_ar[1].setValue(self.slidersValues[1]);
				self.menuButtons_ar[2].setValue(self.slidersValues[2]);
				self.menuButtons_ar[3].setValue(self.slidersValues[4]);
				self.menuButtons_ar[4].setValue(self.slidersValues[8]);
			}
			else if (!FWDU3DCarUtils.isMobile && !data.showThumbnailsHtmlContent)
			{
				if (FWDU3DCarUtils.isIE)
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[4]);
					self.menuButtons_ar[4].setValue(self.slidersValues[5]);
					self.menuButtons_ar[5].setValue(self.slidersValues[6]);
					self.menuButtons_ar[6].setValue(self.slidersValues[7]);
					self.menuButtons_ar[7].setValue(self.slidersValues[8]);
				}
				else
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[3]);
					self.menuButtons_ar[4].setValue(self.slidersValues[4]);
					self.menuButtons_ar[5].setValue(self.slidersValues[5]);
					self.menuButtons_ar[6].setValue(self.slidersValues[6]);
					self.menuButtons_ar[7].setValue(self.slidersValues[7]);
					self.menuButtons_ar[8].setValue(self.slidersValues[8]);
				}
			}
			else
			{
				if (!FWDU3DCarUtils.isMobile && !FWDU3DCarUtils.isIE)
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[3]);
					self.menuButtons_ar[4].setValue(self.slidersValues[4]);
					self.menuButtons_ar[5].setValue(self.slidersValues[5]);
					self.menuButtons_ar[6].setValue(self.slidersValues[8]);
				}
				else
				{
					self.menuButtons_ar[0].setValue(self.slidersValues[0]);
					self.menuButtons_ar[1].setValue(self.slidersValues[1]);
					self.menuButtons_ar[2].setValue(self.slidersValues[2]);
					self.menuButtons_ar[3].setValue(self.slidersValues[4]);
					self.menuButtons_ar[4].setValue(self.slidersValues[5]);
					self.menuButtons_ar[5].setValue(self.slidersValues[8]);
				}
			}
			
			self.sliderButtonChangeHandler();
		};
		
		//###################################################//
		/* position slider buttons */
		//###################################################//
		this.positionSliderButtons = function()
		{
			if(isNaN(self.stageWidth)) return;
			
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var tempX;
			var tempY = self.startY;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			var spacerCount = 0;
			
			self.buttonsHolderWidth = self.stageWidth;
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = self.menuButtons_ar[0].totalWidth;
			
			for (var i=1; i<self.totalButtons; i++)
			{	
				button = self.menuButtons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + self.hSpace > Math.min(self.stageWidth, self.maxWidth) - self.minMarginXSpace)
				{	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
				}
				else
				{
					rowsWidthAr[rowsNr] += button.totalWidth + self.hSpace;
					rowsAr[rowsNr].push(i);
				}
			}
			
			for (var i=0; i<rowsNr + 1; i++)
			{
				var rowMarginXSpace = parseInt((self.buttonsHolderWidth - rowsWidthAr[i])/2);
				
				if (i > 0) tempY += button.totalHeight + self.vSpace;
					
				for (var j=0; j<rowsAr[i].length; j++)
				{
					button = self.menuButtons_ar[rowsAr[i][j]];
					
					if (j == 0)
					{
						tempX = rowMarginXSpace;
					}
					else
					{
						prevButton = self.menuButtons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + self.hSpace;
					}
					
					button.finalX = tempX;
					button.finalY = tempY + 4;
						
					if (maxY < button.finalY)
						maxY = button.finalY;
					
					self.buttonsBarTotalHeight = maxY + button.totalHeight + self.startY + 7;
					
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
			
			self.totalHeight = self.buttonsBarTotalHeight;  
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarTotalHeight + 15);
			
			self.setX(parseInt((self.viewportWidth - self.stageWidth)/2));
			self.parent.style.height = (self.totalHeight + 15) + "px";
		};
		
		this.disable = function()
		{
			for(var i=0; i<self.totalButtons; i++)
			{
				self.menuButtons_ar[i].disable();
			}
		};
		
		this.enable = function()
		{
			for(var i=0; i<self.totalButtons; i++)
			{
				self.menuButtons_ar[i].enable();
			}
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarSlidersMenu.setPrototype = function(){
		FWDU3DCarSlidersMenu.prototype = new FWDU3DCarDisplayObject("div", "absolute", "visible");
	};
	
	FWDU3DCarSlidersMenu.CHANGE = "onChange";

	FWDU3DCarSlidersMenu.prototype = null;
	window.FWDU3DCarSlidersMenu = FWDU3DCarSlidersMenu;
}(window));