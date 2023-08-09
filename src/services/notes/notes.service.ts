import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AddNoteDto } from './notes.dto/add-note.dto';
import { UpdateNoteDto } from './notes.dto/update-note.dto';

import { dateRegex } from 'src/utils/regex-expressions';

import { IStatsNotes } from './interface/note.interface';
import { NotesModel } from './models/notes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel) private notesRepository: typeof NotesModel,
  ) {}

  async getAllNotes() {
    const allNotes = this.notesRepository.findAll();
    return allNotes;
  }

  async addNote(dto: AddNoteDto) {
    const datesParse = dto.content.match(dateRegex);

    const newNote = {
      ...dto,
      id: uuidv4(),
      dates: datesParse ? datesParse.join(', ') : '',
      archive: false,
    };

    await this.notesRepository.create(newNote);

    return newNote;
  }

  async getStatsNotes() {
    const allNotes = await this.getAllNotes();
    const statsNotes = allNotes.reduce((acc: IStatsNotes[], note) => {
      const indexSummaryNote = acc.findIndex(
        (el) => el.category === note.category,
      );

      if (indexSummaryNote === -1) {
        if (note.archive) {
          acc.push({ category: note.category, active: 0, archive: 1 });
          return acc;
        }
        acc.push({ category: note.category, active: 1, archive: 0 });
        return acc;
      }

      if (note.archive) {
        acc[indexSummaryNote].archive += 1;
        return acc;
      }
      acc[indexSummaryNote].active += 1;
      return acc;
    }, []);

    return statsNotes;
  }

  async getNoteById(id: string) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async changeNoteById(id: string, dto: UpdateNoteDto) {
    const note = await this.getNoteById(id);

    if (!note) {
      throw new NotFoundException('Note not found');
    }
    const datesParse = dto.content.match(dateRegex);

    note.category = dto.category;
    note.content = dto.content;
    note.name = dto.name;
    if (datesParse) {
      note.dates = datesParse.join(', ');
    }
    await note.save();

    return note;
  }

  async changeNoteArchiveById(id: string) {
    const note = await this.getNoteById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.archive = !note.archive;

    await note.save();

    return note;
  }

  async deleteNoteById(id: string) {
    const note = await this.getNoteById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.destroy({ where: { id } });

    return note;
  }
}
