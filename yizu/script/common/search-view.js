function searchView(container){

    var cleanIcon = 'www/image/icon-del.png',
        searchVal = requirejs('util').getUrlParam('search');

    $('<div>',{
        id : 'search',
        html : render()
    }).appendTo(container);

    $('.search-icon').on('click',function(){
        var val = $('input[name=search-input]').val();
        if(val){
            window.location.href = 'goods.html?search='+val;
        }else{
            window.location.href = 'goods.html';
        }
    });

    $('.search-clean').on('click',function(){
        $('input[name=search-input]').val('');
    });

    if(searchVal){
        $('input[name=search-input]').val(searchVal);
    }

    function render(){
        var html  = '<div class="search-box">';
            html += '<div class="search-area">';
            html += '  <div class="search-icon"></div>';
            html += '  <div class="search-input">';
            html += '    <input type="text" name="search-input" placeholder="Search..." data-role="none">';
            html += '  </div>';
            html += '  <div class="search-clean">';
            html += '    <a href="#"><img src="'+ cleanIcon +'"></a>';
            html += '  </div>';
            html += '</div></div>';

        return html;
    };
};
