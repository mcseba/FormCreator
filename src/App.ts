import {Field} from './interfaceField';
import {TextBox} from './TextBox';
import {TextArea} from './TextArea';
import {DateField} from './DateField';
import {EmailField} from './EmailField';
import {CheckboxField} from './Checkbox';
import {SelectField} from './SelectField';
import {Form} from './Form';

import './styles/styles.scss';


class App {
    form: Form;
    submitbutton: HTMLElement;
    loadStorageButton: HTMLElement;
    saveToStorageButton: HTMLElement;
    clearStorageButton: HTMLElement;
    clearFormButton: HTMLElement;

    dragInputText: HTMLElement;
    dragInputEmail: HTMLElement;
    dragSelect: HTMLElement;
    dragCheckbox: HTMLElement;
    dragTextarea: HTMLElement;
    dragInputDate: HTMLElement;
    LabelInput: HTMLInputElement;
    labelInputValue: string;

    constructor(...elements: Field[]) {
        this.form = new Form('formContainer', 'formValue');
        this.form.fields.push(...elements);

        this.submitbutton = document.getElementById('Submit');
        this.submitbutton.addEventListener('click', () => this.renderValue());

        this.loadStorageButton = document.getElementById('loadStorage');
        this.loadStorageButton.addEventListener('click', () => this.loadListFromStorage());

        this.saveToStorageButton = document.getElementById('saveToStorage');
        this.saveToStorageButton.addEventListener('click', () => this.saveListToStorage());

        this.clearStorageButton = document.getElementById('clearStorage');
        this.clearStorageButton.addEventListener('click', () => this.clearStorage());

        this.clearFormButton = document.getElementById('Clear');
        this.clearFormButton.addEventListener('click', () => this.clearForm());

        // =====================================
        this.LabelInput = <HTMLInputElement>document.getElementById('labelInput'); 

        this.dragInputText = document.getElementById('draggableInputText');
        this.dragInputText.addEventListener('dragstart', (event) => this.dragItem(event, 'inputText'));

        this.dragInputEmail = document.getElementById('draggableInputEmail');
        this.dragInputEmail.addEventListener('dragstart', (event) => this.dragItem(event, 'inputEmail'));

        this.dragSelect = document.getElementById('draggableSelect');
        this.dragSelect.addEventListener('dragstart', (event) => this.dragItem(event, 'select'));

        this.dragCheckbox = document.getElementById('draggableCheckbox');
        this.dragCheckbox.addEventListener('dragstart', (event) => this.dragItem(event, 'checkbox'));

        this.dragTextarea = document.getElementById('draggableTextarea');
        this.dragTextarea.addEventListener('dragstart', (event) => this.dragItem(event, 'textarea'));

        this.dragInputDate = document.getElementById('draggableInputDate');
        this.dragInputDate.addEventListener('dragstart', (event) => this.dragItem(event, 'inputDate'));

        this.form.formContainer.addEventListener('dragover', (event) => this.allowDrop(event));
        this.form.formContainer.addEventListener('drop', (event) => this.onDrop(event));
        //
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

    saveListToStorage() {
        localStorage.setItem("elements", JSON.stringify(this.form.AllListElements));
    }

    loadListFromStorage() {
        const arr: Array<Array<string>> = JSON.parse(localStorage.getItem('elements'));
        console.log(arr);
        arr.forEach(element => {
            const lista = <HTMLTableElement>document.createElement('table');
            lista.className = "lista";
            element.forEach(tableRow => {
                console.log(tableRow);
                const tr = document.createElement('tr');
                const tl = document.createElement('th');
                const td = document.createElement('td');
                tl.innerHTML = tableRow['label'].toString();
                td.innerHTML = tableRow['value'].toString();
                tr.appendChild(tl);
                tr.appendChild(td);
                lista.appendChild(tr);
            });
            this.form.DivForLists.appendChild(lista);
        });
    }

    clearStorage() {
        localStorage.clear();
    }

    clearForm() {
        this.form.fields.splice(0, this.form.fields.length);
        const childNodes = this.form.formContainer.childNodes;
        childNodes.forEach(element => {
            this.form.formContainer.removeChild(element);
        });
        const labels = this.form.formContainer.querySelectorAll('label');
        labels.forEach(element => {
            this.form.formContainer.removeChild(element);
        });
    }

    allowDrop(ev: Event) {
        ev.preventDefault();
    }

    dragItem(event: DragEvent, type: string) {
        event.dataTransfer.setData('text', type);
    }

    onDrop(ev: DragEvent) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData('text');
        this.createElement(data);
    }

    createElement(typeOfField: string) {
        const label = this.LabelInput.value;
        switch (typeOfField) {
            case "inputText":
                const input = new TextBox('Input', label);
                this.form.fields.push(input);
                this.LabelInput.value = "";
                this.appStart();
                break;
            case "inputEmail":
                const email = new EmailField('Email', label);
                this.form.fields.push(email);
                this.LabelInput.value = "";
                this.appStart();
                break;
            case "select":
                const select = new SelectField('Select', 'Country: ');
                this.form.fields.push(select);
                this.LabelInput.value = "";
                this.appStart();
                break;
            case "checkbox":
                const checkbox = new CheckboxField('Checkbox', label);
                this.form.fields.push(checkbox);
                this.LabelInput.value = "";
                this.appStart();
                break;
            case "textarea":
                const textarea = new TextArea('Textarea', label);
                this.form.fields.push(textarea);
                this.LabelInput.value = "";
                this.appStart();
                break;
            case "inputDate":
                const date = new DateField('Date', label);
                this.form.fields.push(date);
                this.LabelInput.value = "";
                this.appStart();
                break;
            default:
                break;
        }
    }

}

const textbox = new TextBox('Input', 'Name');
const textbox2 = new TextBox('Input', 'Last name');

window.onload = function() {
    const app = new App(textbox, textbox2);
    app.appStart();
}

