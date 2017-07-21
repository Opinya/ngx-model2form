"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
function ToNgForm(additionalControls, validators) {
    return this.map(function (model) { return new forms_1.FormGroup(Object.keys(model).reduce(function (group, prop) {
        group[prop] = new forms_1.FormControl(model[prop]);
        return group;
    }, {})); });
}
exports.ToNgForm = ToNgForm;
Observable_1.Observable.prototype.toNgForm = ToNgForm;
//# sourceMappingURL=Model2Form.js.map