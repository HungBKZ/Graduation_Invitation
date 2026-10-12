import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/i/", "/manage-pth-x7k29m", "/admin"],
    },
  };
}
