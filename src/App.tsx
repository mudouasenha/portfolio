import About from "./components/About";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Technologies from "./components/Technologies";

function App() {
    return (
        <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-[26rem] opacity-25 [background:radial-gradient(circle_at_top,var(--primary)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 left-0 h-[20rem] w-[24rem] opacity-30 [background:radial-gradient(circle,var(--accent)_0%,transparent_72%)]" />
            </div>
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar />
                <Hero />
                <section id="about" className="scroll-mt-28">
                    <About />
                </section>
                <section id="technologies" className="scroll-mt-28">
                    <Technologies />
                </section>
                <section id="skills" className="scroll-mt-28">
                    <Skills />
                </section>
                <section id="certifications" className="scroll-mt-28">
                    <Certifications />
                </section>
                <section id="experience" className="scroll-mt-28">
                    <Experience />
                </section>
                <section id="projects" className="scroll-mt-28">
                    <Projects />
                </section>
                <section id="contact" className="scroll-mt-28">
                    <Contact />
                </section>
            </div>
        </div>
    );
}

export default App;
