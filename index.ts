interface Field {
    name: string;
    labelValue: string;
    Label: HTMLLabelElement;
    render(): HTMLElement;
    getValue(): any;
}

class TextBox implements Field {
    name: string;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = this.name;
        this.element.type = 'text';
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    
    getValue(): any {
        return this.element.value;
    }
}

class TextArea implements Field {
    name: string;
    element: HTMLTextAreaElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.element.name = this.name;
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
    
}

class DateField implements Field {
    name: string;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'date';
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

class EmailField implements Field {
    name: string;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'email';
        this.Label = <HTMLLabelElement>document.createElement('label'); 
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }

}

class CheckboxField implements Field {
    name: string;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'checkbox';
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
}

class SelectField implements Field {
    name: string;
    element: HTMLSelectElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string, ...options: string[]) {
        this.name = name;
        this.element = <HTMLSelectElement>document.createElement('select');
        options.forEach(element => {
            const opt = document.createElement('option');
            opt.value = element;
            opt.text = element;
            this.element.add(opt);
        });
        this.element.name = name;
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }

}

class ListElement {
    Lista: HTMLElement;
    fields: Field[];
    editButton: HTMLElement;
    deleteButton: HTMLElement;
    keyID: number;

    constructor (fields: Field[], ID: number) {
        this.fields = fields;
        this.keyID = ID;

        const lista = <HTMLTableElement>document.createElement('table');
        lista.className = "lista";
        lista.id = <string><unknown>this.keyID;
        const editbutton = <HTMLButtonElement>document.createElement('button');
        editbutton.innerHTML = "EDIT";
        editbutton.className = "editButton";
        this.editButton = editbutton;

        const deletebutton = <HTMLButtonElement>document.createElement('button');
        deletebutton.innerHTML = "Delete"
        deletebutton.className = "deleteButton";
        this.deleteButton = deletebutton;

        lista.appendChild(this.deleteButton);
        lista.appendChild(this.editButton);

        this.Lista = lista;

        this.createElement();
    }

    createElement() {
        this.fields.forEach( element => {
            const tr = document.createElement('tr');
            const tl = document.createElement('th');
            const td = document.createElement('td');
            tl.innerHTML = element.labelValue + ": ";
            td.innerHTML = element.getValue();
            tr.appendChild(tl);
            tr.appendChild(td);
            this.Lista.appendChild(tr);
        });
    }
}

class Form {
    fields: Field[];
    formContainer: HTMLElement;
    ValuesContainer: HTMLElement;
    listArray: ListElement[]; // tablica list
    keyID: number = 0;

    constructor(idForm: string, idValues: string) {
        this.fields = new Array();
        this.listArray = new Array();
        this.formContainer = document.getElementById(idForm);
        this.ValuesContainer = document.getElementById(idValues);
    }

    render(): void {
        this.fields.forEach(element => {
            this.formContainer.appendChild(element.Label);
            this.formContainer.appendChild(element.render());
        });
    }

    renderValue(): void {    
        const element = new ListElement(this.fields, this.keyID);
        this.keyID++;
        this.ValuesContainer.appendChild(element.Lista);
        this.listArray.push(element);
    }

}

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
        const element = document.getElementById(<string><unknown>elemId);
        const elemData = element.getElementsByTagName('td');
         
        for (let i = 0; i < elemData.length; i++) {
            if (elemData[i].isContentEditable == false) {
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

