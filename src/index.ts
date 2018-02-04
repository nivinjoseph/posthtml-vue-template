import { ApplicationException } from "n-exception";
import "n-ext";
import * as Os from "os";


module.exports = function postHtmlViewTemplatePlugin()
{
    return (tree: Array<any>) =>
    {
        if (tree.length === 0)
            throw new ApplicationException("DOM tree cannot be empty");

        if (tree.count(t => typeof (t) === "object") !== 1)
            throw new ApplicationException("DOM tree does not contain one root element");

        let root = tree.find(t => typeof (t) === "object");
        let classes: string = root.attrs.class;
        if (!classes || classes.isEmptyOrWhiteSpace())
            throw new ApplicationException("DOM tree root element has no class");

        classes = classes.trim();
        if (classes.contains(" "))
            classes = classes.split(" ")[0].trim();

        if (!classes.endsWith("-view"))
            throw new ApplicationException("DOM tree root element's first class is not not view name");

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