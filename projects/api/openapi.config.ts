// openapi.config.ts
import { GeneratorConfig } from 'ng-openapi';

export default {
  input: './swagger.json',
  output: './src/lib',
  clientName: 'SpammerinoApi',
  options: {
    dateType: 'Date',
    enumStyle: 'enum',
  },
} as GeneratorConfig;
