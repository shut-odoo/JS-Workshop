/** @odoo-module **/

import { Component, useSubEnv, onWillStart, useRef, onMounted } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { Domain } from "@web/core/domain";

export class PieChart extends Component {

    setup() {
        this.canvasRef = useRef("canvas");
        this.chart = null;

        onWillStart(async () => {
            await loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        const data = {
            datasets: [{
                data: this.props.values,
                backgroundColor: [
                    'rgb(255, 99, 132, 0.7)',
                    'rgb(54, 162, 235, 0.7)',
                    'rgb(255, 206, 86, 0.7)',
                ],
            }],
            labels: this.props.labels,
            // These labels appear in the legend and in the tooltips when hovering different arcs
        };

        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: data,
            options: {
                onClick: (evt) => {
                    const points = this.chart.getElementsAtEventForMode(
                        evt, 'nearest', { intersect: true }, true);
                    if (points.length) {
                        const firstPoint = points[0];
                        const label = this.chart.data.labels[firstPoint._index];
                        // const value = this.chart.data.datasets[firstPoint._datasetIndex]
                        //             .data[firstPoint._index];
                        this.getListBySize(label);
                    }
                },
                responsive: true,
            }
        });
        // To perform its animations, ChartJS will perform each animation
        // step in the next animation frame. The initial rendering itself
        // is delayed for consistency. We can avoid this by manually
        // advancing the animation service.
        Chart.animationService.advance();
    }

    getListBySize(size){
        const domain = new Domain(`[('size', '=', '${size}') ]`).toList();
        this.props.sizeOrderFunction(domain, `Order for size ${size.toUpperCase()}`)
    }
}

PieChart.template = "awesome_tshirt.pie_chart";