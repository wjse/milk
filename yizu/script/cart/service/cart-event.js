define(['jquery','converter','api'],function($,converter,api){

    var event = {},
        allTotalMarketPrice = 0;

    event.selectAll = function($a,list){
        if($a.hasClass('active')){
            $a.removeClass('active');
            $('.select').removeClass('active');
            $.each(list,function(i){
                allTotalMarketPrice -= event.totalMarketPrice(list[i]);
            });
        }else{
            $a.addClass('active');
            $('.select').addClass('active');
            $.each(list,function(i){
                allTotalMarketPrice += event.totalMarketPrice(list[i]);
            });
        }
        $('#allTotalPrice').html(converter.price(allTotalMarketPrice));
    };

    event.select = function($a,list){
        if($a.hasClass('active')){
            var index = $a.removeClass('active').attr('id').replace('index_','');
            allTotalMarketPrice -= event.totalMarketPrice(list[index]);
        }else{
            var index = $a.addClass('active').attr('id').replace('index_','');
            allTotalMarketPrice += event.totalMarketPrice(list[index]);
        }
        $('#allTotalPrice').html(converter.price(allTotalMarketPrice));
    };

    event.remove = function(cartId){
        var result = api.remove(cartId);
        if(result.ok){
            window.location.reload();
        }else{
            console.log(result.err);
            window.location.reload();
        }
    };

    event.showEdit = function($a){
        var cartId = $a.html('完成').attr('for');
        $('.for-show-'.concat(cartId)).addClass('hide');
        $('.for-edit-'.concat(cartId)).removeClass('hide');
    };

    event.finishEdit = function($a){
        $a.html('编辑');
        var cartId = $a.attr('for');
        var result = api.update({cart_id : cartId,goods_num:$('#goodsNum').html()});
        if(result.ok){
            window.location.reload();
        }else{
            console.log(result.err);
            window.location.reload();
        }
    };

    event.raise = function($a){
        var $goodsNum = $a.prev();
        var cVal = parseInt($goodsNum.html());
        $goodsNum.html(++ cVal);
    };

    event.reduce = function($a){
        var $goodsNum = $a.next();
        var cVal = parseInt($goodsNum.html());
        cVal -= 1;
        $goodsNum.html(cVal < 1 ? 1 : cVal);
    };

    event.getOrderGoods = function(array){
        if(!array || array.length == 0){
            return;
        }

        var selectArray = $('.select');
        var goods = [];
        for(var i = 0 ; i < selectArray.length ; i++){
            var $select = $(selectArray[i]);
            if($select.hasClass('active')){
                var index = $select.attr('id').replace('index_','');
                goods.push(array[index]);
            }
        }
       return goods;
    };

    event.totalMarketPrice = function(goods){
        return converter.totalMarketPrice(goods,true);
    };

    event.totalReturnMoney = function(goods){
        return  converter.totalReturnMoney(goods,true);
    }

    event.totalSalePrice = function(goods){
        return converter.totalSalePrice(goods,true);
    };

    return event;
});
