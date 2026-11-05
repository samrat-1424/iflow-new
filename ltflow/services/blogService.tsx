// services/blogService.js
export const fetchBlogPosts = async ({
  page = 1,
  pageSize = 10
} = {}) => {
  const url_lms = process.env.NEXT_PUBLIC_STRAPI_URL;
  const cmsToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  try {
    const url = `${url_lms}/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published_on:desc&populate=*`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });


    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      blogs: data.data,
      pagination: data.meta?.pagination || {},
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error; // Let caller handle error
  }
};

export const fetchBlogPost = async (slug: string) => {
  const cmsToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  try {
    const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    const response = await fetch(
      `${baseUrl}/blogs?filters[slug][$eqi]=${slug}&populate=*`,
      
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error(error);
  }
};
