import { Injectable } from '@nestjs/common';
import { ConfigService, Path, PathValue } from '@nestjs/config';
import { GlobalConfig } from './configuration';

@Injectable()
export class GlobalConfigService extends ConfigService<GlobalConfig, true> {
  get<P extends Path<T>, T = GlobalConfig>(arg: P): PathValue<T, P> {
    return super.get<T, P, PathValue<T, P>>(arg, { infer: true });
  }
}
