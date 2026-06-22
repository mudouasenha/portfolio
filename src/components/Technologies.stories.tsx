import type { Meta, StoryObj } from "@storybook/react-vite";

import Technologies from "./Technologies";

const meta: Meta<typeof Technologies> = {
  title: "components/Technologies",
  component: Technologies,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Core stack section pairing narrative positioning with icon-driven technology cards for the main production toolkit.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default technologies section with intro copy and icon grid.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Technologies />
    </div>
  ),
};

/**
 * Technologies section shown between projects and skills anchors for page-flow review.
 */
export const InLandingPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="projects" className="border-b border-border py-10 text-sm text-muted-foreground">
        Projects section placeholder
      </section>
      <div id="technologies">
        <Technologies />
      </div>
      <section id="skills" className="py-10 text-sm text-muted-foreground">
        Skills section placeholder
      </section>
    </div>
  ),
};
