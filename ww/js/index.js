/**
 * Created by Administrator on 2017/9/22.
 */
$('#person').click(function(){
   if(sessionStorage.nowuser!=undefined)
   {
       window.location.href = 'person-center.html';
   }
    else
   {
       alert('请先登入');
   }
});
/*************************回到顶部****************************************/
var showUI=new ShowUI();
function myEvent(obj,ev,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }else{
        obj.addEventListener(ev,fn,false);
    }
}
myEvent(window,'load',function(){
    var oRTT=document.getElementById('rtt');
    var pH=document.documentElement.clientHeight; //网页可见区域高
    var timer=null;
    var scrollTop;
    window.onscroll=function(){
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;   //网页被卷去的高
        if(scrollTop>=pH){
            oRTT.style.display='block';
        }else{
            oRTT.style.display='none';
        }
        return scrollTop;
    };
    oRTT.onclick=function(){
        clearInterval(timer);
        timer=setInterval(function(){
            var now=scrollTop;  //当前位置
            var speed=(0-now)/10;  //上移的速度
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(scrollTop==0){
                clearInterval(timer);
            }
            document.documentElement.scrollTop=scrollTop+speed;
            document.body.scrollTop=scrollTop+speed;
        }, 30);
    }
});

/********************登入网页切换、退出*****************************/
if(sessionStorage.nowuser==undefined)
{
    $('#not_login').css({display:'block'});
    $('#ok_login').css({dispaly:'none'});
}
$('.to_log_re').click(function(){
   window.location.href='login-and-register.html'
});
$('#quite').click(function(){
    sessionStorage.removeItem('nowuser');
    window.location.href='index.html'
});
/******************************************/
var p=0;
var time3=setInterval(function(){
    p--;
    if(p ==-200)
    {
        p = 0;
    }
    $('.hero').css({transform:'translate3d(0px, '+p+'px'+', 0px)'});
},100);

var x=0;
/*****************下一场**************************/
var count_down2;
$('.next').click(function(){
    x = x-94;
    if(x<-376)
    {
        x = -376;
    }
    $('.scrollable-wrap').css({transform:'translate3d('+x+'px'+', 0px, 0px)'});
    var $div=$('.active1');
    if($div.next()[0]!=undefined) {
        $div.next().addClass('active1');
        $div.removeClass('active1');
        var obj3 =
        {
            from: '',
            to: 'server',
            type: 'getGoods',
            content: $('.active1').attr('id'),
            time: new Date()
        };
        client.send(JSON.stringify(obj3));

        count_down2.finishwork();

        if ($div.next().children().eq(1).text() == '已结束') {
            $('.title-r').css({display: 'none'});

        }
        else if ($div.next().children().eq(1).text() == '即将开抢') {
            $('.title-r').css({display: 'block'});
            $('.title-r').children().eq(0).html('距离本场开始:')
        }
        else {
            $('.title-r').css({display: 'block'});
            $('.title-r').children().eq(0).html('距离本场结束:')
        }
    }
});

/*****************上一场**************************/
$('.pre').click(function (){
    x=x+94;
    if(x>376)
    {
        x=376;
    }
    $('.scrollable-wrap').css({transform:'translate3d('+x+'px'+', 0px, 0px)'});
    var $div=$('.active1');
    if($div.prev()[0]!=undefined) {
        $div.prev().addClass('active1');
        $div.removeClass('active1');
        var obj3 =
        {
            from: '',
            to: 'server',
            type: 'getGoods',
            content: $('.active1').attr('id'),
            time: new Date()
        };
        client.send(JSON.stringify(obj3));

        count_down2.finishwork();

        console.log($div.prev().children().eq(1).text());
        if ($div.prev().children().eq(1).text() == '已结束') {
            $('.title-r').css({display: 'none'});
        }
        else if ($div.prev().children().eq(1).text() == '即将开抢') {
            $('.title-r').css({display: 'block'});
            $('.title-r').children().eq(0).html('距离本场开始:')
        }
        else {
            $('.title-r').css({display: 'block'});
            $('.title-r').children().eq(0).html('距离本场结束:')
        }
    }
});
/*********************************************************************88**/
var client=new WebSocket('ws://localhost:3030');
client.onopen=function(){
     console.log('连接服务器成功');
    var obj2=  //向服务器获取时间条
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'get_time_nav',
        content:'',
        time:new Date()
    };
    client.send(JSON.stringify(obj2));
    var obj4=  //荣誉墙
    {
        from:'',
        to:'server',
        type:'rng',
        content:'',
        time:new Date()
    };
    client.send(JSON.stringify(obj4));
    var obj5=  //banner
    {
        from:'',
        to:'server',
        type:'banner',
        content:'',
        time:new Date()
    };
    client.send(JSON.stringify(obj5));
    if(sessionStorage.nowuser==undefined)
    {}
    else
    {
        var obj=
        {
            from:sessionStorage.nowuser,
            to:'server',
            type:'oklogin',
            content:sessionStorage.nowuser,
            time:new Date()
        };
        client.send(JSON.stringify(obj));

    }
};

client.onmessage=function(mess){
    var obj_mess=JSON.parse(mess.data);
    console.log(obj_mess);
    switch (obj_mess.type)
    {
        case 'oklogin':
            $('#not_login').css({display:'none'});
            $('#ok_login')[0].style.display='block';
            $('#user_login').html('hi,'+obj_mess.content[0].user_mark);
            break;
        case 'rng':
            $('.hero').html('');
            for(var k=0;k<obj_mess.content.length;k++)
            {
                showUI.rayalWall($('.hero'),obj_mess.content[k].user_id,obj_mess.content[k].time)
            }
            break;
        case 'banner':
            //for(var z=0;z<obj_mess.content.length;z++)
            //{
            //    var $img=$('<img src='+obj_mess.content[z].photo+' >');
            //    $('#slides').append($img);
            //}
            $('#img1').prop('src',obj_mess.content[0].photo);
            $('#img2').prop('src',obj_mess.content[1].photo);
            $('#img3').prop('src',obj_mess.content[2].photo);
            $('#img4').prop('src',obj_mess.content[3].photo);
            break;
        case 'get_time_nav':
            $('.scrollable-wrap').html('');
            sessionStorage.nowtime=obj_mess.time;
            var now=obj_mess.time;
            var num=0;
            var cishu;
            for(var i=0;i<obj_mess.content.length;i++)
            {
                var start=obj_mess.content[i].start_time;
                var end=obj_mess.content[i].end_time;
                var text='';
                num++;
                if(now<start)
                {
                    text = '即将开抢';
                }
                else if(now>start && now<end)
                {
                    cishu = num;
                    text = '正在进行';
                }
                else if(now>end)
                {
                    text = '已结束';
                }
                showUI.time_nav($('.scrollable-wrap'),obj_mess.content[i].data_batchid,text,start,end,now);
            }
            x=-(cishu-5)*94;
            $('.scrollable-wrap').css({transform:'translate3d('+x+'px'+', 0px, 0px)'});
            var obj3=
            {
                from:'',
                to:'server',
                type:'getGoods',
                content:$('.active1').attr('id'),
                time:new Date()
            };
            client.send(JSON.stringify(obj3));
            break;
        case 'getGoods':
            sessionStorage.nowtime=obj_mess.time;
            if(obj_mess.content[0]!=undefined)
            {
                $('.qg-limit-list').html('');
                for(var j=0;j<obj_mess.content.length;j++)
                {

                    var text2='';
                    var start1=obj_mess.content[j].start_time;
                    var end1=obj_mess.content[j].end_time;
                    var now1=obj_mess.time;
                    if(now1<start1)
                {
                    text2 = '即将开抢';
                }
                else if(now1>start1 && now1<end1)
                {
                    text2 = '正在进行';
                }
                else if(now1>end1)
                {
                    text2 = '已结束';
                }
                    showUI.goods($('.qg-limit-list'),obj_mess.content[j].photo,obj_mess.content[j].goods_name,obj_mess.content[j].goods_price,text2,obj_mess.content[j].goods_inventory,obj_mess.content[j].goods_id);
                }
                var end2=change($('.active1').attr('data_end'))-change(sessionStorage.nowtime);
                count_down2=new Mytime($('#addtime'),end2,function ()   //倒计时
                {
                    window.location="index.html";
                });
                $('.qg-item').click(function(){

                    sessionStorage.goods_id=$(this).attr('goods_id');
                    window.location.href='goods-center.html';
                });
            }
            break;
    }
};

function change(str1)
{
    var sec=str1%100;
    var min=Math.floor(str1/100%100);
    var hour=Math.floor(str1/10000);
    var res=hour*3600+min*60+sec;
    return res;
}

