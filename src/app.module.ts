import { Module } from '@nestjs/common';

import { TypeOrmModule } from './db/typeorm.config';
import { NotesModule } from './services/notes/notes.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [NotesModule, ConfigModule, TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
