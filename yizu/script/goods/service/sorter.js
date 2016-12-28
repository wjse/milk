define(function(){
    var sorter = window.sorter = {};

    sorter.sort = function(obj,array){


        if(!obj){
            return;
        }

        if(!obj.default){
            obj.default = obj.sort.desc;
        }else if(obj.default == obj.sort.desc){
            obj.default = obj.sort.asc;
        }else if(obj.default == obj.sort.asc){
            obj.default = obj.sort.desc;
        }

        array.sort(function(o1,o2){
            if(obj.default == 'desc'){
                return $(o2).attr(obj.id) - $(o1).attr(obj.id);
            }else{
                return $(o1).attr(obj.id) - $(o2).attr(obj.id);
            }
        });

        return array;
    };

    return sorter;
});
