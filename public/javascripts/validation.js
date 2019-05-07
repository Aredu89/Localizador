$('#addReview').submit(function (e) {
    $('.alert.alert-dismissible.alert-warning').hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
        if ($('.alert.alert-dismissible.alert-warning').length) {
            $('.alert.alert-dismissible.alert-warning').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button><h4 class="alert-heading">Cuidado!</h4><p class="mb-0">Todos los campos son requeridos, intente nuevamente.</a>.</p></div>');
        }
        return false;
    }
});