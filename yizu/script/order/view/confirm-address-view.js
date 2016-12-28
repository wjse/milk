function confirmAddressView(address){

    var isDefault = 1,
        converter = requirejs('converter');

    renderDefault(getDefault());

    renderOthers();

    openSelectAddressEvent();

    otherAddressEvent();

    function openSelectAddressEvent(){
        $('#defaultAddress').unbind().on('click',function(){
            $('.confirm-page').addClass('hide');
            $('.select-address').fadeIn('slow');
        });
    };

    function otherAddressEvent(){
        $('.otherAddress').unbind().on('click',function(){
            setSelect($(this).attr('for'));
            $('.select-address').fadeOut('fast');
            $('.confirm-page').removeClass('hide');
            openSelectAddressEvent();
        });
    }

    function setSelect(id){
        for(var i = 0 ; i < address.length ; i++){
            var a = address[i];
            if(a.id == id){
                renderDefault(a);
                break;
            }
        }
    };
    
    function renderOthers(){
        var html = '<div class="address-list">';
        html += '<ul>';
        for(var i = 0 ; i < address.length ; i++){
            var a = address[i],
                isActive = '';
            if(a.is_default == isDefault){
                isActive = 'active';
            }
            html += '<li class="otherAddress ' + isActive + '" for="'+ a.id +'">';
            html += renderSingle(a);
            html += '</li>';
        }
        html += '</ul>';
        html += '</div>';
        $('.select-address').html(html);
    }

    function renderDefault(a){
        var html = '<a id="defaultAddress" for="'+ a.id +'">';
        html += renderSingle(a);
        html += '</a>';
        
        $('.address').html(html);
    };

    function renderSingle(a){
        var html = '<div class="u-name">'+ a.contact +'</div>';
        html += '<div class="u-tel">'+ a.tel +'</div>';
        html += '<div class="u-place">' + converter.address(a) + '</div>';
        return html;
    };

    function getDefault(){
        var defaultAddress = {};
        for(var i = 0 ; i < address.length ; i++){
            var a = address[i];
            if(a.is_default == isDefault){
                defaultAddress = a;
                break;
            }
        }
        return defaultAddress;
    };
};