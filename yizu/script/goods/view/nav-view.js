function navView(data){
    var brand = data.brand;
    var container = '.nav-filter',
        nav = [
            {
                text : '综合',
                isActive : true,
                type : 'sort',
                id:'default',
                sort : {
                    asc : 'asc',
                    desc : 'desc'
                },
                default : 'default'
            },{
                text : '品牌',
                isActive : false,
                type : 'brand'
            },{
                text : '销量',
                isActive : false,
                type : 'sort',
                id:'sales',
                sort : {
                    asc : 'asc',
                    desc : 'desc'
                }
            },{
                text : '租金',
                isActive : false,
                id:'rent',
                type : 'sort',
                sort : {
                    asc : 'asc',
                    desc : 'desc'
                }
            }
        ];

    var brandList = [],
        api = requirejs('api'),
        sorter = requirejs('sorter'),
        util = requirejs('util');

    if(brand && brand.list){
        brandList = brand.list;
    }


    $('<div>',{
        class : 'filter',
        html : render()
    }).appendTo(container);

    $('#nav li').on('click',function(){
        var text = $(this).attr('for');
        for(var i = 0 ; i < nav.length ; i++){
            nav[i].isActive = false;
            var n = nav[i];
            if(n.text == text){
                $('#nav li').removeClass('active');
                tabEvent($(this),n);
                break;
            }
        }
    });

    $('.filter-list').html(renderFilter());

    $('.filter-list li').on('click',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });

    $('.filter-list .reset').on('click',function(){
        $('.filter-list li').removeClass('active');
    });

    $('.filter-list .confirm').on('click',function(){
        var selectedArray = $('.filter-list li[class=active]');
        brandEvent(selectedArray);
        $('.filter-list').hide();
        $('.cover').hide();
    });

    function renderFilter() {
      var html = '<p><span></span></p>';
          html += '<ul>';

      $.each(brandList,function(i){
          html += '<li for="'+ brandList[i].bid +'">'
          html += '<a href="#">' + brandList[i].brand_name + '</a>';
          html += '</li>';
      });

          html += '</ul>';
          html += '<div class="filter-option">';
          html += '<div class="reset"><a href="#">重置</a></div>';
          html += '<div class="confirm"><a href="#">确定</a></div>';
          html += '</div>';
        return html;
    };

    function render(){
        var html = '<ul id="nav">';
        $.each(nav,function(i){
            var n = nav[i],isActive = '';
            if(n.isActive){
                isActive = 'active';
            }
            html += '<li class="' + isActive + '" for="'+ n.text +'">';
            html += '<a href="#">' + n.text + '<span></span></a>';
            html += '</li>';
        });
        html += '</ul>';
        return html;
    };

    function tabEvent($li,obj){
        obj.isActive = true;
        var type = obj.type;

        switch (type){
            case 'brand' : openBrand(); break;
            case 'sort'  : sort(obj); break;
        }

        $li.addClass('active');
    };

    function sort(obj){
        var array = sorter.sort(obj,$('.goods-box li'));
        $('.goods-box').html(array);
    };

    function openBrand(){
        $('.filter-list').toggle();
        $('.cover').toggle();
    };

    function brandEvent($array){
        var bid = '';
        for(var i = 0 ; i < $array.length ; i++){
            bid += $($array[i]).attr('for');
            if(i != $array.length - 1){
                bid += '_';
            }
        }

        var params = util.storage('session').get('params');
        if(!params){
            params = {};
        }
        params.bid = bid;
        util.storage('session').put('params',params);

        api.queryGoodsByCategoryCallback(function(result){
            $('.nav-box ul li').removeClass('active');
            window.goodsListView(result.goods);
        },params);
    };
};
