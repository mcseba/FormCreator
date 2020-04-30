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

        this.form.listArray.forEach(element => {
            element.editButton.addEventListener('click', () => this.makeEditable(element.keyID));
            element.deleteButton.addEventListener('click', () => this.deleteList(element.keyID));
        });
    }

    makeEditable(elemId: number) {
        console.log(elemId);
        const element = document.getElementById(<string><unknown>elemId);
        const elemData = element.getElementsByTagName('td');
         
        for (let i = 0; i < elemData.length; i++) {
            if (elemData[i].isContentEditable === false) {
                elemData[i].setAttribute('contenteditable', 'true');
            } 
            else {
                elemData[i].setAttribute('contenteditable', 'false');
            }            
        }
    }

    deleteList(elemId: number) {
        const element = document.getElementById(<string><unknown>elemId);
        this.form.ValuesContainer.removeChild(element);
    }

}

const textbox = new TextBox('Imie', 'Imię');
const textbox2 = new TextBox('Nazwisko', 'Nazwisko');
const email = new EmailField('Email', 'Email');
const select = new SelectField('SelectKierunek', 'Kierunek studiów', 'Informatyka', 'Administracja', 'Browarnictwo');
const checkbox = new CheckboxField('eLearning', 'Czy preferujesz e-learning?');
const textarea = new TextArea('Uwagi', 'Uwagi');

window.onload = function() {
    const app = new App(textbox, textbox2, email, select, checkbox, textarea);
    app.appStart();
}

