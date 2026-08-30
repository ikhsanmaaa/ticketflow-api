import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { PortalTokenModule } from './modules/portal-token/portal-token.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './core/database/prisma/prisma.module';
import { PrismaService } from './core/database/prisma/prisma.service';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CryptoService } from './core/crypto/crypto.service';
import { JsmModule } from './core/jsm/jsm.module';
import { MailService } from './core/mail/mail.service';
import { SchedulerModule } from './modules/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DashboardModule,
    JsmModule,
    PortalTokenModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    TicketsModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [PrismaService, CryptoService, MailService],
})
export class AppModule {}
