function OrderDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
}
OrderDao.prototype.find_evaluate=function(goods_id,callback){  //通过商品id查找评论
	var sql='select t1.evaluate,t1.time,t2.[user_mark] from order1 t1 inner join user t2 on t1.[user_id]=t2.[user_id] and t1.[state_id]=1 and t1.[goods_id]=? order by t1.time desc;';
	this.adapter_db.dball(sql,[goods_id],function(res){
		callback(res)
	})
}
OrderDao.prototype.rng=function(callback){
	var sql="select * from order1 where (state_id=1 or state_id=4 )  order by time desc limit 0,10;";
	this.adapter_db.dball(sql,[],function(res){
		callback(res);
	})
}
OrderDao.prototype.showorder=function(userID,callback){        //已支付和待评价订单
	var sql="select t1.[user_id], t1.[order_id],t1.[goods_id],t1.[price],t1.[site_id],t1.[state_id],t1.[time],t1.[amount],t2.[photo],t4.[state_name] from order1 t1 inner join goods_photo t2 on t1.goods_id=t2.goods_id and t2.type_id=1 inner join user t3 on t1.[user_id]=t3.[user_id] and t3.[user_id]=? inner join order_state t4 on t1.[state_id]=t4.[state_id] and (t1.[state_id]=1 or t1.[state_id]=4) order by t1.time desc;";
	this.adapter_db.dball(sql,[userID],function(res){
		callback(res);
	})
}
OrderDao.prototype.notpay_order=function(userID,callback){     //待支付
	var sql="select t1.[user_id], t1.[order_id],t1.[goods_id],t1.[price],t1.[site_id],t1.[state_id],t1.[date],t1.[time],t1.[amount],t2.[photo],t4.[state_name] from order1 t1 inner join goods_photo t2 on t1.goods_id=t2.goods_id and t2.type_id=1 inner join user t3 on t1.[user_id]=t3.[user_id] and t3.[user_id]=? inner join order_state t4 on t1.[state_id]=t4.[state_id] and (t1.[state_id]=2 ) order by t1.time desc;";
	this.adapter_db.dball(sql,[userID],function(res){
		callback(res);
	})
}
OrderDao.prototype.useless_order=function(userID,callback){   //无效订单
	var sql="select t1.[user_id], t1.[order_id],t1.[goods_id],t1.[price],t1.[site_id],t1.[state_id],t1.[time],t1.[amount],t2.[photo],t4.[state_name] from order1 t1 inner join goods_photo t2 on t1.goods_id=t2.goods_id and t2.type_id=1 inner join user t3 on t1.[user_id]=t3.[user_id] and t3.[user_id]=? inner join order_state t4 on t1.[state_id]=t4.[state_id] and (t1.[state_id]=3 ) order by time desc;";
	this.adapter_db.dball(sql,[userID],function(res){
		callback(res);
	})
}
OrderDao.prototype.delete_order=function(orderID,callback){   //删除订单
	var sql="delete from order1 where order_id=?;";
	this.adapter_db.dbrun(sql,[orderID],function(res){
		if(res==true)
			{
				callback(res)
			}
			else
			{
				callback(false)
			}
	})
}
OrderDao.prototype.find_order=function(order_id,callback){
	
	var sql="select * from order1 where order_id=?;";
	this.adapter_db.dball(sql,[order_id],function(res){
		callback(res);
	})
}
OrderDao.prototype.complete_order=function(order_id,callback){ //支付订单
	var sql="update order1 set state_id=4 where order_id=?;";
	this.adapter_db.dbrun(sql,[order_id],function(res){
		if(res==true)
			{
				callback(res)
			}
			else
			{
				callback(false)
			}
	})	
}
OrderDao.prototype.cancel_order=function(order_id,callback){   //取消订单
	var sql="update order1 set state_id=3 where order_id=?;";
	this.adapter_db.dbrun(sql,[order_id],function(res){
		if(res==true)
			{
				callback(res)
			}
			else
			{
				callback(false)
			}
	})	
}
OrderDao.prototype.pinglun_order=function(order_id,callback){   //订单pinglun
	var sql="update order1 set state_id=1 where order_id=?;";
	this.adapter_db.dbrun(sql,[order_id],function(res){
		if(res==true)
			{
				callback(res)
			}
			else
			{
				callback(false)
			}
	})	
}
OrderDao.prototype.pinglun=function(order_id,pinglun,callback){    //评论
	var sql="update order1 set evaluate=? where order_id=?;";
	this.adapter_db.dbrun(sql,[pinglun,order_id],function(res){
		callback(res)
	})
}
module.exports=new OrderDao();