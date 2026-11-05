"use client";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  twitter: string;
  bio: string;
  facePosition?: string;
};

const team: TeamMember[] = [
  {
    name: "Mr. Ajay Chaudhary",
    role: "Head Of Engineering",
    image: "/team/aj.jpeg",
    linkedin: "https://www.linkedin.com/in/ajay-chaudhary-3b10b616/",
    twitter: "",
    bio: "24+ years of technology leadership in architecting high-scale FinTech platforms, driving engineering excellence, digital transformation, and building resilient, secure enterprise architectures.",
    facePosition: "center 12%",
  },
  {
    name: "Mr. Aakash Yajnik",
    role: "VP, Strategic Alliances",
    image: "/team/akash.jpeg",
    linkedin: "https://www.linkedin.com/in/aakash-yajnik-a0617822b/",
    twitter: "",
    bio: "22+ years of leadership in Strategic Alliances, sales, & institutional relationship management with major brands including ICICI Home Finance, HDFC Bank, Airtel & Reliance",
    facePosition: "center 0%",
  },
  {
    name: "Mr. Deepak Prakash",
    role: "AVP, Project & Technology Delivery",
    image: "/team/deeepak.jpeg",
    linkedin: "https://www.linkedin.com/in/deepak-prakash-38371a110/",
    twitter: "https://x.com/deepakbihari2",
    bio: "10+ years of technical project management expertise, specializing in Agile methodologies, scrum delivery, and orchestrating cross-functional engineering teams.",
    facePosition: "center 0%",
  },
  {
    name: "Ms. Amita Chorghe",
    role: "AM, Sales & Marketing",
    image: "/team/amita.jpeg",
    linkedin: "https://www.linkedin.com/in/amitachorghe/",
    twitter: "https://x.com/amitachorghe",
    bio: "Dynamic business development and software sales specialist with a proven track record in client relations and driving technology adoption in the BFSI sector.",
    facePosition: "center 5%",
  },
];

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center relative w-[210px] group">
      {/* 3D Flip Container */}
      <div className="perspective-1000 w-[210px] h-[300px] cursor-pointer relative">
        <div
          className="w-full h-full preserve-3d relative card-inner"
          style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden z-20 flex flex-col items-center justify-start">
            {/* Profile Image — plain img for reliable face-position control */}
            <div
              className="w-[210px] h-[260px] flex-shrink-0 overflow-hidden rounded-3xl"
              style={{ position: "relative" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: member.facePosition ?? "center 10%",
                  display: "block",
                }}
              />
            </div>

            {/* White overlay name card */}
            <div className="bg-white rounded-tl-[10px] rounded-tr-[45px] rounded-br-[10px] rounded-bl-[10px] py-3.5 px-4 shadow-lg relative -mt-6 z-10 w-[92%] border border-gray-100">
              <h3 className="text-[11px] font-bold text-gray-900 mb-0.5 leading-tight">
                {member.name}
              </h3>
              <p className="text-[10px] text-gray-600 font-semibold">{member.role}</p>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 z-10 rounded-3xl bg-gradient-to-br from-[#623f99] to-[#8a57cf] p-4 text-white border border-[#a27ce3]/30 shadow-lg flex flex-col justify-center items-center text-center">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex flex-col items-center w-full">
              <h3 className="text-[12px] font-bold border-b border-white/20 pb-1.5 mb-2 w-full text-center tracking-wide">
                {member.name}
              </h3>
              <p className="text-[12px] leading-relaxed font-medium text-white/95 px-1 text-center">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-3 mt-4 relative z-20">
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
          <Image
            src="/hero/linkedin.svg"
            alt="LinkedIn"
            width={18}
            height={18}
            className="hover:scale-110 transition-transform duration-200"
          />
        </a>
        {member.twitter && (
          <a href={member.twitter} target="_blank" rel="noopener noreferrer">
            <Image
              src="/hero/x.svg"
              alt="X"
              width={18}
              height={18}
              className="hover:scale-110 transition-transform duration-200"
            />
          </a>
        )}
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  return (
    <section
      className="
        relative py-12 bg-cover bg-center bg-no-repeat
        bg-[url('/hero/team-mobile.png')]
        sm:bg-[url('/hero/team12.png')]
  ">
      {/* 3D Transform and Rotation Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .perspective-1000:hover .card-inner {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#7c3aed] uppercase mb-4 text-center">
          CORE TEAM
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight text-center mb-10 sm:mb-14">
          Core Team{" "}
          <span className="font-serif italic font-normal text-slate-900">
            Specialist.
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {team.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
