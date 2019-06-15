function MiaoDao ()
{
	this.redis=require('../adaperRe/adaperRe.js')
	this.db=require('../adaperdb/adaperdb.js')
}
MiaoDao.prototype.goodsYan=function(goods_id,nowtime,callback){
	console.log('商品'+goods_id);
	console.log('这时候'+nowtime)
	var goods;
	var user;
	var time;
	var kuc1;
	
	this.redis.rget('goods'+goods_id+'id',function(res){
		// console.log(JSON.parse(res))
		goods=JSON.parse(res);
		console.log(goods.goods_inventory);
		kuc1=goods.goods_inventory;
		console.log(kuc1,goods.goods_price)
			if(nowtime>goods.end_time)
		{
			callback('秒杀结束')
		}
		else if(nowtime<goods.start_time)
		{
			callback('秒杀还未开场')
		}
		else	
		{
			if(goods.goods_inventory=0)
			{
				callback('商品已经卖光了')
			}
			else
			{
				res1={jie:true,price:goods.goods_price,kuc:kuc1}
				console.log(res1)
				callback(res1)
			}
		}
	})
}
MiaoDao.prototype.orderYan=function(user_id,goods_id,callback){   //订单验证是否买过商品
	var sql="select * from user t1 inner join order1 t2 on t1.user_id=t2.[user_id] inner join site t3 on t1.user_getsite=t3.[site_id] and (t2.[state_id]=1 or t2.[state_id]=2 or t2.[state_id]=4) and t1.[user_id]=? and t2.goods_id=?;";
	this.db.dball(sql,[user_id,goods_id],function(res){
		if(res==false)
		{
			callback(true)
		}
		else
		{
			callback(false)
		}
	})
};
MiaoDao.prototype.siteYan =function(user_id,callback){   //地址验证
	this.redis.rget('user'+user_id+'id',function(res){
		var user=JSON.parse(res);
		console.log(user);
		
		if(user.user_getsite!='')
		{
			var res1={jieg:true,site:user.user_getsite}
			callback(res1)
		}
		else
		{
			callback(false)
		}
	})
}
MiaoDao.prototype.order=function(uid,price,gid,sid,date,callback){
	//用户id  花费的钱     商品id  地址id 
	//存缓存
	var order={userId:uid,spend:price,goodsId:gid,siteId:sid,date:date}
	this.redis.left_push('order',JSON.stringify(order));
	callback('秒杀成功')
}
module.exports=new MiaoDao();