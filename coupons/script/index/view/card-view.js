function cardView() {
    var $ = requirejs('jquery'),util = requirejs('util'),
        userToken = requirejs('userToken'),cards = '';
    var storage = util.storage('session');
    var token = storage.get('token');

    util.getScript('/index/view/card-model').then(function () {
        cards = window.cardModel();
    });
    
    renderCard();

    //to add store coupons
    $('#toStoreCreateBtn').off().on('click',function () {
        window.location.href = 'store-coupons-add.html?token=' + token;
    });

    // to add goods coupons
    $('#toGoodsCreateBtn').off().on('click',function () {
        window.location.href = 'goods-coupons-add.html?token=' + token;
    });

   // to add gift coupons
    $('#toGiftCreateBtn').off().on('click',function () {
        window.location.href = 'gift-coupons-add.html?token=' + token;
    });

    
    function renderCard() {
        var html = '';
        for(var i in cards){
            html += '<div class="card ' + cards[i].cardClass + '">';
            html += '<div class="card-name">' + cards[i].name + '</div>';
            html += '<img class="card-img" src="' + cards[i].img + '" alt="' + cards[i].name + '">';
            html += '<div class="card-bottom">';
            html += '<span class="create-text">立即创建</span>';
            html += '<img class="create-icon" src="www/image/small_add.png" id="' + cards[i].btnId + '" alt="创建图标">';
            html += '</div>';
            html += '</div>';
        }
        $('#cardBox').html(html);
    };

};
/**
 * Created by Administrator on 2016/6/4 0004.
 */
