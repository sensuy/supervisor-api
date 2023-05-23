import { Global, Module } from "@nestjs/common";
import { BcryptService } from "./hash/services/bcrypt.service";
import { HASH_PROVIDER } from "@shared/constants";

@Global()
@Module({
  providers: [
    {
      provide: HASH_PROVIDER,
      useClass: BcryptService
    },
  ],
})
export class ProviderModule { }