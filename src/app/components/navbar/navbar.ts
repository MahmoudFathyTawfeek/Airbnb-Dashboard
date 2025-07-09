import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Authintication } from '../../service/authintication';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  userLogedInNav: boolean = false;
  isDarkMode: boolean = true; // الوضع الافتراضي دارك

  constructor(private userAuth: Authintication, private renderer: Renderer2) {
    this.userAuth.userloggedmethod().subscribe((data) => {
      this.userLogedInNav = data;
    });

    this.setTheme(this.isDarkMode);
  }


  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme(this.isDarkMode);
  }

  private setTheme(isDark: boolean) {
    if (isDark) {
      this.renderer.addClass(document.body, 'bg-dark');
      this.renderer.removeClass(document.body, 'bg-light');

      this.renderer.addClass(document.body, 'text-light');
      this.renderer.removeClass(document.body, 'text-dark');
    } else {
      this.renderer.addClass(document.body, 'bg-light');
      this.renderer.removeClass(document.body, 'bg-dark');

      this.renderer.addClass(document.body, 'text-dark');
      this.renderer.removeClass(document.body, 'text-light');
    }

  }
}
