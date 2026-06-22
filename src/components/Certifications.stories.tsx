import type { Meta, StoryObj } from "@storybook/react-vite";

import Certifications from "./Certifications";

const meta: Meta<typeof Certifications> = {
  title: "components/Certifications",
  component: Certifications,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Certification showcase with linked credential cards, issuer metadata, dates, and imported badge artwork.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default certification grid backed by translation content and badge assets.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Certifications />
    </div>
  ),
};

/**
 * Certifications section framed with neighboring anchors for top-level page review.
 */
export const InLandingPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="skills" className="border-b border-border py-10 text-sm text-muted-foreground">
        Skills section placeholder
      </section>
      <div id="certifications">
        <Certifications />
      </div>
      <section id="contact" className="py-10 text-sm text-muted-foreground">
        Contact section placeholder
      </section>
    </div>
  ),
};
