define(['jquery','config','loading'],function($,config,loading){
    var path = config.v4.concat('/yizu');

    this.goodsDetailPage = 'goods-detail.html';

    this.on = function(callback){
        $.ajax({
            url : path,
            type : 'get',
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200){
                    callback.call(this,resp.data);
                }
                loading.end();
            }
        });
    };

    this.RTime = function(dateStr){
        if(!dateStr){
            return '00_00_00';
        }
        var end= new Date(dateStr.replace(new RegExp('-','gm'),'/'));
        var now = new Date();
        var t =end.getTime() - now.getTime();
        if(t < 0){
            return '00_00_00';
        }

        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24 + (d*24));
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);

        return h + '_' + m + '_' + s;
    };

    return this;
});
