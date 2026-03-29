import {test, expect} from "@jest/globals";
import { filterEven } from "../functions/filterEven";

test('Массив с чётными и нечётными', () => {
    const result = filterEven([1, 2, 3, 4, 5]);
    expect(result).toEqual([2, 4]);
});

test('Пустой массив', () => {
    const result = filterEven([]);
    expect(result).toEqual([]);
});

test('Массив без чётных', () => {
    const result = filterEven([1, 3, 5]);
    expect(result).toEqual([]);
});
