import {test, expect} from "@jest/globals";
import { capitalise } from "../functions/capitalise";

test('Обычная строка', () => {
    const result = capitalise('пример');
    expect(result).toBe('Пример');
});

test('Уже заглавной строки', () => {
    const result = capitalise('Пример');
    expect(result).toBe('Пример');
});

test('Пустая строка', () => {
    const result = capitalise('');
    expect(result).toBe('');
});
