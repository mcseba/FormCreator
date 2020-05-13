import {Field} from './interfaceField';
import {TextBox} from './TextBox';
import {TextArea} from './TextArea';
import {DateField} from './DateField';
import {EmailField} from './EmailField';
import {CheckboxField} from './Checkbox';
import {SelectField} from './SelectField';
import {ListElement} from './ListElement';
import {Form} from './Form';


class App {
    form: Form;
    submitbutton: HTMLElement;

    constructor(...elements: Field[]) {
        this.form = new Form('formContainer', 'formValue');
        this.form.fields.push(...elements);
        this.submitbutton = document.getElementById('Submit');
        this.submitbutton.addEventListener('click', () => this.renderValue());
    }

    appStart() {
        this.form.render();
    }

    renderValue() {
        this.form.renderValue();
        
        this.form.fields.forEach(element => {
            element.setValue("");
        });
    }

}

const textbox = new TextBox('Imie', 'Imię');
const textbox2 = new TextBox('Nazwisko', 'Nazwisko');
const email = new EmailField('Email', 'Email');
const select = new SelectField('SelectKierunek', 'Kierunek studiów', 'Informatyka', 'Administracja', 'Browarnictwo');
const checkbox = new CheckboxField('eLearning', 'Czy preferujesz e-learning?');
const datetime = new DateField('Data', 'Data');
const textarea = new TextArea('Uwagi', 'Uwagi');

window.onload = function() {
    const app = new App(textbox, textbox2, email, select, checkbox,datetime, textarea);
    app.appStart();
}

