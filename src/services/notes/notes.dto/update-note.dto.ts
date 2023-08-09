import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['Task', 'Idea', 'Random Thought'], {
    message: 'category incorrect',
  })
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
