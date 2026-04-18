import { getPlaiceholder } from 'plaiceholder';

export async function getImageBlurHash(src: string): Promise<string | undefined> {
  try {
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    console.error(`Error generating blurhash for image ${src}:`, error);
    return undefined;
  }
}
