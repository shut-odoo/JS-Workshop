/** @odoo-module **/

import { Component, useState, onError } from "@odoo/owl";

export class SearchDisplay extends Component {
    static template = "owl_weather.searchdisplay";
    setup(){
        onError((e) => { console.log(e.cause) });
    }
    // static props = {
    //     id: { type: Number },
    //     description: { type: String },
    //     done: {type: Boolean},
    //     myFunction: {type: Function},
    //     deleteFunction: {type: Function},
    //     index: {type: Number}
    // }
    // toggleState(data){
    //     // debugger;
    //     this.props.myFunction(data);
    // }
}