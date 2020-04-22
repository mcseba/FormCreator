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
        this.labelValue = label;
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
        this.labelValue = label;
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
        this.labelValue = label;
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
        this.labelValue = label;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.name = name;
        this.type = FieldType.checkbox;
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
    return CheckboxField;
}());
var SelectField = /** @class */ (function () {
    function SelectField(name, label) {
        var _this = this;
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        this.name = name;
        this.type = FieldType.select;
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
    return SelectField;
}());
var Form = /** @class */ (function () {
    function Form(idForm, idValues) {
        this.fields = new Array();
        this.formElement = document.getElementById(idForm);
        this.valueElement = document.getElementById(idValues);
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            _this.formElement.appendChild(element.Label);
            _this.formElement.appendChild(element.render());
        });
    };
    Form.prototype.getValue = function () {
        var lista = document.createElement('div');
        lista.className = "lista";
        this.valueElement.appendChild(lista);
        this.fields.forEach(function (element) {
            var li = document.createElement('li');
            li.innerText = element.labelValue + ": " + element.getValue();
            lista.appendChild(li);
        });
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App() {
        var _a;
        var _this = this;
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        this.form = new Form('formContainer', 'formValue');
        (_a = this.form.fields).push.apply(_a, elements);
        this.submitbutton = document.getElementById('Submit');
        this.submitbutton.addEventListener('click', function () { return _this.form.getValue(); });
    }
    App.prototype.appStart = function () {
        this.form.render();
    };
    return App;
}());
var textbox = new TextBox('Dane1', 'Textbox');
var textarea = new TextArea('Dane2', 'Textarea');
var email = new EmailField('Dane3', 'Email');
var date = new DateField('Dane4', 'Data');
var checkbox = new CheckboxField('Dane4', 'Checkbox');
var select = new SelectField('Dane5', 'Checkbox', 'opt1', 'opt2', 'opt3');
window.onload = function () {
    var app = new App(textbox, textarea, email, date, checkbox, select);
    app.appStart();
};
