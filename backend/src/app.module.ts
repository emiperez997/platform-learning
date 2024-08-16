import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TeacherModule } from "./teacher/teacher.module";

import { CourseModule } from "./course/course.module";
import { InscriptionModule } from "./inscription/inscription.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    InscriptionModule,
    AuthModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
