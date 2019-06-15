function SiteDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
}
SiteDao.prototype.addsite=function(userId,site,callback){
		var sql="insert into site(user_id,site ) values(?,?);";
		this.adapter_db.dbrun(sql,[userId,site],function(res){
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
SiteDao.prototype.deletesite=function(siteId,callback){
	var sql="delete from site where site_id=?;";
	this.adapter_db.dbrun(sql,[siteId],function(res){
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
module.exports=new SiteDao();