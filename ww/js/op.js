/**
 * Created by Administrator on 2017/9/28.
 */
function Op()
{

}
Op.prototype.typegd=function(now1,start1,end1,callback){
    var text2='';
    if(now1<start1)
    {
        text2 = '即将开抢';
    }
    else if(now1>start1 && now1<end1)
    {
        text2 = '点击秒杀';
    }
    else if(now1>end1)
    {
        text2 = '已结束';
    }
    callback(text2);
};