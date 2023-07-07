/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";

class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.action = useService("action");
        this.display = { controlPanel: { "top-right": false, "bottom-right": false } };
        // this.rpc = useService('rpc');
        this.statistics = useService('statistics');


        this.keyToString = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t(
                "Average time for an order to go from 'new' to 'sent' or 'cancelled'"
            ),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        };

        onWillStart(async () => {
            this.result = await this.statistics.loadStatistics();
        });
    }

    getCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(domain, title) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t(title),
            res_model: 'awesome_tshirt.order',
            views: [
                [false, 'list'],
                [false, 'kanban'],
                [false, 'form'],
            ],
            search_view_id: [false],
            domain: domain,
        });
    }

    getNewOrders() {
        const domain = new Domain(
            "[('create_date', '>=',  \
                (context_today() - datetime.timedelta(days = 18)).strftime('%Y-%m-%d'))]"
        ).toList();
        this.openOrders(domain, 'Orders <18 days old');
    }

    getCancelledOrders() {
        const domain = new Domain(
            "[('create_date', '>=', \
            (context_today() - datetime.timedelta(days = 18)) \
            .strftime('%Y-%m-%d')),('state','=','cancelled')]").toList();
        this.openOrders(domain, 'Orders <18 days old as well as cancelled');
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);