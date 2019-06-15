var adapter_db=require('./adaperdb/adaperdb.js');
var adapter_re=require('./adaperRe/adaperRe.js');
//商品  用户  订单  地址 时间段

var time2=setInterval(function(){
	var sql='select * from user;';   
adapter_db.dball(sql,[],function(res){  
	if(res!=false)
	{
		for(var i=0;i<res.length;i++)
		{
			console.log(res[i])
			adapter_re.rset('user'+res[i].user_id+'id',res[i]);
		}
	}
	else
	{
		console.log(res);
	}
})

var sql2="select * from goods t1 inner join time1 t2 on t1.time_id=t2.[time_id];";
adapter_db.dball(sql2,[],function(res){
	if(res!=false)
	{
		for(var i=0;i<res.length;i++)
		{
			adapter_re.rset('goods'+res[i].goods_id+'id',res[i]);
		}
		
	}
	else
	{
		console.log(res)
	}
}
)
var sql3="select * from order1;";
adapter_db.dball(sql3,[],function(res){
	if(res!=false)
	{
		
		for(var i=0;i<res.length;i++)
		{
			adapter_re.rset('order'+res[i].order_id+'id',res[i]);
		}
		
	}
	else
	{
		console.log(res)
	}
})
},2000)




var time = setInterval(function(){
	adapter_re.right_pop('order',function(val){
		
		var re=JSON.parse(val);
		
		if(val!=false)
		{
		 var sql="insert into order1(goods_id,site_id,user_id,price,amount,state_id,time,evaluate,date) values(?,?,?,?,1,2,datetime('now','localtime'),'',?);";
		 adapter_db.dbrun(sql,[re.goodsId,re.siteId,re.userId,re.spend,re.date],function(res){
			 console.log(res)
		 })
		}
		
	});
},500);

var time2 = setInterval(function(){
	adapter_re.right_pop('chat_history',function(val){
		var re=JSON.parse(val);
		console.log(re)
		if(val!=false)
		{
			var sql="insert into chat_history(from_id,to_id,content,chat_time) values(?,?,?,datetime('now','localtime'));";
			adapter_db.dbrun(sql,[re. from,re.to,re.content],function(res){
				console.log(res)
			})
		}
	})
},200)
// var sql="insert into order1(goods_id,site_id,user_id,price,amount,state_id,time,evaluate) values(10,4,18450087519,33,1,2,datetime('now','localtime'),'');";