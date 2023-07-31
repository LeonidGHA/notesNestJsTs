import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { allNotes } from 'src/data/allNotes';

import { AddNoteDto } from './notes.dto/add-note.dto';
import { UpdateNoteDto } from './notes.dto/update-note.dto';

import { dateRegex } from 'src/utils/regex-expressions';
import { formatDateToYYYYMMDD } from 'src/helpers/formatDate';

import { INote, IStatsNotes } from './interface/note.interface';

@Injectable()
export class NotesService {
  private notes: INote[] = allNotes;

  getAllNotes() {
    return this.notes;
  }

  addNote(dto: AddNoteDto) {
    const datesParse = dto.content.match(dateRegex);

    const newNote = {
      ...dto,
      created: formatDateToYYYYMMDD(new Date()),
      id: uuidv4(),
      dates: datesParse ? datesParse.join(', ') : '',
      archive: false,
    };

    this.notes.push(newNote);

    return newNote;
  }

  getStatsNotes() {
    const statsNotes = this.notes.reduce((acc: IStatsNotes[], note) => {
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

  getNoteById(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  changeNoteById(id: string, dto: UpdateNoteDto) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.category = dto.category;
    note.content = dto.content;
    note.name = dto.name;

    return note;
  }

  changeNoteArchiveById(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.archive = !note.archive;

    return note;
  }

  deleteNoteById(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    this.notes = this.notes.filter((note) => note.id !== id);

    return note;
  }
}
