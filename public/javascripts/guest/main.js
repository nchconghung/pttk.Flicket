$(document).ready(function () {
    $(".content").hide();
});
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navigation-bar");
        var $carouse = $("#carouselExampleIndicators");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $carouse.height());
    });
});
$(function () {
    $(document).scroll(function () {
        var $nav = $("#navigation-bar2");
        $nav.toggleClass('scrolled2', $(this).scrollTop() > $nav.height());
    });
});
//Nav bar
$(".main-signInBTN").click(function () {
    $("#signIn-model").toggleClass("show-panel");
});
$(document).mouseup(function (e) {
    var container = $("#signIn-model");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("show-panel");
    }
});
$(".main-signInBTN2").click(function () {
    $("#signIn-model2").toggleClass("show-panel");
});
$(document).mouseup(function (e) {
    var container2 = $("#signIn-model2");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        container2.removeClass("show-panel");
    }
});
//Departure airport
$(".depart-close").click(function () {
    $("#depart-panel").removeClass("show-panel");
});
$("#depart-airport").click(function () {
    $("#depart-panel").toggleClass("show-panel");
    $("#arrival-panel").removeClass("show-panel");
});
$("#depart-panel .air-option").click(function (e) {
    $("#depart-airport").val($(this).val())
    $("#depart-panel").removeClass("show-panel");
})
$("#depart-panel .popular").click(function () {
    $("#depart-panel .content").hide("swing");
    $("#depart-panel .airport-category div").removeClass("airport-category-active");
    $("#depart-panel .popular").addClass("airport-category-active");
})
$("#depart-panel .vn").click(function () {
    $("#depart-panel .content").hide("swing");
    $(" #depart-panel.airport-category div").removeClass("airport-category-active");
    $("#depart-panel .vn").addClass("airport-category-active");
    $("#depart-panel .vn-content").show("swing");
})
$("#depart-panel .china").click(function () {
    $("#depart-panel .content").hide("swing");
    $("#depart-panel .airport-category div").removeClass("airport-category-active");
    $("#depart-panel .china").addClass("airport-category-active");
    $("#depart-panel .china-content").show("swing");
})
$("#depart-panel .eu").click(function () {
    $("#depart-panel .content").hide("swing");
    $("#depart-panel.airport-category div").removeClass("airport-category-active");
    $("#depart-panel .eu").addClass("airport-category-active");
    $("#depart-panel .eu-content").show("swing");
})
$("#depart-panel .other").click(function () {
    $("#depart-panel .content").hide("swing");
    $("#depart-panel .airport-category div").removeClass("airport-category-active");
    $("#depart-panel .other").addClass("airport-category-active");
    $("#depart-panel .other-content").show("swing");
})
$(document).mouseup(function (e) {
    var container = $("#depart-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("show-panel");
    }
});
//Arrival airport
$(".arrival-close").click(function () {
    $("#arrival-panel").removeClass("show-panel");
});
$("#arrival-airport").click(function () {
    $("#depart-panel").removeClass("show-panel");
    $("#arrival-panel").toggleClass("show-panel");
});
$("#arrival-panel .popular").click(function () {
    $("#arrival-panel .content").hide("swing");
    $("#arrival-panel .airport-category div").removeClass("airport-category-active");
    $("#arrival-panel .popular").addClass("airport-category-active");
})
$("#arrival-panel .vn").click(function () {
    $("#arrival-panel .content").hide("swing");
    $("#arrival-panel .airport-category div").removeClass("airport-category-active");
    $("#arrival-panel .vn").addClass("airport-category-active");
    $("#arrival-panel .vn-content").show("swing");
})
$("#arrival-panel .china").click(function () {
    $("#arrival-panel .content").hide("swing");
    $("#arrival-panel .airport-category div").removeClass("airport-category-active");
    $("#arrival-panel .china").addClass("airport-category-active");
    $("#arrival-panel .china-content").show("swing");
})
$("#arrival-panel .eu").click(function () {
    $("#arrival-panel .content").hide("swing");
    $("#arrival-panel .airport-category div").removeClass("airport-category-active");
    $("#arrival-panel .eu").addClass("airport-category-active");
    $("#arrival-panel .eu-content").show("swing");
})
$("#arrival-panel .other").click(function () {
    $("#arrival-panel .content").hide("swing");
    $("#arrival-panel .airport-category div").removeClass("airport-category-active");
    $("#arrival-panel .other").addClass("airport-category-active");
    $("#arrival-panel .other-content").show("swing");
})
$("#arrival-panel .air-option").click(function (e) {
    $("#arrival-airport").val($(this).val())
    $("#arrival-panel").removeClass("show-panel");
})
$(document).mouseup(function (e) {
    var container = $("#arrival-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("show-panel");
    }
});
$(".switch").click(function (e) {
    var temp = $("#depart-airport").val();
    $("#depart-airport").val($("#arrival-airport").val());
    $("#arrival-airport").val(temp);
})
/*Datepicker*/
$("#depart-date").datepicker({
    dateFormat: "D, dd/mm/yyyy",
    onSelect: function onSelect(fd, date) {
        $("#arrival-date").datepicker({
            dateFormat: "D, dd/mm/yyyy",
            minDate: date,
            onSelect: function onSelect(fd, date) {
                $("#depart-date").datepicker({
                    maxDate: date
                })
            }
        })
    }
})
/*Passenger*/
$(document).ready(function () {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.minus-adult').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    $(".passenger-input").click(function () {
        $("#passenger-panel").toggleClass("show-panel");
    });
    $("input[type='radio']").click(function () {
        var val = $("input[name='txtClass']:checked").val();
        if (val) {
            var s = $(".passenger-input").val();
            s = s.split(',')[0];
            s += ", " + val;
            $(".passenger-input").attr('value', s);
        }
    });
    $(".type-quantity").change(function () {
        var adult = parseInt($("#adult").val());
        var kid = parseInt($("#kid").val());
        var baby = parseInt($("#baby").val());
        var sum = adult + kid + baby;
        var s = $(".passenger-input").val();
        s = s.split(',')[1];
        s = sum + " người," + s;
        $(".passenger-input").attr('value', s);
    });
});
$(document).mouseup(function (e) {
    var container = $("#passenger-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("show-panel");
    }
});
/*Ticket-type */
$('.roundtrip').click(function () {
    $('.oneway').removeClass('ticket-type-active');
    $('.roundtrip').addClass('ticket-type-active');
    $('#arrival-date').prop('disabled', false);
});
$('.oneway').click(function () {
    $('.oneway').addClass('ticket-type-active');
    $('.roundtrip').removeClass('ticket-type-active');
    $('#arrival-date').prop('disabled', true);
});
/*Luggage input */
$('.luggage-input-box').click(function () {
    $(this).parent().addClass('above')
    $(this).parent().find('.luggage-input').addClass('show-panel');
})
$('.luggage-input option').click(function () {
    var temp = $(this).text()
    $(this).parent().removeClass('show-panel')
    $(this).parent().parent().find('span').text(temp)
    $(this).parent().parent().removeClass('above')
})
$(document).mouseup(function (e) {
    var container = $(".luggage-input");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("show-panel");
        container.parent().removeClass('above');
    }
});
/*Total amount */
$('#total-amount-btn-expand').click(function () {
    $('.total-amount-detail').toggleClass('show-flex-element');
})
/*Model */
$(".btn-detail-container").click(function () {
    $(".modal-container").show();
    $('body').css('overflow', 'hidden');
})
$(document).mouseup(function (e) {
    var container = $(".flight-detail-container");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.modal-container').hide();
        $('body').css('overflow', 'visible');
    }
});
/*Passenger-info */
$('.date-of-birth').datepicker({
    dateFormat: "D, dd/mm/yyyy"

})
$('#passenger-info-form').submit(function () {
    $(".before-content").addClass('hide-before-content');
    $(".after-content, .after-content2,.change-button").removeClass('hide-before-content');
    var name1 = $("#txtNameContact").val();
    $("#change1").text(name1);
    var phoneNumber = $(".national-code span").text() + $("#txtPhoneNum").val();
    var email = $("#txtEmail").val();
    $("#number-text").text(phoneNumber);
    $("#email-text").text(email);
    $(".passenger-info-type-subcontent").each(function () {
        var nameInput = $(this).find('.txtNamePassenger');
        var title = $(this).find('.info-table-title span');
        title.text(nameInput.val());
        var dateInput = $(this).find('.txtDateOfBirth').datepicker().data('datepicker').selectedDates[0];
        var date = $(this).find('.dateOfBirthOutput');
        var day = dateInput.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = dateInput.getMonth() + 1;
        if (month < 9) {
            month = "0" + month;
        }
        var year = dateInput.getFullYear();
        var dateResult = day + '/' + month + '/' + year;
        date.text(dateResult);

    })

})
$('.change-button').click(function () {
    $(this).parent().parent().find('.before-content').removeClass('hide-before-content');
    $(this).parent().parent().find('.after-content, .after-content2').addClass('hide-before-content');
    $(this).addClass('hide-before-content');
})
//Payment
$('#txtDueDate').datepicker();
$("#flight-info-btn").click(function () {
    if (!$(this).hasClass('modal-menu-bar-option-active')) {
        $(this).addClass('modal-menu-bar-option-active');
        $('#passenger-info-btn').removeClass('modal-menu-bar-option-active');
    }
    $('#flight-modal2-info').show();
    $('#passenger-modal2-info').hide();
})
$("#passenger-info-btn").click(function () {
    if (!$(this).hasClass('modal-menu-bar-option-active')) {
        $(this).addClass('modal-menu-bar-option-active');
        $('#flight-info-btn').removeClass('modal-menu-bar-option-active');
    }
    $('#flight-modal2-info').hide();
    $('#passenger-modal2-info').show();
})
/*Model 3*/
$("#flight-info-model3-btn").click(function () {
    if (!$(this).hasClass('modal-menu-bar-option-active')) {
        $(this).addClass('modal-menu-bar-option-active');
        $('#payment-info-model3-btn').removeClass('modal-menu-bar-option-active');
    }
    $('#flight-modal3-info').show();
    $('#payment-modal3-info').hide();
})
$("#payment-info-model3-btn").click(function () {
    if (!$(this).hasClass('modal-menu-bar-option-active')) {
        $(this).addClass('modal-menu-bar-option-active');
        $('#flight-info-model3-btn').removeClass('modal-menu-bar-option-active');
    }
    $('#flight-modal3-info').hide();
    $('#payment-modal3-info').show();
})
/*Flight-list info */
$(".flight-list-element-option-1").click(function () {
    var flight_info = $(this).parent().parent().find(".flight-list-element-flight-info");
    var ticket = $(this).parent().parent().find(".flight-list-element-ticket");
    var menu_bar = $(this).parent().parent().find(".flight-list-element-menu-bar");
    var option = $(this).parent().parent().find(".flight-list-element-menu-bar-option");
    var option2 = $(this).parent().find(".flight-list-element-option-2");
    var content = $(this).parent().parent().find(".flight-list-element-menu-bar-content");
    if ($(flight_info).hasClass("flight-list-element-hide") && $(ticket).hasClass("flight-list-element-hide")) {
        console.log("inside");
        $(menu_bar).addClass("flight-list-element-menu-bar-active");
        $(flight_info).removeClass("flight-list-element-hide");
        $(option).addClass("flight-list-element-menu-bar-option1");
        $(this).addClass("flight-list-element-option-active");
    } else if ($(flight_info).hasClass("flight-list-element-hide")) {
        $(flight_info).removeClass("flight-list-element-hide");
        $(ticket).addClass("flight-list-element-hide");
        $(this).addClass("flight-list-element-option-active");
        $(option2).removeClass("flight-list-element-option-active");
    } else if (!$(flight_info).hasClass("flight-list-element-hide")) {
        $(menu_bar).removeClass("flight-list-element-menu-bar-active");
        $(option).removeClass("flight-list-element-menu-bar-option1");
        $(option).removeClass("flight-list-element-option-active");
        $(content).addClass("flight-list-element-hide");
    }
})
$(".flight-list-element-option-2").click(function () {
    var flight_info = $(this).parent().parent().find(".flight-list-element-flight-info");
    var ticket = $(this).parent().parent().find(".flight-list-element-ticket");
    var menu_bar = $(this).parent().parent().find(".flight-list-element-menu-bar");
    var option = $(this).parent().parent().find(".flight-list-element-menu-bar-option");
    var option1 = $(this).parent().find(".flight-list-element-option-1");
    var content = $(this).parent().parent().find(".flight-list-element-menu-bar-content");
    if ($(flight_info).hasClass("flight-list-element-hide") && $(ticket).hasClass("flight-list-element-hide")) {
        $(menu_bar).addClass("flight-list-element-menu-bar-active");
        $(ticket).removeClass("flight-list-element-hide");
        $(option).addClass("flight-list-element-menu-bar-option1");
        $(this).addClass("flight-list-element-option-active");
    } else if ($(ticket).hasClass("flight-list-element-hide")) {
        $(ticket).removeClass("flight-list-element-hide");
        $(flight_info).addClass("flight-list-element-hide");
        $(this).addClass("flight-list-element-option-active");
        $(option1).removeClass("flight-list-element-option-active");
    } else if (!$(ticket).hasClass("flight-list-element-hide")) {
        $(menu_bar).removeClass("flight-list-element-menu-bar-active");
        $(option).removeClass("flight-list-element-menu-bar-option1");
        $(option).removeClass("flight-list-element-option-active");
        $(content).addClass("flight-list-element-hide");
    }
})
/*Flight-filter*/
$("#waiting-time-range-slide").ionRangeSlider({
    type: "int",
    min: 0,
    max: 20,
    from: 0,
    to: 20,
    onFinish: function (data) {
        var from = data.from;
        var to = data.to;
        $(".flight-list-element").hide();
        $(".flight-list-element").each(function () {
            var data = $(this).data("transit-time");
            if (data >= from && data <= to) {
                $(this).show();
            }
        })

    }
});
//Transit-filter
$("#flight-filter-transit").click(function () {
    if (!$("#dropdown-icon-transit").hasClass("dropdown-icon-active")) {
        $("#dropdown-icon-transit").addClass("dropdown-icon-active");
        $("#transit-panel").show();
    } else {
        alert("second click");
        $("#dropdown-icon-transit").removeClass("dropdown-icon-active");
        $("#transit-panel").hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#transit-panel");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $("#dropdown-icon-transit").removeClass("dropdown-icon-active");
    }
});
//Flight-time-filter
$("#flight-filter-flight-time").click(function () {
    if (!$("#dropdown-icon-flight-time").hasClass("dropdown-icon-active")) {
        $("#dropdown-icon-flight-time").addClass("dropdown-icon-active");
        $("#flight-time-panel").show();
    } else {
        $("#dropdown-icon-flight-time").removeClass("dropdown-icon-active");
        $("#flight-time-panel").hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#flight-time-panel");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $("#dropdown-icon-flight-time").removeClass("dropdown-icon-active");
    }
});
//Airline-filter
$("#flight-filter-airline").click(function () {
    if (!$("#dropdown-icon-airline").hasClass("dropdown-icon-active")) {
        $("#dropdown-icon-airline").addClass("dropdown-icon-active");
        $("#airline-panel").show();
    } else {
        $("#dropdown-icon-airline").removeClass("dropdown-icon-active");
        $("#airline-panel").hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#airline-panel");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $("#dropdown-icon-airline").removeClass("dropdown-icon-active");
    }
});
//Other-filter
$("#price-range-slide").ionRangeSlider({
    type: "double",
    min: 1717535,
    max: 3256435,
    from: 1717535,
    to: 3256435,
    prefix: "VND ",
    onFinish: function (data) {
        var from = data.from;
        var to = data.to;
        $(".flight-list-element").hide();
        $(".flight-list-element").each(function () {
            var data = $(this).data("price");
            if (data >= from && data <= to) {
                $(this).show();
            }
        })

    }
});
$("#flight-filter-other-filter").click(function () {
    if (!$("#dropdown-icon-other-filter").hasClass("dropdown-icon-active")) {
        $("#dropdown-icon-other-filter").addClass("dropdown-icon-active");
        $("#other-filter-panel").show();
    } else {
        $("#dropdown-icon-other-filter").removeClass("dropdown-icon-active");
        $("#other-filter-panel").hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#other-filter-panel");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $("#dropdown-icon-other-filter").removeClass("dropdown-icon-active");
    }
});
//Sort-filter
$("#flight-filter-sort").click(function () {
    if (!$("#dropdown-icon-sort").hasClass("dropdown-icon-active")) {
        $("#dropdown-icon-sort").addClass("dropdown-icon-active");
        $("#sort-panel").show();
    } else {
        $("#dropdown-icon-sort").removeClass("dropdown-icon-active");
        $("#sort-panel").hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#sort-panel");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $("#dropdown-icon-sort").removeClass("dropdown-icon-active");
    }
});
/*Filter implementation */

$('#no-transit-checkbox').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit") != "0") {
                $(this).data("numtransit-remove", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit-remove")) {
                $(this).show();
                $(this).data("numtransit-remove", false);
            }
        })
    }
})
$('#one-transit-checkbox').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit") != "1") {
                $(this).data("numtransit-remove1", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit-remove1")) {
                $(this).show();
                $(this).data("numtransit-remove", false);
            }
        })
    }
})
$('#two-transit-checkbox').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit") < "2") {
                $(this).data("numtransit-remove2", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("numtransit-remove2")) {
                $(this).show();
                $(this).data("numtransit-remove", false);
            }
        })
    }
})
$('.numtransit-checkbox').on('change', function () {
    $('.numtransit-checkbox').not(this).prop('checked', false);
});
$('.depart-time-checkbox').on('change', function () {
    $('.depart-time-checkbox').not(this).prop('checked', false);
});
$('.arrive-time-checkbox').on('change', function () {
    $('.arrive-time-checkbox').not(this).prop('checked', false);
});
$('.airline-checkbox').on('change', function () {
    $('.airline-checkbox').not(this).prop('checked', false);
});
function recover_depart() {
    $(".flight-list-element").each(function () {
        if ($(this).data("depart-time-remove1")) {
            $(this).show();
            $(this).data("depart-time-remove1", false);
        }
        if ($(this).data("depart-time-remove2")) {
            $(this).show();
            $(this).data("depart-time-remove2", false);
        }
        if ($(this).data("depart-time-remove3")) {
            $(this).show();
            $(this).data("depart-time-remove3", false);
        }
        if ($(this).data("depart-time-remove4")) {
            $(this).show();
            $(this).data("depart-time-remove4", false);
        }
    })
}
function recover_arrive() {
    $(".flight-list-element").each(function () {
        if ($(this).data("arrive-time-remove1")) {
            $(this).show();
            $(this).data("arrive-time-remove1", false);
        }
        if ($(this).data("arrive-time-remove2")) {
            $(this).show();
            $(this).data("arrive-time-remove2", false);
        }
        if ($(this).data("arrive-time-remove3")) {
            $(this).show();
            $(this).data("arrive-time-remove3", false);
        }
        if ($(this).data("arrive-time-remove4")) {
            $(this).show();
            $(this).data("arrive-time-remove4", false);
        }
    })
}
function recover_airline() {
    $(".flight-list-element").each(function () {
        if ($(this).data("jetstar-remove")) {
            $(this).show();
            $(this).data("jetstar-remove", false);
        }
        if ($(this).data("vietjet-remove")) {
            $(this).show();
            $(this).data("vietjet-remove", false);
        }
        if ($(this).data("vnairline-remove")) {
            $(this).show();
            $(this).data("vnairline-remove", false);
        }
    })
}
$('#depart-time1').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_depart();
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time") > "06:00" && $(this).css("display") != "none") {
                $(this).data("depart-time-remove1", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time-remove1")) {
                $(this).show();
                $(this).data("depart-time-remove1", false);
            }
        })
    }
})
$('#depart-time2').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_depart();
        $(".flight-list-element").each(function () {
            if (($(this).data("depart-time") <= "06:00" || $(this).data("depart-time") > "12:00") && $(this).css("display") != "none") {
                $(this).data("depart-time-remove2", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time-remove2")) {
                $(this).show();
            }
        })
    }
})
$('#depart-time3').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_depart();
        $(".flight-list-element").each(function () {
            if (($(this).data("depart-time") <= "12:00" || $(this).data("depart-time") > "18:00") && $(this).css("display") != "none") {
                $(this).data("depart-time-remove3", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time-remove3")) {
                $(this).show();
            }
        })
    }
})
$('#depart-time4').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_depart();
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time") <= "18:00" && $(this).css("display") != "none") {
                $(this).data("depart-time-remove4", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("depart-time-remove4")) {
                $(this).show();
            }
        })
    }
})

$('#arrive-time1').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_arrive();
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time") > "06:00" && $(this).css("display") != "none") {
                $(this).data("arrive-time-remove1", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time-remove1")) {
                $(this).show();
            }
        })
    }
})
$('#arrive-time2').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_arrive();
        $(".flight-list-element").each(function () {
            if (($(this).data("arrive-time") <= "06:00" || $(this).data("arrive-time") > "12:00") && $(this).css("display") != "none") {
                $(this).data("arrive-time-remove2", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time-remove2")) {
                $(this).show();
            }
        })
    }
})
$('#arrive-time3').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_arrive();
        $(".flight-list-element").each(function () {
            if (($(this).data("arrive-time") <= "12:00" || $(this).data("arrive-time") > "18:00") && $(this).css("display") != "none") {
                $(this).data("arrive-time-remove3", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time-remove3")) {
                $(this).show();
            }
        })
    }
})
$('#arrive-time4').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_arrive();
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time") <= "18:00" && $(this).css("display") != "none") {
                $(this).data("arrive-time-remove4", true);
                $(this).hide();
            } else {
                if ($(this).css("display") != "none")
                    $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("arrive-time-remove4")) {
                $(this).show();
            }
        })
    }
})
$('#airline-all').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_airline();
    }
})
$('#airline-jetstar').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_airline();
        $(".flight-list-element").each(function () {
            if ($(this).data("airline") != "jetstar" && $(this).css("display") != "none") {
                $(this).data("jetstar-remove", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("jetstar-remove")) {
                $(this).show();
                $(this).data("jetstar-remove", false);
            }
        })
    }
})
$('#airline-vietjet').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_airline();
        $(".flight-list-element").each(function () {
            if ($(this).data("airline") != "vietjet" && $(this).css("display") != "none") {
                $(this).data("vietjet-remove", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("vietjet-remove")) {
                $(this).show();
                $(this).data("vietjet-remove", false);
            }
        })
    }
})
$('#airline-vnairline').on('change', evt => {
    if ($(evt.target).is(':checked')) {
        recover_airline();
        $(".flight-list-element").each(function () {
            if ($(this).data("airline") != "vnairline" && $(this).css("display") != "none") {
                $(this).data("vnairline-remove", true);
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    } else {
        $(".flight-list-element").each(function () {
            if ($(this).data("vnairline-remove")) {
                $(this).show();
                $(this).data("vnairline-remove", false);
            }
        })
    }
})
$('.sort-checkbox').on('change', evt => {
    var lowest_price="1000000", earliest_depart="23:59", earliest_arrive="23:59", lastest_depart="00:00", lastest_arrive="00:00", shortest_time;
    $(".flight-list-element").each(function () {
        var t = $(this).data("price");
        if(parseInt(t)<parseInt(lowest_price)){
            lowest_price = t
        }
        t = $(this).data("depart-time")
        if(t<earliest_depart){
            earliest_depart = t
        }
        if(t>lastest_depart){
            lastest_depart = t
        }
        t = $(this).data("arrive-time")
        if(t<earliest_arrive){
            earliest_arrive = t
        }
        if(t>lastest_arrive){
            lastest_arrive = t
        }
    })
    if((evt.target).getAttribute('data-id')=="1"){
        $(".flight-list-element").show();
        $(".flight-list-element").each(function () {
            if($(this).data("price")!=lowest_price)
            {
                $(this).hide();
            }
        })
    }
    if((evt.target).getAttribute('data-id')=="2"){
        $(".flight-list-element").show();
        $(".flight-list-element").each(function () {
            if($(this).data("depart-time")!=earliest_depart)
            {
                $(this).hide();
            }
        })
    }
    if((evt.target).getAttribute('data-id')=="3"){
        $(".flight-list-element").show();
        $(".flight-list-element").each(function () {
            if($(this).data("depart-time")!=lastest_depart)
            {
                $(this).hide();
            }
        })
    }
    if((evt.target).getAttribute('data-id')=="4"){
        $(".flight-list-element").show();
        $(".flight-list-element").each(function () {
            if($(this).data("arrive-time")!=earliest_arrive)
            {
                $(this).hide();
            }
        })
    }
    if((evt.target).getAttribute('data-id')=="5"){
        $(".flight-list-element").show();
        $(".flight-list-element").each(function () {
            if($(this).data("arrive-time")!=lastest_arrive)
            {
                $(this).hide();
            }
        })
    }
})
function currencyFormatDE(num) {
    return (
        num
            .toFixed(0)
            .replace('.', ',') 
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND'
    )
}
$(document).ready(function () {
    $("#change-searching-panel-container").hide();
    $(".flight-list-element").each(function () {
        var depart_output = $(this).find(".real-depart-time");
        var arrive_output = $(this).find(".real-arrive-time");
        var num_transit = $(this).find(".real-num-transit");
        var n = $(this).data("numtransit");
        if (n == "0") {
            $(num_transit).text("Bay thẳng");
        } else {

            $(num_transit).text(n + " điểm dừng");
        }
        $(depart_output).text($(this).data("depart-time"));
        $(arrive_output).text($(this).data("arrive-time"));
        var airline_O = $(this).find(".airline-output");
        var airline_I = $(this).data("airline");
        var s = null;
        if (airline_I == "vietjet") {
            s = "Vietjet Air";
        } else if (airline_I == "jetstar") {
            s = "Jetstar";
        } else if (airline_I == "vnairline") {
            s = "Vietnam Airlines";
        }
        $(airline_O).text(s);
        var price_I = currencyFormatDE(parseInt($(this).data("price")));
        $(this).find(".price-output").text(price_I);
    })
})
$("#change-searching-info").click(function () {
    if (!$(this).hasClass("change-searching-active")) {
        $(this).addClass("change-searching-active");
        $("#change-searching-panel-container").show();
    } else {
        $(this).removeClass("change-searching-active");
        $("#change-searching-panel-container").hide();
    }
})
$(".btn-home-submit").click(function () {
    $("#change-searching-info").removeClass("change-searching-active");
    $("#change-searching-panel-container").hide();
})

/*User */
$('#password-edit-button').click(function () {
    $("#password-edit-container").show();
    $(this).hide();
    $('#txtUserName').attr('disabled', true);
    $('#txtUserName').css('opacity', '0.42');
    $('#edit-profile-button-update').attr('disabled', true);
    $('#edit-profile-button-update').css('opacity', '0.42');
})
$('#edit-profile-button-container-cancel').click(function () {
    $("#password-edit-container").hide();
    $('#password-edit-button').show();
    $('#txtUserName').attr('disabled', false);
    $('#txtUserName').css('opacity', '1');
    $('#edit-profile-button-update').attr('disabled', false);
    $('#edit-profile-button-update').css('opacity', '1');
})        
$(".reservation-more-info").click(function () {
    $(".modal-container").show();
    $('body').css('overflow', 'hidden');
})
$(".user-account-menu-option").click(function(){
    if(!$(this).hasClass('user-account-menu-option-active')){
        $('.user-account-menu-option').removeClass('user-account-menu-option-active');
        $(this).addClass('user-account-menu-option-active');
    }
})
$("#user-account-edit-profile-option").click(function(){
    $(".user-account-content-element").hide();
    $("#edit-profile-interface").show();
})
$("#user-account-transaction-history-option").click(function(){
    $(".user-account-content-element").hide();
    $("#transaction-history-interface").show();
})
$("#user-account-my-reservation-option").click(function(){
    $(".user-account-content-element").hide();
    $("#my-reservation-interface").show();
})
//My point
var bar = new ProgressBar.Circle('#my-point-animation', {
    color: '#2E86DE',
    trailColor: '#eee',
    trailWidth: 6,
    duration: 1400,
    easing: 'easeInOut',
    strokeWidth: 6,
    from: { color: '#2E86DE', a: 0 },
    to: { color: '#2E86DE', a: 0.5 },
    // Set default step function for all animate calls
    step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
    }
});
$("#user-account-my-point-option").click(function () {
    $(".user-account-content-element").hide();
    $("#my-point-interface").show();
    bar.animate(0.06);
})
$('#user-btn-container').click(function () {
    var panel = $('#user-instant-panel-container');
    if ($(panel).css('display') == 'none') {
        $(panel).show();
    } else {
        $(panel).hide();
    }
})
$(document).mouseup(function (e) {
    var container = $("#user-instant-panel-container");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

