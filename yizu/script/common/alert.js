$.info = function(msg,type){

    if(!type){
        type = 'info';
    }

    $('<div>',{
        class : 'alert alert-'.concat(type),
        html : msg
    }).appendTo('body');

    setTimeout('removeAlert()',1000);

    window.removeAlert = function(){
        if($('.alert').length > 0){
            $('.alert').remove();
        }
    };
};

$.confirm = function(msg,fn,okHref){
    $('<div>',{
        class : 'alert-confirm',
        html : content(msg)
    }).appendTo('body');

    if(msg.length > 200){
        $('.alert-confirm .content').css('margin-top','25%');
    }

    $('.alert-confirm').height(window.screen.height);

    $('.alert-confirm .content .cancel').on('click',function(){
        close();
    });

    if(fn){
        $('.alert-confirm .content .ok').on('click',function(){
            fn.call();
            close();
        });
    }

    function close(){
        $('.alert-confirm').remove();
    };

    function content(msg){
        var html = '<div class="content">';
        html += '<div>' + msg + '</div>';
        html += '<div class="opt">';
        html += '<a href="'+ (okHref ? okHref : '#') +'" class="cancel">'+ (fn ? '取消' : '确定') +'</a>';
        if(fn){
            html += '<a class="ok">确定</a>';
        }
        html += '</div>';
        return html;
    };
};