var user_name = '';//用户姓名
var telnumber = '';//手机号
var yzm = '';//验证码
var house_news = '';//现租房源
var house_ms = '';//退租理由
var house_date = null;//退租时间
var arr = [];//全局数组
var fyid = '';//房源id
  var picker = new mui.PopPicker({
	layer: 1
  });
  //根据用户id查询当前登陆用户
  function cx_fwnews(id){
	  mui.ajax(url + '/yskjApp/webApp/dataInfo/getHouseCompanyById',{
			data:{
				'id': id
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.success){
					var alldata = data.data;//
					for (var i = 0; i < alldata.length; i++) {
						var obj = {};
						var str = '';
						var str1 = '';
						var str2 = '';
						var str3 = '';
						for(var j in alldata[i]){
							if(j == 'lpname'){//楼盘名字
								str1 = alldata[i][j];
							}
							if(j == 'zdname'){//座栋
								str2 = ' ' + alldata[i][j];
							}
							if(j == 'fyname'){//房间号
								str3 = '-' + alldata[i][j];
							}
						}
						str = str1 + str2 + str3;
						obj.text = str;
						obj.value = alldata[i].omcid;
						arr.push(obj);
					}
				    picker.setData(arr);
					picker.pickers[0].setSelectedIndex(0);
					$('#house_news').val(str);
					fyid = obj.value;
					house_news = $('#house_news').val();
					btnzt();
				}else{
//						mui.alert(data.message);
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
			}
		});
  }
if(localStorage.getItem('user_id')){
	var user_id = localStorage.getItem('user_id');
  	cx_fwnews(user_id);
  }

//目标区域的弹出框选择
function fw_news(){
	picker.show(function(SelectedItem) {
		var sel_val = picker.getSelectedItems();
		$('#house_news').val(sel_val[0].text);
		fyid = sel_val[0].value;
	});
}
//用户姓名输入
document.getElementById("user_name").addEventListener('input',function(){
	if(this.value != ''){
		user_name = this.value;
		btnzt();
	}else{
		user_name = '';
		btnzt();
	}
});
//房屋信息输入
document.getElementById("house_news").addEventListener('input',function(){
	if(this.value != ''){
		house_news = this.value;
		btnzt();
	}else{
		house_news = '';
		btnzt();
	}
});
//验证码登陆时判断及交互
//手机号输入
document.getElementById("tel").addEventListener('input',function(){
	if(this.value != ''){
		telnumber = this.value;
		$('.hqyzm').css({'color':'#2b70d8'});
		btnzt();
	}else{
		$('.hqyzm').css({'color':'#c8c8c8'});
		telnumber = '';
		btnzt();
	}
});
//验证码输入
document.getElementById("hqyzm").addEventListener('input',function(){
	if(this.value != ''){
		yzm = this.value;
		btnzt();
	}else{
		yzm = '';
		btnzt();
	}
});
//提交按钮样式变换
function btnzt(){
	if(telnumber != '' || yzm != '' || user_name != '' || house_news != '' || house_date != ''){
		$('.btn').css({'background':'#2b70d8'});
	}else{
		$('.btn').css({'background':'#d2d2d2'});
	}
}
//手机号码验证
function checkPhone(id){
   var phone = document.getElementById(id).value;
   if(!(/^1[345786]\d{9}$/.test(phone))){
   		mui.alert('请确认填写手机号是否正确', '提示', function(){});
   		return false;
   }else{
   		return true;
   }
}
//获取验证密码倒计时
var tag = true;
var countdown=60; 
function settime(obj) {
    if (countdown == 0) { 
    	tag = true;
        obj.html("获取验证码");
        countdown = 60; 
        return;
    } else { 
    	tag = false;
        obj.html("重新发送(" + countdown + ")"); 
        countdown--;
    } 
	setTimeout(function() { 
    	settime(obj) 
	},1000)
}
var yzmobj = $('.hqyzm');//获取验证码对象
//点击获取验证码
$('.hqyzm').click(function(){
	telnumber = $('#tel').val();
	if(telnumber != ''){
		if(checkPhone('tel') == true){		
			if(tag){
				tag = false;
				settime(yzmobj);//验证码倒计时
				sendyzm();
			}
//			check_tel();//调取验证系统有无此用户方法
		}
	}else{
		mui.alert('请填写手机号码', '提示', function(){},'div');
	}
});
//生成cookie
function createcookie(){
	var cookyezhi = new Date;
	localStorage.setItem('cookyezhi', JSON.stringify(cookyezhi));
	return cookyezhi;
}
//发送验证码方法
function sendyzm(){
	mui.ajax(url + '/yskjApp/appYskj/V1/getServiceCode.do',{
		data:{
			"phone":telnumber,
			"cookie":createcookie()
		},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(data.success){
				console.log('验证码发送成功！')
			}else{
				mui.toast(data.message,{ duration:'3000', type:'div' }) 
			}
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
		}
	});	
}
//退租提交
var clicktag = 0;
$('.wt_btn').click(function(){
	house_news = $('#house_news').val();
	if(telnumber == '' && yzm == '' && user_name == '' && house_news == '' && house_date == ''){
		return;
	}else{
		if(clicktag == 0){
			if(user_name==''){
				mui.alert('姓名不能为空', '提示', function(){},'div');
				return;
			}
			if(telnumber==''){
				mui.alert('手机号不能为空', '提示', function(){},'div');
				return;
			}else{
				if(!checkPhone('tel')){
					return;
				}
			}
			if(yzm==''){
				mui.alert('验证码不能为空', '提示', function(){},'div');
				return;
			}
			if(house_news==''){
				mui.alert('请选择现租房源', '提示', function(){},'div');
				return;
			}
			if(house_date=='' || house_date==null){
				mui.alert('请选择退租时间', '提示', function(){},'div');
				return;
			}
			if(!localStorage.getItem('cookyezhi')){
				mui.alert('请重新获取验证码', '提示', function(){},'div');
				return;
			}
			clicktag = 1;
			yz_house_wt();
		}else{
			if(telnumber == '' || yzm == '' || user_name == '' || house_news == '' || house_date == '' || house_date == null){
				return;
			}else{				
				setTimeout(function () { clicktag = 0; }, 3000);
				mui.toast('已提交，请勿重复提交！',{ duration:'2000', type:'div' });
				return;
			}
		}
	}
	
});
//验证并委托方法
function yz_house_wt(){
	var code = $('#hqyzm').val();
	house_ms = $('#house_ms').val();
	mui.ajax(url+'/yskjApp/appYskj/V1/compServiceCode.do',{
		data:{
			'code':code,
			'cookie': JSON.parse(localStorage.getItem('cookyezhi'))
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success){
				localStorage.removeItem('cookyezhi');
				mui.ajax(url + '/yskjApp/webApp/dataInfo/housingChange.do',{
					data:{
						'type': '5',
						'category': 'BGTZ',
						'name': user_name,
						'phone': telnumber,
						'memo': house_ms,
						"repairHouse":house_news,
						'changeTime': house_date,
						'uid': localStorage.getItem('user_id'),
						'fyid': fyid
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					headers:{'Content-Type':'application/json'},	              
					success:function(data){
						//服务器返回响应，根据响应结果，分析是否登录成功；
						if(data.success){
							mui.toast('已提交成功，我们将会尽快为您处理',{ duration:2000, type:'div' });
							setTimeout(function(){
								mui.back();								
							},1000);
						}else{
							mui.alert(data.message);
						}
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						console.log(type);
					}
				});	
			}else{
				mui.alert(data.message);
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(type);
		}
	});
}
function hq_yhxx(){//用户信息关联
	mui.ajax(url + '/yskjApp/appYskj/V1/getCookieInfo.do',{
		data:{
			"cookie":JSON.parse(localStorage.getItem('cookxs_yh'))
		},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(data.success){
				var user_data = data.data;
				$("#user_name").val(user_data.name);
				$("#tel").val(user_data.phone);
				user_name = $("#user_name").val();
				telnumber = $("#tel").val();
				if(telnumber != ''){
					$('.hqyzm').css({'color':'#2b70d8'});					
				}else{
					$('.hqyzm').css({'color':'#c8c8c8'});					
				}
			}else{

			}
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
		}
	});
}
hq_yhxx();//用户信息关联