import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from 'src/config.module';
import { NotesModel } from 'src/services/notes/models/notes.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [NotesModel],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class TypeSequelizeModule {}
