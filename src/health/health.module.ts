import { Module } from '@nestjs/common';
import { PartnerAuthModule } from '../partner-auth/partner-auth.module';
import { HealthController } from './health.controller';

@Module({
  // PrismaModule là @Global nên PrismaService có sẵn. PartnerAuthModule
  // export RedisService để health controller dùng lại đúng kết nối Redis.
  imports: [PartnerAuthModule],
  controllers: [HealthController],
})
export class HealthModule {}
