import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent { }
