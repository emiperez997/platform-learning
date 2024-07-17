import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './common/services/theme/theme.service';
import { MainModule } from './pages/main/main.module';
import { AuthModule } from './pages/auth/auth.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainModule, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ThemeService],
})
export class AppComponent implements OnInit {
  title = 'Platform Learning';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const theme = this.themeService.getTheme();

    if (theme === 'dark' || theme === 'light') {
      this.themeService.setTheme(theme);
      return;
    }

    this.themeService.setTheme('light');
  }
}
