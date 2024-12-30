import { ENV_CONFIG } from '../../config';

import { promises as fs } from 'fs';
import path from 'path';

export async function getItemsData() {
  const environment = ENV_CONFIG.TEST_ENVIRONMENT;
  const filePath = path.resolve(
    __dirname,
    `../fixtures/items.${environment}.json`
  );
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
