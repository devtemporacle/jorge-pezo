const TAGS = ["React / TypeScript", "C# / .NET", "Python", "AWS"];

export default function WhatIDo() {
  return (
    <section id="what-i-do" aria-labelledby="what-i-do-heading">
      <h2 id="what-i-do-heading" className="section-heading">{"// what i do"}</h2>
      <p className="body-text">
        Full-stack development across the web and cloud. I&apos;ve built AI-powered tools, including
        a document extraction tool with human review that cut hours of manual work down to minutes.
      </p>
      <ul className="tags" aria-label="Technologies">
        {TAGS.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
