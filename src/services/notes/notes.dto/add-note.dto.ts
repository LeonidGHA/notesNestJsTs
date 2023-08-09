import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class AddNoteDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsIn(['Task', 'Idea', 'Random Thought'], {
    message: 'category incorrect',
  })
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
