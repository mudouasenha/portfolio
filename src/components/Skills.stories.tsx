import type { Meta, StoryObj } from "@storybook/react-vite";

import Skills from "./Skills";

const meta: Meta<typeof Skills> = {
  title: "components/Skills",
  component: Skills,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Capability map section rendering translation-backed skill categories as tagged cards with concise signal counts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default skills section with category cards and tag groupings.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Skills />
    </div>
  ),
};

/**
 * Skills section framed between technologies and certifications anchors.
 */
export const InLandingPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="technologies" className="border-b border-border py-10 text-sm text-muted-foreground">
        Technologies section placeholder
      </section>
      <div id="skills">
        <Skills />
      </div>
      <section id="certifications" className="py-10 text-sm text-muted-foreground">
        Certifications section placeholder
      </section>
    </div>
  ),
};
