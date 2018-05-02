$.widget( "custom.converter", {

    _create: function() {
        this._formCreation();
        $("[name=convert]").on("click", this._currencyConversion);
    },
    _formCreation: function () {

        this.element.append("<div class='col-md-2'>" +
            "<input class='form-control' type='text' name='amount' placeholder='Amount'>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "<select class='form-control' name='currency'></select>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "<button class='btn btn-light btn-size' name='convert'>Convert</button>" +
            "</div>" +
            "<div class='col-md-2 converter' id='convertedAmount'>" +
            "</div>");
        this._determineTheAvailableCurrency();
    },
    _determineTheAvailableCurrency: function () {

        $.ajax({
            type: "POST",
            url: "https://blockchain.info/ru/ticker/",
            dataType: "json"
        })
            .done(function (currencies) {
                $.each(currencies, function (key) {
                    if ($.cookie('currency') === key) {
                        $("[name=currency]").append($('<option selected value="' + key + '">' + key + '</option>'));
                    } else {
                        $("[name=currency]").append($('<option value="' + key + '">' + key + '</option>'));
                    }
                })
            });
        this._firstStart();
    },

    _firstStart: function () {
        if ($.cookie("amount") !== null && $.cookie('currency') !== null) {
            $("[name=amount]").val($.cookie("amount"));
            // $("[name=currency] option[value=" + $.cookie('currency') + "]").prop('selected', true);
        }
    },

    _currencyConversion: function () {
            $.ajax({
                type: "GET",
                url: "https://blockchain.info/tobtc?currency="+$("[name=currency]").val()+"&value="+$("[name=amount]").val(),
                dataType: "html"
            })
                .done(function (convertedAmount) {
                    $.cookie("amount", $("[name=amount]").val());
                    $.cookie("currency", $("[name=currency]").val());
                    $("#convertedAmount").text(convertedAmount+" BTC");
                });
    }

});