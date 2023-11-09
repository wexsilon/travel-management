"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TravelModule = void 0;
var common_1 = require("@nestjs/common");
var travel_service_1 = require("./travel.service");
var travel_controller_1 = require("./travel.controller");
var mongoose_1 = require("@nestjs/mongoose");
var travel_schema_1 = require("./schemas/travel.schema");
var user_module_1 = require("src/user/user.module");
var comment_module_1 = require("src/comment/comment.module");
var TravelModule = /** @class */ (function () {
    function TravelModule() {
    }
    TravelModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: travel_schema_1.Travel.name, schema: travel_schema_1.TravelSchema },
                ]),
                user_module_1.UserModule,
                comment_module_1.CommentModule,
            ],
            controllers: [travel_controller_1.TravelController],
            providers: [travel_service_1.TravelService],
            exports: [travel_service_1.TravelService]
        })
    ], TravelModule);
    return TravelModule;
}());
exports.TravelModule = TravelModule;
