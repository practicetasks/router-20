import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    header: "Мой аккаунт",
    children: "Я выпадашка",
    items: [
      {
        title: "Профиль",
        url: "https://example.com/profile",
      },
      {
        title: "Выйти",
        action: fn(),
      },
    ],
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    header: "Действия",
    children: "Открыть меню",
    items: [
      {
        title: "Настройки",
        url: "https://example.com/settings",
      },
      {
        title: "Удалить",
        action: fn(),
      },
    ],
  },
};

export const WithoutHeader: Story = {
  args: {
    variant: "primary",
    children: "Без заголовка",
    items: [
      {
        title: "Пункт 1",
        action: fn(),
      },
      {
        title: "Пункт 2",
        url: "https://example.com",
      },
    ],
  },
};
