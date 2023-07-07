/** @odoo-module **/

import { Component, useState, onMounted, onError } from "@odoo/owl";
// import { WeatherAlert } from "./weatheralert/weatheralert"
import { Search } from "./search/search";

export class Weather extends Component {
    setup() {
        onError((e) => { console.log(e.cause) });
    }
}
Weather.template = "owl_weather.weather";
Weather.components = { Search };