define(['jquery','util','converter'],function($,util,converter){

    var nickname = util.storage().get('nickname'),
        headimgurl = util.storage().get('headimgurl'),
        points = util.storage().get('points'),
        order_num = util.storage().get('order_num'),
        mobile = util.storage().get('mobile');
    
    render({
        nickname : nickname,
        headimgurl : headimgurl,
        points : points,
        order_num : order_num,
        mobile : mobile
    });

    $('.box-1 div').on('click',function(){
        window.location.href = 'profit.html';
    });

    util.getScript('/common/footer-view').then(function(){
        window.footerView('.advertise-page','profile');
    });

    function render(p) {
        $('.head-bg').css('background-image','url('+ p.headimgurl +')');
        
        $('.head-img').css('background-image','url('+ p.headimgurl +')');

        $('.head-img .img').css("background-image",'url('+ p.headimgurl +')');

        $('<p>',{
            html : p.nickname
        }).appendTo('.user-info');

        $('<p>',{
            html : converter.text(p.mobile)
        }).appendTo('.user-info');

        $('#points').html(p.points);

        $('#orderNum').html(p.order_num);
    }
});
