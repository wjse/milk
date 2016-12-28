function addressEmptyView(){

    var addressForm = requirejs('addressForm');
    $('#select').css('height',window.screen.height - 250 - 60);

    $('.block-btn').attr('for','save');
    addressForm.openEdit(true);
};
