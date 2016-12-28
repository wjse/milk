define(['jquery','api','wHandler','converter','util','iScroll'],function($,api,handler,converter,util){
    if(!handler.isUserLogin()){
        return;
    }

    api.getCouponList(function(data){
        console.log(data);
        render(data.list);

        util.getScript('/common/page-view').then(function(){
            window.pageView(data.page,'ticketList',function(pageNum){
                api.getCouponList(function(_data){
                    $('#dataList').append(dataRender(_data.list));
                },{p:pageNum});
            });
        });
    });

    function render(list){
        $('<ul>',{
            html : dataRender(list),
            id:'dataList',
        }).appendTo('.ticket-list');
    };

    function dataRender(list){
        var html = '';
        $.each(list,function(i){
            var c = list[i],limit = '无限制';
            html += '<li>';
            html += '<div class="info">';
            html += '    <p>'+ c.title +'</p>';
            if(c.limit_value > 0){
                limit = '满: ' + c.limit_value;
            }
            html += '    <p>'+ limit +'</p>';
            html += '    <p>使用期限: '+ dealDate(c.start_time) +' - '+ dealDate(c.end_time)  +'</p>';
            html += '</div>';
            html += '<div class="sign"></div>';
            html += '</li>';
        });
        return html;
    };

    function dealDate(date){
        if(date && date.indexOf(' ') != -1){
            return date.split(' ')[0];
        }
        return date;
    };
});