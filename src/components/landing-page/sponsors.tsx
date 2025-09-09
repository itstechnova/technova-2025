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
      <div className="mb-10">
        <SponsorCarousel
          gapPx={45}
          items={primarySponsors.map((s, i) => ({
            key: `primary-${i}`,
            card: (
              <div className="w-[340px] sm:w-[380px] md:w-[440px]">
                <SponsorCard
                  {...s}
                  logo={
                    <img
                      src={s.logosrc}
                      alt={s.logoalt ?? s.title}
                      className="h-12 w-auto"
                    />
                  }
                />
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
};

const OurSponsors: React.FC = () => {
  return (
    <OurSponsorsComponent
      primarySponsors={[
        {
          title: "OpenText",
          description:
            "OpenText is a global leader in enterprise information management, helping organizations securely capture, manage, and analyze information to drive better business outcomes. We leverage cloud, AI, and data analytics technologies to solve complex challenges in information management, cybersecurity, and digital transformation, empowering businesses to innovate faster and make smarter, data-driven decisions.",
          logosrc: "/themed_assets/sponsors/opentext.png",
          href: "https://www.opentext.com/",
          colors: {
            headerBg: "bg-[#E4DFE2]",
            text: "text-gray-800",
            accent: "bg-gradient-to-r from-[#19123C] to-[#3D3D75C7] text-white",
            outer: "bg-[#19123C]",
          },
        },
        {
          title: "BDO Canada LLP",
          description:
            "BDO Canada LLP is a leading provider of professional services to clients across diverse sectors. For over 100 years, we have supported communities nationwide with assurance, tax, and advisory services, strengthened by deep industry expertise. With more than 5,000 professionals in 100 offices across Canada—and access to 1,800+ offices in 164 countries through the global BDO network—we are positioned to meet both local and international client needs. Our people-first culture has earned us recognition as one of Canada’s Top 100 Employers for 2025, reflecting our commitment to career growth, inclusion, and wellbeing. For students, this means meaningful opportunities through co-op, internship, and full-time roles where you can learn, grow, and make an impact. Beyond traditional services, BDO Digital helps clients innovate through cloud solutions, cybersecurity, data analytics, and emerging technologies—offering exciting career paths at the intersection of business and technology. At BDO, your future is our focus.",
          logosrc: "/themed_assets/sponsors/bdo.png",
          href: "https://www.bdo.ca/careers/students",
        },
        {
          title: "NAV CANADA",
          description:
            "NAV CANADA plays a unique and critical role managing 18 million square kilometres of Canadian and North Atlantic airspace.  Formed in 1996, we are a not-for-profit corporation — the first fully privatized air navigation service provider in the world. Our sophisticated network of area control centres, air traffic control towers, flight service stations, technology work centres, flight information centres and navigation aids supports our purpose to keep Canada’s skies safe and shape the future of air navigation services.",
          logosrc: "/themed_assets/sponsors/nav.png",
          href: "https://www.navcanada.ca/en/",
          colors: {
            headerBg: "bg-[#D8F3DC]",
            text: "text-gray-800",
            accent: "bg-gradient-to-r from-[#06402B] to-[#4D803B] text-white",
            outer: "bg-[#06402B]",
          },
        },
        {
          title: "Communications Secuirty Establishment Canada",
          description:
            "Communications Security Establishment Canada (CSE) is the national cryptologic agency, providing the Government of Canada with information technology security and foreign signals intelligence. Le Centre de la sécurité des télécommunications Canada (CST) est l’organisme national de cryptologie chargé de préserver, pour le gouvernement du Canada, la sécurité des technologies de l’information et de recueillir du renseignement électromagnétique étranger.",
          logosrc: "/themed_assets/sponsors/cse.png",
          href: "https://www.cse-cst.gc.ca/en/careers",
          colors: {
            headerBg: "bg-[#FFC4BC78]",
            text: "text-gray-800",
            accent: "bg-gradient-to-r from-[#CD5769] to-[#FFA3AF] text-white",
            outer: "bg-[#CD5769]",
          },
        },
        {
          title: "Rewriting the Code",
          description:
            "Rewriting the Code is a 501(c)(3) nonprofit dedicated to empowering university students and early-career women in tech. Through collaborative learning and career-focused development, we foster belonging, champion opportunity, and equip future innovators with the skills, knowledge, and connections to thrive—reshaping the future of technology.",
          logosrc: "/themed_assets/sponsors/rewriting-the-code.png",
          href: "https://rewritingthecode.org/join-us/",
          colors: {
            headerBg: "bg-[#6E9DB269]",
            text: "text-gray-800",
            accent: "bg-gradient-to-r from-[#055579] to-[#6E9DB2] text-white",
            outer: "bg-[#055579]",
          },
        },
      ]}
    />
  );
};

export default OurSponsors;
