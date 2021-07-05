var key_enter = true;
var firstPlayStop = "stop";

function fn_swiper(playStop){
	firstPlayStop = playStop;
}

$(function() {

	// Main fullpage
	$('#fullpage').fullpage({
		verticalCentered: true,
		scrollOverflow: false,
        lazyLoading: false,
      	scrollingSpeed: 500,
      	responsiveWidth: 1025,
      	navigation: true,
		navigationPosition: 'left',
		
        //접근성
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        anchors: ['intro', 'information', 'bbs', 'aboutNH','footer'],
        
	// ** 페이지를 불러온 후
		afterLoad : function(anchorLink, index){
			$('.section0'+index).addClass('ani');
			$('header').addClass('motion');
			$('#fp-nav').addClass('fp-left');
			switch(index) {
				case 1: case 3: 
					$('#wrap').addClass('theme_white');
					$('#wrap').removeClass('theme_dark');
					$('#fp-nav ul li a span').css('background','#fff')
				break;
				default:
					$('#wrap').removeClass('theme_white');
					$('#wrap').addClass('theme_dark');
					$('#fp-nav ul li a span').css('background','#999')
					$('#fp-nav ul li a.active').css('border-color','#999999')
				break;
			}
			if(index == 1){
				$('header').addClass('on');
			}else{
				$('header').removeClass('on');
			}

			if ($('.section05').hasClass("active") == true) {
				$('.section04').addClass('ani'); 
			}

								/*
			if(anchorLink == 6 && direction =='down') {
				$('#side_nav').css('opacity','0');
				$('.scroll_btn').css('opacity','0');
				}
			if(anchorLink == 7 && direction =='up') {
					$('#side_nav').css('opacity','1');
					$('.scroll_btn').css('opacity','1');
				}
								*/
			// 왼쪽leftBar 색상변경
			if( index == 1 || index == 3 ){
				$(".indigator").addClass("white");
				$("h1").addClass("logOn");
			}else {
				$(".indigator").removeClass("white");
				$("h1").removeClass("logOn");
			}
		},  //
		
		// ** 페이지를 떠날때
		onLeave : function(anchorLink, destination, direction, index){
			
			
			if(destination > 3) {
				$(".page_top").fadeIn();
				}else {
					$(".page_top").fadeOut(); 
				}

			// if(destination > 5 && direction =='down') {
			// 	$('.fp-left').css('opacity','0');
				
			// 	}
			// if(destination < 6 && direction =='up') {
			// 	$('.fp-left').css('opacity','1');
			// 	}

			/* information ani */
			$(".section02").each(function(e) {
				if(anchorLink == 1 && direction =='down' &&  key_enter){
					key_enter = false;
					$('.grid_infor .count').each(function () {
						$(this).prop('Counter', 0).animate({
							Counter: eval($(this).text().replace(',',''))
							}, {
								duration: 2000,
								easing: 'swing',
								step: function (now) {
									var val = Math.ceil(now) ;            
									var val_text = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
									$(this).text(val_text);
								}
							});
					});
				};
			})

		},  //

	
	});
	

	
// 협력사 선택
$(".language-select").each( function() {
	var $langBox = $(this);
	var $langBtn = $(this).children(".lang-open-btn");
	var $langList = $(this).children("ul");
	$langBtn.on('focusin mouseenter', function() {
		$langList.slideToggle(300);
		$langBox.toggleClass("open");
		return false;
	});
	$(this).on('mouseleave', function() {
		$langList.slideUp(300);
		$langBox.removeClass("open");
	});
})


/**********************************************
*	Swiper - visual
**********************************************/
var introSwiper = new Swiper('.section01 .intro-swiper', {
    loop: true,
	speed: 300,
    effect: 'fade',
     autoplay: {
         delay: 5000,
         disableOnInteraction: false,
     },
    pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clickable: true,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    on: {
        slideChangeTransitionEnd: function () {
            var $currentSlide = $('.swiper-container').find('.swiper-slide-active');
            sliderPlay();
			visual04();
        }
    }
});

//visual-60주년 링크 

function visual04(){
	if($('.visual04').hasClass('swiper-slide-active')){
		$('.link-box').fadeOut();
		$('.link-box-60').fadeIn();
	}else{
		$('.link-box').fadeIn();
		$('.link-box-60').fadeOut();
		
	}
}


$('.visual01').parent().parents().siblings('.link-box-60').fadeOut();

// play button control
$(".intro-swiper .swiper-button-control .pause").click(function(){
    introSwiper.autoplay.stop();
    $(this).hide();
    $('.intro-swiper .swiper-button-control .play').fadeIn();
});

$(".intro-swiper .swiper-button-control .play").click(function(){
    introSwiper.autoplay.start();
    $(this).hide();
    $('.intro-swiper .swiper-button-control .pause').fadeIn();
});

	var timerID = null;
	function sliderPlay() {
		clearTimeout(timerID);
		if (checkHasVideo()) {
			$('.section01 .swiper-container').find('.swiper-slide-active video')[0].addEventListener('ended', nextSlider);
		}
//		 check 
//		 else {
//		 	timerID = setTimeout(function () {
//		 		nextSlider();
//		 	}, 6000)
//		 }

		function checkHasVideo() {
			if ($('.section01 .swiper-container').find('.swiper-slide-active video').length) {
				var video = $('.section01 .swiper-container').find('.swiper-slide-active video').get(0);
				video.play();
				
				//introSwiper.autoplay.stop();
				//introSwiper.stopAutoplay();
//			    $('.intro-swiper .swiper-button-control .pause').hide();
//			    $('.intro-swiper .swiper-button-control .play').fadeIn();
			    $('a[name=startStop]').click();
				return true;
			} 
            else {
				$('.section01 .swiper-container').find('video').each(function () {

					//this.currentTime = 0;
					this.pause();
					//$('a[name=startPlay]').click();
					
					if(firstPlayStop == "play"){
					    $('.intro-swiper .swiper-button-control .play').hide();
					    $('.intro-swiper .swiper-button-control .pause').fadeIn();
						$('a[name=startPlay]').click();
						
					}else if(firstPlayStop == "stop"){
						$('a[name=startStop]').click();
					    $('.intro-swiper .swiper-button-control .pause').hide();
					    $('.intro-swiper .swiper-button-control .play').fadeIn();
					}
				});
				return false;
			}
		}
		function nextSlider() {
		    
			introSwiper.slideNext();
		}
		
 	}


	 
/**********************************************
*	Swiper - banner
**********************************************/
var ban_swiper = new Swiper(".rightWrap .banSwiper", {
    // effect: 'fade',
    loop:true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    });




    $(".rightWrap .banSwiper .swiper-button-control .pause").click(function(){
        ban_swiper.autoplay.stop();
        $(this).hide();
        $('.rightWrap .banSwiper .swiper-button-control .play').fadeIn();
    });
    $(".rightWrap .banSwiper .swiper-button-control .play").click(function(){
        ban_swiper.autoplay.start();
        $(this).hide();
        $('.rightWrap .banSwiper .swiper-button-control .pause').fadeIn();
    });

	//moveTop
	$('#top_btn').click(function() {
		$.fn.fullpage.moveTo(1);
		});
		



    // 접근성 개선
    $('.pageDown').on("focus", function(){
    	
    	var pageUpPoint = "";
    	
	    if($('.section01').hasClass('active') && document.activeElement.className == "pageDown pageDown01"){
		    $ .fn.fullpage.moveSectionDown();
		    
	    }else if($('.section02').hasClass('active') && document.activeElement.className == "pageDown pageDown02"){
		    $ .fn.fullpage.moveSectionDown();
		    
	    }else if($('.section03').hasClass('active') && document.activeElement.className == "pageDown pageDown03"){
		    $ .fn.fullpage.moveSectionDown();
		    
	    }else if($('.section04').hasClass('active') && document.activeElement.className == "pageDown pageDown04"){
		    $ .fn.fullpage.moveSectionDown();
		    
	    }else if($('.section05').hasClass('active') && document.activeElement.className == "pageDown pageDown05"){
		    $ .fn.fullpage.moveSectionDown();
		    
	    }else{
	    	
			if($(".section01").hasClass("active")){
				$(".pageUp01").focus();
				
			}else if($(".section02").hasClass("active")){
				$(".pageUp02").focus();
				
			}else if($(".section03").hasClass("active")){
				$(".pageUp03").focus();
				
			}else if($(".section04").hasClass("active")){
				$(".pageUp04").focus();
				
			}else if($(".section05").hasClass("active")){
				$(".pageUp05").focus();
				
			}else if($(".section06").hasClass("active")){
				$(".pageUp06").focus();
			}
	    }
	    
    });
		
   $('.pageUp').on("click", function(){
		$ .fn.fullpage.moveSectionUp();
		if($(".section01").hasClass("active")){
			$(".intro-swiper  .swiper-button-prev").focus();
		}else if($(".section02").hasClass("active")){
			$(".info_under>li:first-child>a").focus();
		}else
		if($(".section03").hasClass("active")){
			$(".notice_wrap>li:first-child>a").focus();
		}else
		if($(".section04").hasClass("active")){
			$(".media_list>li:first-child>a").focus();
		}else
		if($(".section05").hasClass("active")){
			$(".aboutnh_list>li:first-child>a").focus();
		}else
		if($(".section06").hasClass("active")){
			$(".foot_util>li:first-child>a").focus();
		}
	   });



$(document).keydown(function(e){

	if(e.keyCode == "16" && e.keyCode == "9"){
		//if($(".section01").hasClass("active") && $(".section01").hasClass("pageUp") ){
		/*}else*/
		if($(".section02").hasClass("active") && $(".section02").hasClass("pageUp") ){
			
		}else if($(".section03").hasClass("active") && $("button[name=section03]").css("opacity") == 1 ){

			$("button[name=section03]").focus();
			
		}else if($(".section04").hasClass("active") && $(".section04").hasClass("pageUp") ){
			
		}else if($(".section05").hasClass("active") && $(".section05").hasClass("pageUp") ){
			
		}else if($(".section06").hasClass("active") && $(".section06").hasClass("pageUp") ){
			
		}
	}

});

$('a[name=startStop]').click();

});//end

