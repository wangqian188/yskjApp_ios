var obj = {};
document.getElementById("fund").addEventListener('focus',function(){
	mui.toast('租金预算/期望单价（输入一个即可）',{ duration:'2000', type:'div' });
});
document.getElementById("dj_price").addEventListener('focus',function(){
	mui.toast('租金预算/期望单价（输入一个即可）',{ duration:'2000', type:'div' });
});
//租金预算最低值
document.getElementById("fund").addEventListener('input',function(){
	if(this.value != ''){
		obj.fund = this.value;
		obj.dj_price = '';
		obj.dj_price1 = '';
		$('#dj_price').val(obj.dj_price);
		$('#dj_price1').val(obj.dj_price1);
	}else{
		obj.fund = '';
	}
});
//租金预算最高值
document.getElementById("fund1").addEventListener('input',function(){
	if(this.value != ''){
		obj.fund1 = this.value;
		obj.dj_price = '';
		obj.dj_price1 = '';
		$('#dj_price').val(obj.dj_price);
		$('#dj_price1').val(obj.dj_price1);
	}else{
		obj.fund1 = '';
	}
});
//期望单价最低值
document.getElementById("dj_price").addEventListener('input',function(){
	if(this.value != ''){
		obj.dj_price = this.value;
		obj.fund = '';
		obj.fund1 = '';
		$('#fund').val(obj.fund);
		$('#fund1').val(obj.fund);
	}else{
		obj.dj_price = '';
	}
});
//期望单价最高值
document.getElementById("dj_price1").addEventListener('input',function(){
	if(this.value != ''){
		obj.dj_price1 = this.value;
		obj.fund = '';
		obj.fund1 = '';
		$('#fund').val(obj.fund);
		$('#fund1').val(obj.fund1);
	}else{
		obj.dj_price1 = '';
	}
});


$('.wt_btn').click(function(){
	obj.place = $('#place').val();//搜索区域、商圈、楼盘
	obj.mj = Number($('#area').val());//面积
	obj.mj1 = Number($('#area1').val());//面积1
	obj.fund = Number($('#fund').val());//预算
	obj.fund1 = Number($('#fund1').val());//预算1
	obj.dj_price = Number($('#dj_price').val());//单价
	obj.dj_price1 = Number($('#dj_price1').val());//单价1
	obj.house_mj = [obj.mj,obj.mj1];//面积范围格式
	obj.house_fund = [obj.fund,obj.fund1];//租金范围格式
	obj.house_dj = [obj.dj_price,obj.dj_price1];//单价查找格式
	
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
