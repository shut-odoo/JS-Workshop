/** @odoo-module **/

import { Component, useState, onMounted, onError, useRef } from "@odoo/owl";
import { SearchDisplay } from "../searchdisplay/searchdisplay";

export class Search extends Component {
    setup() {
        this.cityData = [{ id: 1, temp: "37.5°C", wind: 23, city: "Gandhinagar", type: "Stormy" },
            { id: 2, temp: "22.5°C", wind: "", city: "Ahmedabad", type: "Windy" },
            { id: 3, temp: "10°C", wind: "", city: "Surat", type: "Sunny" }
        ];
        this.inputRef = useRef("input");
        this.displayCity = useState([]);
        onMounted(() => {
            this.inputRef.el.focus();
        });
        onError((e) => { console.log(e.cause) });
    }
    searchCity() {
        let target = document.getElementById("citySelect");
        let city_id = parseInt(this.inputRef.el.value);
        this.cityData.forEach((obj) => {
            if (obj.id == city_id) {
                this.displayCity.push(obj);
            }
        });
    }
    static template = "owl_weather.search";
    static components = { SearchDisplay };
}