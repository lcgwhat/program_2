function GoodsDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
}
//通过时间段找该时间端下的商品 用于首页显示商品
GoodsDao.prototype.find_goods=function(data_batchid,callback){   
	var sql="select t1.[time_id],t1.[data_batchid],t1.[start_time],t1.[end_time],t2.[goods_id],t2.[goods_name],t2.[goods_price],t2.[goods_inventory],t2.[goods_limit],t3.[photo] from time1 t1 inner join goods t2 on t1.[time_id]=t2.[time_id] and t1.[data_batchid]=? inner join goods_photo t3 on t2.[goods_id]=t3.[goods_id] and t3.[type_id]=1;";

	this.adapter_db.dball(sql,[data_batchid],function(res){
		//console.log('这是商品'+res)
		callback(res);
	})
}

//通过商品id查找对应的商品详细信息 用于商品详细页
GoodsDao.prototype.find_goods_by_goodsId=function(goods_id,callback){
	var sql='select t1.[time_id],t1.[data_batchid],t1.[start_time],t1.[end_time],t2.[goods_id],t2.[goods_name],t2.[goods_price],t2.[goods_inventory],t2.[goods_limit],t3.[photo] from time1 t1 inner join goods t2 on t1.[time_id]=t2.[time_id] and t2.[goods_id]=? inner join goods_photo t3 on t2.[goods_id]=t3.[goods_id] and t3.[type_id]=2;';
	this.adapter_db.dball(sql,[goods_id],function(res){
		callback(res);
	})
	
}
GoodsDao.prototype.buy=function(goods_id,kuc,callback){   //商品库存改变
	//console.log(kuc,goods_id)
	var sql="update goods set goods_inventory=? where goods_id=?;";
	this.adapter_db.dbrun(sql,[kuc,goods_id],function(res){
		if(res!=false)
		{
			callback(res);
		}
		else
		{
			callback(false);
		}
	})
};
GoodsDao.prototype.findGoods=function(goods_id,callback){
	var sql="select * from goods where goods_id=?;";
	this.adapter_db.dball(sql,[goods_id],function(res){
		callback(res);
	})
}


module.exports=new GoodsDao();