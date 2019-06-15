function Adapterdb()
{
	var sqlite3=require('sqlite3');
	this.db = new sqlite3.Database('Webserver/taobao.db');
}
//数据库all适配器
Adapterdb.prototype.dball=function(sql,parameter,callback){
	this.db.all(sql,parameter,function(err,rows){
		console.log(err)
	
		if(err==null)
		{
			callback(rows);
		}
		else
		{
			callback(false);
		}
	})
}
Adapterdb.prototype.dbrun=function(sql,parameter,callback){
	this.db.run(sql,parameter,function(res){
	
		if(res==null)
		{
			callback(true);
		}
		else
		{
			callback(false);
		}
	})
}
module.exports=new Adapterdb();