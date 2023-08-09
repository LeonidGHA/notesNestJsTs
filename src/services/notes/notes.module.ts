import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesModel } from './models/notes.model';

@Module({
  imports: [SequelizeModule.forFeature([NotesModel])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
