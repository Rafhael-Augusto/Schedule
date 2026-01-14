import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scheduler Plus",
    short_name: "Scheduler +",
    description: "Agendamentos fixos e diários em um só lugar",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/vercel.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/vercel.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
