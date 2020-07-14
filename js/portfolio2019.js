$(function(){ 

	var cIdx = 0;	// 현재 페이지 인덱스

	var pfNum = 10;	// 전체 포트폴리오 갯수

	var str_pager;

	var str_browse = 'pc';
	// 초기화
	function init(){
		var filter = "win16|win32|win64|mac|macintel";
		if(navigator.platform){
			if(filter.indexOf(navigator.platform.toLowerCase()) < 0){
				// alert('mobile 접속');
				str_browse = 'mobile';
			}else{ 
				// alert('pc 접속');
				str_browse = 'pc';
			}
		}

		// 포트폴리오 페이지
		if( window.location.pathname.indexOf('pf') != -1 ){
			cIdx = Number(window.location.pathname.split('pf')[1].split('.')[0]);

			// $('.pager').removeClass('sc3').addClass('sc8');
			str_pager = (cIdx+1) + ' / ' + pfNum;
			$('.pager >p').html(str_pager);
			setLayout();	// 화면초기화
 			addEvents();	// 기본 이벤트 셋팅
		}else{ // 인덱스 페이지
			showIntro();
		}

		$('.home_btn').html("<p>포트폴리오</p>");

		$('.logo_container').css({'opacity':0});
		$('.t_pf_list').css({'opacity':0});
	}

	function setLayout(){		
		// $('.content_container').load( '/portfolio2019/content_0.html', function(){
		// 푸터 나타내기
		$('.t_footer').html('copyright by jeongmupark.com, allrights reserved.<br/><br/><br/>');
			
		// 	setLogo();
		// 	showInfo();
		// })
		$('.navi > span').attr('href', '#');


		// PC로 접속 했을 경우, 좌/우 화살표 좌표셋팅/표시
		if(str_browse == 'pc'){
			if(cIdx == 0){
				$('.l_arrow').css({opacity:0});
			}
			else if(cIdx == 9){
				$('.r_arrow').css({opacity:0});	
			}

			var _top = $('body').height()/2;
			console.log(_top);
			$('.arrows').css({top:_top, display:'block'});
			// $('.arrows').preventDefault();
			//
			$('.btn').css({display:'none'});
		}
	}




	// index 인트로 애니메이션
	function showIntro(){
		TweenMax.to($('.pf_list'), 0.7, {top:0, delay:0.5, ease:Circ.easeOut, onComplete: function(){
			TweenMax.to($('.t_pf_list'), 0.7, {opacity:1, delay: 0.2, onComplete: function(){
				$('.logo_container').css({display:'block'});
				TweenMax.to($('.logo_container'), 1, {opacity:1, onComplete: function(){
					$('body .pf_list').on('click', function(e){
						e.preventDefault();
						setBtnInfo();
					})
				}});
			}});
		}});
	}

	function setBtnInfo(){
		if(str_browse == 'pc'){
			location.href = './pf0.html';
			console.log('##');
		}
		else{
			$('.btn_info').css({'display':'block'});
			TweenMax.to($('.btn_info'), 0.4, {opacity:1, onComplete:function(){
				setTimeout( function(){
					location.href = './pf0.html';
				}, 5000)
			}})

			$('.t_btn_info').css({top:$('body').height()/2-$('.t_btn_info').height()/2});
			$('.t_btn_info').css({left:500-$('.t_btn_info').width()/2});
			$('html, body').css({'overflow': 'hidden', 'height': '100%'});
			$('.btn_info').on('scroll touchmove mousewheel', function(e) {
				// 터치무브와 마우스휠 스크롤 방지     
				e.preventDefault();     
				e.stopPropagation();     
				return false; 
			});


			$('.btn_info').on('click', function(e){
				e.preventDefault();
				$('html, body').css({'overflow': '', 'height': ''});
				location.href = './pf0.html';
			});
		}
	}

	function addEvents(){

		$('.t_navi > a').on('click', function(e){
			e.preventDefault();
			location.href = '/?utm=tohome';
		})
		$('.prev_btn').on('click', function(e){
			e.preventDefault();
			movePage('prev');

		})
		$('.next_btn').on('click', function(e){
			e.preventDefault();
			movePage('next');
		});

		$('.l_arrow').on('click', function(e){
			e.preventDefault();
			movePage('prev');

		})
		$('.r_arrow').on('click', function(e){
			e.preventDefault();
			movePage('next');
		});

		$('.pop_info').on('click', function(e){
			$(this).css('display', 'none');
		})
	}

	function showInfo(){
		$('.pop_info').css('display', 'block');
	}

	function setLogo(){
		$('.logo > img').attr({
			src: './imgs/logo/'+arr_logo[cIdx]._src,
			width: arr_logo[cIdx]._width,
			height: arr_logo[cIdx]._height
		})
	}

	function movePage(_str){
		if(_str == 'next'){
			if(cIdx+1 > pfNum-1){
				alert('마지막 페이지 입니다.')
				return;
			}
			cIdx = cIdx+1;
		}
		else{
			if(cIdx-1 < 0){
				alert('첫번째 페이지 입니다.')
				return;
			}
			cIdx = cIdx-1;
		}

		var _url = './pf'+cIdx+'.html';
		location.href = _url;
	}

	init();


});