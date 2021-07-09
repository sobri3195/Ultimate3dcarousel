/* Info screen */
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
}(window));