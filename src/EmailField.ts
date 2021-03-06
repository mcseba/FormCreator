import {Field} from './interfaceField';

export class EmailField implements Field {
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
    setValue(value: string): void {
        this.element.value = value;
    }
}