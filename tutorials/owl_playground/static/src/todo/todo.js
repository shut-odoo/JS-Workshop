/** @odoo-module **/
import { Component, useState } from "@odoo/owl";

export class Todo extends Component {
    static template = "owl_playground.todo";
    static props = {
        id: { type: Number },
        description: { type: String },
        done: {type: Boolean},
        myFunction: {type: Function},
        deleteFunction: {type: Function},
        index: {type: Number}
    }
    toggleState(data){
        this.props.myFunction(data);
    }
}