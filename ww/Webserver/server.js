var WebsocketServer=require('ws').Server;   //ws模块应用
var wss=new WebsocketServer({port:3030});   //socket端口配置
var userDao = require('./userDao/userDao.js');    //用户表DAO
var custerDao = require('./commentDao/commentDao.js');  //客服表DAO
var time_nav = require('./commentDao/timeDao.js');   //时间表
var siteDao = require('./commentDao/SiteDao.js');     //地址表dao  
var chatDao = require('./commentDao/chatDao.js'); 
var goodsDao = require('./goodsDao/goodsDao.js');    //商品表DAO
var orderDao = require('./orderDao/orderDao.js');     //订单表DAO   
var miaoDao = require('./RedisDao/miaoDao.js')
var userList=[];               //登入用户的socket 数组

function newtime()
{
    var today=new Date();
	var str=''
	var hour=today.getHours();
	var min=today.getMinutes();
	var second=today.getSeconds();
	var nowtime=second;
	if(hour<10)
	{
		str+='0'+hour;
	}
	else
	{
		str+=hour;
	}
	if(min<10)
	{
		str+='0'+min;
	}
	else
	{
		str+=min;
	}
	if(second<10)
	{
		str+='0'+second;
	}
	else
	{
		str+=second;
	}
	
    return str;
}
wss.on('connection',function(socket){    //socket服务器阻塞到客户端发送消息
	console.log('有人连接了');
	socket.on('message',function(msg){   //返回消息给客户端
		var obj_mse=JSON.parse(msg);
		
		console.log(obj_mse);
		
		switch (obj_mse.type)
		{
			case 'login':       //服务器处理登入请求
			
					userDao.user_find(obj_mse.content.name,obj_mse.content.psw,function(res){
						console.log(res)
						var return_obj= {
						from: 'server',
						to: obj_mse.content.name,
						type: 'login',
						content: res,       
						time: new Date()
					};
					socket.send(JSON.stringify(return_obj));
					});
					
			break;
			
			
			case 'oklogin':   //服务器处理客户端页面跳转重新登入服务器请求
					userDao.user_find_byid(obj_mse.content,function(res){
						if(res!=false)
						{
							userList[obj_mse.content]=socket;	
							var return_obj= {
							from: 'server',
							to: obj_mse.content.name,
							type: 'oklogin',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
						}
					})
					userList[obj_mse.content]=socket;
			break;
			case 'rng':
					orderDao.rng(function(res){
						var return_obj= {
							from: 'server',
							to: 'client',
							type: 'rng',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
					})	
			break;
			case 'banner':
				custerDao.banner(function(res){
					var return_obj= {
							from: 'server',
							to: 'client',
							type: 'banner',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
				})
			break;
			case 'change_name':
				userDao.change_name(obj_mse.content,parseInt(obj_mse.from),function(res){
					var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'change_name',
								content: res,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				} )
			break;
			case 'site':   //收货地址
					userDao.find_site(obj_mse.content,function(res){					
							var return_obj= {
							from: 'server',
							to: obj_mse.content,
							type: 'site',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
					})
			break;
			
			case 'register':   //服务器处理注册情求
					userDao.adduser(obj_mse.content.name,obj_mse.content.psw,function(res){	
							var return_obj= {
							from: 'server',
							to: '',
							type: 'register',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
					})
			break;
			case 'comment_login':   //客服登入
					custerDao.find_server(obj_mse.content.name,obj_mse.content.psw,function(res){
						var return_obj= {
							from: 'server',
							to: '',
							type: 'comment_login',
							content: res,       
							time: new Date()
							};
							socket.send(JSON.stringify(return_obj));
					})
					userList[obj_mse.content.name]=socket;
			break;
			case 'get_time_nav':  //返回秒杀的各个时间段
					time_nav.get_time_nav(function(res){
					
							var return_obj= {
							from: 'server',
							to: '',
							type: 'get_time_nav',
							content: res,       
							time: newtime()
							};
							socket.send(JSON.stringify(return_obj));
					})
			break;
			case 'getGoods': //返回首页相应时间段下的商品
					goodsDao.find_goods(obj_mse.content,function(res){
						var return_obj= {
							from: 'server',
							to: '',
							type: 'getGoods',
							content: res,       
							time: newtime()
							};
							socket.send(JSON.stringify(return_obj));
					});
			break;
			case 'goods_id':   //返回商品页面显示用
					goodsDao.find_goods_by_goodsId(parseInt(obj_mse.content),function(res){
						var return_obj= {
								from: 'server',
								to: '',
								type: 'goods_id',
								content: res,       
								time: newtime()
								};
								socket.send(JSON.stringify(return_obj));
					})	
			break;
			case 'evaluate':   //返回商品评价显示用
					orderDao.find_evaluate(parseInt(obj_mse.content),function(res){
						console.log(res)
						var return_obj= {
								from: 'server',
								to: '',
								type: 'evaluate',
								content: res,       
								time: newtime()
								};
								socket.send(JSON.stringify(return_obj));
					})
			break;
			case 'maimai':   //秒杀
			var res;
			if(userList[obj_mse.from]!=undefined && userList[obj_mse.from].readyState==1)
			{
				miaoDao.goodsYan((obj_mse.content.goods_id),newtime(),function(res1){
					res=res1;
					var price=res1.price;
					var kuc=res1.kuc;
					console.log('库存')
					console.log(res1)
						if(res.jie==true)
						{
							
							console.log('id'+obj_mse.content.user)
							miaoDao.orderYan(parseInt(obj_mse.content.user),parseInt(obj_mse.content.goods_id),function(res2){
								if(res2==false)
								{
									res='您已购买过该商品'
									var return_obj= {
									from: 'server',
									to: '',
									type: 'maimai',
									content: res,       
									time: newtime()
									};
									userList[obj_mse.from].send(JSON.stringify(return_obj));
								}
								else
								{
								//地址验证
									miaoDao.siteYan(obj_mse.content.user,function(res3){
										// console.log(res)
										
										if(res3==false)
										{
											res='请绑定地址';
											var return_obj= {
											from: 'server',
											to: '',
											type: 'maimai',
											content: res,       
											time: newtime()
											};
											userList[obj_mse.from].send(JSON.stringify(return_obj));
										}
										else
										{
											
											miaoDao.order(parseInt(obj_mse.from) ,price,parseInt(obj_mse.content.goods_id),res3.site,newtime(),function(res){
												var return_obj= {
											from: 'server',
											to: '',
											type: 'maimai',
											content: res,       
											time: newtime()
											};
											userList[obj_mse.from].send(JSON.stringify(return_obj));	
											});
											goodsDao.buy(parseInt(obj_mse.content.goods_id),parseInt(kuc-1),function(res){
												console.log(res);
											})
										}
									})
								}
							})
						}
						else
						{
							//商品不在秒杀时间端
							var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'maimai',
								content: res,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						}
				})
				
			}
			else
			{
				res='请重新登入';
				var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'maimai',
								content: res,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
			}	
			break;
			case 'topup_money':    // 充钱
				userDao.user_find_byid(parseInt(obj_mse.from),function(res){  //查询原来账户上的余额
					
						var topup=res[0].user_money+parseInt(obj_mse.content); 
						userDao.topup_money(parseInt(obj_mse.from),topup,function(res){ //充值
							
							var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'topup_money',
								content: res,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						})
				})
			
			break;
			case 'changePsd':    //改密码
				userDao.user_find_byid(parseInt(obj_mse.from),function(res){
					
					if(res[0].user_psd!=obj_mse.content.old)   //输入的原密码不正确
					{
						var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'changePsd',
								content: -1,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
					}
					else
					{
						userDao.changePsd(parseInt(obj_mse.from),obj_mse.content.newPsd,function(res1){
							console.log(res1);
							var return_obj= {
								from: 'server',
								to: 'obj_mse.from',
								type: 'changePsd',
								content: res1,       
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						})
					}
				})
			break;
			case 'addsite':   //添加地址
				siteDao.addsite(parseInt(obj_mse.from),obj_mse.content,function(res){
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'addsite',
								content: {flag:res,site: obj_mse.content},     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'deleteSite':  //删除地址
				siteDao.deletesite(parseInt(obj_mse.content),function(res){
					
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'deleteSite',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'changeMysite':  //改收货地址
				userDao.changMysite(parseInt(obj_mse.from),parseInt(obj_mse.content),function(res){
					console.log(res);
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'changeMysite',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'myorder':   //完成订单的显示
				orderDao.showorder(parseInt(obj_mse.from),function(res){
					
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'myorder',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'order_notpay':   //未支付订单
				orderDao.notpay_order(parseInt(obj_mse.from),function(res){
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'order_notpay',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'order_useless':    //无效订单
				orderDao.useless_order(parseInt(obj_mse.from),function(res){
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'order_useless',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'deleteOrder':   //删除订单
				orderDao.delete_order(parseInt(obj_mse.content),function(res){
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'deleteOrder',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
				})
			break;
			case 'paymoney':
				var user_money; 
				var price;
				var res4;
				userDao.user_find_byid(parseInt(obj_mse.from),function(res){
					
					user_money=res[0].user_money;
					console.log(user_money)
					
				})
				orderDao.find_order(parseInt(obj_mse.content),function(res){
						price=res[0].price;
						var a;
						var b;
						if(price<user_money)
						{
							console.log(user_money,price)
							console.log('woyouqian')
							userDao.pay(parseInt(user_money-price),parseInt(obj_mse.from),function(res1){
								a=res1;
								console.log(res1)
							})
							orderDao.complete_order(parseInt(obj_mse.content),function(res2){
								b=res2;
								console.log(res2)
								if(a==true&&b==true)
							{
								res4='完成支付';
								var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'paymoney',
								content: res4,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
							}
							else
							{
								res4='未完成支付';
								var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'paymoney',
								content: res4,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
							}
							})
							
						}
						else
						{
							
							//console.log('余额不足')
							res4='余额不足';
							var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'paymoney',
								content: res4,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						}
					})
				
			break;
			case 'cancel':
				var goodsId;
				var goodsKu;
				orderDao.find_order(parseInt(obj_mse.content),function(res){
					//console.log(res);
					goodsId=res[0].goods_id;
					goodsDao.findGoods(goodsId,function(res){
						goodsKu=res[0].goods_inventory;
						var a;
						var b;
						var res4;
						//console.log(goodsKu);
						goodsDao.buy(parseInt(goodsId),parseInt(goodsKu+1),function(res2){
							a=res2;
							console.log(res);
						})
						orderDao.cancel_order(parseInt(obj_mse.content),function(res3){
							b=res3;
							if(a==true&&b==true)
						{
							res4="成功取消订单"
						}
						else
						{
							res4="不成功取消订单"
						}
						var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'cancel',
								content: res4,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						})
						
					})
					
				})
				
			break;
			case 'pinglun':
				var a;
				var b;
				orderDao.pinglun_order(parseInt(obj_mse.content.orderId),function(res){
					console.log(res)
					a=res;
				})
				orderDao.pinglun(parseInt(obj_mse.content.orderId),obj_mse.content.pinglun,function(res){
					console.log(res);
					var res4;
					b=res;
					if(a==true&&b==true)
					{
						res4='评论成功';
					}
					else
					{
						res4='评论失败';
					}
					var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'pinglun',
								content: res4,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
						
				})
			break;
			case 'myMessage':
			chatDao.findchat(parseInt(obj_mse.content),function(res){
				
				var return_obj= {
								from: 'server',
								to: obj_mse.from,
								type: 'myMessage',
								content: res,     
								time: newtime()
								};
								userList[obj_mse.from].send(JSON.stringify(return_obj));
			})
			break;
			case 'chat':
				chatDao.saveChat(JSON.stringify(obj_mse));
				if(userList[obj_mse.to]!=undefined && userList[obj_mse.to].readyState==1)
				{
					userList[obj_mse.to].send(msg)
				}
			break;
		}
	})
})