import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(FullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ""
    }

    render(fullList: FullList): void {
        this.clear();
    
        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";
    
            // Создание кастомного чекбокса
            const checkboxWrapper = document.createElement("div");
            checkboxWrapper.className = "checkbox-wrapper-26";
    
            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.checked = item.checked;
    
            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
    
            const tickMark = document.createElement("div");
            tickMark.className = "tick_mark";
    
            label.appendChild(tickMark);
            checkboxWrapper.appendChild(check);
            checkboxWrapper.appendChild(label);
            li.appendChild(checkboxWrapper);
    
            // Обработчик для изменения состояния задачи
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            });
    
            // Создание текста задачи
            const taskLabel = document.createElement("label") as HTMLLabelElement;
            taskLabel.htmlFor = item.id;
            taskLabel.textContent = item.item;
            li.append(taskLabel);
    
            // Кнопка удаления задачи
            const button = document.createElement("button") as HTMLButtonElement;
            button.className = 'button';
            button.textContent = "❌";
            li.append(button);
    
            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });
    
            this.ul.append(li);
        });
    }
    
}