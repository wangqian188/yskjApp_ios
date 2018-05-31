var sel_industry = '';//行业
var sel_location = '';//区域
var nav = $('.top_nav li');
//所属行业
$('.sshy').click(function(){
	hy();
	$(this).css('color','#2a72d8');
	$('.ssqy').css('color','#666666');
	$('.zc_box').css('display','block');
	$('.bottom_box').css('overflow','hidden');
	$('.tj_box1').css('display','none');
	$('.tj_box').css('display','block');
	$(this).find('.nav_jt').attr('class','mui-icon mui-icon-arrowup nav_jt');
	$('.nav_jt').eq(1).attr('class','mui-icon mui-icon-arrowdown nav_jt');
});
//所属区域
$('.ssqy').click(function(){
	qy();
	$(this).css('color','#2a72d8');
	$('.sshy').css('color','#666666');
	$('.zc_box').css('display','block');
	$('.bottom_box').css('overflow','hidden');
	$('.tj_box').css('display','none');
	$('.tj_box1').css('display','block');
	$(this).find('.nav_jt').attr('class','mui-icon mui-icon-arrowup nav_jt');
	$('.nav_jt').eq(0).attr('class','mui-icon mui-icon-arrowdown nav_jt');
});
//重置箭头方向
function nav_reset(){
	var jt_res = $('.nav_jt');
	for (var i=0; i<jt_res.length; i++) {
		$('.nav_jt').eq(i).attr('class','mui-icon mui-icon-arrowdown nav_jt');
	}
	$('.ssqy').css('color','#666666');
	$('.sshy').css('color','#666666');
}
//点击遮罩隐藏筛选
$('.zc_box').click(function(){
	nav_reset();
	$('.zc_box').css('display','none');
	$('.bottom_box').css('overflow','auto');
});
//阻止事件冒泡
$('.tj_box').click(function(){
	return false;
});
$('.tj_box1').click(function(){
	return false;
});
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
				var xzqyData = data.data.xzqy;
				var area_leftstr = '';
				var osp = '<span onclick="clks(0)">不限</span>';
				for (var i=0; i<xzqyData.length; i++) {
					area_leftstr += '<span id="'+xzqyData[i].fdcode+'" onclick="clks('+(i+1)+')">'+xzqyData[i].fdname+'</span>';
				}
				$('.tj_box1').html(osp + area_leftstr);
			}else{
				
			}
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
		}
	});
}
var hy_arr = [
{value:'bx',text:'不限'},
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
//属于行业
function hy(){
	var area_leftstr = '';
	for (var i=0; i<hy_arr.length; i++) {
		area_leftstr += '<span onclick="clk_hy('+i+')">'+hy_arr[i].text+'</span>';
	}
	$('.tj_box').html(area_leftstr);
}
//选择所属行业
function clk_hy(idx){
	$('.zc_box').css('display','none');
	$('.bottom_box').css('overflow','auto');
	$('.tj_box span').css('color','#666666');
	$('.tj_box span').eq(idx).css('color','#2a72d8');
	$('.sshy span').eq(0).html($('.tj_box span').eq(idx).text());
	sel_industry = $('.tj_box span').eq(idx).text();
	if(idx == 0){
		$('.sshy span').eq(0).html('所属行业');
		sel_industry = '';
	}
	vip_list();
}
//选择所属区域
function clks(idx){
	$('.zc_box').css('display','none');
	$('.bottom_box').css('overflow','auto');
	$('.tj_box1 span').css('color','#666666');
	$('.tj_box1 span').eq(idx).css('color','#2a72d8');
	$('.ssqy span').eq(0).html($('.tj_box1 span').eq(idx).text());
	sel_location = $('.tj_box1 span').eq(idx).text();
	if(idx == 0){
		$('.ssqy span').eq(0).html('所属区域');
		sel_location = '';
	}
	vip_list();
}
//列表数据请求
function vip_list(){
	mui.ajax(url + '/yskjApp/webApp/dataInfo/listMemberEnterprise.do',{
		data:{
			'industry': sel_industry,//行业
			'location': sel_location//区域
		},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			if(data.success){
				var allData = data.data;
				$('#vip_list').html('');
				if(allData.length == 0){
					$('#vip_list').html('<p class="kong">没有符合该条件的会员企业</p>')
				}
				var str = '';
				for (var i=0; i<allData.length; i++) {
					str += '<li style="background: url('+allData[i].logoImg+')no-repeat center;background-size: 100% auto;" onclick="list_detail('+allData[i].id+')"><div class="qy_news"><p class="qy_name">'+allData[i].enterpriseName+'</p><p class="qy_tip"><span></span><span>'+allData[i].ranges+'</span></p></div></li>';
					
				}
				$('#vip_list').append(str);
				console.log(JSON.stringify(allData));
			}else{
				
			}
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
		}
	});
}
vip_list();//默认执行
//点击查看详情
function list_detail(qy_id){
//	alert(id);
	mui.openWindow({ 
		url:'./qy_detail.html',
		id:'qy_detail',
		extras:{
	    	'qy_id':qy_id
	    }
	})
}