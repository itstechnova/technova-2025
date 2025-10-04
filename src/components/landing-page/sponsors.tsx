import SponsorCard, { SponsorCardProps } from "../base-ui/SponsorCard";
import { SponsorCarousel } from "../base-ui/SponsorCarousel";

export interface SponsorInfo
  extends Omit<SponsorCardProps, "logo" | "className" | "size"> {
  logosrc: string; // path or url to logo
  logoalt?: string;
}

interface OurSponsorsProps {
  primarySponsors: SponsorInfo[];
}

const OurSponsorsComponent: React.FC<OurSponsorsProps> = ({
  primarySponsors,
}) => {
  return (
    <section
      id="sponsors"
      className="scroll-mt-16 px-10 md:px-24 py-12 md:py-16 flex flex-col h-full relative w-full text-left"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-10">
        Our Sponsors
      </h2>

      {/* Top: Large cards carousel */}
      <SponsorCarousel
        gapPx={55}
        items={primarySponsors.map((s, i) => ({
          key: `primary-${i}`,
          card: (
            <div className="w-[260px] [@media(min-width:360px)]:w-[280px] [@media(min-width:400px)]:w-[330px] [@media(min-width:640px)]:w-[380px] [@media(min-width:760px)]:w-[440px] h-full">
              <SponsorCard
                {...s}
                logo={
                  <img
                    src={s.logosrc}
                    alt={s.logoalt ?? s.title}
                    className="h-auto w-auto max-h-16 sm:max-h-20 md:max-h-24 max-w-full object-contain"
                  />
                }
              />
            </div>
          ),
        }))}
      />
    </section>
  );
};

const OurSponsors: React.FC = () => {
  return (
    <OurSponsorsComponent
      primarySponsors={[
        {
          title: "WiCS",
          description: "",
          logosrc: "/themed_assets/sponsors/wics.png",
          href: "https://wics.uwaterloo.ca/",
          color: "DEFAULT",
        },
        {
          title: "Jane Street",
          description:
            "Jane Street is excited to support TechNova and future innovators in tech. As a global trading firm, Jane Street values creativity, collaboration, and problem-solving in technology and beyond.",
          logosrc: "/themed_assets/sponsors/janestreet.png",
          href: "https://www.janestreet.com/",
          color: "NAVY",
        },
        {
          title: "OpenText",
          description:
            "OpenText is proud to partner with TechNova and Women in Computer Science (WiCS) for the Women+ Hackathon. As a leader in information management, OpenText is committed to fostering innovation and supporting the next generation of female tech talent. Explore careers at OpenText Careers.",
          logosrc: "/themed_assets/sponsors/opentext.png",
          href: "https://www.opentext.com/",
          color: "GREEN",
        },
        {
          title: "CSE Canada",
          description:
            "The Communications Security Establishment Canada (CSE) is the national cryptologic agency, securing government IT and providing foreign signals intelligence.",
          logosrc: "/themed_assets/sponsors/cse.png",
          href: "https://www.cse-cst.gc.ca/en/careers",
          color: "ROSE",
        },
        {
          title: "Ubisoft",
          description:
            "Ubisoft, a leading game publisher with over 35 years of experience, is known for creating iconic franchises like Assassin’s Creed, Far Cry, and Just Dance. They’re globally acclaimed for their innovation in open-world and immersive gaming experiences.",
          logosrc: "/themed_assets/sponsors/ubisoft.png",
          href: "https://www.ubisoft.com/en-us/company/careers",
          color: "TEAL",
        },
        {
          title: "Rewriting the Code",
          description:
            "Rewriting the Code is a 501(c)(3) nonprofit dedicated to empowering university students and early-career women in tech. Through collaborative learning and career-focused development, we foster belonging, champion opportunity, and equip future innovators with the skills, knowledge, and connections to thrive—reshaping the future of technology.",
          logosrc: "/themed_assets/sponsors/rewriting-the-code.png",
          href: "https://rewritingthecode.org/join-us/",
          color: "DEFAULT",
        },
        {
          title: "NAV CANADA",
          description:
            "Thinking about a career in aviation? NAV CANADA is hiring! From air traffic services to engineering, IT, and corporate roles, there are opportunities across Canada—no aviation background required.",
          logosrc: "/themed_assets/sponsors/nav.png",
          href: "https://www.navcanada.ca/en/careers",
          color: "NAVY",
        },
        {
          title: "Accenture",
          description:
            "Accenture supports TechNova as a Startup Sponsor, empowering innovators at the intersection of technology and strategy. The company is passionate about fostering diverse talent and helping students explore new possibilities in tech consulting and innovation.",
          logosrc: "/themed_assets/sponsors/accenture.png",
          href: "https://www.accenture.com/ca-en",
          color: "GREEN",
        },
        {
          title: "BDO Canada LLP",
          description: "",
          logosrc: "/themed_assets/sponsors/bdo.png",
          href: "https://www.bdo.ca/careers/students",
          color: "ROSE",
        },
        {
          title: "Velocity",
          description:
            "Velocity is excited to support TechNova’s hackathon innovators! With a track record of helping startups scale, Velocity empowers student founders to turn ideas into impactful ventures.",
          logosrc: "/themed_assets/sponsors/velocity.png",
          href: "https://www.velocityincubator.com/",
          color: "TEAL",
        },
        {
          title: "Hack the 6ix",
          description: "",
          logosrc: "/themed_assets/sponsors/hackthe6.png",
          href: "https://hackthe6ix.com/",
          color: "DEFAULT",
        },
        {
          title: "theScore",
          description: "",
          logosrc: "/themed_assets/sponsors/thescore.png",
          href: "https://www.scoremediaandgaming.com/careers",
          color: "NAVY",
        },
        {
          title: "WomenTech Network",
          description:
            "WomenTech Network is excited to feature TechNova participants across their newsletter, LinkedIn, Facebook, and Twitter channels, spotlighting the next generation of women+ in tech.",
          logosrc: "/themed_assets/sponsors/womentech.png",
          href: "https://www.womentech.net/",
          color: "GREEN",
        },
        {
          title: "Saily",
          description:
            "An eSIM service that lets you easily connect to mobile networks worldwide without physical SIM cards.",
          logosrc: "/themed_assets/sponsors/saily.png",
          href: "https://saily.com/",
          color: "ROSE",
        },
        {
          title: "StarterHacks",
          description: "",
          logosrc: "/themed_assets/sponsors/starterhacks.png",
          href: "https://www.starterhacks.ca/",
          color: "TEAL",
        },
        {
          title: "nexos.ai",
          description:
            "An AI-driven platform for automating and enhancing business processes, decision-making, and productivity through intelligent insights.",
          logosrc: "/themed_assets/sponsors/nexos-ai.png",
          href: "https://nexos.ai/",
          color: "DEFAULT",
        },
        {
          title: "Incogni",
          description:
            "A data privacy tool that helps remove your personal information from data broker databases.",
          logosrc: "/themed_assets/sponsors/incogni.png",
          href: "https://incogni.com/",
          color: "NAVY",
        },
        {
          title: "NordVPN",
          description:
            "A secure virtual private network (VPN) service that encrypts your internet traffic and protects your online privacy.",
          logosrc: "/themed_assets/sponsors/nordvpn.png",
          href: "https://nordvpn.com/hackathons",
          color: "GREEN",
        },
        {
          title: "NordPass",
          description:
            "A password manager that securely stores, generates, and auto-fills passwords and sensitive information.",
          logosrc: "/themed_assets/sponsors/nordpass.png",
          href: "https://nordpass.com/",
          color: "ROSE",
        },
        {
          title: "NordProtect",
          description:
            "A cybersecurity suite providing protection against online threats such as malware, phishing, and tracking.",
          logosrc: "/themed_assets/sponsors/nordprotect.png",
          href: "https://nordprotect.com/",
          color: "TEAL",
        },
      ]}
    />
  );
};

export default OurSponsors;
