//正式服接口地址
var url = 'http://app.ursoffice.com';//app后台正式服域名(Mr.long /yskjApp/)
var Interface_url = 'http://omc.urskongjian.com';//正式服域名
var img_url = 'http://omc.urskongjian.com:81/';//图片的地址

//新正式服接口地址
//var url = 'http://47.92.1.2:8080';//app后台正式服域名(Mr.long /yskjApp/)
//var Interface_url = 'http://47.92.6.78';//正式服域名
//var img_url = 'http://47.92.6.78:81/';//图片的地址

//测试服接口地址 
//var url = 'http://116.62.68.26:8080';//测试服接口地址
//var Interface_url = 'http://116.62.68.26:8080';//测试接口地址
//var img_url = 'http://116.62.68.26/';//图片的地址
function denglu_zt(cookie){
	mui.ajax(url + '/yskjApp/appYskj/V1/landState.do',{
		data:{
			"cookie":cookie,
		},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(data.success){
				alert(data.success);
			}else{
				
			}
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
		}
	});
}