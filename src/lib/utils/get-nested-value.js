export function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
        if (current == null) return undefined;
        return current[key];
    }, obj);
}