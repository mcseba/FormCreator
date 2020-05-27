import {Field} from './interfaceField';
import { EmailField } from './EmailField';

export class ListElement {
    Lista: HTMLElement;
    fields: Field[];
    editButton: HTMLElement;
    deleteButton: HTMLElement;
    keyID: number;
    ValuesForSavingInStorage: any[];

    constructor (fields: Field[], ID: number) {
        this.fields = fields;
        this.keyID = ID;
        this.ValuesForSavingInStorage = new Array();
        const lista = <HTMLTableElement>document.createElement('table');
        lista.className = "lista";
        lista.id = <string><unknown>this.keyID;

        const editbutton = <HTMLButtonElement>document.createElement('button');
        editbutton.innerHTML = "EDIT";
        editbutton.className = "editButton";
        editbutton.addEventListener('click', () => this.editList());
        this.editButton = editbutton;

        const deletebutton = <HTMLButtonElement>document.createElement('button');
        deletebutton.innerHTML = "Delete"
        deletebutton.className = "deleteButton";
        deletebutton.addEventListener('click', () => this.deleteList());
        this.deleteButton = deletebutton;

        lista.appendChild(this.deleteButton);
        lista.appendChild(this.editButton);

        this.Lista = lista;

        this.createElement();
    }

    createElement() {
        this.fields.forEach( el => {
            const tr = document.createElement('tr');
            const tl = document.createElement('th');
            const td = document.createElement('td');
            tl.innerHTML = el.labelValue + ": ";
            td.innerHTML = el.getValue();
            tr.appendChild(tl);
            tr.appendChild(td);
            this.Lista.appendChild(tr);
            this.ValuesForSavingInStorage.push(
                {label: el.labelValue, value: el.getValue()}
            );
        });
    }

    editList() {
        let data = this.Lista.getElementsByTagName('td');

        for (let i = 0; i < data.length; i++) {
            if (data[i].isContentEditable === false) {
                data[i].setAttribute('contenteditable', 'true');
            } 
            else {
                data[i].setAttribute('contenteditable', 'false');
            }            
        }
    }

    deleteList() {
        const parentNode = document.getElementById('listContainer');
        console.log(parentNode);
        parentNode.removeChild(this.Lista);
    }
}