function orderShipView(companys,callback) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'),userToken = requirejs('userToken');

    if(util.isEmpty($('#shipBox').html())){
        renderShipBox(companys);
    }

    $('#shipBox').slideDown(500);

    // ship event
    $('#confirmShipBtn').off().on('click',function () {
        //to get order id
        var data = {
            ship_company : $('#ship_company').val(),
            ship_number : $('#ship_number').val()
        };
        if(util.isEmpty(data.ship_company)){
            alert('请选择快递公司！');
            return;
        }
        if(util.isEmpty(data.ship_number)){
            alert('请完整填写订单号！');
            return;
        }
        callback.call(this,data);

    });

    // cancel ship event
    $('#cancelShipBtn').off().on('click',function () {
        $('#shipBox').slideUp(500);
    });


    function renderShipBox(companys) {
        var html = '<div class="ship-head">选择物流信息</div>';

            html += renderShipContent(companys);
            html += '<div class="ship-bottom">';
            html += '<div class="confirm-ship-btn" id="confirmShipBtn">确认发货</div>';
            html += '<div class="cancel-ship-btn" id="cancelShipBtn">取消发货</div>';
            html += '</div>';

        $('#shipBox').html(html);
    };

    function renderShipContent(companys) {
        var html = '<div class="ship-content">';
        html += '<div class="ship-row">';
        html += '<span>物流公司</span>';
        html += '<select class="ship-company-select" id="ship_company">';
        html += renderShipCompany(companys);
        html += '</select>';
        html += '</div>';
        html += '<div class="ship-row">';
        html += '<span>快递单号</span>';
        html += '<input class="ship-num-input" type="text" id="ship_number">';
        html += '</div>';
        html += '</div>';
        return html;
    };

    function renderShipCompany(companys) {
        var html = '';
        if(companys && companys.length > 0){
            for(var i in companys){
                html += '<option value="' + companys[i].company_code + '">' + companys[i].company_name + '</option>';
            }
        }

        return html;
    };

};
/**
 * Created by Administrator on 2016/5/27 0027.
 */
