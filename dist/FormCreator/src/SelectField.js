var SelectField = /** @class */ (function () {
    function SelectField(name, label) {
        var _this = this;
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        this.name = name;
        this.element = document.createElement('select');
        options.forEach(function (element) {
            var opt = document.createElement('option');
            opt.value = element;
            opt.text = element;
            _this.element.add(opt);
        });
        this.element.name = name;
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    SelectField.prototype.render = function () {
        return this.element;
    };
    SelectField.prototype.getValue = function () {
        return this.element.value;
    };
    SelectField.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return SelectField;
}());
export { SelectField };
//# sourceMappingURL=SelectField.js.map