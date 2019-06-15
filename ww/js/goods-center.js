/**
 * Created by Administrator on 2017/9/23.
 */
var showUI=new ShowUI();   //创建一个新的显示对象
var op=new Op();   //创建一个新的操作方法对象
function newtime()
{
    var today=new Date();
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    var today2=year+'/'+month+'/'+day;
    return today2;
}
if(sessionStorage.goods_id==undefined)
{
    alert('error');
    window.location='index.html';
}
var chat =new MyDialog($('.chatdig'),'卖家',123123,function(re){
    console.log(re);
    var obj3=      //连接上了服务器向服务器发送商品id
    {
        from:sessionStorage.nowuser,
        to:123123,
        type:'chat',
        content:re.mess,
        time:newtime()
    };
    client.send(JSON.stringify(obj3));
});
$('input[value="关闭"]').click(function(){    //聊天框关闭
    $('#showCall').css('display','none');
    //if($('#'))
    //{
    //
    //}
});
$('#callme').click(function(){     //聊天框显示
    if(sessionStorage.nowuser!=undefined)
    {
        $('#showCall').css('display','block');
        $('#123123').css('display','block');
        if($('#123123')[0]!=undefined)
        {
            $('#123123').css('display','block');
        }

    }
    else
    {
        alert('请先登入');
    }

});
/********************8888888888888888888888888*/
$('#index').click(function(){
    window.location='index.html';
});
/****************************************************/
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
/*****************************************************/
if(sessionStorage.nowuser==undefined)
{
    $('#not_login').css({display:'block'});
    //$('#ok_login').css({dispaly:'none'});
    $('#ok_login')[0].style.display='none';
    $('#cell_number').html('您还未登入');
    $('#getsite').html('您还未登入');
}

$('.to_log_re').click(function(){
    window.location.href='login-and-register.html'
});
$('#quite').click(function(){
    sessionStorage.removeItem('nowuser');
    $('#cell_number').html('您还未登入');
    //$('#site').html('');
    window.location.href='index.html';
});

$( "#tabs" ).tabs(); //标签页切换（商品详细/商品评价切换）
/********************点击（绑定手机号）弹框显示**************************/
$( "#dialog" ).dialog({     //点击（绑定手机号）弹框显示
    autoOpen: false,
    modal:true,
    width: 400,
    buttons: [
        {
            text: "Ok",
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "Cancel",
            click: function() {
                $( this ).dialog( "close" );
            }
        }
    ]
});

// Link to open the dialog
$( "#dialog-link" ).click(function( event ) {
    if(sessionStorage.nowuser!=undefined)
    {
        $( "#dialog" ).dialog( "open" );
        event.preventDefault();
    }
    else
    {
        alert('请先登入');
    }

});
/****************点击（绑定地址）弹框显示************************/

$( "#dialog2" ).dialog({      //点击（绑定地址）弹框显示
    autoOpen: false,
    modal:true,
    width: 400,
    buttons: [
        {
            text: "Ok",
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "Cancel",
            click: function() {
                $( this ).dialog( "close" );
            }
        }
    ]
});

// Link to open the dialog
$( "#dialog-link2" ).click(function( event ) {
    if(sessionStorage.nowuser!=undefined)
    {
        $( "#dialog2" ).dialog( "open" );
        event.preventDefault();
    }
    else
    {
        alert('请先登入');
    }

});
//**************************88******************************/

/*************************客户端*********************************/
var client=new WebSocket('ws://localhost:3030');
client.onopen=function(){
    console.log('连接上了服务器');
    var obj3=      //连接上了服务器向服务器发送商品id
    {
        from:'',
        to:'server',
        type:'goods_id',
        content:sessionStorage.goods_id,
        time:new Date()
    };
    client.send(JSON.stringify(obj3));
    if(sessionStorage.nowuser==undefined)  //若还未登入
    {}  //若还未登入
    else
    {    //若已经登入
        var obj=
        {
            from:sessionStorage.nowuser,
            to:'server',
            type:'oklogin',
            content:sessionStorage.nowuser,
            time:new Date()
        };
        client.send(JSON.stringify(obj));
        var obj2=
        {
            from:sessionStorage.nowuser,
            to:'server',
            type:'site',
            content:sessionStorage.nowuser,
            time:new Date()
        };
        client.send(JSON.stringify(obj2));
    }
};
client.onmessage=function(mess){
  var obj_mess=JSON.parse(mess.data);
    console.log(obj_mess);
    switch (obj_mess.type)
    {
        case 'goods_id': //显示商品页面
            op.typegd(obj_mess.time,obj_mess.content[0].start_time,obj_mess.content[0].end_time,function(res){
                showUI.goods_detail(obj_mess.content[0].photo,obj_mess.content[0].goods_name,obj_mess.content[0].goods_price,res);
            });
            showUI.goods_message($('#tabs-1'),obj_mess.content[0].goods_name,obj_mess.content[0].goods_price,obj_mess.content[0].data_batchid,obj_mess.content[1].photo,obj_mess.content[2].photo,obj_mess.content[0].photo);
            break;
        case 'oklogin':    //页面跳转重登
            $('#not_login').css({display:'none'});
            $('#ok_login')[0].style.display='block';
            $('#user_login').html('hi,'+obj_mess.content[0].user_mark);
            var $p=$('<p id="cell_number" phon="'+sessionStorage.nowuser+'">'+'您绑定的手机号为：'+sessionStorage.nowuser+'</p>');
            $('#dialog').append($p);
            break;
        case 'site':
           if(obj_mess.content=='')
           {
                $('#dialog2').html('您还未绑定收货地址,请到个人中心绑定');
           }
            else
           {

               $('#site').html('');
                for(var i=0;i<obj_mess.content.length;i++)
                {
                   //var $option=$('<option value='+obj_mess.content[i].site+ '/>');
                   // $('#site').append($option);
                    if(obj_mess.content[i].user_getsite==obj_mess.content[i].site_id)
                    {
                        //$('#getsite').html('你绑定的收货地址为:'+obj_mess.content[i].site);
                        var $p=$('<p id="getsite" site_id="'+obj_mess.content[i].site_id+'">'+'你绑定的收货地址为:'+obj_mess.content[i].site+'</p>');
                        $('#allsite').before($p);
                    }
                }
           }
            break;
        case 'evaluate':    //商品评价
            if(obj_mess.content[0]==undefined)
            {
                showUI.goods_evaluate($('#evaluate_show'),'','','还没有评论')
            }
            else
            {
                showUI.goods_evaluate($('#evaluate_show'),obj_mess.content[0].user_mark,obj_mess.content[0].time,obj_mess.content[0].evaluate)
            }
            break;
        case 'maimai':
            if(obj_mess.content=='秒杀成功')
            {

                if(confirm('秒杀成功,是否马上跳转到个人中心我的订单完成支付'))
                {
                    window.location='person-center.html';
                }
            }
            else
            {
                alert(obj_mess.content);
            }

            break;
        case 'chat':
            showUI.chatMessagemaijia($('.chat_mess'),obj_mess.time,obj_mess.content );
            break;
    }
};

/*************************商品评论的点击***********************************8*/
$('#pre').children().eq(0).css({marginLeft:'10px'});
$('#evaluate').click(function(){       //商品评论的点击
    var obj3=
    {
        from:'',
        to:'server',
        type:'evaluate',
        content:sessionStorage.goods_id,
        time:new Date()
    };
    client.send(JSON.stringify(obj3));
});

/********************************************************************/

var res;
var pre=new Prevent_to_much($('#pre'),function(res1){   //防爆条
    res = res1;
});

$('.buy').click(function(){
    if(res==true)
    {
        if(sessionStorage.nowuser!=undefined)
        {
            if($('#cell_number').attr('phon')!=undefined)   //手机号
            {
                if($('#getsite').attr('site_id')==undefined)   //收货地址
                {
                    alert('请先绑定收货地址');
                    res=false;
                    return 0;
                }
                else
                {
                    var obj3=      //连接上了服务器向服务器发送商品id
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'maimai',
                        content:{user:sessionStorage.nowuser,goods_id:sessionStorage.goods_id},
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj3));
                }
            }
            else
            {
                alert('请先绑定手机号');
                res=false;
                return 0;
            }
        }
        else
        {
            alert('请先登入');
            return 0;
        }
    }
});

