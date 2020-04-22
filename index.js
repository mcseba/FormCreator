var FieldType;
(function (FieldType) {
    FieldType[FieldType["textBox"] = 1] = "textBox";
    FieldType[FieldType["textarea"] = 2] = "textarea";
    FieldType[FieldType["date"] = 3] = "date";
    FieldType[FieldType["email"] = 4] = "email";
    FieldType[FieldType["checkbox"] = 5] = "checkbox";
    FieldType[FieldType["select"] = 6] = "select";
})(FieldType || (FieldType = {}));
var TextBox = /** @class */ (function () {
    function TextBox(name, label) {
        this.name = name;
        this.type = FieldType.textBox;
        this.element = document.createElement('input');
        this.element.name = this.name;
        this.element.type = 'text';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
    }
    TextBox.prototype.render = function () {
        return this.element;
    };
    TextBox.prototype.getValue = function () {
        return this.element.value;
    };
    return TextBox;
}());
var TextArea = /** @class */ (function () {
    function TextArea(name, label) {
        this.name = name;
        this.type = FieldType.textarea;
        this.element = document.createElement('textarea');
        this.element.name = this.name;
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
    }
    TextArea.prototype.render = function () {
        return this.element;
    };
    TextArea.prototype.getValue = function () {
        return this.element.value;
    };
    return TextArea;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.name = name;
        this.type = FieldType.date;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'date';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
    }
    DateField.prototype.render = function () {
        return this.element;
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.name = name;
        this.type = FieldType.email;
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = 'email';
        this.Label = document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var Form = /** @class */ (function () {
    function Form(id) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        this.valueElement = document.getElementById('formValues');
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            _this.formElement.appendChild(element.Label);
            _this.formElement.appendChild(element.render());
        });
    };
    Form.prototype.getValue = function () {
        var lista = document.createElement('ul');
        this.valueElement.appendChild(lista);
        this.fields.forEach(function (element) {
            var li = document.createElement('li');
            lista.appendChild(li);
            li.innerText = element.name + " " + element.getValue();
        });
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App() {
    }
    return App;
}());
var box = new TextBox('dane', 'Dane:');
var textarea = new TextArea('tekstarea', 'Tekstarea:');
var date = new DateField('datefield', 'Data:');
var form = new Form('formContainer');
form.fields.push(box, textarea, date);
form.render();
form.getValue();
