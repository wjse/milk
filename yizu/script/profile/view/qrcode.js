define(['api','util'],function(api,util){

    var nickname = util.storage().get('nickname'),
        headimgurl = util.storage().get('headimgurl'),
        mobile = util.storage().get('mobile'),
        wxQRCode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=';

    $('.user-info p:eq(0)').html(nickname);
    $('.user-info p:eq(1)').html(mobile);
    $('.portrait-img img').attr('src',headimgurl);
    api.getQRCode(function(ticket){
        $('#qrCode').attr('src',wxQRCode.concat(ticket));
    });
});