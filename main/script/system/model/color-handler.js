define(['util'],function(util){
    var colorArray;
    util.getScript('/system/model/color',false).then(function(){
        colorArray = window.color;
    });

    return {
        getRandomColor : function(){
            return colorArray[parseInt(Math.random() * colorArray.length)];
        },

        setColorChoose : function(color){
            for(var i = 0 ; i < colorArray.length ; i++){
                if(colorArray[i].class == color.class){
                    colorArray[i].isChoose = true;
                    break;
                }
            }
        },

        resetColor : function(){
            for(var i = 0 ; i < colorArray.length ; i++){
                colorArray[i].isChoose = false;
            }
        }
    };
});/**
 * Created by wujia on 16/4/6.
 */
