/**
 * Created by Administrator on 2017/9/25.
 */

/***********************倒计时模块插件********************************88*/
/*
*  输入一个数 以时分秒的形式 倒数计时
*  参数 $div1     模块插件防止的位置
* 参数sec       时间
* 参数callback     回调函数计时结束返回
* */
function Mytime($div1,sec,callback){
    this.$div1=$div1;
    this.sec = sec;
    this.callback=callback;
    this.$new_div;
    this.timer1;
    this.showui();
    this.startwork();
}
Mytime.prototype.showui=function () {
    this.$div1.html('');
    var str='';
    var h = Math.floor(this.sec/3600%24);  //时
    var m= Math.floor(this.sec/60%60);    //分
    var second=this.sec-h*3600-m*60;         //秒

    if(h<10)
    {
        str+='0'+h;
    }
    else
    {
        str+=h;
    }
    if(m<10)
    {
        str+=':'+'0'+m;
    }
    else
    {
        str+=':'+m;
    }
    if(second<10)
    {
        str+=':'+'0'+second;
    }
    else
    {
        str+=':'+second;
    }
    this.$new_div=$('<span id="tim">'+str+'</span>');
    this.$new_div.css({
        width:'80px',
        height: '34px',
        lineHeight: '40px',
        textAlign: 'center',
        verticalAlign: 'top',
        color: '#666',
        fontSize: '100%'
    });
    (this.$div1).append( this.$new_div);
};
Mytime.prototype.startwork=function()
{
   this.timer1=setInterval(function(){
        //console.log(this.sec);
        this.sec--;
        var str='';
        var h = Math.floor(this.sec/3600%24);  //时
        var m= Math.floor(this.sec/60%60);    //分
        var second=this.sec-h*3600-m*60;         //秒
        //console.log(this.$new_div.html(this.sec));
        if(h<10)
        {
            str+='0'+h;
        }
        else
        {
            str+=h;
        }
        if(m<10)
        {
            str+=':'+'0'+m;
        }
        else
        {
            str+=':'+m;
        }
        if(second<10)
        {
            str+=':'+'0'+second;
        }
        else
        {
            str+=':'+second;
        }
        $('#tim').html(str);
        if(this.sec ==0)
        {
            clearInterval(this.timer1);
            if(this.callback instanceof Function)
            {
                this.callback();
            }
        }
    }.bind(this),1000);
};
Mytime.prototype.finishwork=function(){
  clearInterval( this.timer1);
};