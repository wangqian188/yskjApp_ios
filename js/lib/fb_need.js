var user_name = '';//用户姓名
var telnumber = '';//手机号
var house_news = '';//所属行业
var house_ms = '';//服务描述
var qy_name = '';//企业名称
var yusuan = '';//预算
var yxq_date = null;//有效期（天）
var arr = [
{value:'wh',text:'文化'},
{value:'zx',text:'咨询'},
{value:'cm',text:'传媒'},
{value:'hl',text:'互联网'},
{value:'jy',text:'教育'},
{value:'jr',text:'金融'},
{value:'kj',text:'科技'},
{value:'ly',text:'旅游'},
{value:'qt',text:'其他'}
];
var picker = new mui.PopPicker({
	layer: 1
});
picker.setData(arr);
picker.pickers[0].setSelectedIndex(0);
//目标区域的弹出框选择
function fw_news(){
	picker.show(function(SelectedItem) {
		var sel_val = picker.getSelectedItems();
		$('#house_news').val(sel_val[0].text);
		house_news = $('#house_news').val();
		btnzt();
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
//所属行业
document.getElementById("house_news").addEventListener('input',function(){
	if(this.value != ''){
		house_news = this.value;
		btnzt();
	}else{
		house_news = '';
		btnzt();
	}
});
//手机号输入
document.getElementById("tel").addEventListener('input',function(){
	if(this.value != ''){
		telnumber = this.value;
		btnzt();
	}else{
		telnumber = '';
		btnzt();
	}
});
//企业名称
document.getElementById("qy_name").addEventListener('input',function(){
	if(this.value != ''){
		qy_name = this.value;
		btnzt();
	}else{
		qy_name = '';
		btnzt();
	}
});
//有效期
document.getElementById("yxq_date").addEventListener('input',function(){
	if(this.value != ''){
		yxq_date = this.value;
		btnzt();
	}else{
		yxq_date = '';
		btnzt();
	}
});
//预算
document.getElementById("yusuan").addEventListener('input',function(){
	if(this.value != ''){
		yusuan = this.value;
		btnzt();
	}else{
		yusuan = '';
		btnzt();
	}
});
//服务描述
document.getElementById("house_ms").addEventListener('input',function(){
	if(this.value != ''){
		house_ms = this.value;
		btnzt();
	}else{
		house_ms = '';
		btnzt();
	}
});
//提交按钮样式变换
function btnzt(){
	if(telnumber != '' || user_name != '' || house_news != '' || qy_name != '' || yxq_date != '' || yusuan != '' || house_ms != ''){
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
//生成cookie
function createcookie(){
	var cookyezhi = new Date;
	localStorage.setItem('cookyezhi', JSON.stringify(cookyezhi));
	return cookyezhi;
}
//委托房源提交
var clicktag = 0;
$('.wt_btn').click(function(){
	if(user_name=='' && telnumber=='' && qy_name == '' && house_news=='' && house_ms == '' && yusuan == '' && yxq_date == ''){
		return;
	}else{
		if(clicktag == 0){
			if(user_name == ''){
				mui.alert('姓名不能为空', '提示', function(){},'div');
				return;
			}
			if(telnumber == ''){
				mui.alert('手机号不能为空', '提示', function(){},'div');
				return;
			}else{
				if(!checkPhone('tel')){
					return;
				}
			}
			if(qy_name == ''){
				mui.alert('企业名称不能为空', '提示', function(){},'div');
				return;
			}
			if(house_news == ''){
				mui.alert('请选择企业所属行业', '提示', function(){},'div');
				return;
			}
			if(yusuan == ''){
				mui.alert('预算不能为空', '提示', function(){},'div');
				return;
			}
			if(yxq_date == ''){
				mui.alert('有效期不能为空', '提示', function(){},'div');
				return;
			}else{
				if(yxq_date>30){
					mui.alert('有效期不能超过30天', '提示', function(){},'div');
					return;
				}
			}
			if(house_ms == ''){
				mui.alert('请填写需求描述', '提示', function(){},'div');
				return;
			}
			clicktag = 1;
			yz_house_wt();
		}else{
			if(user_name=='' || telnumber=='' || qy_name == '' || house_news=='' || house_ms == '' || yusuan == '' || yxq_date == ''){
				return;
			}else{
				setTimeout(function () { clicktag = 0; }, 5000);
				mui.toast('已提交，请勿重复提交！',{ duration:'2000', type:'div' });
				return;				
			}
		}
	}
});
//验证并委托方法
function yz_house_wt(){
	mui.ajax(url + '/yskjApp/webApp/dataInfo/releaseDemand.do',{
		data:{
			'demandCategory': '2',
			'enterName': user_name,
			'enterPhone': telnumber,
			'enterpriseName': qy_name,
			'house': '',
			"demandType": house_news,
			'demandDesc': house_ms,
			'uid': localStorage.getItem('user_id'),
			'budget': yusuan,
			'effectiveTime': yxq_date
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if(data.success){
				mui.toast('提交成功，我们将会尽快为您处理',{ duration:2000, type:'div' });
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
}
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
					var alldata = data.data[0];
					console.log(JSON.stringify(alldata));
					for (var i in alldata) {
						if(i == 'companyname'){
							$('#qy_name').val(alldata[i]);
							qy_name = $('#qy_name').val();
							btnzt();
						}
					}
				}else{
//					mui.alert(data.message);
//					mui.toast('暂无数据',{ duration:2000, type:'div' });
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