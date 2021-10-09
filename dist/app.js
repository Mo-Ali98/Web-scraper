"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cheerio = __importStar(require("cheerio"));
var axios_1 = __importDefault(require("axios"));
var app = (0, express_1.default)();
var port = 5000;
var getTodaysArticles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, articles, data, $_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://www.theguardian.com/uk";
                articles = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 2:
                data = (_a.sent()).data;
                $_1 = cheerio.load(data);
                $_1(".fc-item__title", data).each(function (i, element) {
                    var title = $_1(element).text();
                    var url = $_1(element).find("a").attr("href");
                    articles.push({ title: title, url: url });
                });
                return [2 /*return*/, articles];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getTodaysJobPostings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, jobs, data, $_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://uk.indeed.com/jobs?q=Software+Engineer&l=London%2C+Greater+London";
                jobs = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 2:
                data = (_a.sent()).data;
                $_2 = cheerio.load(data);
                $_2(".tapItem", data).each(function (i, element) {
                    var jobPosting = $_2(element).find(".resultContent");
                    var jobTitle = $_2(jobPosting).find(".jobTitle").text();
                    //console.log(jobTitle);
                    var company = $_2(jobPosting).find(".companyName").text();
                    //console.log(company);
                    var salary = $_2(jobPosting).find(".salary-snippet").text();
                    if (salary.length == 0)
                        salary = "Competitive";
                    //console.log(salary);
                    jobs.push({ jobTitle: jobTitle, company: company, salary: salary });
                });
                return [2 /*return*/, jobs];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
app.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var articleData, todaysJobPostings, htmlOutput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTodaysArticles()];
            case 1:
                articleData = _a.sent();
                return [4 /*yield*/, getTodaysJobPostings()];
            case 2:
                todaysJobPostings = _a.sent();
                htmlOutput = "";
                articleData.map(function (r) {
                    htmlOutput += "<h3>" + r.title + "</h3> <p>" + r.url + "</p>";
                });
                htmlOutput += "<br />";
                todaysJobPostings.map(function (j) {
                    htmlOutput += "<h3>" + j.jobTitle + "</h3> <h4>" + j.company + "</h4> <p>" + j.salary + "</p>";
                });
                res.send(htmlOutput);
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
