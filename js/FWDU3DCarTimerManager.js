/* Slide show time manager */
(function(window){
	
	var FWDU3DCarTimerManager = function(delay, autoplay){
		
		var self = this;
		var prototpype = FWDU3DCarTimerManager.prototype;
		
		this.timeOutId;
		this.delay = delay;
		this.isStopped_bl = !autoplay;
		
		this.stop = function(){
			clearTimeout(this.timeOutId);
			this.dispatchEvent(FWDU3DCarTimerManager.STOP);
		};
		
		this.start = function(){
			if(!this.isStopped_bl){
				this.timeOutId = setTimeout(this.onTimeHanlder, this.delay);
				this.dispatchEvent(FWDU3DCarTimerManager.START);
			}
		};
		
		this.onTimeHanlder = function(){
			self.dispatchEvent(FWDU3DCarTimerManager.TIME);
		};
		
		/* destroy */
		this.destroy = function(){
			
			clearTimeout(this.timeOutId);
			
			prototpype.destroy();
			self = null;
			prototpype = null;
			FWDU3DCarTimerManager.prototype = null;
		};
	};

	FWDU3DCarTimerManager.setProtptype = function(){
		FWDU3DCarTimerManager.prototype = new FWDU3DCarEventDispatcher();
	};
	
	FWDU3DCarTimerManager.START = "start";
	FWDU3DCarTimerManager.STOP = "stop";
	FWDU3DCarTimerManager.TIME = "time";
	
	FWDU3DCarTimerManager.prototype = null;
	window.FWDU3DCarTimerManager = FWDU3DCarTimerManager;
	
}(window));