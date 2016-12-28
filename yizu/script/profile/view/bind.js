define(['jquery','util','alert'],function($,util){
    var nickname = util.storage().get('nickname'),
        headimgurl = util.storage().get('headimgurl'),
        isCheckedTel = false,
        defaultTime = 120;

    var time = defaultTime,intval;

    $('.head-img img').attr('src',headimgurl);
    $('.user-name').text(nickname);

    $('#inputTel').on('click',function(){
        if($(this).parent().hasClass('error')){
            $(this).parent().removeClass('error');
        }
    });

    $('#sendCode').on('click',function(){
        sendCodeEvent($('#inputTel'),$('#sendCode'));
    });

    $('#inputCode').on('keyup',function(){
        var code = $(this).val();
        if((code && code.length == 4 && isCheckedTel)){
            $('#bindBtn').removeClass('disabled').on('click',function(){

            });
        }
    });

    this.timing = function(){
        time--;
        if(time <= 0){
            time = defaultTime;
            clearInterval(intval);
            $('#sendCode').text('发送验证码').on('click',function(){
                sendCodeEvent($('#inputTel'),$('#sendCode'));
            });
        }else{
            $('#sendCode').text('重新发送(' + time + ')');
        }
    };

    function sendCodeEvent($input,$codeBtn){
        var tel = $input.val();
        if(!util.isMobile(tel)){
            $input.parent().addClass('error');
            $.info('请输入正确的手机号码','warn');
        }else{
            $.info('验证码已发送,请查收');
            isCheckedTel = true;
            $('#inputCode').attr('disabled',false);
            $input.text('重新发送(' + time + ')');
            $codeBtn.off('click');
            intval = setInterval('timing()',1000);
        }
    };
});
