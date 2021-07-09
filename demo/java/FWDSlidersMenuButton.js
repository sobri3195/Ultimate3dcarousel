/* FWDU3DCarSlidersMenuButton */
(function (){
var FWDU3DCarSlidersMenuButton = function(propsObj)
{
		var self = this;
		var prototype = FWDU3DCarSlidersMenuButton.prototype;
		
		this.id = propsObj.id;
		this.text = propsObj.text;
		this.data = propsObj.data;
		
		this.sliderMinValue;
		this.sliderMaxValue;
		this.sliderValue;
		
		this.totalWidth = 190;
		this.totalHeight = 100;
		
		this.imgDO;
		this.sliderDO;
		this.sliderTextDO;
		this.sliderText;
		this.comboBoxDO;
		this.resetButtonDO;
		this.onOffButtonDO;
		this.textDO;
		
		this.finalX;
		this.finalY;
		
		this.isMobile = FWDU3DCarUtils.isMobile;
		this.isDisabled = false;
		
		this.init = function()
		{
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			
			switch (self.id)
			{
				case 4:
					self.sliderMinValue = propsObj.sliderMinValue;
					self.sliderMaxValue = propsObj.sliderMaxValue;
					self.sliderValue = propsObj.sliderValue;
					self.incrementStep = propsObj.incrementStep;
					self.value = self.sliderValue;
					
					self.setupFloatSlider();
					break;
				case 5:
					self.value = propsObj.value;
					
					self.setupCombobox();
					break;
				case 6:
					self.value = propsObj.value;
					
					self.setupOnOffButton();
					break;
				case 8:
					self.value = propsObj.value;
					
					self.setupOnOffButton();
					break;
				case 9:
					self.setupResetButton();
					break;
				default:
					self.sliderMinValue = propsObj.sliderMinValue;
					self.sliderMaxValue = propsObj.sliderMaxValue;
					self.sliderValue = propsObj.sliderValue;
					self.value = self.sliderValue;
					
					self.setupSlider();
			}
		};
		
		this.setupSlider = function()
		{
			self.imgDO = new FWDU3DCarSimpleDisplayObject("img");
			
			self.imgDO.setWidth(176);
			self.imgDO.setHeight(88);
			
			self.imgDO.setX(Math.floor((self.totalWidth - 176)/2));
			self.imgDO.setY(-36);
			
			self.imgDO.screen.src = "load/slider-skin/sliderImage" + (self.id+1) + ".jpg";
			
			if (self.id == 7)
			{
				self.imgDO.setY(-24);
			}
			
			self.addChild(self.imgDO);
			
			FWDU3DCarSlider.setPrototype();
			self.sliderDO = new FWDU3DCarSlider(
			{
				skinPath:"load/slider-skin",
				sliderWidth:170,
				sliderHeight:22,
				handlerWidth:22,
				trackHeight:12,
				trackMarginWidth:5,
				progressHeight:6,
				minValue:self.sliderMinValue,
				maxValue:self.sliderMaxValue,
				value:self.sliderValue
			});
			
			self.sliderDO.addListener(FWDU3DCarSlider.CHANGE, self.onSliderChange);
			self.addChild(self.sliderDO);
			
			self.sliderDO.setY(50);
			
			self.sliderTextDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.sliderTextDO);

			self.sliderTextDO.setWidth(40);
			self.sliderTextDO.setHeight(25);
			
			self.sliderTextDO.setX(75);
			
			switch (self.text)
			{
				case "Carousel X radius":
					self.sliderTextDO.setY(5);
					break;
				case "Carousel Y radius":
					self.sliderTextDO.setX(74);
					self.sliderTextDO.setY(13);
					break;
				case "Carousel Y offset":
					self.sliderTextDO.setY(-3);
					break;
				case "Carousel X rotation":
					self.sliderTextDO.setY(4);
					break;
				default:
					self.sliderTextDO.setY(13);
			}
			
			self.sliderText = new FWDU3DCarSimpleDisplayObject("div");
			self.sliderTextDO.addChild(self.sliderText);
			
			self.sliderText.getStyle().fontSmoothing = "antialiased";
			self.sliderText.getStyle().webkitFontSmoothing = "antialiased";
			self.sliderText.getStyle().textRendering = "optimizeLegibility";
			
			self.sliderText.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.sliderText.getStyle().fontSize = "12px";
			self.sliderText.getStyle().color = "#000000";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = self.value;
			}
			else
			{
				self.sliderText.setInnerHTML(self.value);
			}
			
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			setTimeout(self.setTextPosition, 10);
		};
		
		this.onSliderChange = function(e)
		{
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = self.value;
			}
			else
			{
				self.sliderText.setInnerHTML(self.value);
			}
				
			clearTimeout(self.sliderTextId);
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.value = e.value;
			self.dispatchEvent(FWDU3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setTextPosition = function()
		{
			self.textDO.setX(Math.floor((self.totalWidth - self.textDO.getWidth())/2));
			self.textDO.setY(80);
		};
		
		this.setSliderTextPosition = function()
		{
			self.sliderText.setX(Math.floor((40 - self.sliderText.getWidth())/2));
			self.sliderText.setY(Math.floor((25 - self.sliderText.getHeight())/2));
		};
		
		this.setupFloatSlider = function()
		{
			self.imgDO = new FWDU3DCarSimpleDisplayObject("img");
			
			self.imgDO.setWidth(176);
			self.imgDO.setHeight(88);
			
			self.imgDO.setX(Math.floor((self.totalWidth - 176)/2));
			self.imgDO.setY(-30);
			
			self.imgDO.screen.src = "load/slider-skin/sliderImage" + (self.id+1) + ".jpg";
			
			self.addChild(self.imgDO);
			
			self.imgDO.screen.ontouchstart = null;
			
			FWDU3DCarFloatSlider.setPrototype();
			self.sliderDO = new FWDU3DCarFloatSlider(
			{
				skinPath:"load/slider-skin",
				sliderWidth:170,
				sliderHeight:22,
				handlerWidth:22,
				trackHeight:12,
				trackMarginWidth:5,
				progressHeight:6,
				minValue:self.sliderMinValue,
				maxValue:self.sliderMaxValue,
				value:self.sliderValue,
				incrementStep:self.incrementStep
			});
			
			self.sliderDO.addListener(FWDU3DCarFloatSlider.CHANGE, self.onSliderChange);
			self.addChild(self.sliderDO);
			
			self.sliderDO.setY(50);
			
			self.sliderTextDO = new FWDU3DCarDisplayObject("div");
			self.addChild(self.sliderTextDO);

			self.sliderTextDO.setWidth(40);
			self.sliderTextDO.setHeight(25);

			self.sliderTextDO.setX(75);
			
			self.sliderTextDO.setY(9);
			
			self.sliderText = new FWDU3DCarSimpleDisplayObject("div");
			self.sliderTextDO.addChild(self.sliderText);
			
			self.sliderText.getStyle().fontSmoothing = "antialiased";
			self.sliderText.getStyle().webkitFontSmoothing = "antialiased";
			self.sliderText.getStyle().textRendering = "optimizeLegibility";
			
			self.sliderText.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.sliderText.getStyle().fontSize = "12px";
			self.sliderText.getStyle().color = "#000000";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = self.sliderValue;
			}
			else
			{
				self.sliderText.setInnerHTML(self.sliderValue);
			}
			
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
		};
		
		this.setTextPosition = function()
		{
			self.textDO.setX(Math.floor((self.totalWidth - self.textDO.getWidth())/2));
			self.textDO.setY(80);
		};
		
		this.setSliderTextPosition = function()
		{
			self.sliderText.setX(Math.floor((40 - self.sliderText.getWidth())/2));
			self.sliderText.setY(Math.floor((30 - self.sliderText.getHeight())/2));
		};
		
		this.onSliderChange = function(e)
		{
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = e.value;
			}
			else
			{
				self.sliderText.setInnerHTML(e.value);
			}
			
			clearTimeout(self.sliderTextId);
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.value = e.value;
			self.dispatchEvent(FWDU3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setupCombobox = function()
		{
			self.imgDO = new FWDU3DCarSimpleDisplayObject("img");
			
			self.imgDO.setWidth(176);
			self.imgDO.setHeight(88);
			
			self.imgDO.setX(Math.floor((self.totalWidth - 176)/2));
			self.imgDO.setY(-36);
			
			self.imgDO.screen.src = "load/slider-skin/comboboxImage.jpg";
			self.addChild(self.imgDO);
			
			self.imgDO.screen.ontouchstart = null;
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
			
			FWDU3DCarPageComboBox.setPrototype();
			
			var sel;
			
			switch (self.value)
			{
				case 0:
					sel = "normal";
					break;
				case 1:
					sel = "ring";
					break;
				case 2:
					sel = "star";
					break;
			}
			
			self.comboBoxDO = new FWDU3DCarPageComboBox(
			{
				arrowW:self.data.comboboxArrowIconN_img.width,
				arrowH:self.data.comboboxArrowIconN_img.height,
				arrowN_str:self.data.comboboxArrowIconN_str,
				arrowS_str:self.data.comboboxArrowIconS_str,
				categories_ar:["normal", "ring", "star"],
				selectorLabel:sel,
				startAtCategory:self.value,
				totalWidth:120,
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
			
			self.comboBoxDO.addListener(FWDU3DCarPageComboBox.BUTTON_PRESSED, self.onComboboxChangeHandler);
			self.addChild(self.comboBoxDO);
			
			self.posComboboxId = setTimeout(self.positionCombobox, 110);
		};
		
		this.positionCombobox = function()
		{
			self.comboBoxDO.setX(Math.floor((self.totalWidth - self.comboBoxDO.getWidth())/2));
			self.comboBoxDO.setY(42);
		};
		
		this.onComboboxChangeHandler = function(e)
		{
			self.value = e.id;
			self.dispatchEvent(FWDU3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setupOnOffButton = function()
		{
			FWDU3DCarOnOffButton.setPrototype();
			
			self.onOffButtonDO = new FWDU3DCarOnOffButton(104, 31, 54, "load/onOffButton-skin", self.value);
			self.onOffButtonDO.addListener(FWDU3DCarOnOffButton.CHANGE, self.onOnOffButtonChangeHandler);
			self.addChild(self.onOffButtonDO);
			
			self.onOffButtonDO.setX(Math.floor((self.totalWidth - self.onOffButtonDO.getWidth())/2));
			self.onOffButtonDO.setY(Math.floor((80 - self.onOffButtonDO.getHeight())/2));
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
		};
		
		this.onOnOffButtonChangeHandler = function(e)
		{
			self.value = e.value;
			self.dispatchEvent(FWDU3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setupResetButton = function()
		{
			FWDU3DCarResetButton.setPrototype();
			
			self.resetButtonDO = new FWDU3DCarResetButton(31, 29, "load/reset-skin");
			self.resetButtonDO.addListener(FWDU3DCarResetButton.CLICK, self.resetButtonClickHandler);
			self.addChild(self.resetButtonDO);
			
			self.resetButtonDO.setX(Math.floor((self.totalWidth - self.resetButtonDO.getWidth())/2));
			self.resetButtonDO.setY(Math.floor((80 - self.resetButtonDO.getHeight())/2));
			
			self.textDO = new FWDU3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDU3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			setTimeout(self.setTextPosition, 10);
		};
		
		this.resetButtonClickHandler = function(e)
		{
			self.dispatchEvent(FWDU3DCarSlidersMenuButton.RESET);
		};
		
		this.setValue = function(newValue)
		{
			self.value = newValue;
			
			switch (self.id)
			{
				case 5:
					self.comboBoxDO.setValue(newValue);
					break;
				case 6:
					self.onOffButtonDO.setValue(newValue);
					break;
				case 8:
					self.onOffButtonDO.setValue(newValue);
					break;
				case 9:
					break;
				default:
					if (FWDU3DCarUtils.isIEAndLessThen9)
					{
						self.sliderText.screen.innerText = self.value;
					}
					else
					{
						self.sliderText.setInnerHTML(self.value);
					}
					
					clearTimeout(self.sliderTextId);
					self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
					
					self.sliderDO.setValue(newValue);
			}
		};
		
		this.enable = function()
		{
			self.isDisabled = false;
			
			switch (self.id)
			{
				case 5:
					self.comboBoxDO.enable();
					break;
				case 6:
					self.onOffButtonDO.enable();
					break;
				case 8:
					self.onOffButtonDO.enable();
					break;
				case 9:
					self.resetButtonDO.enable();
					break;
				default:
					self.sliderDO.enable();
			}
		};
		
		this.disable = function()
		{
			self.isDisabled = true;
			
			switch (self.id)
			{
				case 5:
					self.comboBoxDO.disable();
					break;
				case 6:
					self.onOffButtonDO.disable();
					break;
				case 8:
					self.onOffButtonDO.disable();
					break;
				case 9:
					self.resetButtonDO.disable();
					break;
				default:
					self.sliderDO.disable();
			}
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarSlidersMenuButton.setPrototype = function()
	{
		FWDU3DCarSlidersMenuButton.prototype = new FWDU3DCarDisplayObject("div", "absolute", "visible");
	};

	FWDU3DCarSlidersMenuButton.CHANGE = "onChange";
	FWDU3DCarSlidersMenuButton.RESET = "onReset";
	
	FWDU3DCarSlidersMenuButton.prototype = null;
	window.FWDU3DCarSlidersMenuButton = FWDU3DCarSlidersMenuButton;
}(window));