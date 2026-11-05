import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "iFLOW - Digital Lending Infrastructure",
    short_name: "iFLOW",
    description: "iFLOW provides seamless digital lending infrastructure for Banks, NBFCs, and E-commerce.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0A2D5F",
    icons: [
      {
        src: "/favicon.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
