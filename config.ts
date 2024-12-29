import dotenv from 'dotenv';

import { cleanEnv, num, str, bool } from 'envalid';

const TEST_ENVIRONMENT = process.env.TEST_ENVIRONMENT || 'dev';
dotenv.config({ path: `.env.${TEST_ENVIRONMENT}` });

export const ENV_CONFIG = cleanEnv(process.env, {
  TEST_ENVIRONMENT: str({
    default: 'dev',
    desc: 'Environment where the test will run. dev|prod',
  }),
  CLEAN_DATA: bool({
    default: false,
    desc: 'Clean env data after each execution. true|false',
  }),
});
