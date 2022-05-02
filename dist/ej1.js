"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class CountWords {
    constructor(path) {
        this.path = path;
    }
    count() {
        const cat = (0, child_process_1.spawn)('cat', [this.path]);
        cat.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    }
}
;
