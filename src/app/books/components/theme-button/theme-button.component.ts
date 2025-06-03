import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'theme-button',
  imports: [],
  templateUrl: './theme-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent {

  toggleTheme(): void {
    const html = document.querySelector('html');
    if (html) {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'cupcake' ? 'forest' : 'cupcake';
      html.setAttribute('data-theme', newTheme);
    }
  }
}
