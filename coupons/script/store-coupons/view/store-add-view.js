function storeAddView() {
    var $ = requirejs('jquery'),util = requirejs('util'),config = requirejs('config'),
        api = requirejs('api'),userToken = requirejs('userToken'),plugins = requirejs('plugins');
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));

    //date  event
    plugins.dateUI('#start_time');
    plugins.dateUI('#end_time');

    //date type event
    $('input[name=date_type]').off().on('change',function () {
        var data_type = $('input[name=date_type]:checked').val();
        if('R' == data_type){
            $('#relativeTime').removeClass('hide');
            $('#absoluteTime').addClass('hide');
            $('#start_time').val('');
            $('#end_time').val('');
        }else if('A' == data_type){
            $('#absoluteTime').removeClass('hide');
            $('#relativeTime').addClass('hide');
            $('#relative_day').val('');
        }
    });

    //uploadEvent
    plugins.upload('#uploadBtn',uploadPath,function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0].image_url;
            $('#imgBox').html('<img id="image_url" src="' + path + '">');
            $('#spreadExampleBox').html('<img src="' + path + '">');
        }else if(resp && resp.status == 401){
            alert('用户登录失效，请重新登录！');
            userToken.goLogin();
        }
    });
    
    //save event
    $('#saveBtn').off().on('click',function () {
        var data = {
            title : $('#title').val(),
            value : $('#value').val(),
            limit_value : $('#limit_value').val(),
            date_type : $('input[name=date_type]:checked').val(),
            create_num : $('#create_num').val(),
            user_receive_limit : $('#user_receive_limit').val(),
            promotion_type : $('input[name=promotion_type]:checked').val(),
            user_status_limit : $('input[name=user_status_limit]:checked').val()
        };

        util.getScript('/store-coupons/view/verify-data').then(function () {
            var coupons = window.verifyData(data);
            if(coupons){
                coupons.type = 'Shop';
                if(util.isNotEmpty($('#image_url').attr('src'))){
                    coupons.image_url = $('#image_url').attr('src');
                }
                if(util.isNotEmpty($('#desc').val())){
                    coupons.desc = $('#desc').val();
                }
                saveEvent(coupons);
            }
        });
    });

    function saveEvent(coupons) {
        var result = api.saveStore(coupons);
        if(result){
            if(result.status == 200){
                alert('添加成功！');
                window.location.href = 'store-coupons-list.html?token=' + storage.get('token');
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('添加失败，失败状态：503，失败原因：' + result.err);
            }else {
                alert('添加失败，失败状态：' + result.status + '，失败原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为空！');
        }
    };

};
/**
 * Created by Administrator on 2016/6/6 0006.
 */
