import GenericSection from "./sections/GenericSection";
import BNPLIndustryCardsSection from "./sections/BNPLIndustryCardsSection";
import ConnectedApiPlatformSection from "./sections/ConnectedApiPlatformSection";
import MsmeProductUseCasesSection from "./sections/MsmeProductUseCasesSection";
import BreBuiltForTeamsSection from "./sections/BreBuiltForTeamsSection";
import ApiSecurityGovernanceSection from "./sections/ApiSecurityGovernanceSection";
import FieldCommandCentreSection from "./sections/FieldCommandCentreSection";

// Mapping of Strapi component types to layout configurations
const layoutConfig: Record<string, { 
  layout: "grid" | "stats" | "tabs" | "hexagon-tabs" | "three-column" | "bicri" | "showcase" | "faq" | "modern-cards" | "architecture" | "workflow" | "customer-success" | "data-ecosystem";
  bgColor?: string;
  textColor?: string;
}> = {
  "solution.data-ecosystem": {
    layout: "data-ecosystem",
    bgColor: "bg-[#f8f7fd]",
  },
  "solution.integrations-ecosystem": {
    layout: "data-ecosystem",
    bgColor: "bg-[#f8f7fd]",
  },
  "solution.customer-success": {
    layout: "customer-success",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  "sections.success-stats": { 
    layout: "stats",
    bgColor: "bg-white",
  },
  "solution.success-stats": { 
    layout: "stats",
    bgColor: "bg-white",
  },
  "sections.partnership-models": { 
    layout: "tabs",
    bgColor: "bg-gradient-to-br from-[#1d0b38] via-[#2d0f48] to-[#160626]",
    textColor: "text-white",
  },
  "solution.partnership-models": { 
    layout: "tabs",
    bgColor: "bg-gradient-to-br from-[#1d0b38] via-[#2d0f48] to-[#160626]",
    textColor: "text-white",
  },
  "solution.partnership-model": { 
    layout: "tabs",
    bgColor: "bg-gradient-to-br from-[#1d0b38] via-[#2d0f48] to-[#160626]",
    textColor: "text-white",
  },
  "sections.feature-showcase": { 
    layout: "showcase",
    bgColor: "bg-white",
  },
  "solution.feature-section": {
    layout: "showcase",
    bgColor: "bg-white",
  },
  "solution.bicri-features": { 
    layout: "bicri",
    bgColor: "bg-gray-50",
  },
  "solution.collection-cards": { 
    layout: "grid",
    bgColor: "bg-[#f4f7fa]",
  },
  "solution.bnpl-workflow-section": { 
    layout: "three-column",
    bgColor: "bg-white",
    textColor: "text-gray-900",
  },
  "solution.architecture-section": {
    layout: "architecture",
    bgColor: "bg-white",
  },
  "solution.workflow-section": {
    layout: "workflow",
    bgColor: "bg-white",
  },
  "shared.faq-section": {
    layout: "faq",
    bgColor: "bg-gray-50",
    textColor: "text-gray-900",
  },
};

export default function SectionRenderer({ section, solution, solutionSlug, index = 0 }: any) {
  if (
    section.__component === "solution.security-governance" ||
    String(section.title || "").toLowerCase().includes("security and control") ||
    String(section.badge || "").toLowerCase().includes("security & governance")
  ) {
    return <ApiSecurityGovernanceSection data={section} />;
  }

  if (
    section.__component === "solution.field-command-centre" ||
    String(section.title || "").toLowerCase().includes("every team, territory") ||
    String(section.badge || "").toLowerCase().includes("field command")
  ) {
    return <FieldCommandCentreSection data={section} />;
  }

  let config = layoutConfig[section.__component];

  // Fallback: Infer layout type from data structure if component type not mapped
  if (!config) {
    if (section.stats && section.stats.length > 0) {
      config = { layout: "stats", bgColor: "bg-white" };
    } else if ((section.models && section.models.length > 0) || (section.model && section.model.length > 0)) {
      config = { layout: "tabs", bgColor: "bg-[purple]", textColor: "text-white" };
    } else if (section.features && section.image) {
      config = { layout: "showcase", bgColor: "bg-white" };
    } else if (section.left_features && section.right_features) {
      config = { layout: "three-column", bgColor: "bg-[purple]", textColor: "text-white" };
    } else if (section.cards && section.cards.length > 0) {
      const hasBicriStyle = section.cards[0]?.image;
      config = { 
        layout: hasBicriStyle && section.cards.length <= 4 ? "bicri" : "grid", 
        bgColor: hasBicriStyle ? "bg-gray-50" : "bg-white" 
      };
    } else {
      config = { layout: "grid", bgColor: "bg-white" };
    }
  }

  // Integrations & Data Ecosystem architecture layout detection
  const titleText = String(section.title || "").toLowerCase();
  const badgeText = String(section.badge || "").toLowerCase();
  const isDataEcosystem =
    solutionSlug !== "bnpl-product-suite" &&
    (section.__component === "solution.data-ecosystem" ||
      section.__component === "solution.integrations-ecosystem" ||
      titleText.includes("assessment workflow") ||
      titleText.includes("relevant business data") ||
      badgeText.includes("integrations & data ecosystem") ||
      (solutionSlug === "bicri" && section.__component === "solution.bnpl-workflow-section"));

  if (isDataEcosystem) {
    config = { layout: "data-ecosystem", bgColor: "bg-[#f8f7fd]" };
  }

  // Distribution solution uses hexagon-tabs design for partnership models
  if (
    solutionSlug === "distribution" &&
    config.layout === "tabs"
  ) {
    config = { ...config, layout: "hexagon-tabs" };
  }

  // Pool Buyout uses modern-cards layout for bicri sections
  if (
    (solutionSlug === "pool-buyout" && config.layout === "bicri") ||
    (solutionSlug === "dsa" && section.title && String(section.title).toUpperCase().includes("INDUSTRY SPECIFIC"))
  ) {
    config = { ...config, layout: "modern-cards" };
  }

  // Determine if we should use icon style for CollectionCards
  const useIconStyle = section.__component === "solution.collection-cards" && 
    (String(section.title || "").toLowerCase().includes("collection") || 
     solutionSlug === "loan-management-lms" || 
     solutionSlug === "loan-origination-los" ||
     solutionSlug === "ai-intelligent-suite" ||
      solutionSlug === "ai-ml-score-models" ||
     solutionSlug === "co-lending");

  if (solutionSlug === "co-lending" && section.__component === "solution.collection-cards") {
    config = { ...config, bgColor: "bg-[#f4f7fa]" };
  }

  if ((solutionSlug === "collection" || solution?.slug === "collection") && (section.__component === "solution.collection-cards" || String(section.title || "").includes("Comprehensive solutions")) && !section.badge) {
    section = { ...section, badge: "COLLECTION & RECOVERY MODULES" };
  }

  // Determine alternating background for showcase sections
  if (config.layout === "showcase" || section.__component === "sections.feature-showcase") {
    config = { ...config, bgColor: index % 2 === 0 ? "bg-transparent" : "bg-white/40" };
  }

  // Remove Customer Success section for Pool Buyout
  if (
    solutionSlug === "pool-buyout" &&
    (section.__component === "solution.customer-success" ||
      config?.layout === "customer-success" ||
      String(section.title || "").toLowerCase().includes("customer success") ||
      String(section.badge || "").toLowerCase().includes("customer success"))
  ) {
    return null;
  }

  // Remove only AI Based BRE for AI Intelligent Suite
  if (
    (solutionSlug === "ai-intelligent-suite" || solutionSlug === "ai-ml-score-models") &&
    String(section.title || "").toLowerCase().includes("ai based bre")
  ) {
    return null;
  }

  // Remove Build onboarding paths section for Loan Origination LOS
  if (
    solutionSlug === "loan-origination-los" &&
    String(section.title || "").toLowerCase().includes("build onboarding paths")
  ) {
    return null;
  }

  // BNPL Product Suite: Combine "Industry use cases" feature sections into a 6-card grid
  if (solutionSlug === "bnpl-product-suite" && section.__component === "solution.feature-section") {
    const isIndustryTitle = String(section.title || "").toLowerCase().includes("diverse business");
    const isIndustryBadge = String(section.badge || "").toLowerCase().includes("industry");
    const isIndustryItem =
      isIndustryTitle ||
      isIndustryBadge ||
      (!section.title && !section.badge && section.features && section.image);

    if (isIndustryItem) {
      const allIndustrySections = (solution?.sections || []).filter((s: any) =>
        s.__component === "solution.feature-section" &&
        (String(s.badge || "").toLowerCase().includes("industry") ||
         String(s.title || "").toLowerCase().includes("diverse business") ||
         (!s.badge && !s.title && s.features && s.image))
      );

      const firstSec = allIndustrySections[0];
      const isFirst =
        !firstSec ||
        section === firstSec ||
        (firstSec?.id && section.id === firstSec.id);

      if (isFirst) {
        return (
          <BNPLIndustryCardsSection
            mainSection={firstSec || section}
            allSections={allIndustrySections.length > 0 ? allIndustrySections : [section]}
          />
        );
      } else {
        return null;
      }
    }
  }

  // On-Boarding Journey & API Services: Combine "Connected Solutions in One Intelligent Platform" showcase into A Connected Origination Layer layout
  if ((solutionSlug === "on-boarding-journey" || solutionSlug === "api-services") && section.__component === "solution.feature-section") {
    const allFeatureSections = (solution?.sections || []).filter(
      (s: any) => s.__component === "solution.feature-section"
    );

    const firstSec = allFeatureSections[0];
    const isFirst =
      !firstSec ||
      section === firstSec ||
      (firstSec?.id && section.id === firstSec.id);

    if (isFirst) {
      return (
        <ConnectedApiPlatformSection
          allSections={allFeatureSections.length > 0 ? allFeatureSections : [section]}
          solution={solution}
        />
      );
    } else {
      return null;
    }
  }

  // MSME and Agri Tech On-Boarding Journeys: Revamp "PRODUCT USE CASES" into alternating showcase pillars like LOS Connected Origination Layer
  const isMsmeSolution =
    solutionSlug === "msme-and-agri-tech-on-boarding-journeys" ||
    solution?.slug === "msme-and-agri-tech-on-boarding-journeys";

  if (isMsmeSolution && section.__component === "solution.feature-section") {
    const isUseCaseItem =
      String(section.badge || "").toUpperCase().includes("PRODUCT USE CASES") ||
      String(section.title || "").toLowerCase().includes("across lending products") ||
      String(section.features || "").toLowerCase().includes("msme lending") ||
      String(section.features || "").toLowerCase().includes("agricultural lending") ||
      String(section.features || "").toLowerCase().includes("personal loans") ||
      String(section.features || "").toLowerCase().includes("business loans") ||
      String(section.features || "").toLowerCase().includes("home loans") ||
      String(section.features || "").toLowerCase().includes("loan against property") ||
      String(section.features || "").toLowerCase().includes("vehicle financing") ||
      String(section.features || "").toLowerCase().includes("education loans");

    if (isUseCaseItem) {
      const allUseCaseSections = (solution?.sections || []).filter(
        (s: any) =>
          s.__component === "solution.feature-section" &&
          (String(s.badge || "").toUpperCase().includes("PRODUCT USE CASES") ||
            String(s.title || "").toLowerCase().includes("across lending products") ||
            String(s.features || "").toLowerCase().includes("msme lending") ||
            String(s.features || "").toLowerCase().includes("agricultural lending") ||
            String(s.features || "").toLowerCase().includes("personal loans") ||
            String(s.features || "").toLowerCase().includes("business loans") ||
            String(s.features || "").toLowerCase().includes("home loans") ||
            String(s.features || "").toLowerCase().includes("loan against property") ||
            String(s.features || "").toLowerCase().includes("vehicle financing") ||
            String(s.features || "").toLowerCase().includes("education loans"))
      );

      const firstSec = allUseCaseSections[0];
      const isFirst =
        !firstSec ||
        section === firstSec ||
        (firstSec?.id && section.id === firstSec.id);

      if (isFirst) {
        return (
          <MsmeProductUseCasesSection
            allSections={allUseCaseSections.length > 0 ? allUseCaseSections : [section]}
            solution={solution}
          />
        );
      } else {
        return null;
      }
    }
  }

  // AI Based BRE: Revamp "BUILT FOR LENDING TEAMS" into 3-column cards grid matching Co-Lending "Why Co-Lending Matters"
  const isAiBreSolution =
    solutionSlug === "ai-based-bre" ||
    solution?.slug === "ai-based-bre" ||
    solutionSlug === "bre" ||
    solutionSlug === "business-rules-engine";

  if (isAiBreSolution && section.__component === "solution.feature-section") {
    const isBuiltForTeams =
      String(section.badge || "").toUpperCase().includes("BUILT FOR LENDING TEAMS") ||
      String(section.title || "").toLowerCase().includes("control and consistency") ||
      String(section.features || "").toLowerCase().includes("faster loan approvals") ||
      String(section.features || "").toLowerCase().includes("business-led configuration") ||
      String(section.features || "").toLowerCase().includes("standardised governance") ||
      String(section.features || "").toLowerCase().includes("explainable decisioning") ||
      String(section.features || "").toLowerCase().includes("ai-assisted analysis") ||
      String(section.features || "").toLowerCase().includes("integration-ready layer");

    if (isBuiltForTeams) {
      const allTeamSections = (solution?.sections || []).filter(
        (s: any) =>
          s.__component === "solution.feature-section" &&
          (String(s.badge || "").toUpperCase().includes("BUILT FOR LENDING TEAMS") ||
            String(s.title || "").toLowerCase().includes("control and consistency") ||
            String(s.features || "").toLowerCase().includes("faster loan approvals") ||
            String(s.features || "").toLowerCase().includes("business-led configuration") ||
            String(s.features || "").toLowerCase().includes("standardised governance") ||
            String(s.features || "").toLowerCase().includes("explainable decisioning") ||
            String(s.features || "").toLowerCase().includes("ai-assisted analysis") ||
            String(s.features || "").toLowerCase().includes("integration-ready layer"))
      );

      const firstSec = allTeamSections[0];
      const isFirst =
        !firstSec ||
        section === firstSec ||
        (firstSec?.id && section.id === firstSec.id);

      if (isFirst) {
        return (
          <BreBuiltForTeamsSection
            allSections={allTeamSections.length > 0 ? allTeamSections : [section]}
            solution={solution}
          />
        );
      } else {
        return null;
      }
    }
  }

  return (
    <GenericSection 
      data={section}
      layoutType={config.layout}
      bgColor={config.bgColor}
      textColor={config.textColor}
      useIconStyle={useIconStyle}
      index={index}
      solutionSlug={solutionSlug}
    />
  );
}
