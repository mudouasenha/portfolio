import type { Meta, StoryObj } from "@storybook/react-vite";

import SectionHeader from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "components/sections/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Large serif heading used to anchor major sections of the portfolio experience.",
      },
    },
  },
  args: {
    children: "Selected work",
  },
  argTypes: {
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default section heading styling in isolation.
 */
export const Default: Story = {
  args: {},
};

/**
 * Typical section-introduction layout with kicker and supporting copy.
 */
export const WithContext: Story = {
  args: {},
  render: args => (
    <div className="max-w-3xl space-y-4 rounded-[1.6rem] border border-border bg-card/95 p-8 text-card-foreground shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Projects</p>
      <SectionHeader {...args} />
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        A concise introduction block that mirrors how section headers appear in the live portfolio.
      </p>
    </div>
  ),
};
