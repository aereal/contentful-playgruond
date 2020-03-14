import { createClient } from "contentful";
import { IWorkFields } from "./@types/@aereal/portfolio";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
  environment: "master",
});

(async () => {
  try {
    const entries = await client.getEntries<IWorkFields>();
    if (entries.errors && entries.errors?.length > 0) {
      for (const err of entries.errors) {
        console.error(`! error: ${err}`);
      }
      return;
    }
    for (const item of entries.items) {
      console.log(`item = ${JSON.stringify(item)}`);
    }
  } catch (e) {
    console.error(e);
  }
})();
