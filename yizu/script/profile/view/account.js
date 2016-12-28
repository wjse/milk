define(['jquery','util','api'],function($,util){

    var headimgurl = util.storage().get('headimgurl');
    
    $('#headImg').attr('src',headimgurl);
});
