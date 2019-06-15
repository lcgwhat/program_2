/**
 * Created by Administrator on 2017/9/7.
 */
function Canvas($parent_div,width,height,callback)
{
    this.$parent_div=$parent_div;
    this.width=width;
    this.height=height;

    this.callback=callback;
    this.$div;
    this.$canvas;
    this.line;
    this.rec;
    this.brush;
    this.clear;
    this.sure;
    this.img=$('<img style="display: none"/>');
    this.drawUI();
    this.flg;
    this.cts;
    this.type;
    this.startX;
    this.startY;
    this.brush_use();

}
Canvas.prototype.drawUI=function(){
    this.$div = $('<div></div>');
    this.$div.css({
        width:this.width+5+'px',
        border:'1px solid black',
        display:'none',
        position:'absolute'
    });
    this.$canvas=$('<canvas width="'+this.width+'" height="'+this.height+'"></canvas>');
    this.$canvas.css({
        border:'1px solid black'
    });
    this.$div.append(this.$canvas);
    this.line=$('<input type="button" value="直线"/>');
    this.$div.append(this.line);
    this.rec=$('<input type="button" value="矩形"/>');
    this.$div.append(this.rec);
    this.brush=$('<input type="button" value="画笔"/>');
    this.$div.append(this.brush);
    this.clear=$('<input type="button" value="清空"/>');
    this.$div.append(this.clear);
    this.sure=$('<input type="button" value="确定"/>');
    this.$div.append(this.sure);
    this.$parent_div.append(this.$div);
};

Canvas.prototype.brush_use=function(){
    this.flg=false;
    this.type="直线";
    this.cts=(this.$canvas)[0].getContext('2d');
    this.$canvas.mousedown(function(){
        this.flg=true;
        this.startX=event.offsetX;
        this.startY=event.offsetY;
    }.bind(this));
    this.$canvas.mousemove(function(){
        if(this.flg)
        {
            this.cts.clearRect(0,0,this.$canvas.attr('width'),this.$canvas.attr('height'));
            this.cts.drawImage(this.img[0],0,0);
            switch (this.type)
            {
                case "直线":
                    this.cts.beginPath();
                    this.cts.moveTo(this.startX,this.startY);
                    this.cts.lineTo(event.offsetX,event.offsetY);
                    this.cts.stroke();
                    this.cts.closePath();
                    break;
                case "矩形":
                    var w =event.offsetX-this.startX;
                    var y=event.offsetY-this.startY;
                    this.cts.beginPath();
                    this.cts.rect(this.startX,this.startY,w,y);
                    this.cts.stroke();
                    this.cts.closePath();
                    break;
                case "画笔":
                    this.cts.moveTo(this.startX,this.startY);
                    this.cts.lineTo(event.offsetX,event.offsetY);
                    this.cts.stroke();
                    this.startX=event.offsetX;
                    this.startY=event.offsetY;
                    this.cts.closePath();
                    break;
            }
        }
    }.bind(this));
    this.$canvas.mouseup(function () {
        this.flg = false;
        var src=this.$canvas[0].toDataURL('image/png');
        this.img.attr('src',src);
    }.bind(this));
    this.line.click(function(){
        this.type = "直线";
    }.bind(this));
    this.rec.click(function(){
        this.type = "矩形";
    }.bind(this));
    this.brush.click(function(){
        this.type = "画笔"
    }.bind(this));
    this.clear.click(function(){
        this.cts.clearRect(0,0,this.$canvas.attr('width'),this.$canvas.attr('height'));

        //var src=this.$canvas[0].toDataURL('image/png');
        this.img.attr('src','');
    }.bind(this));
    this.sure.click(function(){
        var src=this.$canvas[0].toDataURL('image/png');
        this.img.attr('src',src);
        var img=this.img.clone(this.img);
        img.unbind();
        img.css("display",'block');
        this.callback(img);
        this.cts.clearRect(0,0,this.$canvas.attr('width'),this.$canvas.attr('height'));
        this.img.attr('src','');
       // $('#canv_show').hide(200);
    }.bind(this));
};
Canvas.prototype.toggle1=function(){
    this.$div.toggle(100);
};
Canvas.prototype.position=function(x,y){
        var top=-255;
        var left=y;
        console.log(top,left);
        this.$div.css({
            top:top+'px',
            left:left+'px'
        });
};

