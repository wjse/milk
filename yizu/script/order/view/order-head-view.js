function orderHeadView(type){
    var container = '.order-page .head',
        converter = requirejs('converter'),
        dataArray = ['unPay','unShip','unGet','finish'];

    $('<ul>',{
        html : render()
    }).appendTo(container);

    function render(){
        var html = '';
        $.each(dataArray,function(i){
            var data = dataArray[i],
                isActive = data == type ? 'active' : '';
            html += '<li class="' + isActive + '">';
            html += '<a href="order.html?type='+ data +'">' + converter.orderTypeText(data) + '</a>';
            html += '</li>';
        });
        return html;
    };
};
