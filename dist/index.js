"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
const Os = require("os");
module.exports = function postHtmlViewTemplatePlugin() {
    return (tree) => {
        if (tree.length === 0)
            throw new n_exception_1.ApplicationException("DOM tree cannot be empty");
        if (tree.count(t => typeof (t) === "object") !== 1)
            throw new n_exception_1.ApplicationException("DOM tree does not contain one root element");
        let root = tree.find(t => typeof (t) === "object");
        let classes = root.attrs.class;
        if (!classes || classes.isEmptyOrWhiteSpace())
            throw new n_exception_1.ApplicationException("DOM tree root element has no class");
        classes = classes.trim();
        if (classes.contains(" "))
            classes = classes.split(" ")[0].trim();
        if (!classes.endsWith("-view"))
            throw new n_exception_1.ApplicationException("DOM tree root element's first class is not not view name");
        let wrapper = {
            tag: "script",
            attrs: {
                type: "text/x-template",
                id: classes.replaceAll("-", ""),
            },
            content: [Os.EOL, ...tree, Os.EOL]
        };
        tree.clear();
        tree.push(...[Os.EOL, wrapper, Os.EOL, Os.EOL]);
        return tree;
    };
};
//# sourceMappingURL=index.js.map