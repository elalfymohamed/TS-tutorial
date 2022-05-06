var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js";
var form = document.querySelector(".new-item-form");
// input
var type = document.querySelector("#type");
var toFrom = document.querySelector("#tofrom");
var details = document.querySelector("#details");
var amount = document.querySelector("#amount");
var pos = document.querySelector("#pos");
var submitBtn = document.querySelector("#submitBtn");
var cleanForm = function () {
    toFrom.value = "";
    details.value = "";
    amount.value = "";
};
// list template
var ul = document.querySelector("ul");
var list = new ListTemplate(ul, form);
// input details 
details.addEventListener("input", function (e) {
    e.preventDefault();
    submitBtn.removeAttribute("disabled");
    list.removeElement();
});
// form 
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var doc;
    var value;
    value = [toFrom.value, details.value, amount.valueAsNumber];
    if (details.value === "") {
        list.errMsg("derails is require");
        submitBtn.setAttribute("disabled", "");
    }
    else {
        if (type.value === "Payment") {
            doc = new (Payment.bind.apply(Payment, __spreadArray([void 0], value, false)))();
            cleanForm();
        }
        else {
            doc = new (Invoice.bind.apply(Invoice, __spreadArray([void 0], value, false)))();
            cleanForm();
        }
        list.render(doc, type.value, pos.value);
    }
});
