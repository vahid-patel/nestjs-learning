import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  config  from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config(); // Load environment variables

@Module({  

  imports: [AuthModule, 
    MongooseModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : async (config) => ({
        uri : config.get('database.connectionString')
      }),
      inject : [ConfigService]
    }),
    JwtModule.registerAsync({
      
      imports : [ConfigModule],
      useFactory : async (config) =>({
        secret : config.get('jwt.secret')
      }),
      global : true,
      inject :[ConfigService]
    }),

    ConfigModule.forRoot({
      isGlobal : true,
      cache : true,
      load : [config]
    })
  ],

  controllers: [AppController], 
  providers : [AppService]
})
export class AppModule {}
