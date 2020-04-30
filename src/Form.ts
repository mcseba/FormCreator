import {Field} from './interfaceField';
import {ListElement} from './ListElement';

export class Form {
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