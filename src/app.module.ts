import { Module } from '@nestjs/common';

import { TypeSequelizeModule } from './db/typesequelizeconfig';
import { NotesModule } from './services/notes/notes.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [NotesModule, ConfigModule, TypeSequelizeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
