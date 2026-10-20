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
      </div>
    </section>
  );
}
