const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {
    let rawTemplate = await (await fetch(path)).text();
    let div = document.createElement("div");
    div.innerHTML = rawTemplate;
    let template = div.querySelector("template");
    if (!template) {
        throw new Error("Template not found or invalid template format");
    }
    return template;
};

TemplateManager.cloneTemplate = (template, target = document.body, data = {}) => {
    if (!template || !template.content) {
        throw new Error("Invalid template provided");
    }
    const clone = template.content.cloneNode(true);
    let html = clone.innerHTML;

    for (let key of Object.keys(data)) {
        html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), data[key]);
    }

    clone.innerHTML = html;
    target.appendChild(clone);
    return clone;
};

export default TemplateManager;