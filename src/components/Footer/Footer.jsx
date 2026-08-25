import './Footer.css';

const footerSections = ['Project Credits', 'Legal Links', 'Scavenger Terms'];

export function Footer() {
  const repositoryUrl = 'https://github.com/simonlopez25/valhalla-del-chatarrero.git';

  return (
    <footer className="footerContainer">
      <a
        href={repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="footerBrand"
      >
        <span className="footerIcon">🔧</span>
        <span className="footerTitle">VALHALLA DEL CHATARRERO</span>
      </a>

      <div className="footerCopyright">
        © 2024 Valhalla del Chatarrero - Built from the Wreckage
      </div>

      <div className="footerSections">
        {footerSections.map((section) => (
          <span key={section} className="footerText">
            {section}
          </span>
        ))}
      </div>
    </footer>
  );
}