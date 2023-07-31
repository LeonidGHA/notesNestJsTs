import { Module } from '@nestjs/common';

import { NotesModule } from './services/notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
