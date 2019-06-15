/**
 * Created by Administrator on 2017/9/6.
 */


/*
* 参数 $par_div   父节点
* 参数$put        表情放在哪里
* 参数$cli        点击对象显示表情框
* */
function My_picture($par_div,callback){
    this.$par_div=$par_div;   //创建的表情框的父节点
    this.callback=callback;
    this.$div;
    this.drawUI();
}
My_picture.prototype.drawUI=function(){
    this.$div=$('<div></div>');
    this.$div.css({
        width: '300px',
        border: '1px solid gray',
        position: 'absolute',
        display: 'none',
        top:'292px',
        left:'563px',
        backgroundColor: 'ivory'
    });
    for(var i=1;i<=75;i++)
    {
        var $img=$('<img src="sourse/'+i +'.gif'+'"/>');
        this.$div.append($img);
        $img.click(function(){
            var $img=$(event.target).clone($(event.target));
            $img.unbind('click');
           this.callback($img)
        }.bind(this));
    }
    this.$par_div.append(this.$div);
};

My_picture.prototype.show=function(x,y){

       /* var top=x-this.$div.height()-15;
        var left=y-this.$div.height()-15;*/
    console.log(this.$div.height());
    var top=x-202;
    var left=0;
        this.$div.css({
            top:top+'px',
            left:left+'px'
        });
};
My_picture.prototype.toggle1=function(){
  this.$div.toggle(100);
};