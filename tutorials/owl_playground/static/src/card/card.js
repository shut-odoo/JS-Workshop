/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { Counter } from "../counter/counter";


export class Card extends Component {
    static template = "owl_playground.card";
    static components = { Counter };
    static props = {
    	slots:{
    		type: Object,
    		shape: {
    			default: Object,
    			title: {optional: true},
    		}
    	}
    };
}