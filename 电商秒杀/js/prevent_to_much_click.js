/**
 * Created by Administrator on 2017/9/28.
 */


/*
*  插件说明：防爆条  验证成功回调函数 返回true 否则没有返回值
* 参数$div_father   插件插入的位置父节点
* 参数callback   回调函数返回验证成功 的值true
*
* */
function Prevent_to_much($div_father,callback)
{
    this.$div_father=$div_father;  //接入的父节点
    this.callback=callback;
    this.$link=$('<link href="./css/prevent_to_much.css" rel="stylesheet">');
    $('head').append(this.$link);
    this.showUI();
    this.work();
}
Prevent_to_much.prototype.showUI=function(){
    var $div1=$('<div class="nc_scale"></div>');
    var $div2=$('<div class="nc_bg"></div>');
    var $span1=$('<span class="btn_slide"></span>');
    var $div3=$('<div class="scale_text"></div>');
    var $a=$('<a class="nc-lang-cnt">+'+'请按住滑块，拖动到最右边'+'</a>');
    $div3.append($a);
    $div1.append($div3);
    $($div1).append($span1);
    $div1.append($div2);
    this.$div_father.append($div1);
};
Prevent_to_much.prototype.work =function(){  
    var startX=0;
    var flg;
    var left1=0;
    $('.btn_slide').mousedown(function(){
        flg=true;
        startX=event.clientX;
    });
    $(document).mouseup(function(){    //'.btn_slide'
        flg = false;
        if($('.nc_bg').width()<256 && flg==false)
        {
            var time=setInterval(function(){
                left1--;
                $('.nc_bg').css({width:left1+'px'});
                $('.btn_slide').css({left:left1+'px'});
                if($('.nc_bg').width()==0)
                {
                    left1=0;
                    $('.nc_bg').width(0) ;
                    clearInterval(time);
                }
            },1)
        }
    });
    $(document).mousemove(function(){  //描述路径
        if(flg==true)
        {
            left1 =event.clientX-startX;
            if($('.nc_bg').width()>=0&&$('.nc_bg').width()<=256)
            {
                $('.nc_bg').css({width:left1+'px'});
                $('.btn_slide').css({left:left1+'px'});
            }
            if($('.nc_bg').width()>256)
            {
                $('.nc-lang-cnt').css({color:'white'});
                $('.nc-lang-cnt').html('验证成功');
                $('.btn_slide').unbind('mousedown');
                $('.btn_slide').unbind('mousemove');
                $('.btn_slide').unbind('mouseup');
                this.callback(true);
            }
        }
    }.bind(this))
};