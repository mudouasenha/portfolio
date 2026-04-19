import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Sticky portfolio navigation with recruiter CTA, social links, locale switcher, desktop nav items, and mobile sheet navigation.",
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
 * Navbar in a representative landing-page shell with matching anchor targets.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="min-h-[140vh]">
      <div id="top" />
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-16 px-4 pb-24 sm:px-6 xl:px-8">
        <section id="about" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">About</h2>
        </section>
        <section id="experience" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Experience</h2>
        </section>
        <section id="projects" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Projects</h2>
        </section>
        <section id="technologies" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Technologies</h2>
        </section>
        <section id="skills" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Skills</h2>
        </section>
        <section id="certifications" className="border-b border-border pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Certifications</h2>
        </section>
        <section id="contact" className="pb-16">
          <h2 className="text-3xl font-semibold text-foreground">Contact</h2>
        </section>
      </main>
    </div>
  ),
};

/**
 * Navbar against a shorter page to focus on the header surface and actions.
 */
export const HeaderOnlyFocus: Story = {
  args: {},
  render: () => (
    <div>
      <div id="top" />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 xl:px-8">
        <section id="about" className="rounded-[1.6rem] border border-border bg-card/95 p-8">
          <p className="text-sm text-muted-foreground">
            Compact page shell for quickly reviewing the header surface, locale switcher, and primary CTA.
          </p>
        </section>
        <section id="experience" />
        <section id="projects" />
        <section id="technologies" />
        <section id="skills" />
        <section id="certifications" />
        <section id="contact" />
      </main>
    </div>
  ),
};
