function timeDao()
{
	this.adapter_db=require('../adaperdb/adaperdb.js');
}
timeDao.prototype.get_time_nav=function(callback){
	var sql='select * from time1;';
	this.adapter_db.dball(sql,[],function(res){
		if(res==false)
		{
			callback(false)
		}
		else
		{
			callback(res);
		}
	});
}
module.exports=new timeDao();