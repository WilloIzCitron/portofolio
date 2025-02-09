"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var elysia_1 = require("elysia");
var fs_1 = require("fs");
var path_1 = require("path");
var elysia_rate_limit_1 = require("elysia-rate-limit");
var imageIndex = 0;
var imageDirectory = path_1.default.join(__dirname, '..\\..\\public\\dolls');
var imageCount = fs_1.default.readdirSync(imageDirectory).filter(function (file) { return file.startsWith('doll'); }).length;
function bijinDollAPI(app) {
    app.use((0, elysia_rate_limit_1.rateLimit)({ errorResponse: new Response("rate-limited", {
            status: 429,
            headers: new Headers({
                'Content-Type': 'text/json'
            })
        }),
        generator: function (req, server) { var _a, _b; return (server == null) ? (_b = (_a = server === null || server === void 0 ? void 0 : server.requestIP(req)) === null || _a === void 0 ? void 0 : _a.address) !== null && _b !== void 0 ? _b : "" : ""; }
    }));
    app.onError(function (_a) {
        var code = _a.code, error = _a.error;
        if (code === 429) {
            return { error: 'Uh oh, your\'e been rate limited!' };
        }
    });
    app.get('/bijindoll', function () {
        imageIndex = (0, crypto_1.randomInt)(1, imageCount + 1);
        return (0, elysia_1.file)("public/dolls/doll (".concat(imageIndex, ").") + (imageIndex > 917 ? 'png' : 'jpg'));
    });
}
exports.default = bijinDollAPI;
