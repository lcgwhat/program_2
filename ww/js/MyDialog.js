/**
 * Created by Administrator on 2017/9/10.
 */
function MyDialog($div,name,id,callback)
{
    this.$div=$div;
    this.name=name;
    this.callback=callback;
    this.id=id;
    this.$chat_div;

    this.$link=$('<link href="css/MyDiglog.css" rel="stylesheet">');
    $('head').append(this.$link);
    this.drawUI();
    this.$input_div;
}
MyDialog.prototype.drawUI=function(){
    //this.$div.html('');
    this.$chat_div = $('<div class="chat" id="'+this.id+'"></div>');

    this.$header_div = $('<header class="head"></header>');
    this.$span_name=$('<span>'+this.name+'</span>');
    this.$header_div.append(this.$span_name);
    this.$chat_div.append(this.$header_div);

    this.$mess_div = $('<div class="chat_mess" id="'+'chat'+this.id+'"></div>');
    this.$chat_div.append( this.$mess_div);

    this.$picture_div = $('<div class="picture" style="position: relative"></div>');
    this.$biaop_div=$('<div></div>');
    this.$canv_div=$('<div class="canvs"></div>');
    this.$img_express=$('<img src="sourse/1.gif"/>');
    var pic=new My_picture(this.$biaop_div,function($exp){
        this.$input_div.append($exp)
    }.bind(this));
    this.$img_express.click(function(){
        pic.toggle1();
        pic.show(event.offsetX,event.offsetY);
    });
    this.$img_canvs=$('<img src="sourse/2.gif"/>');
    var canvs=new Canvas(this.$canv_div,200,200,function($img){
        this.$input_div.append($img)
    }.bind(this));
    this.$img_canvs.click(function(){
        canvs.toggle1();
        canvs.position(event.offsetX,event.offsetY);

    });
    this.$picture_div.append( this.$biaop_div,this.$canv_div,this.$img_express,this.$img_canvs);
    this.$chat_div.append(this.$picture_div);

    this.$input_div = $('<div contenteditable="true" class="input_div"></div>');
    this.$chat_div.append(this.$input_div);

    this.$footer_div=$('<footer></footer>');
    this.$btn_chatHis=$('<input type="button" value="聊天记录" class="btn3"/>');

    this.$btn_chatHis.click(function(){

    });
    this.$btn_close=$('<input type="button" value="关闭" class="btn3"/>');
    this.$btn_close.click(function(){
        //this.$chat_div.remove();
        this.$chat_div.hide();

        this.$input_div.val('');
    }.bind(this));
    this.$btn_send=$('<input type="button" value="发送" class="btn3"/>');
    this.$btn_send.click(function(){
        if(this.$input_div.html()!='')
        {
            this.callback({mess:this.$input_div.html(),who:this.id});
            var $p8=$('<p>'+'我:'+this.$input_div.html()+'</p>');
            //this.$mess_div.append(this.$input_div.html());
            this.$mess_div.append($p8);
            this.$input_div.html('');
        }

    }.bind(this));
    this.$footer_div.append(this.$btn_chatHis, this.$btn_close,this.$btn_send);
    this.$chat_div.append(this.$footer_div);

    this.$chat_history=$('<div></div>');
    this.chat_his=$('<div style="border: 1px solid white;margin-top:30px;position: relative"></div>');
    this.chat_btns=$('<div></div>');
    this.$chat_history.append(this.chat_his, this.chat_btns);
    this.$chat_div.append(this.$chat_history);

    this.$div.append( this.$chat_div);
};

MyDialog.prototype.show=function(){
    this.$chat_div.show(100);
};