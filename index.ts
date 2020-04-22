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
    Label: HTMLLabelElement;
    render(): HTMLElement;
    getValue(): any;
}

class TextBox implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
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
    Label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.textarea;
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.element.name = this.name;
        this.Label = <HTMLLabelElement>document.createElement('label');
        this.Label.innerHTML = label;
        this.Label.htmlFor = name;
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

    constructor(id: string) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        this.valueElement = document.getElementById('formValues');
    }

    render(): void {
        this.fields.forEach(element => {
            this.formElement.appendChild(element.Label);
            this.formElement.appendChild(element.render());
        });
    }

    getValue(): void {
        const lista = document.createElement('ul');
        this.valueElement.appendChild(lista);

        this.fields.forEach(element => {
            const li = document.createElement('li');
            lista.appendChild(li);
            li.innerText = element.name + " " + element.getValue();
        });
    }
}

class App {
    form: Form;
    
    constructor(...elements: Field[]) {
        this.form = new Form('formContainer');
        this.form.fields.push(...elements);
    }

    appStart() {


    }
}

// const box = new TextBox('dane', 'Dane:');
// const textarea = new TextArea('tekstarea', 'Tekstarea:');
// const date = new DateField('datefield', 'Data:');

// const form = new Form('formContainer');
// form.fields.push(box, textarea, date);

// form.render();
// form.getValue();
   