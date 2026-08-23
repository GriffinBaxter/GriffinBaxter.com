const APP_ID = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;

export const uploadThingUrl = (file: string): string =>
  APP_ID ? `https://${APP_ID}.ufs.sh/f/${file}` : "";
