import * as Os from "os";


module.exports = function postHtmlViewTemplatePlugin()
{
    return (tree: Array<any>) =>
    {
        if (tree.length === 0)
            throw new Error("DOM tree cannot be empty");

        if (tree.filter(t => typeof (t) === "object").length !== 1)
            throw new Error("DOM tree does not contain one root element");

        let root = tree.find(t => typeof (t) === "object");
        let classes: string = root.attrs.class;
        if (!classes || classes.trim().length === 0)
            throw new Error("DOM tree root element has no class");

        classes = classes.trim();
        if (classes.indexOf(" ") !== -1)
            classes = classes.split(" ")[0].trim();

        if (!classes.endsWith("-view"))
            throw new Error("DOM tree root element's first class is not not view name");

        while (classes.indexOf("-") !== -1)
            classes = classes.replace("-", "");    
        
        let wrapper = {
            tag: "script",
            attrs: {
                type: "text/x-template",
                id: classes,
            },
            content: [Os.EOL, ...tree, Os.EOL]
        };

        while (tree.length !== 0)
            tree.pop();
        
        tree.push(wrapper);
        return tree;
    };
};