enum FieldType {
    textBox = 1,
    textarea,
    date,
    email,
    checkbox,
    select
}

interface Field {
    name: string;
    type: FieldType;
    labelValue: string;
    Label: HTMLLabelElement;
    render(): HTMLElement;
    getValue(): any;
}

class TextBox implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.textBox;
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
    type: FieldType;
    element: HTMLTextAreaElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.textarea;
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
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.date;
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
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.email;
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
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.checkbox;
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
    type: FieldType;
    element: HTMLSelectElement;
    labelValue: string;
    Label: HTMLLabelElement;

    constructor(name: string, label: string, ...options: string[]) {
        this.name = name;
        this.type = FieldType.select;
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

class Form {
    fields: Field[];
    formElement: HTMLElement;
    valueElement: HTMLElement; // wyswietlane tam będą wartości pól

    constructor(idForm: string, idValues: string) {
        this.fields = new Array();
        this.formElement = document.getElementById(idForm);
        this.valueElement = document.getElementById(idValues);
    }

    render(): void {
        this.fields.forEach(element => {
            this.formElement.appendChild(element.Label);
            this.formElement.appendChild(element.render());
        });
    }

    getValue(): void {
        const lista = <HTMLElement>document.createElement('div');
        lista.className = "lista";
        this.valueElement.appendChild(lista);

        this.fields.forEach(element => {
            const li = document.createElement('li');
            li.innerText = element.labelValue + ": " + element.getValue();
            lista.appendChild(li);
        });
    }
}

class App {
    form: Form;
    submitbutton: HTMLElement;

    constructor(...elements: Field[]) {
        this.form = new Form('formContainer', 'formValue');
        this.form.fields.push(...elements);
        this.submitbutton = document.getElementById('Submit');
        this.submitbutton.addEventListener('click', () => this.form.getValue());
    }

    appStart() {
        this.form.render();
    }
}

const textbox = new TextBox('Dane1', 'Textbox');
const textarea = new TextArea('Dane2', 'Textarea');
const email = new EmailField('Dane3', 'Email');
const date = new DateField('Dane4', 'Data');
const checkbox = new CheckboxField('Dane4', 'Checkbox');
const select = new SelectField('Dane5', 'Checkbox', 'opt1', 'opt2', 'opt3');

window.onload = function() {
    const app = new App(textbox, textarea, email, date, checkbox, select);
    app.appStart();
}

