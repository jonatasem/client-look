import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="container-footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Jonatas Elieser Moreira. Todos os
          direitos reservados.
        </p>
        <p>
          <a
            href="https://github.com/jonatasem"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          |
          <a
            href="https://www.linkedin.com/in/jonatas-elieser-moreira-948632270/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
