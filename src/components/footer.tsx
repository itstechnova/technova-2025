import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "./base-ui/button";

function Footer() {
  return (
    <div className="border-t-2 border-navSecondary bg-navPrimary px-24 max-sm:px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <Button size="icon" variant="outline">
          <a href="mailto:hello@itstechnova.org" target="_blank">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-navSecondary w-5 h-5"
            />
          </a>
        </Button>
        <Button size="icon" variant="outline">
          <a href="https://www.instagram.com/itstechnova" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-navSecondary w-5 h-5"
            />
          </a>
        </Button>
        <Button size="icon" variant="outline">
          <a
            href="https://www.linkedin.com/company/itstechnova/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-navSecondary w-5 h-5"
            />
          </a>
        </Button>
        <Button size="icon" variant="outline">
          <a href="https://www.facebook.com/itstechnova" target="_blank">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-navSecondary w-5 h-5"
            />
          </a>
        </Button>
        <Button size="icon" variant="outline">
          <a href="https://x.com/itstechnova" target="_blank">
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-navSecondary w-5 h-5"
            />
          </a>
        </Button>
      </div>
      <div>
        <p className="text-xs">Made with &lt;3 by TechNova 2025</p>
      </div>
    </div>
  );
}

export default Footer;
