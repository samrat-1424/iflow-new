import Image from 'next/image'
import { StrapiImage } from "@/model/card";

export function BackgroundImage({imgUrl, imgAlt}: {imgUrl: string, imgAlt?: string}) {
  return (
    <Image
      alt={imgAlt? imgAlt: "Arsha Vidya Mandir"}
      src={imgUrl}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover', objectPosition: '50% 50%'
      }}
    />

  );
}

async function fetchBlur(image: StrapiImage | null) {
  if (image?.formats?.thumbnail?.url) {
    const base64 = await getBase64(image.formats.thumbnail.url);
    return (base64);
  }
}

export async function BackgroundImage2({image}:{image: StrapiImage | null}) {
  const blurDataURL =  await fetchBlur(image);
  return (
    <Image
      alt={"Arsha Vidya Mandir"}
      src={image?.url || ""}
      fill
      sizes="100vw"
      className="object-cover object-center"
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

async function getBase64(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}