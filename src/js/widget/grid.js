$.widget( "custom.grid", {
    options:{
        updateTime: 5000
    },
    _create: function() {
        this.formCreation();
        setInterval(this._getCourse.bind(this), this.options.updateTime);
    },
    formCreation: function () {

        this.element.append("<table class=\"table table-striped\">\n" +
            "  <thead>\n" +
            "    <tr>\n" +
            "      <th>Currency</th>\n" +
            "      <th>15m</th>\n" +
            "      <th>%</th>\n" +
            "      <th>Last</th>\n" +
            "      <th>Buy</th>\n" +
            "      <th>Sell</th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody id='test'>\n" +
            "  </tbody>\n" +
            "</table>");
        this._getCourse();
    },

    _getCourse: function () {
        $.ajax({
            type: "post",
            url: "https://blockchain.info/ru/ticker",
            dataType: "json"
        })
            .done(function (course) {
                $("#test").html("");
                $.each(course, function (currency, values) {
                    if ($.cookie(currency) != null && $.cookie(currency) != (values['15m'].toFixed(2))) {
                        var percent = $.cookie(currency) / 100;
                        var change = ((values['15m'].toFixed(2)) / percent - 100).toFixed(5);
                        $.cookie(currency, (values['15m'].toFixed(2)));
                        $.cookie("currencyPercent"+currency, change);
                    } else if ($.cookie("currencyPercent"+currency) === null) {
                        $.cookie("currencyPercent"+currency, 0);
                        $.cookie(currency, values['15m'].toFixed(2));
                    }

                    $("#test").append("<tr>" +
                        "<td data-label='currency'>" +currency+ "</td>" +
                        "<td data-label='15m'>" +values['15m'].toFixed(2)+ "</td>" +
                        "<td data-label='percent' id='"+currency+"'>" +$.cookie("currencyPercent"+currency)+ "</td>" +
                        "<td data-label='last'>" +values['last'].toFixed(2)+ "</td>" +
                        "<td data-label='buy'>" +values['buy'].toFixed(2)+ "</td>" +
                        "<td data-label='sell'>" +values['sell'].toFixed(2)+ "</td>" +
                        "</tr>");
                    if ($.cookie("currencyPercent"+currency) < 0) {
                        $('#'+currency).addClass('negative-interest');
                    } else {
                        $('#'+currency).addClass('positive-percentage');
                    }
                })
            });
    }
});