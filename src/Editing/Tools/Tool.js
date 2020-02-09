export default class Tool {
    static getActive(tools) {
        for (const [, tool] of Object.entries(tools)) {
            if (tool.active) return tool;
        }
    }
}
