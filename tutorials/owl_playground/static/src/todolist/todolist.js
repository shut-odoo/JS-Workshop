/** @odoo-module **/
import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { Todo } from "../todo/todo";

export class TodoList extends Component {
    setup() {
        this.id = 1;
        this.todoList = useState([]);
        this.inputRef = useRef("input");
        // this.toggleState = this.toggleState.bind(this);
        onMounted(() => {
            this.inputRef.el.focus();
        });
    }
    static template = "owl_playground.todolist";
    static components = { Todo };

    addTodo(ev) {
        let content = ev.target.value;
        if (ev.keyCode === 13 && content.trim()) {
            let obj = { id: this.id, description: content, done: false };
            this.id++;
            this.todoList.push(obj);
            ev.target.value = "";
        }
    }
    toggleState(todoId) {
        this.todoList.forEach((obj) => {
            if (obj.id == todoId) {
                obj.done = !(obj.done);
            }
        });
    }
    removeTodo(elemId) {
        const index = this.todoList.findIndex((elem) => elem.id === elemId);
        if (index >= 0) {
            // remove the element at index from list
            this.todoList.splice(index, 1);
        }
    }
}