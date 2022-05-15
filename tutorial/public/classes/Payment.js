var Payment = /** @class */ (function () {
    function Payment(recipient, details, amount) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    Payment.prototype.format = function () {
        return "".concat(this.recipient, " is owes ").concat(this.details, " for ").concat(this.amount);
    };
    return Payment;
}());
export { Payment };
