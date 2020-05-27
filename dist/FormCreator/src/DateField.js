var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.name = name;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'date';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    DateField.prototype.render = function () {
        return this.element;
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    DateField.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return DateField;
}());
export { DateField };
//# sourceMappingURL=DateField.js.map