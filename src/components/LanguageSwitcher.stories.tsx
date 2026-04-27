import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import { LanguageSwitcher } from "./LanguageSwitcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "components/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Compact language toggle used in the navigation bar to switch between English and Portuguese routes.",
      },
    },
  },
  decorators: [
    Story => (
      <MemoryRouter initialEntries={["/en"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default language toggle inside a neutral toolbar surface.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="rounded-2xl border border-border bg-card p-4">
      <LanguageSwitcher />
    </div>
  ),
};

/**
 * Language toggle placed on a darker navigation-like surface for contrast checking.
 */
export const OnNavigationSurface: Story = {
  args: {},
  render: () => (
    <div className="rounded-2xl border border-border bg-background/80 p-4 shadow-sm">
      <LanguageSwitcher />
    </div>
  ),
};
