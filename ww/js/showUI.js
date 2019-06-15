/**
 * Created by Administrator on 2017/9/26.
 */
function ShowUI()
{

}
/*******************时间条 单个时间点*************************/
/*
 方法名time_nav    秒杀的时间段展示
* 参数$div   放置的位置$div
* 参数tim    显示的时间
* 参数text   这个时间点的状态（开场，结束，即将开场）
* 参数start  这个秒杀开始的时间点
* 参数end   这个秒杀结束的时间点
* 参数now   从服务器返回的时间
* */
ShowUI.prototype.rayalWall=function($div,who,time){
    var $span=$('<span style="border-bottom: 1px solid black;margin-top: 4px">'+who+'于'+time+'成功秒杀'+'</span>');
    $div.append($span);
};






ShowUI.prototype.time_nav=function($div,tim,text,start,end,now){
    var new_div=$('<div class="scrollable-content" id="'+tim+'" data_start="'+start+'" data_end="'+end+'" ></div>');
    if(now>start && now<end)
    {
        new_div.addClass('active1');
    }

    var p1=$('<p class="time">'+tim+'</p>');
    new_div.append(p1);
    var p2=$('<p class="text">'+text+'</p>');
    new_div.append(p2);
    $div.append(new_div);
};
/**********************商品UI**************************/
/*方法名goods      首页商品展示
* 参数imgv    商品图片 （小图）
* 参数content   商品名称
* 参数price    商品价格
* 参数text     秒杀状态（已结束，正在进行，即将进行）
* 参数kucu     商品库存
* 参数 id        商品id
* */
ShowUI.prototype.goods=function($div,img,content,price,text,kucu,id){
    var $newa=$('<a class="qg-item" goods_id="'+id+'"></a>');
    var $div1=$('<div class="qg-img" ></div>');
    var $img=$('<img src="'+img+'"/>');
    $div1.append($img);
    $newa.append($div1);
    var $qg_detail=$('<div class="qg-detail"></div>');
    var $name=$('<div class="name"></div>');
    var $p=$('<p>'+content+'</p>');
    $name.append($p);
    $qg_detail.append( $name);
    var $link=$('<div class="link"></div>');
    var $price=$('<div class="price"></div>');
    var $promo_price=$('<span class="promo-price">'+'￥'+price+'</span>');
    $price.append($promo_price);
    $link.append($price);
    var $link_btn=$('<div class="link-btn">'+text+'</div>');
    $link.append($link_btn);
    $qg_detail.append( $link);
    var $process=$('<div class="process"></div>');
    var $span=$('<span>'+'库存'+kucu+'</span>');
    $process.append($span);
    $qg_detail.append($process);
    $newa.append($qg_detail);
    $div.append($newa);
};

/*
* 方法名goods_detail       进入商品详细页面显示商品信息
* 参数img   商品图 （大图）
* 参数text    商品名称
* 参数price    商品价格
* 参数type    秒杀状态（已结束，点击，即将进行）
* */
ShowUI.prototype.goods_detail=function(img,text,money,type){
    $('.tb-booth').css('background','url('+img+')');
    $('.tb-detail-hd').children().eq(0).html('');
    $('.tb-detail-hd').children().eq(0).html(text);
    $('.tm-price').html('');
    $('.tm-price').html(money);
    $('.tb-action').children().eq(0).html('');
    $('.tb-action').children().eq(0).html(type);
};


/*
 * 方法名goods_message       进入商品详细页面中‘商品详细’栏中展示商品信息
 * 参数img1   商品图 （大图）
 * 参数img2   商品图 （大图）
 * 参数img2   商品图 （大图）
 * 参数name    商品名称
 * 参数price    商品价格
 * 参数time    商品秒杀的时间点
 * */
ShowUI.prototype.goods_message=function($div,name,price,time,img1,img2,img3){
    $div.html('');
    var $p1=$('<p style="height: 30px">'+'商品名称:'+name+'</p>');
    var $p2=$('<p style="height: 30px">'+'商品价格:'+price+'</p>');
    var $p3=$('<p style="height: 30px">'+'商品秒杀时间:'+time+'</p>');
    var $img1=$('<img src='+img1+' alt="加载失败"/>');
    var $img2=$('<img src='+img2+' alt="加载失败"/>');
    var $img3=$('<img src='+img3+' alt="加载失败"/>');
    $div.append($p1);
    $div.append($p2);
    $div.append($p3);
    $div.append($img1);
    $div.append($img2);
    $div.append($img3);
};
/*
* 方法名goods_evaluate     商品详细页商品的评价显示UI
* 参数$div     放置商品评价的父节点
* 参数who      谁评价
* 参数time     评价的时间
* 参数content   评价的内容
* */
ShowUI.prototype.goods_evaluate=function($div,who,time,content){
    $div.html('');
    var $li =$('<li style="border: 1px solid royalblue;padding: 5px 5px 5px 5px;margin-top: 5px"></li>');
    var $p1=$('<p></p>');
    var $span1=$('<span style="margin-right: 4px ">'+time+'</span>');
    var $span2=$('<span>'+who+'</span>');
    $p1.append($span1);
    $p1.append($span2);
    $li.append($p1);
    var $p2=$('<p>'+content+'</p>');
    $li.append($p2);
    $div.append($li);
};
/*
* 方法名person_mess  显示用户基本的信息
* 参数img 用户头像
* 参数name  用户名
* 参数time   注册时间
* 参数money   余额
* */
ShowUI.prototype.person_mess=function($div,img,name,time,money){
    $div.html('');
    var $div1=$('<div class=""></div>');
    var $img=$('<img src='+img+' alt="加载失败"/>');
    $div1.append($img);
    var $p1=$('<p class="name"><span>'+name+'</span></p>');
    var $button2=$('<button class="topUp" id="dialog-link3" >改名</button>');
    $p1.append($button2);
    var $p2=$('<p class="name"><span>'+'注册时间:'+time+'</span></p>');
    var $p3=$('<p class="name"><span>'+'账户余额:'+money+'</span></p>');
    var $button=$('<button class="topUp" id="dialog-link" >充值</button>');
    $p3.append($button);
    $div.append($div1,$p1,$p1,$p2,$p3)
};
/**/

ShowUI.prototype.showmySite=function($div,site,siteid){
    $div.html('');
    var $p=$('<p mysite="'+siteid+'"><span>'+'默认收货地址:'+site+'</span></p>');
    $div.append($p);
};

ShowUI.prototype.showAllSite=function($div,siteid,site){
    var $li=$('<li siteid="'+siteid+'"><span>'+site+'</span><input class="set_site" type="button" value="设为收货地址"/><input class="set_site" type="button" value="删除"/></li>');
    $div.append($li);
};



/*
*方法名showOrder     个人中心中订单显示UI
*参数$div
* 参数time      下单时间
* 参数orderid   订单号
* 参数pic      商品图片路径
* 参数money    单价
* 参数,much     数量
* 参数type      订单状态
* 参数
* */
ShowUI.prototype.showOrder=function($div,time,orderid,pic,money,much,type){
    var $table=$('<table class="orderUI" cellspacing="0" ></table>');
    var $tbody1=$('<tbody></tbody>');
    var $tr1=$('<tr style="background-color: #d4d4d4"></tr>');
    var $td1=$('<td class="date">'+time+'</td>');
    var $td2=$('<td class="orderNum">'+'订单号:'+orderid+'</td>');
    var $td3=$('<td class="orderNum"><span class="callme"></span></td>');
    var $td4=$('<td class="goodsMess cout_down '+orderid+'"></td>');
    var $span7=$('<span>距离支付结束还有:</span>');
    if((type=='待支付'))
    {
        $td3.append($span7);
    }
    var $td5=$('<td class="delect"  ><button class="delect1" style="margin-left: 50px" id="'+orderid+'">删除</button></td>');
    $tr1.append($td1,$td2,$td3,$td4,$td5);
    $tbody1.append($tr1);
    var  $tbody2=$('<tbody></tbody>');
    var $tr2=$('<tr></tr>');
    var $td6=$('<td class="picture"><div class="goods_photo" style="background: url('+pic+');background-size: contain;"></div></td>');
    var $td7=$('<td class="goodsMess"><span>单价:'+money+'</span></td>');
    var $td8=$('<td class="goodsMess"><span>数量：'+much+'</span></td>');
    var $td9=$('<td class="goodsMess"><span>付款金额：'+money+'</span></td>');
    var $td10=$('<td class="goodsMess"><span>交易情况:</span><br/><input class="type" orderId="'+orderid+'"  type="button"  value='+type+'><br/></td>');
    var $input=$('<input class="type" orderId="'+orderid+'" type="button" value="取消订单"/>');
    if(type=='待支付')
    {
        $td10.append($input);

    }
    $tr2.append($td6,$td7,$td8,$td9,$td10);
    $tbody2.append($tr2);
    $table.append($tbody1,$tbody2);
    $div.append($table);
};

/*
*方法myMessage   个人中心我的消息UI
* 参数from     谁的消息
* 参数to      谁收的消息
* 参数content   消息内容
* 参数time     发送的时间
* */
ShowUI.prototype.myMessage=function($div,from,to,content,time){
    var $li=$('<li></li>');
    var $p1=$('<p>'+time+'</p>');
    var $p2=$('<p></p>');
    var $span1=$('<span>'+from+':'+'</span>');
    var $span2=$('<span>'+content+'</span>');
    $p2.append($span1, $span2);
    $li.append($p1,$p2);
    $div.append($li)
};

/*
*方法名show_server    客服页面客服基本信息显示
* */
ShowUI.prototype.show_server =function($div,photo,kefu){
    var $div1=$('<div class="photo" style="background: url('+photo+')"></div>');
    var $div2=$('<div><h3>'+'客服'+kefu+'</h3></div>');
    $div.append($div1,$div2);
};

/*
* 方法名show_comment    在客服的聊天表里显示买家ID
*
* */
ShowUI.prototype.show_comment = function($div,userID){
    var $li=$('<li class="client" Uid="'+userID+'">'+userID+'</li>');
    $div.append($li);
};

/*
* 方法名chatMessage  卖家接收的聊天消息显示
* */
ShowUI.prototype.chatMessage = function($div,time,content){
    var $div1=$('<div style="width: 100%"></div>');
    var $p1=$('<p style="text-align: right">'+time+'</p>');
    var $p2=$('<p style="text-align: right"></p>');
    var $span1=$('<span>'+'客户'+'</span>');
    var $span2=$('<span>'+content+'</span>');

    $p2.append($span2,$span1);
    $div1.append($p1,$p2);
    $div.append($div1);
};

/*
* 方法名chatMessagemaijia     买家接收的聊天信息显示
*
* */
ShowUI.prototype.chatMessagemaijia = function($div,time,content){
    var $div1=$('<div style="width: 100%"></div>');
    var $p1=$('<p style="text-align: right">'+time+'</p>');
    var $p2=$('<p style="text-align: right"></p>');
    var $span1=$('<span>'+':卖家'+'</span>');
    var $span2=$('<span>'+content+'</span>');

    $p2.append($span2,$span1);
    $div1.append($p1,$p2);
    $div.append($div1);
};