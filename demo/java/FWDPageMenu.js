/* FWDU3DCarPageMenu */
(function (window){
var FWDU3DCarPageMenu = function(props_obj){
		
		var self = this;
		var prototype = FWDU3DCarPageMenu.prototype;
		
		this.parent = props_obj.parent;
		
		this.menuLabels_ar = props_obj.menuLabels;
		this.menuButtons_ar = [];
		
		this.shadow_sdo = null;
		this.buttonsHolder_do = null;
		this.rightImagePath_str = props_obj.rightImagePath;
		
		this.buttonNormalColor_str = props_obj.buttonNormalColor; 
		this.buttonSelectedColor_str = props_obj.buttonSelectedColor;
		this.buttonsHolderBackgroundColor_str = props_obj.buttonsHolderBackgroundColor;
		
		this.stageWidth = undefined;
		this.stageHeight = undefined;
		this.disabledButton = props_obj.disabledButton;
		this.buttonsHolderWidth = 200;
		this.buttonsBarOriginalHeight = 53;
		this.totalHeight = 0;
		this.buttonsBarTotalHeight = 200;
		this.totalButtons = 4;
		this.totalHeight = 200;
		this.maxWidth = props_obj.maxWidth;
		this.hSpace = 176;
		this.vSpace = 10;
		this.minHSpace = 30;
		this.minMarginXSpace = 12;
		this.startY = 12;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.parent.style.height = "41px";
			
			self.setupButtons();
			
			setTimeout(function(){
				self.setOverflow("visible");
				self.positionButtons();
				}
			, 51);
			self.parent.appendChild(self.screen);
		};
			
		//###########################################//
		/* resize and position */
		//##########################################//
		this.positionAndResize = function(viewportWidth){
		
			if(self.viewportWidth == viewportWidth) return;
		
			self.viewportWidth = viewportWidth;
			self.stageWidth = viewportWidth;
			
			self.positionButtons();
		};
		
		//##########################################//
		/* setup buttons */
		//##########################################//
		this.setupButtons = function()
		{
			var button;
			
			var disableButton_bl = false;
			
			self.setBkColor(self.buttonsHolderBackgroundColor_str);
			
			self.buttonsHolder_do = new FWDU3DCarDisplayObject("div");
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++){
				if(i == self.disabledButton){
					disableButton_bl = true;
				}else{
					disableButton_bl = false;
				}
				
				FWDU3DCarPageMenuButton.setPrototype();
				button = new FWDU3DCarPageMenuButton(self.menuLabels_ar[i*2], self.menuLabels_ar[i*2 + 1], disableButton_bl);
				button.id = i;
				button.addListener(FWDU3DCarPageMenuButton.CLICK, self.buttonClickHandler);
				self.menuButtons_ar[i] = button;
				self.buttonsHolder_do.addChild(button);
			}
		};
		
		this.buttonClickHandler = function(e){
			self.dispatchEvent(FWDU3DCarPageMenuButton.CLICK, {id:e.target.id});
		};
		
		//###################################################//
		/* position buttons */
		//###################################################//
		this.positionButtons = function(){
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var rowsThumbsWidthAr = [];
			var tempX;
			var tempY = self.startY;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			
			self.buttonsHolderWidth = Math.min(self.stageWidth, self.maxWidth);
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = self.menuButtons_ar[0].totalWidth;
			rowsThumbsWidthAr[rowsNr] = self.menuButtons_ar[0].totalWidth;
			
			for (var i=1; i<self.totalButtons; i++){
				button = self.menuButtons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + self.minHSpace > self.buttonsHolderWidth - self.minMarginXSpace){	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
					rowsThumbsWidthAr[rowsNr] = button.totalWidth;
				}else{
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] += button.totalWidth + self.minHSpace;
					rowsThumbsWidthAr[rowsNr] += button.totalWidth;
				}
			}
			
			for (var i=0; i<rowsNr + 1; i++){
				var rowMarginXSpace = 0;
				
				if (i > 0){
					tempY += button.totalHeight + self.vSpace;
				}
				
				var rowHSpace;
				
				if (rowsAr[i].length > 1){
					rowHSpace = Math.min((self.buttonsHolderWidth - self.minMarginXSpace - rowsThumbsWidthAr[i]) / (rowsAr[i].length - 1), self.hSpace);
					
					var rowWidth = rowsThumbsWidthAr[i] + rowHSpace * (rowsAr[i].length - 1);
					
					rowMarginXSpace = parseInt((self.buttonsHolderWidth - rowWidth)/2);
				}else{
					rowMarginXSpace = parseInt((self.buttonsHolderWidth - rowsWidthAr[i])/2);
				}
					
				for (var j=0; j<rowsAr[i].length; j++){
					button = self.menuButtons_ar[rowsAr[i][j]];
				
					if (j == 0){
						tempX = rowMarginXSpace;
					}else{
						prevButton = self.menuButtons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + rowHSpace;
					}
					
					button.finalX = tempX;
					button.finalY = tempY - 1;
						
					if (maxY < button.finalY) maxY = button.finalY;
					
					self.buttonsBarTotalHeight = maxY + button.totalHeight + self.startY - 2;
					button.setX(parseInt(button.finalX));
					button.setY(parseInt(button.finalY));
				}
			}
			
			self.totalHeight =  self.buttonsBarTotalHeight;  
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarTotalHeight);
			self.buttonsHolder_do.setX(parseInt((self.viewportWidth - self.buttonsHolderWidth)/2));
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.totalHeight);
			
			self.setX(parseInt((self.viewportWidth - self.stageWidth)/2));
			self.parent.style.height = (self.totalHeight) + "px";
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDU3DCarPageMenu.setPrototype = function(){
		FWDU3DCarPageMenu.prototype = new FWDU3DCarDisplayObject("div");
	};
	
	FWDU3DCarPageMenu.CLICK = "onClick";

	FWDU3DCarPageMenu.prototype = null;
	window.FWDU3DCarPageMenu = FWDU3DCarPageMenu;
}(window));