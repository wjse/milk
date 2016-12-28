define(['jquery'],function($){

    return {
        uploadStyleStr : function (width,height,qualityNumber) {
            var imgStyleStr = 'imageView2/2';

            if(width){
                imgStyleStr += '/w/' + width;
            }
            if(height){
                imgStyleStr += '/h/' + height;
            }
            if(qualityNumber){
                imgStyleStr += '/interlace/0/q/' + qualityNumber;
            }

            return imgStyleStr;
        },

        countImgStyle : function(imgSize){
            var sizeKb = imgSize / 1024;
            if(sizeKb <= 100){
                return this.uploadStyleStr(false,false,false);
            }else if(sizeKb > 100 && sizeKb <= 200){
                return this.uploadStyleStr(false,false,70);
            }else if(sizeKb > 200 && sizeKb <= 300){
                return this.uploadStyleStr(false,false,50);
            }else if(sizeKb > 300 && sizeKb <= 400){
                return this.uploadStyleStr(false,false,40);
            }else if(sizeKb > 400){
                return this.uploadStyleStr(false,false,20);
            }
        },

        upload : function(id,url,callback,uploadSize,btnNumber){
            var uploadBtnLength = 1,fileSize = 200;
            if(uploadSize){
                fileSize = uploadSize;
            }
            if(btnNumber){
                uploadBtnLength = btnNumber;
            }
            if($('.ajax-upload-dragdrop').length >= uploadBtnLength){
                return;
            }
            $(id).uploadFile({
                url : url,
                returnType: "json",
                showDelete: true,
                showDone:false,
                maxFileSize:parseInt(fileSize) * 1024,
                dragDropStr:"",
                showFileSize:true,
                dragDropStr:"",
                showStatusAfterSuccess:false,
                onSuccess:callback
            });
        },

        tree : function (divId,list,callback) {
            $(divId).tree({
                data : list,
                autoOpen : false,
                dragAndDrop: true,
                slide: false
            }).bind(
                'tree.click',
                callback
            );
        },

        dateUI : function (id) {
            $(id).datetimepicker({
                lang:'ch',
                format:'Y/m/d H:i',
                timepicker:false,
                todayButton:false,
                keyboardNavigation:false
            });

        }
    };
});
/**
 * Created by Administrator on 2016/5/16 0016.
 */
