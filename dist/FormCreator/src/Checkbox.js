var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.name = name;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'checkbox';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    CheckboxField.prototype.render = function () {
        return this.element;
    };
    CheckboxField.prototype.getValue = function () {
        return this.element.value;
    };
    CheckboxField.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return CheckboxField;
}());
export { CheckboxField };
//# sourceMappingURL=Checkbox.js.map