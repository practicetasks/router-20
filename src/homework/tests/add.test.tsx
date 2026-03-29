import {test, expect} from "@jest/globals";
import {add} from "../functions/add";

test('сложение двух положительных чисел', () => {
    const result = add(2, 4);
    expect(result).toBe(6);
});

test('сложение с нулём', () => {
    const result = add(2, 0);
    expect(result).toBe(2);
});

test('сложение отрицательных чисел', () => {
    const result = add(2, -4);
    expect(result).toBe(-2);
});
