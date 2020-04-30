import {Field} from './interfaceField';

export class ListElement {
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