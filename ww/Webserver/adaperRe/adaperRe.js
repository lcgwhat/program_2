function AdperRe()
{
	this.redis=require('redis');
	this.redis_cli=this.redis.createClient();
	
}
//redis   string方式写入数据
AdperRe.prototype.rset=function(key,value){
	console.log(key)
	this.redis_cli.set(key,JSON.stringify(value));
}
//redis     string方式读出数据
AdperRe.prototype.rget=function(key,callback){
	
	this.redis_cli.get(key,function(err,val){
		if(err==null)
		{
			callback(val);
		}
		else
		{
			callback(false)
		}
		
	})
}
//redis     list方式写入数据
AdperRe.prototype.left_push=function(list,value){
	this.redis_cli.lpush(list,JSON.stringify(value));
}
//redis     list方式读出数据
AdperRe.prototype.right_pop=function(list,callback){
	this.redis_cli.rpop(list,function(err,val){
		// console.log(val);
		if(val!=null)
		{
			callback(JSON.parse(val));
		}
		else
		{
			callback(false);
		}
	})
}
module.exports=new AdperRe();