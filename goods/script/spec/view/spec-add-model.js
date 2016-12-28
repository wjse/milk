function specAddModel(type,title_id) {
    var data = {};
    if('title' == type){
        data = {
            title_id : '',
            liClass : 'add-title-li',
            addItem : ['title_name','title_code'],
            saveBtn : 'titleConfirmSaveBtn',
            cancelBtn : 'titleCancelSaveBtn'
        };
    }else if('option' == type){
        data = {
            title_id : title_id,
            liClass : 'add-option-li',
            addItem : ['option_name','option_value','param_1'],
            saveBtn : 'optionConfirmSaveBtn',
            cancelBtn : 'optionCancelSaveBtn'
        };
    }

    return data;
};
/**
 * Created by Administrator on 2016/6/3 0003.
 */
