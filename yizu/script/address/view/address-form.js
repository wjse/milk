define(['jquery','util','converter','api','areaList'],function($,util,converter,api,areaList){
    var container = '.address-list',
        list;

    $('#area').parent().on('click',function(){
        $('.select').removeClass('hide');
        var str = util.isEmpty($(this).attr('for')) ? '' : $(this).attr('for'),
            array = str.split('_');
        initProvince(array[0]);
        var cId = initCity(array[0],array[1]);
        initDistrict(cId,array[2]);
    });

    $('.block-btn').on('click',function(){
        if($(this).attr('for') == 'toSave'){
            return;
        }
        var id = $('.address-form').attr('for');
        var data = api.formTransToJson($('.address-form form').serialize()),
            isUnChangeAddress = util.isEmpty($('.areaInput').val());
        if(isUnChangeAddress){
            delete data.province;
            delete data.city;
            delete data.district;
            delete data.area_id;
        }
        
        if(id){
            data.id = id;
            var result = api.updateAddress(data);
            if(result.ok){
                window.location.reload();
            }else{
                if(result.err == 'update address'){
                    window.location.reload();
                }else{
                    $.info('修改失败!','warn');
                }
            }
        }else{
            var result = api.newAddress(data);
            if(result.ok){
                window.location.reload();
            }else{
                $.info('新增失败!','warn');
            }
        }
    });

    this.openEdit = function(isNew,$a,_list){
        $(container.concat(' ul')).addClass('hide');
        if(isNew){
            $('.address-form').removeClass('hide');
        }else{
            list = _list
            $('.block-btn').html('保存');
            var id = $a.attr('for');
            $('.address-form').removeClass('hide').attr('for',id);
            var addr = getAddress(id);
            setAddress(addr);
        }
    };

    function setAddress(addr){
        $('input[name="contact"]').val(addr.contact);
        $('input[name="tel"]').val(addr.tel);
        $('#area').html(converter.address(addr,true)).parent().attr('for',addr.province + '_' + addr.city + '_' + addr.district);
        $('#detail').val(addr.address);
    };

    function getAddress(id){
        var addr = {};
        for(var i = 0 ; i < list.length; i++){
            if(id == list[i].id){
                addr = list[i];
                break;
            }
        }

        return addr;
    };

    function initProvince(pName){
        var pList = areaList.getAreaList('0'),
            html = '';
        for(var i = 0 ; i < pList.length; i++){
            var p = pList[i];
            if(pName.indexOf(p.area_name) != -1){
                var temp = pList[0];
                pList[0] = p;
                pList[i] = temp;
                break;
            }
        }

        for(var i = 0 ; i < pList.length; i++){
            html += '<li class="areaLi" for="'+ pList[i].area_id +'" to=".city">' + pList[i].area_name + '</li>';
        }

        $('.province ul').html(html);
        $('.province li:first').addClass('active');
        areaLiEvent();
    };

    function initCity(pName,cName){
        pName = util.isEmpty(pName) ? '北京' : pName;
        var cList = areaList.getCityByProvince(pName),
            html = '',
            cId;
        for(var i = 0 ; i < cList.length ; i++){
            var c = cList[i],
                isActive = '';

            if(cName && cName.indexOf(c.area_name) != -1){
                isActive = 'active';
                cId = c.area_id;
            }

            html += '<li class="areaLi '+ isActive +'" for="'+ c.area_id +'" to=".area">' + c.area_name + '</li>';
        }
        $('.city ul').html(html);
        areaLiEvent();
        return cId;
    };

    function initDistrict(cId,dName){
        var dList = areaList.getAreaList(cId),
            html = '';

        for(var i = 0; i < dList.length ; i++){
            var d = dList[i],
                isActive = '';
            if(dName && dName.indexOf(d.area_name) != -1){
                isActive = 'active';
            }

            html += '<li class="areaLi '+ isActive +'" for="'+ d.area_id +'">' + d.area_name + '</li>';
        }

        $('.area ul').html(html);
        areaLiEvent();
    };

    function areaLiEvent(){
        $('.areaLi').unbind().on('click',function(){
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
            var toClass = $(this).attr('to');
            if(!toClass){
                var selectArea = $('.areaLi[class="areaLi active"]');
                $('#areaId').val($(this).attr('for'));
                $('.select').addClass('hide');
                var text = '';
                var inputArray = $('.areaInput');
                for(var i = 0 ; i < selectArea.length ; i++){
                    var val = $(selectArea[i]).html();
                    inputArray[i].value = val;
                    text += val + ' ';
                }
                $('#area').html(text);
            }else{

                var id = $(this).attr('for');
                var area = areaList.getArea(id);
                if(toClass == '.city'){
                    initCity(area.area_name);
                    $('.area ul').html('');
                }else{
                    initDistrict(area.area_id);
                }
            }
        });
    };

    return this;
});

