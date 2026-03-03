export function setNestedValue(obj, path, value) {
    const keys = path.split(".");
    const result = structuredClone(obj);

    let current = result;

    for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];

        if (current[key] == null || typeof current[key] !== "object") {
            current[key] = {};
        }

        current = current[key];
    }

    current[keys[keys.length - 1]] = value;

    return result;
}