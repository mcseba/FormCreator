var TextArea = /** @class */ (function () {
    function TextArea(name, label) {
        this.name = name;
        this.element = document.createElement('textarea');
        this.element.name = this.name;
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }
    TextArea.prototype.render = function () {
        return this.element;
    };
    TextArea.prototype.getValue = function () {
        return this.element.value;
    };
    TextArea.prototype.setValue = function (value) {
        this.element.value = value;
    };
    return TextArea;
}());
export { TextArea };
//# sourceMappingURL=TextArea.js.map