define(['jquery','api','util','config','alert'],function($,api,util,config){
    $('.submit-btn').on('click',function(){
        if(util.isNotEmpty($('input[name="name"]').val()) &&
            util.isNotEmpty($('input[name="mobile"]').val()) &&
                util.isNotEmpty($('input[name="area"]').val())){
            $.ajax({
                url : config.v4.concat('/yizu/business?uToken=',util.storage().get('user')),
                type : 'post',
                data : $('form').serialize(),
                success : function(resp){
                    if(resp.status == 200){
                        $.info('提交成功');
                        setTimeout('reload',2000);
                    }else{
                        $.info('提交失败','warn');
                    }
                }
            });
        }else{
            $.info('请输入加盟信息','warn');
        }
    });

    function reload(){
        window.reload();
    };
});