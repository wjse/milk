function detailModelView(){
    var container = '.model';

    $(container).html($('<p>',{
        html : '选择 型号和租期',
        click : function(){
            $('.select').fadeIn('slow',function(){
                $('body').on('touchmove',function(event){
                    event.preventDefault();
                });
            });
            $('.option').addClass('hide');
        }
    })).removeClass('hide');
};
