
//客服DAO 
function CommentDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
	
}
CommentDao.prototype.find_server=function(id,psd,callback){    //客服

	var sql="select * from customer_service where id=? and psd=?;";
	this.adapter_db.dball(sql,[parseInt(id),psd],function(res){
		callback(res);
	})
}
CommentDao.prototype.banner=function(callback){
	var sql="select * from goods_photo where type_id=3;";
	this.adapter_db.dball(sql,[],function(res){
		callback(res);
	})
}

module.exports=new CommentDao();