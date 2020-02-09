export default class Tool {
    constructor() {
        this.active = false;
    }

    static getActive(tools) {
        for (let [key, tool] of Object.entries(tools)) {
            if (tool.active) return { key: key, tool: tool };
        }
    }
}
