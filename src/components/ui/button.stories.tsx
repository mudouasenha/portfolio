import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "components/ui/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Primary button primitive used for call-to-action and utility interactions across the portfolio.",
      },
    },
  },
  args: {
    children: "View project",
    variant: "default",
    size: "default",
  },
  argTypes: {
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button configuration used for primary actions.
 */
export const Default: Story = {
  args: {},
};

/**
 * Core variants shown together for quick visual comparison.
 */
export const Variants: Story = {
  args: {},
  render: args => (
    <div className="flex flex-wrap gap-3 rounded-2xl border border-border bg-background p-4">
      <Button {...args}>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link" className="px-0">
        Learn more
      </Button>
    </div>
  ),
};

/**
 * Icon-bearing button state for directional calls to action.
 */
export const WithInlineIcon: Story = {
  args: {},
  render: args => (
    <Button {...args}>
      Explore work
      <ArrowRight className="size-4" />
    </Button>
  ),
};

/**
 * Disabled state for unavailable or gated actions.
 */
export const Disabled: Story = {
  args: {
    children: "Unavailable",
    disabled: true,
  },
};
