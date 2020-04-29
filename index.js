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
    return TextBox;
}());
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
    return TextArea;
}());
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
    return DateField;
}());
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
    return EmailField;
}());
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
var ListElement = /** @class */ (function () {
    function ListElement(fields, ID) {
        this.fields = fields;
        this.keyID = ID;
        var lista = document.createElement('table');
        lista.className = "lista";
        lista.id = this.keyID;
        var editbutton = document.createElement('button');
        editbutton.innerHTML = "EDIT";
        editbutton.className = "editButton";
        this.editButton = editbutton;
        var deletebutton = document.createElement('button');
        deletebutton.innerHTML = "Delete";
        deletebutton.className = "deleteButton";
        this.deleteButton = deletebutton;
        lista.appendChild(this.deleteButton);
        lista.appendChild(this.editButton);
        this.Lista = lista;
        this.createElement();
    }
    ListElement.prototype.createElement = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            var tr = document.createElement('tr');
            var tl = document.createElement('th');
            var td = document.createElement('td');
            tl.innerHTML = element.labelValue + ": ";
            td.innerHTML = element.getValue();
            tr.appendChild(tl);
            tr.appendChild(td);
            _this.Lista.appendChild(tr);
        });
    };
    return ListElement;
}());
var Form = /** @class */ (function () {
    function Form(idForm, idValues) {
        this.keyID = 0;
        this.fields = new Array();
        this.listArray = new Array();
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
        this.keyID++;
        this.ValuesContainer.appendChild(element.Lista);
        this.listArray.push(element);
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
        this.submitbutton.addEventListener('click', function () { return _this.renderValue(); });
    }
    App.prototype.appStart = function () {
        this.form.render();
    };
    App.prototype.renderValue = function () {
        var _this = this;
        this.form.renderValue();
        this.form.listArray.forEach(function (element) {
            element.editButton.addEventListener('click', function () { return _this.makeEditable(element.keyID); });
            element.deleteButton.addEventListener('click', function () { return _this.deleteList(element.keyID); });
        });
    };
    App.prototype.makeEditable = function (elemId) {
        var element = document.getElementById(elemId);
        var elemData = element.getElementsByTagName('td');
        for (var i = 0; i < elemData.length; i++) {
            if (elemData[i].isContentEditable == false) {
                elemData[i].setAttribute('contenteditable', 'true');
            }
            else {
                elemData[i].setAttribute('contenteditable', 'false');
            }
        }
    };
    App.prototype.deleteList = function (elemId) {
        var element = document.getElementById(elemId);
        this.form.ValuesContainer.removeChild(element);
    };
    return App;
}());
var textbox = new TextBox('Imie', 'Imię');
var textbox2 = new TextBox('Nazwisko', 'Nazwisko');
var email = new EmailField('Email', 'Email');
var select = new SelectField('SelectKierunek', 'Kierunek studiów', 'Informatyka', 'Administracja', 'Browarnictwo');
var checkbox = new CheckboxField('eLearning', 'Czy preferujesz e-learning?');
var textarea = new TextArea('Uwagi', 'Uwagi');
window.onload = function () {
    var app = new App(textbox, textbox2, email, select, checkbox, textarea);
    app.appStart();
};
