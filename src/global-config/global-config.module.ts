import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateGlobalConfig } from './configuration';
import { GlobalConfigService } from './global-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [generateGlobalConfig],
    }),
  ],
  providers: [GlobalConfigService],
  exports: [GlobalConfigService],
})
export class GlobalConfigModule {}
