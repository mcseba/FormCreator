var ListElement = /** @class */ (function () {
    function ListElement(fields, ID) {
        var _this = this;
        this.fields = fields;
        this.keyID = ID;
        var lista = document.createElement('table');
        lista.className = "lista";
        lista.id = this.keyID;
        var editbutton = document.createElement('button');
        editbutton.innerHTML = "EDIT";
        editbutton.className = "editButton";
        editbutton.addEventListener('click', function () { return _this.editList(); });
        this.editButton = editbutton;
        var deletebutton = document.createElement('button');
        deletebutton.innerHTML = "Delete";
        deletebutton.className = "deleteButton";
        deletebutton.addEventListener('click', function () { return _this.deleteList(); });
        this.deleteButton = deletebutton;
        lista.appendChild(this.deleteButton);
        lista.appendChild(this.editButton);
        this.Lista = lista;
        this.createElement();
    }
    ListElement.prototype.createElement = function () {
        var _this = this;
        this.fields.forEach(function (el) {
            var tr = document.createElement('tr');
            var tl = document.createElement('th');
            var td = document.createElement('td');
            tl.innerHTML = el.labelValue + ": ";
            td.innerHTML = el.getValue();
            tr.appendChild(tl);
            tr.appendChild(td);
            _this.Lista.appendChild(tr);
        });
    };
    ListElement.prototype.editList = function () {
        var data = this.Lista.getElementsByTagName('td');
        for (var i = 0; i < data.length; i++) {
            if (data[i].isContentEditable === false) {
                data[i].setAttribute('contenteditable', 'true');
            }
            else {
                data[i].setAttribute('contenteditable', 'false');
            }
        }
    };
    ListElement.prototype.deleteList = function () {
        var parentNode = document.getElementById('formValue');
        parentNode.removeChild(this.Lista);
    };
    return ListElement;
}());
export { ListElement };
//# sourceMappingURL=ListElement.js.map