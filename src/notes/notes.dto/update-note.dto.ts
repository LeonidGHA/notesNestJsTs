import { IsNotEmpty, IsString, Contains } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Contains('Task' || 'Idea' || 'Random Thought', {
    message: 'category incorrect',
  })
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
