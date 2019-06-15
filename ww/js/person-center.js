/**
 * Created by Administrator on 2017/9/24.
 */
$( "#tabs" ).tabs();
$( "#tabs2" ).tabs();
$( "#accordion" ).accordion();
var showUI=new ShowUI();
/********************************/
$('#index').click(function(){
    window.location='index.html';
});
/**************************************************888*/
if(sessionStorage.nowuser==undefined)
{
    alert('error');
    window.location='index.html';
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
/*************************改密码***********************************88888*/
function isPasswd(s)
{
    var patrn=/^(\w){6,20}$/;
    var flag=patrn.test(s);
    return flag;
}
/******旧密码******/
$('#oldPsd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tipsO').html('请输入不能为空');
        $('#tipsO').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tipsO').html('6-20个字母、数字、下划线');
        $('#tipsO').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tipsO').html('√');
        $('#tipsO').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/*******新密码**********/
$('#newPsd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tipsN').html('请输入不能为空');
        $('#tipsN').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tipsN').html('6-20个字母、数字、下划线');
        $('#tipsN').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tipsN').html('√');
        $('#tipsN').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/********确认密码失焦点********/
$('#rPsd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tipsR').html('请输入不能为空');
        $('#tipsR').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tipsR').html('6-20个字母、数字、下划线');
        $('#tipsR').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(psd!=$('#newPsd').val())
    {

        $('#tipsR').html('请输入相同的密码');
        $('#tipsR').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tipsR').html('√');
        $('#tipsR').css({color:'green',lineHeight:"35px"});
        return true;
    }
};

$('#changePsw').click(function(){
    if(($('#newPsd')[0].onblur)() && ($('#rPsd')[0].onblur)()&& ($('#oldPsd')[0].onblur)())
    {
        var old=$('#oldPsd').val();
        var newPsd=$('#newPsd').val();
        var obj=
        {
            from:sessionStorage.nowuser,
            to:'server',
            type:'changePsd',
            content:{old:old,newPsd:newPsd},
            time:new Date()
        };
        client.send(JSON.stringify(obj));
    }

});
/******************************充钱正则大于0的数字*************************************/
function checkmoney(str) {    //大于0的数字
    var reg = /^[1-9]\d*(\.\d+)?$/;//验证规则   /^\d*$/
    var flag = reg.test(str);
    return flag
}
/*********************************************************************/
$('#site').click(function(){    //收货地址显示
    var obj=
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'site',
        content:sessionStorage.nowuser,
        time:new Date()
    };
    client.send(JSON.stringify(obj));
});
/****************************show-Myorder  已支付和待评价*************************8*/
$('#myorder').click(function(){
    var obj=
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'myorder',
        content:sessionStorage.nowuser,
        time:new Date()
    };
    client.send(JSON.stringify(obj));
});

/**************************myorder  待支付*******************************/
$('#notpay').click(function(){
    var obj=
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'order_notpay',
        content:sessionStorage.nowuser,
        time:new Date()
    };
    client.send(JSON.stringify(obj));
});
/*************************myorder 无效************************/
$('#useless').click(function(){
    var obj=
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'order_useless',
        content:sessionStorage.nowuser,
        time:new Date()
    };
    client.send(JSON.stringify(obj));
});
/******************添加地址*************************/
$('#add').click(function(){
   var site=$('#addSite').html() ;
    if(site !='')
    {
        var obj=
        {
            from:sessionStorage.nowuser,
            to:'server',
            type:'addsite',
            content:site,
            time:new Date()
        };
        client.send(JSON.stringify(obj));
        $('#addSite').html('') ;

    }
    else
    {
        alert('输入不能为空');
    }
});
/***********************我的消息*****************************/
$('#myMessage').click(function(){
    var obj=
    {
        from:sessionStorage.nowuser,
        to:'server',
        type:'myMessage',
        content:sessionStorage.nowuser,
        time:new Date()
    };
    client.send(JSON.stringify(obj));
});
/*****************************client************************************/
var client=new WebSocket('ws://localhost:3030');
client.onopen=function(){
  console.log('连接到服务器了');
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
            showUI.person_mess($('.message'),obj_mess.content[0].user_photo,obj_mess.content[0].user_mark,obj_mess.content[0].user_reg_time,obj_mess.content[0].user_money);
            $( "#dialog" ).dialog({
                autoOpen: false,
                width: 400,
                modal:true,
                buttons: [
                    {
                        text: "Ok",
                        click: function() {
                             var money= $('#money').val();
                            if(checkmoney(money)==true)
                            {
                                if(confirm('确定充值￥'+money))
                                {
                                    var obj=
                                    {
                                        from:sessionStorage.nowuser,
                                        to:'server',
                                        type:'topup_money',
                                        content:money,
                                        time:new Date()
                                    };
                                    client.send(JSON.stringify(obj));
                                    $('#money').val('');
                                }

                            }
                            else
                            {
                                alert('请输入大于0的金额');
                            }
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
                $( "#dialog" ).dialog( "open" );
                event.preventDefault();
            });


            $( "#dialog3" ).dialog({
                autoOpen: false,
                width: 400,
                modal:true,
                buttons: [
                    {
                        text: "Ok",
                        click: function() {
                            var name= $('#name').val();
                            if(name!='')
                            {
                                if(confirm('确定改名为'+name))
                                {
                                    var obj=
                                    {
                                        from:sessionStorage.nowuser,
                                        to:'server',
                                        type:'change_name',
                                        content:name,
                                        time:new Date()
                                    };
                                    client.send(JSON.stringify(obj));
                                    $('#money').val('');
                                }

                            }
                            else
                            {
                                alert('请输入不能为空');
                            }
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
            $( "#dialog-link3" ).click(function( event ) {
                $( "#dialog3" ).dialog( "open" );
                event.preventDefault();
            });
            break;
        /*******************充钱**********************/
        case 'topup_money':
            if(obj_mess.content==true)
            {
                alert('充值成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('充值失败');
            }
            break;
    /*******************改密**********************/
        case 'changePsd':
            if(obj_mess.content==true)
            {
                alert('修改成功');
            }
            else if(obj_mess.content==-1)
            {
                alert('输入密码错误');
            }
            else
            {
                alert('修改失败');
            }
            break;
        case 'site':
            $('#allsite').html('');
            for(var x=0;x<obj_mess.content.length;x++)
            {
                showUI.showAllSite($('#allsite'),obj_mess.content[x].site_id,obj_mess.content[x].site);
                if(obj_mess.content[x].site_id==obj_mess.content[x].user_getsite)
                {
                    showUI.showmySite($('#mysite'),obj_mess.content[x].site,obj_mess.content[x].site_id );
                }
            }
            $('input[value="删除"]').click(function(){   //删除地址
                var siteId=$(this).parent().attr('siteid');
                if(confirm('确定删除吗？'))
                {
                    var obj=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'deleteSite',
                        content:siteId,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj));
                }

            });
            //设为收货地址
            $('input[value="设为收货地址"]').click(function(){
                var siteId=$(this).parent().attr('siteid');
                if(confirm('确定更改吗？')) {
                    var obj =
                    {
                        from: sessionStorage.nowuser,
                        to: 'server',
                        type: 'changeMysite',
                        content: siteId,
                        time: new Date()
                    };
                    client.send(JSON.stringify(obj));
                }
            });
            break;
        case 'addsite':   //添加地址
            if(obj_mess.content)
            {
                alert('添加成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('添加失败');
            }
            break;
        case 'deleteSite': //删除地址
            if(obj_mess.content)
            {
                alert('删除成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('删除失败');
            }
            break;
        case 'changeMysite': //改收货地址
            if(obj_mess.content)
            {
                alert('更改成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('更改失败');
            }
            break;
        case 'change_name':
            if(obj_mess.content)
            {
                alert('更改成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('更改失败');
            }
            break;
        case 'myorder':    //已支付订单和待评价订单显示
           if(obj_mess.content!=false)
           {
               $('#tabs2-1').html('');
               for(var j=0;j<obj_mess.content.length;j++)
               {
                   showUI.showOrder($('#tabs2-1'),obj_mess.content[j].time,obj_mess.content[j].order_id,obj_mess.content[j].photo,obj_mess.content[j].price,obj_mess.content[j].amount,obj_mess.content[j].state_name);
               }

           }
            else
           {
               $('#tabs2-1').html('还没有订单');
           }
            $('.delect1').click(function(){
                console.log($(this).attr('id'));
                var orderId=$(this).attr('id');
                if(confirm('确定删除这条订单？'))
                {
                    var obj=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'deleteOrder',
                        content:orderId,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj));
                }
            });
           // $('input[value="带评论"]')
            $( "#dialog2" ).dialog({
                autoOpen: false,
                width: 400,
                modal:true,
                buttons: [
                    {
                        text: "Ok",
                        click: function() {
                            var pinglun= $('#pinglun').val();
                            if(pinglun!='')
                            {
                                if(confirm('确定评论？'))
                                {
                                    var obj=
                                    {
                                        from:sessionStorage.nowuser,
                                        to:'server',
                                        type:'pinglun',
                                        content:{pinglun:pinglun,orderId:sessionStorage.order},
                                        time:new Date()
                                    };
                                    client.send(JSON.stringify(obj));
                                    $('#money').val('');
                                    $( this ).dialog( "close" );
                                }
                            }
                            else
                            {
                                alert('输入不能为空')
                            }

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
            $('input[value="待评价"]').click(function( event ) {
                sessionStorage.order= $(this).attr('orderid');
                $( "#dialog2" ).dialog( "open" );
                event.preventDefault();
            });


            break;


        case 'order_notpay': //未支付订单显示
            if(obj_mess.content!=false)
            {
                $('#tabs2-2').html('');
                for(var j=0;j<obj_mess.content.length;j++)
                {
                    showUI.showOrder($('#tabs2-2'),obj_mess.content[j].time,obj_mess.content[j].order_id,obj_mess.content[j].photo,obj_mess.content[j].price,obj_mess.content[j].amount,obj_mess.content[j].state_name);

                    var div=$('.'+obj_mess.content[j].order_id+'');//$('.cout_down')
                    var tim=change(obj_mess.content[j].date)+1800-change(obj_mess.time);
                    if(tim<=0)
                    {
                        var obj=
                        {
                            from:sessionStorage.nowuser,
                            to:'server',
                            type:'cancel',
                            content:obj_mess.content[j].order_id,
                            time:new Date()
                        };
                        client.send(JSON.stringify(obj));
                    }
                    else
                    {
                        var myid=obj_mess.content[j].order_id;
                        myid=new Mytime(div,tim,function(){
                            var obj=
                            {
                                from:sessionStorage.nowuser,
                                to:'server',
                                type:'cancel',
                                content:obj_mess.content[j].order_id,
                                time:new Date()
                            };
                            client.send(JSON.stringify(obj));
                        })
                    }

                }
            }
            else
            {
                $('#tabs2-2').html('还没有订单');

            }
            //支付该订单
            $('input[value="待支付"]').click(function(){
               var orderId=$(this).attr('orderid');
                if(confirm('确定支付该订单吗？'))
                {
                    var obj=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'paymoney',
                        content:orderId,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj));
                }
            });

            //取消订单
            $('input[value="取消订单"]').click(function () {
                var orderId=$(this).attr('orderid');
                if(confirm('确定取消该订单吗？'))
                {
                    var obj=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'cancel',
                        content:orderId,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj));
                }
            });
            $('.delect1').click(function(){
                var id=$(this).attr('id');
                if(confirm('确定取消该订单吗？'))
                {
                    var obj2=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'cancel',
                        content:id,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj2));
                }
            });
            break;
        case 'order_useless':
            if(obj_mess.content!=false)
            {
                $('#tabs2-3').html('');
                for(var j=0;j<obj_mess.content.length;j++)
                {
                    showUI.showOrder($('#tabs2-3'),obj_mess.content[j].time,obj_mess.content[j].order_id,obj_mess.content[j].photo,obj_mess.content[j].price,obj_mess.content[j].amount,obj_mess.content[j].state_name);
                }
            }
            else
            {
                $('#tabs2-3').html('还没有订单');
            }
            $('.delect1').click(function(){
                console.log($(this).attr('id'));
                var orderId=$(this).attr('id');
                if(confirm('确定删除这条订单？'))
                {
                    var obj=
                    {
                        from:sessionStorage.nowuser,
                        to:'server',
                        type:'deleteOrder',
                        content:orderId,
                        time:new Date()
                    };
                    client.send(JSON.stringify(obj));
                }
            });
            break;
        case 'deleteOrder':
            if(obj_mess.content)
            {
                alert('删除成功');
                window.location.href="person-center.html";
            }
            else
            {
                alert('删除失败');
            }
            break;
        case 'paymoney':
            alert(obj_mess.content);
            window.location.href="person-center.html";
            break;
        case 'cancel':
            alert(obj_mess.content);
            window.location.href="person-center.html";
            break;
        case 'pinglun':
            alert(obj_mess.content);
            window.location.href="person-center.html";
            break;
        case 'myMessage':
            if(obj_mess.content!='')
            {
                $('#message').html('');
                for(var x=0;x<obj_mess.content.length;x++)
                {
                    showUI.myMessage( $('#message'),obj_mess.content[x].from_id,obj_mess.content[x].to_id,obj_mess.content[x].content,obj_mess.content[x].chat_time);
                }
            }
            else
            {
                $('#message').html('没有消息记录')
            }

            break;
    }

};


function change(str1)   //将自定义的时间转化成秒
{
    var sec=str1%100;
    var min=Math.floor(str1/100%100);
    var hour=Math.floor(str1/10000);
    var res=hour*3600+min*60+sec;
    return res;
}


