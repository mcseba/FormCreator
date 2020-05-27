var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.name = name;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'email';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    EmailField.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return EmailField;
}());
export { EmailField };
//# sourceMappingURL=EmailField.js.map