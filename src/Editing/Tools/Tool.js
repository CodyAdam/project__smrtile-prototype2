export default class Tool {
    constructor() {
        this.active = false;
    }

    static getActive(tools) {
        for (const [, tool] of Object.entries(tools)) {
            if (tool.active) return tool;
        }
    }
}
