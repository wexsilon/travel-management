"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var role_enum_1 = require("src/auth/enums/role.enum");
var app_config_service_1 = require("src/app-config/app-config.service");
var role_decorator_1 = require("src/auth/decorators/role.decorator");
var auth_guard_1 = require("src/auth/guards/auth.guard");
var util_service_1 = require("src/util/util.service");
var argon2_1 = require("argon2");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.deleteUser = function (id, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.deleteOne(id)];
                    case 1:
                        _a.sent();
                        res.redirect('/user/management');
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.userGet = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userModel, users, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userModel = this.userService.userModel;
                        return [4 /*yield*/, this.userService.findAllByRole(req.user.role)];
                    case 1:
                        users = _a.sent();
                        data = users
                            .map(function (v) {
                            return {
                                id: v._id.toString(),
                                full_name: v.firstName + " " + v.lastName,
                                role: v.role,
                                email: v.email,
                                avatar: v.profile
                            };
                        })
                            .filter(function (v) { return v.id.toString() !== req.user.id; });
                        // .sort((a, b) => {
                        //     if (
                        //         UtilService.roleScore(a.role) ===
                        //         UtilService.roleScore(b.role)
                        //     )
                        //         return 0;
                        //     else if (
                        //         UtilService.roleScore(a.role) >
                        //         UtilService.roleScore(b.role)
                        //     )
                        //         return 1;
                        //     else return -1;
                        // });
                        return [2 /*return*/, { data: data }];
                }
            });
        });
    };
    UserController.prototype.createUser = function (manualCreateUserDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var repeatPassword, password, cu, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        repeatPassword = manualCreateUserDto.repeatPassword, password = manualCreateUserDto.password, cu = __rest(manualCreateUserDto, ["repeatPassword", "password"]);
                        _b = (_a = this.userService.userModel).bind;
                        _c = { profile: util_service_1.UtilService.randomProfile(cu.gendere) };
                        return [4 /*yield*/, argon2_1.hash(password)];
                    case 1: return [4 /*yield*/, new (_b.apply(_a, [void 0, __assign.apply(void 0, [(_c.password = _d.sent(), _c), cu])]))().save()];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (id, manualUpdateUserDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.updateOne(id, manualUpdateUserDto)];
                    case 1:
                        _a.sent();
                        res.redirect('/user/management');
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.printBody = function (manualCreateUserDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var repeatPassword, password, cu, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        repeatPassword = manualCreateUserDto.repeatPassword, password = manualCreateUserDto.password, cu = __rest(manualCreateUserDto, ["repeatPassword", "password"]);
                        _b = (_a = this.userService.userModel).bind;
                        _c = { profile: util_service_1.UtilService.randomProfile(cu.gendere) };
                        return [4 /*yield*/, argon2_1.hash(password)];
                    case 1: return [4 /*yield*/, new (_b.apply(_a, [void 0, __assign.apply(void 0, [(_c.password = _d.sent(), _c), cu])]))().save()];
                    case 2:
                        _d.sent();
                        res.redirect('/user/management');
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.managementGet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, findedUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findAllByRole(req.user.role)];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, this.userService.findAll()];
                    case 2:
                        findedUsers = _a.sent();
                        res.render('user/management', {
                            user: req.user,
                            asideMenu: 'management',
                            asideSubMenu: 'user-management',
                            findedUsers: findedUsers,
                            entryYears: app_config_service_1.AppConfigService.ENTRY_YEARS,
                            fields: app_config_service_1.AppConfigService.FIELDS,
                            CreateUserRoles: role_enum_1.CreateUserRoles,
                            StudentRoles: role_enum_1.StudentRoles,
                            users: users,
                            CommentManagement: role_enum_1.CommentManagement,
                            CreateTravelRoles: role_enum_1.CreateTravelRoles,
                            UserManagementRoles: role_enum_1.UserManagementRoles
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.workGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.userService.work();
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        common_1.Get('delete/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Res())
    ], UserController.prototype, "deleteUser");
    __decorate([
        common_1.Get(),
        role_decorator_1.Roles.apply(void 0, role_enum_1.UserManagementRoles),
        __param(0, common_1.Req())
    ], UserController.prototype, "userGet");
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __param(1, common_1.Res())
    ], UserController.prototype, "createUser");
    __decorate([
        common_1.Post('update/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Res())
    ], UserController.prototype, "updateUser");
    __decorate([
        common_1.Post('management'),
        __param(0, common_1.Body()),
        __param(1, common_1.Res())
    ], UserController.prototype, "printBody");
    __decorate([
        common_1.Get('management'),
        role_decorator_1.Roles.apply(void 0, role_enum_1.UserManagementRoles),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], UserController.prototype, "managementGet");
    __decorate([
        common_1.Get('work')
    ], UserController.prototype, "workGet");
    UserController = __decorate([
        common_1.UseGuards(auth_guard_1.AuthenticatedGuard),
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
