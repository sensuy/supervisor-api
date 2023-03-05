import { registerAs } from '@nestjs/config';
import { SERVER_CONFIG } from 'src/shared/constants';
import { ServerConfigInterface } from '../shared/interfaces';

export const serverConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: process.env?.NODE_ENV ?? 'development',
    port: 
      process.env.PORT ? Number(process.env.PORT) : 3000,
  })
);