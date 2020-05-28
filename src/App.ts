import {Field} from './interfaceField';
import {TextBox} from './TextBox';
import {TextArea} from './TextArea';
import {DateField} from './DateField';
import {EmailField} from './EmailField';
import {CheckboxField} from './Checkbox';
import {SelectField} from './SelectField';
import {ListElement} from './ListElement';
import {Form} from './Form';

import { Client } from './client';
import { Server } from './server';

import './styles/styles.scss';


class App {
    form: Form;
    Server: Server;
    Client: Client;
    submitbutton: HTMLElement;
    loadStorageButton: HTMLElement;
    saveToStorageButton: HTMLElement;

    constructor(...elements: Field[]) {
        this.form = new Form('formContainer', 'formValue');
        this.form.fields.push(...elements);

        this.Server = new Server(8080);
        this.Client = new Client("ws://localhost:8080");

        this.submitbutton = document.getElementById('Submit');
        this.submitbutton.addEventListener('click', () => this.renderValue());

        this.loadStorageButton = document.getElementById('loadStorage');
        this.loadStorageButton.addEventListener('click', () => this.loadListFromStorage());

        this.saveToStorageButton = document.getElementById('saveToStorage');
        this.saveToStorageButton.addEventListener('click', () => this.saveListToStorage());
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
        console.log('done');
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

}

const textbox = new TextBox('Imie', 'Imię');
const textbox2 = new TextBox('Nazwisko', 'Nazwisko');
const email = new EmailField('Email', 'Email');
const select = new SelectField('SelectKierunek', 'Kraj zamieszkania');
const checkbox = new CheckboxField('eLearning', 'Czy preferujesz e-learning?');
const datetime = new DateField('Data', 'Data');
const textarea = new TextArea('Uwagi', 'Uwagi');

window.onload = function() {
    const app = new App(textbox, textbox2, email, select, checkbox,datetime, textarea);
    app.appStart();
}

