function detailOptionView(){
    var container = '.option';

    $(container).html(render());

    $('.opt-btn a').on('click',function(){
        $('.select').fadeIn('slow',function(){
            $('body').on('touchmove', function (event) {
                event.preventDefault();
            });
        });
        $(container).addClass('hide');
    });

    $('.choice-1').on('click',function(){;
        $.confirm('拨打客户电话:4008673799',null,'tel:4008673799')
    });

    $('.choice-2').on('click',function(){
        $.confirm($('#hetong').html());
    });

    function render(){
        var html = '<div class="option-box">';
            html += '<div class="opt-choice opt-group">';
            html += leftPart('choice-1','www/image/kefu.jpg','客服咨询');
            html += leftPart('choice-2','www/image/hetong.png','租凭合同');
            html += '</div>';
            html += optionPart();
            html += '</div>';
        return html;
    };
    
    function leftPart(clz,img,text) {
        var html = '<div class="'+ clz +' choice">';
            html += '  <p><img src="'+ img +'"></p>';
            html += '  <p>'+ text +'</p>';
            html += '</div>';
        return html;
    };

    function optionPart(){
        var html = '<div class="opt-btn opt-group">';
            html += '<a>加入租袋</a> ';
            html += '<a>立即租</a>';
            html += '</div>';
        return html;
    };
};
