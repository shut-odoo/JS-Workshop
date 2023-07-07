/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { TodoList } from "./todolist/todolist";
import { Card } from "./card/card";
import { useMouse } from "./utils";

export class Playground extends Component {
    setup() {
        this.mouse = useMouse();
    }
    static template = "owl_playground.playground";
    static components = { TodoList, Card };

}