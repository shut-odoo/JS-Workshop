/** @odoo-module **/

import { Component, useState, onMounted, onError, useRef } from "@odoo/owl";

export class WeatherAlert extends Component {
    setup() {
        onError((e) => { console.log(e.cause) });
    }
    searchCity(){
        console.log("call");
    }
}
WeatherAlert.template = "owl_weather.weatheralert";