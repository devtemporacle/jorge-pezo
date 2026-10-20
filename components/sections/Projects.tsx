export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="section-heading">{"// projects"}</h2>
      <article className="card">
        <h3 className="card-title">Real-time market data alert system</h3>
        <p className="card-meta">
          Python, asyncio, SQLite, and a Telegram bot delivering live market alerts.
        </p>
        <a
          className="card-link"
          href="https://github.com/devtemporacle"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </article>
    </section>
  );
}
