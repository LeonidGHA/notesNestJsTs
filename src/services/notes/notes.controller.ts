import { NotesService } from './notes.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddNoteDto } from './notes.dto/add-note.dto';
import { UpdateNoteDto } from './notes.dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }

  @Post()
  addNote(@Body() dto: AddNoteDto) {
    return this.notesService.addNote(dto);
  }

  @Get('stats')
  getStatsNotes() {
    return this.notesService.getStatsNotes();
  }

  @Get(':id')
  getNoteById(@Param('id') id: string) {
    return this.notesService.getNoteById(id);
  }

  @Patch(':id')
  changeNoteById(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.changeNoteById(id, dto);
  }

  @Patch('archive/:id')
  async changeNoteArchiveById(@Param('id') id: string) {
    return this.notesService.changeNoteArchiveById(id);
  }

  @Delete(':id')
  deleteNoteById(@Param('id') id: string) {
    return this.notesService.deleteNoteById(id);
  }
}
