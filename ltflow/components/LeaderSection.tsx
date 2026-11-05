import Image from "next/image";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

const LeaderSection: React.FC = () => {
  return (
    <section
      className="w-full rounded-[20px] md:rounded-[40px] overflow-hidden relative text-white mt-8 md:mt-12 shadow-xl shadow-purple-950/10"
      style={{
        backgroundImage: "url('/hero/Leader-light.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lightening overlays for a softer, brighter appearance */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-purple-800/15 to-[#9a3f91]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-white/[0.10] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 pt-8 md:pt-12 relative z-10">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 md:pr-8 md:pl-0 md:ml-auto md:mr-8">
          <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#f472b6] uppercase mb-3">
            LEADERSHIP
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Meet Our{" "}
            <span className="font-serif italic font-normal text-purple-200">
              Leader.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed mb-4 md:mb-6">
            As a LendTech solution provider, we bridge the gap between
            innovation and financial growth, empowering banks and NBFCs in India
            to embrace digital transformation seamlessly. Together, we drive
            inclusion, efficiency and a future-ready financial ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start text-[#f36d33] font-medium text-xs sm:text-sm space-y-2 sm:space-y-0 sm:space-x-3">
            <span className="text-center md:text-left">- GAUTAM SINHA, CEO - iFLOW</span>
            <div className="flex space-x-3 text-white">
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f36d33] p-2 rounded-md"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f36d33] p-2 rounded-md"
              >
                <FaTwitter size={14} />
              </a> */}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative z-10 flex items-center justify-center min-h-[300px] md:min-h-[400px] mt-6 md:mt-0">
          <Image
            src="/hero/GautamSirNew.svg"
            alt="CEO Gautam Sinha"
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Optional background pattern on the right side */}
      {/* <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-tr from-transparent to-[#162a72] z-0" /> */}
    </section>
  );
};

export default LeaderSection;
