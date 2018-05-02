$.widget('custom.currentdate', {
        _interval: 1000,
        _create: function() {
            setInterval(this.update.bind(this), this._interval);
        },
        update: function() {
            this.element.html(this._date());
        },
        _date: function() {
            var date = new Date();
            var formatted = "";

            formatted = formatted.concat(
                date.getFullYear().toString(),
                "-",
                (date.getMonth() + 1).toString(),
                "-",
                date.getDate().toString(),
                " ",
                date.getHours().toString(),
                ":",
                date.getMinutes().toString(),
                ":",
                date.getSeconds()
            );

            return formatted;
        }
    });