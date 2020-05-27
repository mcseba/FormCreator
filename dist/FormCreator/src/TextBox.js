var TextBox = /** @class */ (function () {
    function TextBox(name, label) {
        this.name = name;
        this.element = document.createElement('input');
        this.element.name = this.name;
        this.element.type = 'text';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    TextBox.prototype.render = function () {
        return this.element;
    };
    TextBox.prototype.getValue = function () {
        return this.element.value;
    };
    TextBox.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return TextBox;
}());
export { TextBox };
//# sourceMappingURL=TextBox.js.map