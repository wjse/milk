function detailSelectView(goodsCommon){
    if(!goodsCommon){
        return;
    }

    var goods = goodsCommon.goods,
        spec = goodsCommon.spec_tpl,
        selectGoods = goods[0],
        converter = requirejs('converter'),
        wHandler = requirejs('wHandler'),
        api = requirejs('api'),
        util = requirejs('util');

    render(selectGoods,spec);

    $('.exit').on('click',function(){
        $('.select').fadeOut('slow',function(){
            $('body').off('touchmove');
        });
        $('.option').removeClass('hide');
    });

    $('.select-amount #min').on('click',function(){
        var cVal = parseInt($('#amount').html());
        cVal -= 1;
        $('#amount').html(cVal <= 0 ? 1 : cVal );
    });

    $('.select-amount #plu').on('click',function(){
        var cVal = parseInt($('#amount').html());
        cVal += 1;
        $('#amount').html(cVal);
    });

    $('.rent-money li').on('click',function(){
        specEvent($(this));
    });

    completeBtnEvent();

    function completeBtnEvent(){

        if($('.complete a').hasClass('cant-buy')){
            $('.complete a').removeClass('cant-buy');
        }

        $('#buyBtn').on('click',function(){
            if(!wHandler.isUserLogin()){
                return;
            }

            var goods = getBuyGoods(selectGoods.goods_id,$('#amount').html());
            util.storage().put('toBuyGoods',goods);
            window.location.href = 'confirm-order.html?from=buy';
        });

        $('#cartBtn').on('click',function(){
            if(!wHandler.isUserLogin()){
                return;
            }
            var obj = {goods_id : selectGoods.goods_id,goods_num : $('#amount').html()};
            var result = api.addCart(obj);
            if(result.ok){
                $.info('添加成功');
            }else{
                $.warn('添加失败');
            }
        });
    };

    function render(_goods,spec){
        setImg(_goods.goods_thumb);
        setInfo('.price',converter.price(_goods.market_price));
        setInfo('.name',_goods.goods_name);
        setSpec(spec);
        setMoney('#marketPrice',_goods.market_price);
        setMoney('#returnPrice',(selectGoods.market_price - selectGoods.sale_price).toFixed(2));
    };

    function setImg(img){
        if($('.goods-img img').length != 0){
            $('.goods-img img').attr('src',img);
        }else{
            $('<img>',{src : img}).appendTo('.goods-img');
        }
    };

    function setInfo(clz,val){
        $('.select '.concat(clz)).html(val);
    };

    function setSpec(list){
        var html = '';
        $.each(list,function(i){
            var obj = list[i];
            html += '<div class="rent-money">';
            html += '<p class="calculate">';
            html += '<span>选择'+ obj.title_name +'：</span>';
            html += '<span id="selectOpt">'+ obj.options[0].option_name +'</span>';
            var price = '';
            if(obj.title_code == 'lease_year'){
                price = getGoodsPrice(0);
            }
            html += '<span id="'+ (''!= price ? 'salePrice' : '') +'">'+ price +'</span>';
            html += '</p>';
            html += setOptions(obj.options,obj.title_code);
            html += '</div>';
        });

        $('#spec').html(html);
    };

    function setMoney(id,price){
        $(id).html(converter.price(price));
    };

    function setOptions(options,code){
        var html = '<ul>';

        $.each(options,function(i){
            var obj = options[i],
                isActive = i == 0 ? 'active' : '';
            html += '<li code="'+ code +'" class="' + isActive + '" for="' + obj.option_id + '"><a>' + obj.option_name + '</a></li>';
        });

        html += '</ul>';
        return html;
    };

    function specEvent($li){
        $li.addClass('active').siblings().removeClass('active');
        var specObj = {},
            array = $('.rent-money li[class=active]');
        for(var i = 0 ; i < array.length ; i++){
            var code = $(array[i]).attr('code'),
                optId =  $(array[i]).attr('for');
            specObj[code] = optId;
        }

        $li.parent().prev().children('span:eq(1)').html($li.html());

        selectGoods = getGoodsBySpec(specObj);
        if(!selectGoods){
            cantBuy();
            return;
        }

        completeBtnEvent();
        setImg(selectGoods.goods_thumb);
        setInfo('.price',converter.price(selectGoods.market_price));
        setInfo('.name',selectGoods.goods_name);
        setMoney('#marketPrice',selectGoods.market_price);
        setMoney('#salePrice',selectGoods.sale_price);
        setMoney('#returnPrice',(selectGoods.market_price - selectGoods.sale_price).toFixed(2));
        $('#amount').html(1);
    };

    function cantBuy(){
        setInfo('.price','暂时缺货');
        setInfo('#marketPrice','暂时缺货');
        setInfo('#salePrice','暂时缺货');
        $('.complete a').addClass('cant-buy').unbind();
    };

    function getGoodsBySpec(specObj){
        var eqGoods;
        for(var i = 0 ; i < goods.length ; i++){
            if(util.equals(specObj,goods[i].spec_str)){
                eqGoods = goods[i];
                break;
            }
        }

        return eqGoods;
    };

    function getGoodsPrice(index){
        return converter.price(goods[index].sale_price);
    };

    function getBuyGoods(goodsId,goodsNum){
        var toBuy = [];
        for(var i = 0 ; i < goods.length; i++){
            if(goodsId == goods[i].goods_id){
                var toBuyGoods = goods[i];
                console.log(toBuyGoods.lease_year);
                toBuyGoods.goods_num = goodsNum;
                toBuy.push(toBuyGoods);
                break;
            }
        }
        return toBuy;
    };
};
