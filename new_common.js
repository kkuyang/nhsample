$(function(){
	modal();
	accessibilityFocus();
	
	$("#skip-navigation ul li a").click(function(){
		var aHref = $(this).attr('href'); 		
		$(aHref).focus();
		$(aHref).attr("tabindex","0");
	});
	
	function gnbIn(){
		if ($('.bg_box').height("0")) {
			$('.bg_box').stop().animate({ "height": "326px" }, 0);
			$('.bg_box').addClass("on");
			$('#gnb_area .dep2').stop().animate({ "height": "325px" }, 50).show();	     
			// $(this).parents().parents().parents().animate({ "background-color": "#ee5566" }, 50);   
			$(this).parents().parents().parents().addClass("over", {duration:500});   
	    }
	}
	
	function gnbOut(){
		$('#gnb_area .dep2').hide().stop().animate({ "height": "0" }, 50, function() {
            $(this).hide();

			$(this).parents().parents().parents().removeClass("over", {duration:1000});
        });

        $(this).find("#gnb_area .dep2").each(function() {
            $(this).hide();
        });
        $('.bg_box').stop().animate({ "height": "0" }, 50);
        $('.bg_box').removeClass("on");
	}
	
	$('#gnb_area > li h2 a').on('focusin mouseenter', gnbIn);
	
	$('#gnb_area li').on('focusin mouseenter', function() {
		$(this).find("h2 a").addClass("on");
		$(this).find(".dep2").addClass("on");
		
				
		
		
		
    });
	
	$('#gnb_area li').on('focusout mouseleave', function() {
		$(this).find("h2 a").removeClass("on");
		$(this).find(".dep2").removeClass("on");
		
    });
	
	$('#gnb_area').on('mouseleave', gnbOut);
	$('#gnb_area > li:last-child .dep2 li:last-child a').on('focusout', gnbOut);
	$('.nav_area h1 a').on('focusin', gnbOut);
	//$('.m_all').on('focusin', gnbOut);
	
   
    /* lnb */
    var lnba = $(".lnb_menu > li > a");
    
   
    $(".lnb_menu > li > a").click(function(e){
        if($(this).hasClass("on")){

        }else {
        	if($(this).parent("li").hasClass("plus")){
        		e.preventDefault();
        		$(lnba).removeClass("on");
                $(lnba).siblings().addClass("hide");
                $(this).addClass("on");
                $(this).siblings().removeClass("hide");
        	}
        }
    });
    
    $(".lnb_menu > li > a").focus(function(e){
        if($(this).hasClass("on")){
        	
        }else {
        	if($(this).parent("li").hasClass("plus")){
        		e.preventDefault();
        		$(lnba).removeClass("on");
                $(lnba).siblings().addClass("hide");
                $(this).addClass("on");
                $(this).siblings().removeClass("hide");
        	}
        }
    });
   
    
    $(".lnb_menu > li:has(ul)").addClass('plus');
    
    /* family site */
   
    $(".f_site .list_wrap").scroll(function(){
    	$(".f_site").addClass('active');
    });
    
    $(".f_close").click(function(){
        $(".f_site").removeClass('active');
    });
    
    $(".familysite.left a").click(function(){
        $('[data-modal-con ="modal-family"]').hide();
    });
    
    $(".familysite.right a").click(function(){
        $('[data-modal-con ="modal-family2"]').hide();
    });
    
    /* 페이징 */
    $('.page button').each(function(){
    	if($(this).hasClass('on')){
    		$('.page button.on').attr('title', '현재페이지입니다.');
    	}
    });

});


/////////////////////// MODAL POPUP 2019.10.31  웹접근성 추가 /////////////////////////////////////////////////

function accessibilityFocus() {
	$(document).on('keydown', '[data-focus-prev], [data-focus-next]', function (e) {
		var next = $(e.target).attr('[data-focus-next]'),
			prev = $(e.target).attr('[data-focus-prev]'),
			target = next || prev || false;

		if(!target || e.keyCode  !== 9){
			return;
		}

		if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) {
			$('[data-focus="'+ target +'"]').focus();
			setTimeout(function(){
				$('[data-focus="' +target + '"]').focus();
			},1);
		}

	});
}

function modal(){
	var openBtn = '[data-modal]',
		  closeBtn = '.modal-close';

	function getTarget(t){
		return $(t).attr('data-modal');
	}

	function open(t){
		var showTarget = $('[data-modal-con ="'+ t +'"]');

		window.setTimeout(function(){
			if(t !="modal-family" && t !="modal-family2"){
				$("#dimmed").show();
			}
			var popHeight = (showTarget.height()/-2) - 10;
			if(t !="modal-family" && t !="modal-family2" && t !="modal-all"){
				showTarget.css('margin-top', popHeight);
			}
			
			showTarget.attr("tabindex", "0");
			showTarget.show().focus();
			showTarget.find('.modal-close').data('activeTarget', t);
		},100);
	}

	function close(t){
		$("#dimmed").hide();
		var activeTarget = $('[data-modal-con ="'+ t +'"]');
		activeTarget.hide();
		$('[data-modal ="'+ t +'"]').focus();
	}

	$(document).on('click', openBtn, function(e){
		e.preventDefault();
		open(getTarget($(this)));
	}).on('click', closeBtn, function(e){
		e.preventDefault();
		close($(this).data('activeTarget'));
	});
}

/* 컨텐츠 파일다운로드 함수 추가 CS513509 */
function resourceDownloadUrl(url_path) {
	var file_name = url_path.substr(url_path.lastIndexOf("/")+1);
	var file_path = url_path.substr(0, url_path.lastIndexOf("/")+1);
	window.open("/cmm/file/resourceDownLoad.do?filepath=" + file_path + encodeURI(file_name), "_self", "style='display:none;width:0;height:0;position:absolute;left:-999px'");
	
	return ;
}