import { TextBox } from './TextBox';
import { TextArea } from './TextArea';
import { DateField } from './DateField';
import { EmailField } from './EmailField';
import { CheckboxField } from './Checkbox';
import { SelectField } from './SelectField';
import { Form } from './Form';
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
        this.loadStorageButton = document.getElementById('loadStorage');
        this.loadStorageButton.addEventListener('click', function () { return _this.loadListFromStorage(); });
        this.saveToStorageButton = document.getElementById('saveToStorage');
        this.saveToStorageButton.addEventListener('click', function () { return _this.saveListToStorage(); });
    }
    App.prototype.appStart = function () {
        this.form.render();
    };
    App.prototype.renderValue = function () {
        this.form.renderValue();
        this.form.fields.forEach(function (element) {
            element.setValue("");
        });
    };
    App.prototype.saveListToStorage = function () {
    };
    App.prototype.loadListFromStorage = function () {
    };
    return App;
}());
var textbox = new TextBox('Imie', 'Imię');
var textbox2 = new TextBox('Nazwisko', 'Nazwisko');
var email = new EmailField('Email', 'Email');
var select = new SelectField('SelectKierunek', 'Kierunek studiów', 'Informatyka', 'Administracja', 'Browarnictwo');
var checkbox = new CheckboxField('eLearning', 'Czy preferujesz e-learning?');
var datetime = new DateField('Data', 'Data');
var textarea = new TextArea('Uwagi', 'Uwagi');
window.onload = function () {
    var app = new App(textbox, textbox2, email, select, checkbox, datetime, textarea);
    app.appStart();
};
//# sourceMappingURL=App.js.map