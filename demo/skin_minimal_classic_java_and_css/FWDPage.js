var pageMenu_do;
var slidersMenu_do;
var pageThumbs_do;

var body_el = null;
var playlist1_el = null;
var playlist1SingleCat_el = null;
var playlist2_el = null;
var playlist2SingleCat_el = null;
var myDiv_el = null;
var menuHolder_el = null;
var slidersHolder_el = null;
var mainSlidersHolder_el = null;
var thumbsHolder_el = null;
var whyBuyImage_el = null;
var logoImage_img = null;
var byFWD_img = null;

var td_els;
var mainHeader_el = null;
var menuHolder_el = null;
var whatIsMainText_el = null;
var logoImage_img = null;
var whyBuyImage_img = null;
var mainFeatureTableHolder_el = null;
var col1_el = null;
var col2_el = null;
var specialNotes_el = null;

var mainWidth = 940;
var carouselHeight = 538;
var gridWidth = 940;
var byFWDImageWidth = 76;
var logoImageWidth = 940;
var whatIsImageWidth = 415;
var whyBuyImageWidth = 940;
var windowW = 0;
var windowH = 0;

var sValues = [600, 0, 0, 10, .3, 1, true, 0, false];

var resizeHandlerId_to;
var scrollEndId_to;

//##################################//
/* initialize page */
//##################################//
function init()
{	
	body_el = document.getElementsByTagName('body')[0];
	
	playlist1_el = document.getElementById("playList1");
	playlist1SingleCat_el = document.getElementById("playList2SingleCat");
	playlist2_el = document.getElementById("playList3");
	playlist2SingleCat_el = document.getElementById("playList4SingleCat");
	
	menuHolder_el = document.getElementById("menuHolder");
	thumbsHolder_el = document.getElementById("thumbsHolder");
	slidersHolder_el = document.getElementById("slidersHolder");
	mainSlidersHolder_el = document.getElementById("mainSlidersHolder");
	
	myDiv_el = document.getElementById("myDiv");
	whyBuyImage_el = document.getElementById("whyBuy");
	logoImage_img = document.getElementById("logoImage");
	
	td_els = document.getElementsByTagName("td"); 
	specialNotes_el = document.getElementById("specialNotes");
	whatIsMainText_el = document.getElementById("whatIsMainText");
	mainFeatureTableHolder_el  = document.getElementById("mainFeatureTableHolder");
	col1_el = document.getElementById("col1");
	col2_el = document.getElementById("col2");
	mainHeader_el = document.getElementById("mainHeader");
	
	byFWD_img = document.getElementById("byFWD");
	byFWD_img.style.cursor = "pointer";
	byFWD_img.onclick = function(){
		window.location.href = "http://www.webdesign-flash.ro";
	};
	
	setupMenu();
	setupThumbsHolder();
	positionStuff();

	if(window.addEventListener){
		window.addEventListener("resize", onResizeHandler);
		if(FWDU3DCarUtils.isFirefox){
			document.addEventListener("mozfullscreenchange", onFullScreenChange);
			document.removeEventListener("fullscreenchange", onFullScreenChange);
		}
	}else if(window.attachEvent){
		window.attachEvent("onresize", onResizeHandler);
	}
	
	setupCarousel();
	
	if (!FWDU3DCarUtils.isIEAndLessThen10)
	{
		carousel.addListener(FWDUltimate3DCarousel.INTRO_START, onIntroStart);
		carousel.addListener(FWDUltimate3DCarousel.INTRO_FINISH, onIntroFinish);
		carousel.addListener(FWDUltimate3DCarousel.DATA_LOADED, onDataLoaded);
	}
	else
	{
		mainSlidersHolder_el.style.display = "none";
	}
	
	setTimeout( function(){
		positionStuff();
		removePlayLists();
		}, 100);
}

//##################################//
/* Remove playlists for better performance */
//##################################//
function removePlayLists(){
	try{
		body_el.removeChild(playlist1_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist1SingleCat_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist2_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist2SingleCat_el);
	}catch(e){}
};

//##################################//
/* Full screen change handler */
//##################################//
function onFullScreenChange(e){
	var isFullScreen = document.fullScreen || !document.mozFullScreen;
	if(isFullScreen){
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}
}

//#####################################//
/* resize handler */
//#####################################//
function onResizeHandler(){
	if(FWDU3DCarUtils.isMobile){
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}else{
		positionStuff();
		if(FWDU3DCarUtils.isIE){
			clearTimeout(resizeHandlerId_to); 
			resizeHandlerId_to = setTimeout(positionStuff, 90);
		}
	}
}

//#####################################//
/* position stuff */
//#####################################//
function positionStuff(){
	var viewportSize = FWDU3DCarUtils.getViewportSize();
	windowW = menuHolder_el.offsetWidth;
	windowH = viewportSize.h;
	
	positionLogoImage();
	pageMenu_do.positionAndResize(windowW);
	
	if (slidersMenu_do)
	{
		slidersMenu_do.positionAndResize(windowW);
	}
	
	pageThumbs_do.positionAndResize(windowW);
	positionText();
}

//#####################################//
/* Setup menu */
//####################################//
function setupMenu(){
	FWDU3DCarPageMenu.setPrototype();
	pageMenu_do = new FWDU3DCarPageMenu({
		disabledButton:2,
		parent:menuHolder_el,
		menuLabels:["Modern <span class=\"black\">Silver</span>", "<span class=\"blue\">Modern <span class=\"bold\">Silver</span></span>",
		            "Modern <span class=\"black\">Warm</span>", "<span class=\"blue\">Modern <span class=\"bold\">Warm</span></span>",
		            "Minimal <span class=\"black\">Classic</span>", "<span class=\"blue\">Minimal <span class=\"bold\">Classic</span></span>",
					"<span class=\"black\">Transparent</span> Images Example", "<span class=\"blue\"><span class=\"bold\">Transparent</span> Images Example</span>"],
		maxWidth:mainWidth,
		buttonNormalColor:"#999999",
		buttonSelectedColor:"#009aff",
		buttonsHolderBackgroundColor:"#DDDDDD"
	});
	
	pageMenu_do.addListener(FWDU3DCarPageMenuButton.CLICK, buttonClickHandler);
}

function buttonClickHandler(e){
	if(e.id == 0){
		window.location.href = "index.html";
	}else if(e.id == 1){
		window.location.href = "index-modern-warm.html";
	}else if(e.id == 2){
		window.location.href = "index-minimal-classic.html";
	}else if(e.id == 3){
		window.location.href = "index-transparent-images.html";
	}
};

//#####################################//
/* Setup sliders menu*/
//####################################//
function setupSliders(){
	FWDU3DCarSlidersMenu.setPrototype();
	slidersMenu_do = new FWDU3DCarSlidersMenu(slidersHolder_el, sValues, carousel.data);
	
	slidersMenu_do.addListener(FWDU3DCarSlidersMenu.CHANGE, onSlidersMenuChange);
	
	slidersMenu_do.disable();
}

function onSlidersMenuChange(e)
{
	carousel.update(e);
};

function onIntroStart()
{
	slidersMenu_do.disable();
};

function onIntroFinish()
{
	slidersMenu_do.enable();
};

function onDataLoaded()
{
	setupSliders();
	positionStuff();
};

//#####################################//
/* position logo image */
//#####################################//
function positionLogoImage(){
	var byFWDX = (windowW - byFWDImageWidth - 2);
	var logoImageX = parseInt((windowW - logoImageWidth)/2);
	
	if(byFWDX > mainWidth - byFWDImageWidth){
		byFWDX =  parseInt(logoImageX  + logoImageWidth - byFWDImageWidth);
	}
	
	if(windowW < 500){
		byFWD_img.style.top = "-50px";
	}else{
		byFWD_img.style.top = "64px";
	}
	
	logoImage_img.style.left = logoImageX  + "px";
	byFWD_img.style.left = byFWDX + "px";
};

//#####################################//
/* position text  */
//#####################################//
function positionText()
{
	var whatIsMainTextWidth = Math.min(mainWidth - 20, windowW - 20);
	var whatIsMainTextX = parseInt((windowW - whatIsMainTextWidth)/2);
	var colWidth = parseInt((Math.min(mainWidth, windowW) - 40)/2);
	var colHolderWidth = parseInt((Math.min(mainWidth, windowW) - 20));
	
	whatIsMainText_el.style.left = whatIsMainTextX  + "px";
	whatIsMainText_el.style.width = (whatIsMainTextWidth )  + "px";
	mainFeatureTableHolder_el.style.width = colHolderWidth + "px";
	specialNotes_el.style.left = whatIsMainTextX + "px";
	specialNotes_el.style.width = whatIsMainTextWidth + "px";
	
	for(var i=0; i<td_els.length; i++){
		if(windowW < 500){
			td_els[i].style.display = "block";
			if(i == 1){
				td_els[i].style.width = "0%";
			}else{
				td_els[i].style.width = "100%";
			}
			td_els[i].style.display = "block";
		}else{
			if(i == 0){
				td_els[i].style.width = "47%";
				td_els[i].style.display = "table-cell";
			}else if(i == 1){
				td_els[i].style.width = "6%";
				td_els[i].style.display = "table-cell";
			}else{
				td_els[i].style.width = "47%";
				td_els[i].style.display = "table-cell";
			}
		}
	}
}

//#####################################//
/* Setup page thumbs */
//####################################//
function setupThumbsHolder()
{
	FWDU3DCarPageThumbs.setPrototype();
	
	pageThumbs_do = new FWDU3DCarPageThumbs({
		parent:thumbsHolder_el,
		imagesPath:["graphics/imageFluid", 
		            "graphics/imageFixed",
					"graphics/htmlFluid",
					"graphics/htmlFixed"],
		maxWidth:mainWidth,
		thumbnailBorderColor:"#FFFFFF",
		textNormalColor:"#55595c",
		textSelectedColor:"#009aff",
		wiewSampleTextColor:"#FFFFFF",
		shadowOffsetX:2,
		shadowOffsetY:2,
		shadowOffsetW:-4,
		shadowOffsetH:-4
	});
	
	pageThumbs_do.addListener(FWDU3DCarPageThumb.CLICK, onThumbPressedHandler);
}

function onThumbPressedHandler(e)
{
	var newY;
	
	if(carousel){
		carousel.destroy();
		carousel = null;
	}

	if(e.id == 0){
		body_el.appendChild(playlist1_el);
		setupCarousel();
		sValues = [600, 0, 0, 10, .3, 1, true, 0, false];
	}else if(e.id == 1){
		body_el.appendChild(playlist1SingleCat_el);
		setupCarousel1();
		sValues = [540, 0, 0, 10, .3, 1, true, 0, false];
	}else if(e.id == 2){
		body_el.appendChild(playlist2_el);
		setupCarousel2();
		sValues = [600, 0, 0, 10, .3, 1, true, 0, false];
	}else if(e.id == 3){
		body_el.appendChild(playlist2SingleCat_el);
		setupCarousel3();
		sValues = [540, 0, 0, 10, .3, 1, true, 0, false];
	}
	
	if (slidersMenu_do)
	{
		slidersMenu_do.destroy();
		slidersMenu_do = null;
	}
	
	if (!FWDU3DCarUtils.isIEAndLessThen10)
	{
		carousel.addListener(FWDUltimate3DCarousel.INTRO_START, onIntroStart);
		carousel.addListener(FWDUltimate3DCarousel.INTRO_FINISH, onIntroFinish);
		carousel.addListener(FWDUltimate3DCarousel.DATA_LOADED, onDataLoaded);
	}
	else
	{
		mainSlidersHolder_el.style.display = "none";
	}
	
	if(e.id == 0 || e.id == 1 || e.id == 2 || e.id == 3){
		pageThumbs_do.enableOrDisableThumbs(e.id);
		scale = Math.min(windowW, gridWidth)/mainWidth;	
		newY = window.pageYOffset +  myDiv_el.getBoundingClientRect().top;
		newY -=  parseInt((windowH - (carouselHeight * scale))/2);
		
		window.scrollTo(0, newY);
	}	
}

//##########################################//
/* Setup carousel's functions */
//#########################################//
function setupCarousel1(){
	carousel = new FWDUltimate3DCarousel({
		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList2SingleCat",
		displayType:"responsive",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/minimal_classic_skin",
									
		//main settings
		backgroundColor:"#000000",
		backgroundImagePath:"",
		thumbnailsBackgroundImagePath:"",
		scrollbarBackgroundImagePath:"load/minimal_classic_skin/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		carouselStartPosition:"center",
		carouselTopology:"ring",
		carouselXRadius:540,
		carouselYRadius:0,
		carouselXRotation:10,
		carouselYOffset:0,
		showCenterImage:"no",
		centerImagePath:"load/logo.png",
		centerImageYOffset:0,
		showDisplay2DAlways:"no",
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:420,
		thumbnailHeight:286,
		thumbnailBorderSize:0,
		thumbnailMinimumAlpha:.3,
		thumbnailBackgroundColor:"#FFFFFF",
		thumbnailBorderColor1:"#FFFFFF",
		thumbnailBorderColor2:"#FFFFFF",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"no",
		textBackgroundColor:"#FFFFFF",
		textBackgroundOpacity:.7,
		showText:"yes",
		showTextBackgroundImage:"no",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #111111",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.4,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#000000",
		scrollbarTextColorSelected:"#FFFFFF",
									
		//combobox settings
		showComboBox:"no",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#FFFFFF",
		selectorBackgroundNormalColor2:"#FFFFFF",
		selectorBackgroundSelectedColor1:"#000000",
		selectorBackgroundSelectedColor2:"#000000",
		selectorTextNormalColor:"#000000",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#FFFFFF",
		buttonBackgroundNormalColor2:"#FFFFFF",
		buttonBackgroundSelectedColor1:"#000000",
		buttonBackgroundSelectedColor2:"#000000",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#222222",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#FFFFFF",
		lightBoxItemBorderColor2:"#FFFFFF",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:0,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});
}

function setupCarousel2(){
	
	carousel = new FWDUltimate3DCarousel({		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList3",
		displayType:"fluidwidth",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/minimal_classic_skin",
									
		//main settings
		backgroundColor:"#000000",
		backgroundImagePath:"",
		thumbnailsBackgroundImagePath:"",
		scrollbarBackgroundImagePath:"load/minimal_classic_skin/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		carouselStartPosition:"center",
		carouselTopology:"ring",
		carouselXRadius:600,
		carouselYRadius:0,
		carouselXRotation:10,
		carouselYOffset:0,
		showCenterImage:"no",
		centerImagePath:"load/logo.png",
		centerImageYOffset:0,
		showDisplay2DAlways:"no",
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:380,
		thumbnailHeight:330,
		thumbnailBorderSize:0,
		thumbnailMinimumAlpha:.3,
		thumbnailBackgroundColor:"#FFFFFF",
		thumbnailBorderColor1:"#FFFFFF",
		thumbnailBorderColor2:"#FFFFFF",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"yes",
		textBackgroundColor:"#FFFFFF",
		textBackgroundOpacity:.7,
		showText:"no",
		showTextBackgroundImage:"no",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #111111",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.4,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#000000",
		scrollbarTextColorSelected:"#FFFFFF",
									
		//combobox settings
		showComboBox:"no",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#FFFFFF",
		selectorBackgroundNormalColor2:"#FFFFFF",
		selectorBackgroundSelectedColor1:"#000000",
		selectorBackgroundSelectedColor2:"#000000",
		selectorTextNormalColor:"#000000",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#FFFFFF",
		buttonBackgroundNormalColor2:"#FFFFFF",
		buttonBackgroundSelectedColor1:"#000000",
		buttonBackgroundSelectedColor2:"#000000",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#222222",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#FFFFFF",
		lightBoxItemBorderColor2:"#FFFFFF",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:0,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});
}

function setupCarousel3(){
	
	carousel = new FWDUltimate3DCarousel({		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList4SingleCat",
		displayType:"responsive",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/minimal_classic_skin",
									
		//main settings
		backgroundColor:"#000000",
		backgroundImagePath:"",
		thumbnailsBackgroundImagePath:"",
		scrollbarBackgroundImagePath:"load/minimal_classic_skin/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		carouselStartPosition:"center",
		carouselTopology:"ring",
		carouselXRadius:540,
		carouselYRadius:0,
		carouselXRotation:10,
		carouselYOffset:0,
		showCenterImage:"no",
		centerImagePath:"load/logo.png",
		centerImageYOffset:0,
		showDisplay2DAlways:"no",
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:380,
		thumbnailHeight:330,
		thumbnailBorderSize:0,
		thumbnailMinimumAlpha:.3,
		thumbnailBackgroundColor:"#FFFFFF",
		thumbnailBorderColor1:"#FFFFFF",
		thumbnailBorderColor2:"#FFFFFF",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"yes",
		textBackgroundColor:"#FFFFFF",
		textBackgroundOpacity:.7,
		showText:"no",
		showTextBackgroundImage:"no",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #111111",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.4,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#000000",
		scrollbarTextColorSelected:"#FFFFFF",
									
		//combobox settings
		showComboBox:"yes",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#FFFFFF",
		selectorBackgroundNormalColor2:"#FFFFFF",
		selectorBackgroundSelectedColor1:"#000000",
		selectorBackgroundSelectedColor2:"#000000",
		selectorTextNormalColor:"#000000",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#FFFFFF",
		buttonBackgroundNormalColor2:"#FFFFFF",
		buttonBackgroundSelectedColor1:"#000000",
		buttonBackgroundSelectedColor2:"#000000",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#222222",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#FFFFFF",
		lightBoxItemBorderColor2:"#FFFFFF",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:0,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});

}