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

