function ChatDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
	this.redis=require('../adaperRe/adaperRe.js');
}
ChatDao.prototype.findchat=function(userId,callback){
	var sql="select * from chat_history where from_id=? or to_id=? order by chat_time desc;";
	this.adapter_db.dball(sql,[userId,userId],function(res){
	
		callback(res);
	})
}
ChatDao.prototype.saveChat=function(chat_history){
	console.log(typeof(chat_history));
	this.redis.left_push('chat_history',chat_history);
}
module.exports=new ChatDao();