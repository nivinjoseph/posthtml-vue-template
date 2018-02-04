import * as Assert from "assert";
const posthtml = require("posthtml");
const plugin = require("./../src/index");

suite("basic tests", () =>
{
    test.only("Given a partial, when plugin is used, then should be converted to template", () =>
    {

        console.log(plugin);

        const html = 
        `<div class="dashboard-view some-thing">
            <h3>{{message}}</h3>
            <score-board v-bind:score="score" v-bind:increment="increment"></score-board>
            <router-link to="/Todo">Go to Todo</router-link>
        </div>`;

        const result = posthtml()
            .use(plugin())
            .process(html, { sync: true })
            .html;

        
        const expected = 
        `<script type="text/x-template" id="dashboardview">
            <div class="dashboard-view some-thing">
                <h3>{{message}}</h3>
                <score-board v-bind:score="score" v-bind:increment="increment"></score-board>
                <router-link to="/Todo">Go to Todo</router-link>
            </div>
        </script>`;
        
        console.log(result);
        // Assert.strictEqual(result, expected);
    });
});