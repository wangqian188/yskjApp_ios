$('.main_tit').click(function(){
	if($('.big_zz').css('display') == 'none'){
		$('.top_jt').css("transform","rotate(180deg)");
		$('.big_zz').css('display','block');
		$('.filtrate_box').stop(true).animate({top:'0'});
	}else{
		$('.top_jt').css("transform","rotate(0deg)");
		$('.big_zz').css('display','none');
		$('.filtrate_box').stop(true).animate({top:'-6.026666rem'});
	}
});
//点击选择类型
$('.filtrate_box p').click(function(){
	$('.filtrate_box p').css('color','#999999');
	$(this).css('color','#2b70d8');
});
