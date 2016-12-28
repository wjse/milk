/**
 * system view object
 * @param array system array
 */
function systemView(array,colorHandler,isSystem,isUserPage){
    var $ = requirejs('jquery'),util = requirejs('util');
    var storage = util.storage('session');

    if(isUserPage){
        renderUserPageSystem(array);
        return;
    }

    for(var i = 0 ; i < array.length ; i++){
        array[i].color = getColor(array.length);
        if(isSystem){
            renderSystem(array[i]);
        }else{
            renderHome(array[i]);
        }
    }

    function renderHome(system){
        var token = storage.get('token');
        var view = '<div class="system-item '+ system.color.class +'">';
            view += '<a href="'+ system.system_url +'?token=' + token + '">';
            view += '<img src="' + system.system_image + '">';
            view += '</a>';
            view += '<div class="system-name">' + system.system_name + '</div>';
            view += '</div>';

        $("#content").append(view);
    };

    function renderSystem(system){

        var view = '<div class="system-item '+ system.color.class +'" id="' + system.id + '">';
            view += '<span class="glyphicon glyphicon-cog opt-icon edit-icon modal-icon" data-for="' + system.id + '"></span>';
            view += '<span class="glyphicon glyphicon-remove opt-icon remove-icon" data-for="' + system.id + '"></span>';
            view += '<input type="hidden" id="' + system.id + '_link" value="' + system.system_url + '">';
            view += '<img class="system-icon" id="' + system.id + '_img" src="' + system.system_image + '">';
            view += '<div class="system-name" id="' + system.id + '_name">' + system.system_name + '</div>';
            view += '</div>';
        $("#content").append(view);
    };

    function renderUserPageSystem(systems){
        var html = '';
        if(systems && systems.length > 0){
            for(var i in systems){
                html += '<label class="checkbox-inline">';
                html += '<input type="checkbox" name="system" value="' + systems[i].id + '"> ' +  systems[i].system_name;
                html += '</label>';
            }
        }
        $('#systems').html(html);
    };

    /**
     * get random color function
     * @param length
     * @returns {*} color
     */
    function getColor(length){

        for(var i = 0 ; i < length ; i++){
            var color = colorHandler.getRandomColor();
            if(!color.isChoose){
                colorHandler.setColorChoose(color);
                return color;
            }else{
                return getColor(length);
            }
        }
    };
};
