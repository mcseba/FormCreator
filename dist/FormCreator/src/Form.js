import { ListElement } from './ListElement';
var Form = /** @class */ (function () {
    function Form(idForm, idValues) {
        this.keyID = 0;
        this.fields = new Array();
        this.ListsData = new Array();
        this.formContainer = document.getElementById(idForm);
        this.ValuesContainer = document.getElementById(idValues);
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            _this.formContainer.appendChild(element.Label);
            _this.formContainer.appendChild(element.render());
        });
    };
    Form.prototype.renderValue = function () {
        var element = new ListElement(this.fields, this.keyID);
        this.ValuesContainer.appendChild(element.Lista);
        this.keyID++;
        console.log(this.ListsData);
    };
    return Form;
}());
export { Form };
//# sourceMappingURL=Form.js.map