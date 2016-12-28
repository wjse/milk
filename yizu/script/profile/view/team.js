define(['jquery','api','wHandler','util','converter','iScroll'],function($,api,handler,util,converter){
    if(!handler.isUserLogin()){
        return;
    }

    var params = {},isSalesman = util.storage().get('isSalesman'),cusId = util.getUrlParam('cus');

    if(isSalesman && cusId){
        params.cus_id = cusId;
    }

    api.getMyTeam(function(data){
        if(!data){
            $('#empty').removeClass('hide');
            return;
        }

        render(data.list);

        if(isSalesman){
            $('.member-list ul li').on('click',function(){
                var _cusId = $(this).attr('for');
                var cusCount = $(this).attr('count');

                if(cusCount > 0){
                    window.location.href = 'team.html?cus=' + _cusId;
                }
            });
        }

        util.getScript('/common/page-view').then(function(){
            window.pageView(data.page,'memberList',function(pageNum){
                api.getMyTeam(function(next){
                    if(!next){
                        return;
                    }

                    render(next.list);
                },{p:pageNum});

            });
        });
    },params);

    util.getScript('/common/footer-view').then(function(){
        window.footerView('.team-page','profile');
    });

    function render(list){
        $('.member-list').height($(window).height() - 50).children('ul').append(getHtml(list));
    };

    function getHtml(list){
        var html = '';
        list.map(function(obj){
            html += '<li for="' + obj.id + '" count="'+ obj.cus_count +'">';
            html += '<div class="head-img">';
            html += '<img src="' + obj.headimgurl + '">';
            html += '</div>';
            html += '<div class="name">';
            html += '<p>' + converterName(obj.nickname) + '</p>';
            html += '<p>' + converter.text(obj.subscribe_time) + '</p>';
            html += '</div>';
            html += '<div class="tel">' + converter.text(obj.mobile) + '</div>';
            html += '<div class="lower">';
            html += '<span>' + obj.cus_count + '</span>个伙伴';
            html += '</div>';
            html += '</li>';
        });
        return html;
    };

    function converterName(name){
        var _name = converter.text(name);
        if(_name.length > 6){
            return _name.substr(0,6).concat('...');
        }else{
            return _name;
        }
    };
});