var obj = {};
$('.wt_btn').click(function(){
	obj.place = $('#place').val();//搜索区域、商圈、楼盘
	obj.mj = Number($('#area').val());//面积
	obj.mj1 = Number($('#area1').val());//面积1
	obj.fund = Number($('#fund').val());//预算
	obj.fund1 = Number($('#fund1').val());//预算1
	obj.house_mj = [obj.mj,obj.mj1];//面积范围格式
	obj.house_fund = [obj.fund,obj.fund1];//租金范围格式
	
	//确认查找跳转
	mui.openWindow({
		url: '../jxfy1.html',
		id:'jxfy1',
	    extras:{
	      find_houseObj:JSON.stringify(obj)
	    }
	});
	//
//	var main = plus.webview.getWebviewById('jxfy1');
//	alert(main);
//	mui.fire(main, "find_house",{
//	    find_houseObj:JSON.stringify(obj)
//	})
});
