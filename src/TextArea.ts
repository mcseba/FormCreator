import {Field} from './interfaceField';

export class TextArea implements Field {
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