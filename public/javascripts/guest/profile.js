Stripe.setPublishableKey('pk_test_2EDZoff2M6jrmmigKHXFMRzi00VKpVwSsW');
var form = $("#registerForm");
$(form).submit(function (e) {
    $('#charge-error').text("");
    $('#charge-error').addClass('d-none');
    $(form).find('button').prop('disabled', true);
    var expiry_date = $('#expDate').val();
    var temp = expiry_date.split("/");
    Stripe.card.createToken({
        number: $('#cardID').val(),
        cvc: $('#CVV').val(),
        exp_month: parseInt(temp[0]),
        exp_year: parseInt(temp[1]),
        name: $("#cardName").val()
    }, stripeResponseHandler);
    return false;
})
function stripeResponseHandler(status, response) {

    if (response.error) { 
        console.log("error");
        var s ="";
        if(response.error.code=="invalid_number"||response.error.code=="incorrect_number"){
            s="Mã số thẻ không hợp lệ!";
        }else if(response.error.code=="invalid_expiry_year"||response.error.code=="invalid_expiry_year"){
            s="Thời gian hiệu lực không hợp lệ!";
        }else if(response.error.code="expired_card"){
            s="Thẻ của bạn đã hết hạn!";
        }else if(response.error.code=="incorrect_cvc"||response.error.code=="invalid_cvc"){
            s="Mã CVV không hợp lệ!";
        }else {
            s = response.error.message;
        }
        $('#charge-error').text(s);
        $('#charge-error').removeClass('d-none');
        $(form).find('button').prop('disabled', false); // Re-enable submission

    } else { 
        $(form).get(0).submit();

    }
}