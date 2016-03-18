/**
 * Created by irfan.maulana on 3/17/2016.
 */
const URL_ROOT = "http://localhost:3000";

function validateForm(){
    var isValid = false;
    if($("#title").val() !== ""){
        isValid = true;
    }
    return isValid;
}

function submitSaveForm(){
    if(validateForm()){
        var product = {
            title: $("#title").val(),
            description: $("#description").val(),
            price: $("#price").val()
        };
        $.ajax({
            type: "POST",
            url: URL_ROOT + "/api/products",
            data: product,
            success: function(response){
                handleAjaxSubmitResponse(response);
            },
        });
    }else{
        return false;
    }
}

function submitUpdateForm(idProduct){
    if(validateForm() && idProduct){
        var product = {
            title: $("#title").val(),
            description: $("#description").val(),
            price: $("#price").val()
        };
        $.ajax({
            type: "PUT",
            url: URL_ROOT + "/api/products/" + idProduct,
            data: product,
            success: function(response){
                handleAjaxSubmitResponse(response);
            },
        });
    }else{
        return false;
    }
}

function submitDelete(idProduct){
    if(idProduct){
        $.ajax({
            type: "DELETE",
            url: URL_ROOT + "/api/products/" + idProduct,
            success: function(response){
                handleAjaxSubmitResponse(response);
            },
        });
    }
}

function handleOnErrorAjaxSubmit(response){
    if(response.errorDesc.message){
        showFormErrorMessage(response.errorDesc.message);
    }else if(response.errorDesc.err){
        showFormErrorMessage(response.err);
    }else{
        showFormErrorMessage("Something was wrong, please refresh browser and try again!");
    }
}

function handleAjaxSubmitResponse(response){
    if(response.result){
        window.location = URL_ROOT + "/app";
    }else{
        handleOnErrorAjaxSubmit(response);
    }
}

function showFormErrorMessage(message){
    $("#form-error-message").html(
        '<div class="alert alert-danger">'+
        '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
        '<strong>Error!</strong> '+ message +
        '</div>'
    );
}