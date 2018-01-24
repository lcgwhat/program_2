/**
 * Created by Administrator on 2017/9/25.
 */
var showUI=new ShowUI();
$('.to-log').click(function(){
    $('#login_and_reg')[0].style.display='block';
});

$('#quite-login').click(function(){
    $('#login_and_reg')[0].style.display='none';
});
$('#quite').click(function(){
    sessionStorage.removeItem('now_server');
    $('#not-login')[0].style.display='block';
    $('#ok-login')[0].style.display='none';
});
if(sessionStorage.now_server!=undefined)
{
    $('#not-login')[0].style.display='none';
    $('#ok-login')[0].style.display='block';
    $('#now_server').html('客服'+sessionStorage.now_server);
}



/*********************client客户端*****************************/
var client=new WebSocket('ws://localhost:3030');
client.onopen=function(){
    console.log('连接成功');
};
client.onmessage=function(mess){
    var obj_mess=JSON.parse(mess.data);
    console.log(obj_mess);
    switch(obj_mess.type)
    {
        case 'comment_login':
            if(obj_mess.content=='')
            {
                alert('登入失败');
            }
            else
            {
                $('#login_and_reg')[0].style.display='none';
                $('#not-login')[0].style.display='none';
                $('#ok-login')[0].style.display='block';
                $('#now_server').html('客服'+obj_mess.content[0].id);
                sessionStorage.now_server=obj_mess.content[0].id;
                showUI.show_server($('#message'),obj_mess.content[0].photo,obj_mess.content[0].id);
            }
            //console.log(obj_mess.content);
            break;
        case 'chat':

            if($('#'+obj_mess.from+'')[0]==undefined)
            {
                showUI.show_comment($('.chat123'),obj_mess.from);
                var chat=new  MyDialog($('#myDialog'),'客户'+obj_mess.from,obj_mess.from,function(res){
                    var obj3=      //连接上了服务器向服务器发送商品id
                    {
                        from:123123,
                        to:res.who,
                        type:'chat',
                        content:res.mess,
                        time:newtime()
                    };
                    client.send(JSON.stringify(obj3));
                });
            }

            showUI.chatMessage($('#'+'chat'+obj_mess.from+''),obj_mess.time,obj_mess.content );
            $('.client').dblclick(function(){
                console.log($(this).attr('Uid'));
                var id=$(this).attr('Uid');
                if($('#'+id+'')[0]!=undefined)
                {
                    $('#'+id+'').css('display','block')
                }
            })
            break;

    }
};

$('#login').click(function(){
    var id=$('#com_id').val();
    var psd=$('#com_psd').val();
    var obj={
        from:'',
        to:'server',
        type:'comment_login',
        content:{name:id,psw:psd},
        time:new Date()
    };
    client.send(JSON.stringify(obj))
});


function newtime()
{
    var today=new Date();
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    var today2=year+'/'+month+'/'+day;
    return today2;
}

