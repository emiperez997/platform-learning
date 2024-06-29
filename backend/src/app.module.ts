import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AuthResolver } from './auth/auth.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AdminModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    InscriptionModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthResolver],
})
export class AppModule {}
