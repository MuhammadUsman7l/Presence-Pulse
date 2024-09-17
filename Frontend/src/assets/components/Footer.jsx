import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <>
      <footer className="w-scren h-1/13 sticky top-full bg-grey-200 flex justify-between text-white px-12 shadow-3xl">
        <div className="w-1/2 h-full flex items-center ">
          <h1>
            <FontAwesomeIcon icon={faLink} />
            Created By Muhammad Usman
          </h1>
        </div>
        <div className="w-1/2 h-full flex items-center text-base underline justify-between tracking-wider">
          <a href="https://github.com/" className="cursor-pointer">
            <FontAwesomeIcon
              icon={faGithub}
              style={{ color: "#fafcff" }}
              className="mx-1"
            />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/muhammad-usman-69b623237/">
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{ color: "#f4f5f6" }}
              className="mx-1"
            />
            LinkedIN
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
