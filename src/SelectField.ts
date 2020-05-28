import {Field} from './interfaceField';

export class SelectField implements Field {
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
        this.fetchOptions<{name: string, region: string}>("https://restcountries.eu/rest/v2/all").then((data) => {
        data.filter(filtered => filtered.region == "Europe").map(x=> x.name).forEach(element => {
        let option = <HTMLOptionElement>document.createElement("option");
        option.text = element;
        option.value = element;
        this.element.options.add(option);
            })
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
    setValue(value: string): void {
        this.element.value = value;
    }

    fetchOptions<T>(url: string): Promise<T[]> {
        return fetch(url)
        .then(res => res.json())
        .then(res => { 
            return res;
        })
        .catch((e) => {
          console.log("API errore fetching ");
        });
    }
}