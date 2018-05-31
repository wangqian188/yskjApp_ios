var user_name = '';//用户姓名
var telnumber = '';//手机号
var qy_name = '';//企业名称
var qy_tel = '';//企业电话
var qy_bt = '';//企业网址
//var qy_logo = '';//企业logo
var house_news = '';//所属行业
var add_area = '';//所在区域
var jyfw = '';//经营范围
var qyjj = '';//企业简介
var areaArr = [];//区域
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
var picker1 = new mui.PopPicker({
	layer: 1
});
picker1.pickers[0].setSelectedIndex(0);
//目标区域的弹出框选择
function sshy(){//
	picker.show(function(SelectedItem) {
		var sel_val = picker.getSelectedItems();
		$('#house_news').val(sel_val[0].text);
		house_news = $('#house_news').val();
		btnzt();
	});
}
qy();//区域
//目标区域的弹出框选择
function szqy(){
	picker1.setData(areaArr);
	picker1.pickers[0].setSelectedIndex(0);
	picker1.show(function(SelectedItem) {
		var sel_val = picker1.getSelectedItems();
		$('#add_area').val(sel_val[0].text);
		add_area = $('#add_area').val();
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
//企业电话
document.getElementById("qy_tel").addEventListener('input',function(){
	if(this.value != ''){
		qy_tel = this.value;
		btnzt();
	}else{
		qy_tel = '';
		btnzt();
	}
});
//企业网址
document.getElementById("qy_bt").addEventListener('input',function(){
	if(this.value != ''){
		qy_bt = this.value;
		btnzt();
	}else{
		qy_bt = '';
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
//提交按钮样式变换
function btnzt(){
	if(telnumber != '' || user_name != '' || qy_name != '' || qy_tel != '' || qy_logo != '' || house_news != '' || add_area != '' || jyfw != '' || qyjj != ''){
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
	if(user_name=='' && telnumber=='' && qy_name == ''&& qy_tel == ''&& f1.length == '0' && house_news==''&& add_area == ''&& jyfw == ''&& qyjj == ''){
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
			}
			if(qy_name == ''){
				mui.alert('企业名称不能为空', '提示', function(){},'div');
				return;
			}
			if(qy_tel == ''){
				mui.alert('企业电话不能为空', '提示', function(){},'div');
				return;
			}
			if(f1.length == '0'){
				mui.alert('请选择您的企业logo', '提示', function(){},'div');
				return;
			}
			if(house_news==''){
				mui.alert('请选择企业所属行业', '提示', function(){},'div');
				return;
			}
			if(add_area == ''){
				mui.alert('请选择企业所在区域', '提示', function(){},'div');
				return;
			}
			if(jyfw == ''){
				mui.alert('请填写企业经营范围', '提示', function(){},'div');
				return;
			}
			if(qyjj == ''){
				mui.alert('请填写企业简介', '提示', function(){},'div');
				return;
			}
			clicktag = 1;
			yz_house_wt();
		}else{
			if(user_name=='' || telnumber=='' || qy_name == ''|| qy_tel == '' || f1.length == '0' || house_news=='' || add_area == '' || jyfw == '' || qyjj == ''){
				return;
			}else{				
				setTimeout(function () { clicktag = 0; }, 5000);
				mui.toast('已提交，请勿重复提交！',{ duration:'2000', type:'div' });
				return;
			}
		}
	}
});
//验证图片是否为空
function yz_house_wt(){
	if(f1.length == 0){//如果没有图片不执行上传
		
	}else{
		imgupgrade();//上传图片		
	}	
}
//验证并委托方法
function pic_tijiao(){
	console.log('==============================================');
	console.log(user_name);
	console.log(telnumber);
	console.log(qy_name);
	console.log(qy_tel);
	console.log(qy_bt);
	console.log(qy_logo);
	console.log(house_news);
	console.log(add_area);
	console.log(jyfw);
	console.log(qyjj);
	console.log(localStorage.getItem('user_id'));
	console.log('==============================================');
	//加入会员
	mui.ajax(url + '/yskjApp/webApp/dataInfo/membership.do',{
		data:{
			'name': user_name,
			'phone': telnumber,
			'enterpriseName': qy_name,
			'enterprisePhone': qy_tel,
			'enterpriseWebsite': qy_bt,
			'logoImg': qy_logo,
			'industry': house_news,
			'location': add_area,
			'ranges': jyfw,
			'enterpriseDesc': qyjj,
			'house': '',
			'uid': localStorage.getItem('user_id')
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
				mui.alert(data.message,'提示','确定',function(){},'div');
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(type);
		}
	});	
			
}
function qy(){
	//获取所有的区域
	mui.ajax(Interface_url + '/yhcms/web/lpjbxx/getLpcity.do',{
		data:{},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(data.success){
				var arr = data.data.xzqy;
				for (var i=0; i<arr.length; i++) {
					var obj = {};					
					for (var j in arr[i]) {
						if(j == 'fdname'){
							obj.text = arr[i][j];
							areaArr.push(obj);
						}
					}
				}
			}else{
				
			}
		},
		error:function(xhr,type,errorThrown){
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