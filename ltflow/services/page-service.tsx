import { Section } from "@/model/card";
export const fetchWebPage = async (webPageSlug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/web-pages?filters[slug][$eqi]=${webPageSlug}&populate[sections][populate][cards][populate]=image`,
      {
        // headers: {
        //   Authorization: `Bearer ${cmsToken}`,
        // },
        // cache: "force-cache",
      }
    );

    if (!response.ok) {
      // console.log(response)
      throw new Error("Failed to fetch page data");
    }
    const data = await response.json();
    return data.data[0];
  } catch (e) {
    console.error(e);
  }
};

export function findByIdentifier(
  items: Section[],
  identifier: string
): Section | undefined {
  return items.find((item) => item.identifier === identifier);
}
