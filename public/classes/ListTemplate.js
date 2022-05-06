var ListTemplate = /** @class */ (function () {
    function ListTemplate(container, element) {
        this.container = container;
        this.element = element;
    }
    ListTemplate.prototype.render = function (item, header, pos) {
        var li = document.createElement("li");
        li.classList.add("item");
        var countElements = this.container.children.length + 1;
        var h4 = document.createElement("h4");
        h4.innerText = header;
        h4.classList.add("title");
        li.append(h4);
        var p = document.createElement("p");
        p.innerText = item.format();
        p.classList.add("dec");
        li.append(p);
        var span = document.createElement("span");
        span.innerText = "count: ".concat(countElements);
        span.classList.add("count");
        li.append(span);
        if (pos === "start") {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    };
    ListTemplate.prototype.errMsg = function (title) {
        var p = document.createElement("p");
        p.classList.add("errMsg");
        p.id = "errMsg";
        p.innerText = title;
        this.element.append(p);
    };
    ListTemplate.prototype.removeElement = function () {
        var _a;
        var errMsgEle = document.querySelector("#errMsg");
        (_a = errMsgEle === null || errMsgEle === void 0 ? void 0 : errMsgEle.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(errMsgEle);
    };
    return ListTemplate;
}());
export { ListTemplate };
