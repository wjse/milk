define(['jquery','util','api','wHandler','converter','alert'],function($,util,api,handler,converter){
    if(!handler.isUserLogin()){
        return;
    }

    var profile = api.on();

    console.log(profile);

    if(!profile){
        profile = {};
    }

    util.storage().put('nickname',profile.nickname);
    util.storage().put('headimgurl',profile.headimgurl);
    util.storage().put('points',profile.points);
    util.storage().put('order_num',profile.order_num);
    util.storage().put('mobile',profile.mobile);

    if(profile.id == profile.salesman_id){
        util.storage().put('isSalesman',true);
    }

    render(profile);

    util.getScript('/common/footer-view').then(function(){
        window.footerView('#profilePage','profile');
    });

    $('#cleanCache').parent().on('click',function(){
        util.storage().clear();
        var cache = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
        $('#cleanCache').html('清除缓存 (' + (cache == 2 ? 0 : cache) + 'KB)');
        $.info('缓存清除完成');
    });

    function render(p){
        $('<img>',{
            src : p.headimgurl
        }).appendTo('.head-img');

        $('<p>',{
            class : 'name',
            html : p.nickname
        }).appendTo('.user-info');

        $('<p>',{
            class : 'phone',
            html : '<small>' + converter.text(p.mobile) + '</small>'
        }).appendTo('.user-info');

        var cache = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
        $('#cleanCache').html('清除缓存 (' + cache + 'KB)');

        setOrderNum(p.order);
    };

    function setOrderNum(o){
        addCountSpan('#unPayCount',o.un_pay);
        addCountSpan('#unShipCount',o.un_ship);
        addCountSpan('#unGetCount',o.un_receive);
    };

    function addCountSpan(container,count){
        if(count > 0){
            $('<span>',{html : count}).appendTo(container);
        }
    };
});
