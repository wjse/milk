function storeGetView(id) {
    var $ = requirejs('jquery'),util = requirejs('util'),config = requirejs('config'),
        api = requirejs('api'),userToken = requirejs('userToken'),plugins = requirejs('plugins');
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));
    var requestData = {};

    var coupons = api.get(id);

    initPage();

    //uploadEvent
    plugins.upload('#uploadBtn',uploadPath,function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0].image_url;
            $('#imgBox').html('<img id="image_url" src="' + path + '">');
            $('#spreadExampleBox').html('<img src="' + path + '">');
            requestData.image_url = path;
        }else if(resp && resp.status == 401){
            alert('用户登录失效，请重新登录！');
            userToken.goLogin();
        }
    });
    
    //desc change event
    $('#desc').off().on('change',function () {
        requestData.desc = $(this).val();
    });

    //save event
    $('#saveBtn').off().on('click',function () {
        if(requestData.desc || requestData.image_url){
            requestData.id = coupons.id;
            modifyEvent(requestData);
        }else {
            util.showErrorInfo('#alert','您没有尚未进行修改，请修改后提交!');
        }
    });

    function initPage() {
        $('#title').val(coupons.title);
        $('#value').val(coupons.value);
        $('#limit_value').val(coupons.limit_value);
        $('input[name=date_type][value=' + coupons.date_type + ']').prop('checked',true);
        if('R' == coupons.date_type && coupons.relative_day){
            $('#relativeTime').removeClass('hide');
            $('#absoluteTime').addClass('hide');
            $('#relative_day').val(coupons.relative_day);

        }else {
            $('#start_time').val(coupons.start_time);
            $('#end_time').val(coupons.end_time);
        }

        $('#create_num').val(coupons.create_num);
        $('#user_receive_limit').val(coupons.user_receive_limit);
        $('input[name=promotion_type][value=' + coupons.date_type + ']').prop('checked',true);
        if(coupons.image_url){
            $('#imgBox').html('<img id="image_url" src="' + coupons.image_url + '">');
            $('#spreadExampleBox').html('<img src="' + coupons.image_url + '">');
        }
        $('#desc').html(coupons.desc);
        $('input[name=user_status_limit][value=' + coupons.user_status_limit + ']').prop('checked',true);
    };

    function modifyEvent(coupons) {
        var result = api.modifyStore(coupons);
        if(result){
            if(result.status == 200){
                alert('修改成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('修改失败，失败状态：503，失败原因：' + result.err);
            }else {
                alert('修改失败，失败状态：' + result.status + '，失败原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为空！');
        }
    };

};
/**
 * Created by Administrator on 2016/6/6 0006.
 */
