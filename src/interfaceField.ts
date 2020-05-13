export interface Field {
    name: string;
    labelValue: string;
    Label: HTMLLabelElement;
    render(): HTMLElement;
    getValue(): any;
    setValue(value: string): any;
}