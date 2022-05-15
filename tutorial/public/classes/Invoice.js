// classes
var Invoice = /** @class */ (function () {
    function Invoice(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    Invoice.prototype.format = function () {
        return "".concat(this.client, " owes ").concat(this.details, " for ").concat(this.amount);
    };
    return Invoice;
}());
export { Invoice };
