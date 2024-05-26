import { createClient } from 'contentful';
import { Video } from '../types/types';





const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: "Z4epgBZ64tsnysBx5NVlwZdaqBwoRT3b4YzpzqE90Lw"
});

export async function fetchEntries() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
 
}

export async function fetchEntryById(id : any) {
  const entry = await client.getEntry(id);
  return entry;
}