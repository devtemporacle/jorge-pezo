// A plain <a> isn't base-path aware, so prefix public/ files the same way
// next.config.ts does (e.g. "/jorge-pezo" on GitHub Pages, "" at the root).
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section-heading">{"// contact"}</h2>
      <div className="chips">
        <a className="chip chip-primary" href="mailto:jpezoaltamirano@gmail.com">
          Email
        </a>
        <a
          className="chip"
          href="https://www.linkedin.com/in/jorge-pezo-a50433212/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="chip"
          href="https://github.com/devtemporacle"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="chip"
          href={`${basePath}/Jorge-Pezo-CV.pdf`}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>
      </div>
    </section>
  );
}
