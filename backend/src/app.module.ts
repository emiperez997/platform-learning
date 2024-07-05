import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TeacherModule } from "./teacher/teacher.module";
import { AdminModule } from "./admin/admin.module";
import { CourseModule } from "./course/course.module";
import { InscriptionModule } from "./inscription/inscription.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    AdminModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    InscriptionModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
