function UserDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
}
UserDao.prototype.user_find=function(id,psd,callback){    //查数据
	var sql = 'select * from user where user_id=? and user_psd=?;';
	this.adapter_db.dball(sql,[id,psd],function(res){
		if(res=='')
		{
			callback(false);
		}
		else{
			callback(res);
		}
	})
}

UserDao.prototype.user_find_byid=function(id,callback){    //查数据
	var sql='select * from user where user_id=?;';
	this.adapter_db.dball(sql,[parseInt(id)],function(res){
		if(res=='')
		{
			callback(false);  //返回值为 false 数据库没有该数据
		}
		else{
			callback(res);
		}
	})
}


UserDao.prototype.adduser=function(id,psd,callback){  //注册
	var sql="insert into user values(?,?,'陈绮贞',0,'img/photo/photo2.jpg','',date('now','localtime'));";
	this.adapter_db.dbrun(sql,[parseInt(id),psd],function(res){
		if(res==true)
		{
			callback(true);
		}
		else
		{
			callback(false);
		}
	})
}


UserDao.prototype.find_site=function(user_id,callback){    
	var sql="select t1.user_id,t1.[user_getsite],t2.[site_id],t2.[site] from user t1 inner join site t2 on  t1.user_id=t2.[user_id] and t1.[user_id]=?;";
	this.adapter_db.dball(sql,[parseInt(user_id)],function(res){
		
		callback(res);
	})
	
}
UserDao.prototype.topup_money=function(user_id,money,callback){       //充钱
	
	var sql="update user set user_money=?  where user_id=? ;";
	this.adapter_db.dbrun(sql,[money,user_id],function(res){
		if(res==true)
		{
			callback(res);
		}
		else
		{
			callback(false);
		}
		
	})
}

UserDao.prototype.changePsd=function(user_id,newpsd,callback){   //改密码
	var sql="update user set user_psd=? where user_id=?;";
	this.adapter_db.dbrun(sql,[newpsd,user_id],function(res){
		if(res==true)
		{
			callback(res);
		}
		else
		{
			callback(false);
		}
	})
}

UserDao.prototype.changMysite=function(user_id,siteId,callback){   //改收货地址
	var sql="update user set user_getsite=?  where user_id=? ;";
	this.adapter_db.dbrun(sql,[siteId,user_id],function(res){
		if(res==true)
		{
			callback(res);
		}
		else
		{
			callback(false);
		}
	})
}
UserDao.prototype.pay=function(user_money,user_id,callback){   //付钱
		var sql="update user set user_money=? where user_id=?;";
		this.adapter_db.dbrun(sql,[user_money,user_id],function(res){
			callback(res)
		})
}
UserDao.prototype.change_name=function(user_name,user_id,callback){
	var sql="update user set user_mark=? where user_id=?;";
	this.adapter_db.dbrun(sql,[user_name,user_id],function(res){
		callback(res);
	})
}
module.exports=new UserDao();

