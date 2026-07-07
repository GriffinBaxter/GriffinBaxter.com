export async function getRecord<T>(path: string): Promise<T> {
  const res = await fetch(
    `https://api.github.com/repos/GriffinBaxter/Records/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.RECORDS_REPO_TOKEN as string}`,
        Accept: "application/vnd.github.raw+json",
      },
      next: { revalidate: 24 * 60 * 60 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status.toString()}`);
  }

  return res.json() as Promise<T>;
}
