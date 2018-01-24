/**
 * Created by Administrator on 2017/9/24.
 */
$('#login_show').click(function(){
    $('#logo').css({display:"block"});
    $('#reg').css({display:"none"});
});
$('#reg_show').click(function (){
    $('#reg').css({display:"block"});
    $('#logo').css({display:"none"});
});
$('input[value="退出"]').click(function(){
    $('#logo').css({display:"block"});
    $('#reg').css({display:"none"});
    $('#tips-uid').html('');
    $('#tips-upsd').html('');
});
//手机号正则验证   1开头
function checkMobile(str) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    var flag = reg.test(str);
    return flag
}

//^\+?[1-9][0-9]*$
//
//校验密码：只能输入6-20个字母、数字、下划线
function isPasswd(s)
{
    var patrn=/^(\w){6,20}$/;
    var flag=patrn.test(s);
    return flag;
}

/***************************失焦验证**********************************8*/
$('#user_id')[0].onblur=function(){
    var id=this.value;
    if(id =='') //账号为空
    {
        $('#tips-uid').html('输入不能为空');
        $('#tips-uid').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(checkMobile(id)==false)   // 账号格式不正确
    {
        $('#tips-uid').html('请输入正确的手机号码');
        $('#tips-uid').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tips-uid').html('√');
        $('#tips-uid').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/****************************失焦验证*******************************/
$('#user_psd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tips-upsd').html('请输入不能为空');
        $('#tips-upsd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tips-upsd').html('6-20个字母、数字、下划线');
        $('#tips-upsd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tips-upsd').html('√');
        $('#tips-upsd').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/*****************************注册账号失焦验证************************************/

$('#reg_id')[0].onblur=function(){
    var id= $('#reg_id').val();
    if(id =='')
    {
        $('#tips-reg-id').html('输入不能为空');
        $('#tips-reg-id').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(checkMobile(id)==false)
    {
        $('#tips-reg-id').html('请输入正确的手机号码');
        $('#tips-reg-id').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tips-reg-id').html('√');
        $('#tips-reg-id').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/*****************************注册密码失焦验证********************************/
$('#reg_psd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tips-reg-psd').html('请输入不能为空');
        $('#tips-reg-psd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tips-reg-psd').html('6-20个字母、数字、下划线');
        $('#tips-reg-psd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tips-reg-psd').html('√');
        $('#tips-reg-psd').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/*****************************注册账号失焦验证************************************/
$('#re_psd')[0].onblur=function(){
    var psd=this.value;
    if(psd == '')   //密码为空
    {
        $('#tips-reg-rpsd').html('请输入不能为空');
        $('#tips-reg-rpsd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(isPasswd(psd)==false)  //密码格式不正确
    {
        $('#tips-reg-rpsd').html('6-20个字母、数字、下划线');
        $('#tips-reg-rpsd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else if(psd!=$('#reg_psd').val())
    {
        console.log($('#reg_psd').val());
        $('#tips-reg-rpsd').html('请输入相同的密码');
        $('#tips-reg-rpsd').css({color:'red',lineHeight:"35px"});
        return false;
    }
    else
    {
        $('#tips-reg-rpsd').html('√');
        $('#tips-reg-rpsd').css({color:'green',lineHeight:"35px"});
        return true;
    }
};
/*88*****************************************************************/


var client=new WebSocket('ws://localhost:3030');
client.onopen=function(mess){
    console.log('连接成功');
};
client.onmessage=function(mess){
    console.log(JSON.parse(mess.data));
    var mess_obj=JSON.parse(mess.data);
    switch (mess_obj.type)
    {
        case 'login':
            if(mess_obj.content!=false)
            {
                sessionStorage.nowuser=mess_obj.to;
                window.location.href='index.html';
            }
            else
            {
                alert('登入失败');
            }
            break;
        case 'register':
            if(mess_obj.content==false)
            {
                alert('账号已存在');
            }
            else
            {
                alert('注册成功');
            }
            break;
    }
};

/******************************************************************************************/
var res1=false;
var pre23=new Prevent_to_much($('#pre1'),function(res){
    res1=res;
});
$('#register').click(function(){
    if( ($('#reg_id')[0].onblur)() && ($('#reg_psd')[0].onblur)()&& ($('#re_psd')[0].onblur)()&&res1==true )
    {
        alert(1)
        var user_id=$('#reg_id').val();
        var user_psd=$('#reg_psd').val();
        var obj=
        {
            from:'',
            to:'server',
            type:'register',
            content:{name:user_id,psw:user_psd},
            time:new Date()
        };
        client.send(JSON.stringify(obj));
    }

    $('#reg_psd').val('');
    $('#re_psd').val('');
});
/***********************************************************/
var res2=false;
var pre=new Prevent_to_much($('#pre11'),function(res){
res2=res;
    console.log(res)

});
$('#login').click(function(){  //登入
    if(($('#user_id')[0].onblur)() && ($('#user_psd')[0].onblur)() && res2 ==true)
    {
        var user_id=$('#user_id').val();
        var user_psd=$('#user_psd').val();
        var obj=
        {
            from:'',
            to:'server',
            type:'login',
            content:{name:user_id,psw:user_psd},
            time:new Date()
        };
        client.send(JSON.stringify(obj));
    }
});