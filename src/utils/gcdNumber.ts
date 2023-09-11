var gcd = function (a: any, b: any) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
};
module.exports = gcd;
