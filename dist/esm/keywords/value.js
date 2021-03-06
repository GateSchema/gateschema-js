export default {
    isHighOrder: true,
    name: 'value',
    validator: function (value, _a, cb) {
        var args = _a.args;
        var expectedValue = args[0];
        if (value !== expectedValue) {
            return cb({
                value: expectedValue
            });
        }
        return cb();
    }
};
//# sourceMappingURL=value.js.map