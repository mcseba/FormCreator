import {Field} from './interfaceField';
import {ListElement} from './ListElement';

export class Form {
    fields: Field[];
    formContainer: HTMLElement;
    ValuesContainer: HTMLElement;
    DivForLists: HTMLElement;
    keyID: number = 0;
    AllListElements: any[];

    constructor(idForm: string, idValues: string) {
        this.fields = new Array();
        this.AllListElements = new Array();
        this.formContainer = document.getElementById(idForm);
        this.ValuesContainer = document.getElementById(idValues);
        this.DivForLists = <HTMLElement>document.createElement('div');
        this.DivForLists.id = "listContainer";
        this.ValuesContainer.appendChild(this.DivForLists);
    }

    render(): void {
        this.fields.forEach(element => {
            this.formContainer.appendChild(element.Label);
            this.formContainer.appendChild(element.render());
        });
    }

    renderValue(): void {    
        const element = new ListElement(this.fields, this.keyID);
        this.DivForLists.appendChild(element.Lista);
        this.keyID++;
        this.AllListElements.push(element.ValuesForSavingInStorage);
    }

}