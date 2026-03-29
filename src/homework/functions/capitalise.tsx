export function capitalise(str: string): string | undefined {

    if (str.length === 0) {
        return "";
    }

    return str[0].toUpperCase() + str.slice(1);
}
