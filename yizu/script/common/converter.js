define(function(){

    this.goodsName = function(obj){
        var goods;
        if(obj.goods instanceof Array){
            goods = obj.goods[0];
        }else{
            goods = obj.goods;
        }
        return goods.goods_name;
    };

    this.marketPrice = function(obj){
        if(!obj.goods || obj.goods.length == 0){
            return price(0);
        }
        return price(obj.goods[0].market_price);
    };

    this.price = function(p){
        return '￥'.concat(isNaN(p) ? 0 : p);
    };

    this.text = function(text){
        return !text ? '' : text;
    };

    this.address = function(addr,withOutAddress){
        var p = addr.province,
            c = addr.city,
            d = addr.district,
            a = addr.address;
        if(withOutAddress){
            a = '';
        }
        return this.text(p).concat(' ',this.text(c),' ',this.text(d),' ',this.text(a)) ;
    };

    this.orderTypeState = function(type){
        var state = 10;
        if(type == 'unShip'){
            state = 20;
        }else if(type == 'unGet'){
            state = 30;
        }else if(type == 'finish'){
            state = 40;
        }
        return state;
    };

    this.orderTypeText = function(type){
        var text = '待付款';
        if(type == 'unShip'){
            text = '待发货';
        }else if(type == 'unGet'){
            text = '待收货';
        }else if(type == 'finish'){
            text = '已完成';
        }
        return text;
    };

    this.totalMarketPrice = function(goods,noPrice){
        if(noPrice){
            return goods.market_price * goods.goods_num;
        }
        return price(goods.market_price * goods.goods_num);
    };

    this.totalReturnMoney = function(goods,noPrice){
        if(noPrice){
            return totalMarketPrice(goods,true) - totalSalePrice(goods,true);
        }
        return price(totalMarketPrice(goods,true) - totalSalePrice(goods,true));
    }

    this.totalSalePrice = function(goods,noPrice){
        if(noPrice){
            return goods.sale_price * goods.goods_num;
        }
        return price(goods.sale_price * goods.goods_num);
    };

    return this;
});