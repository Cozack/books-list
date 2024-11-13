import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-zero-screen',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './zero-screen.component.html',
  styleUrls: ['./zero-screen.component.scss'],
})
export class ZeroScreenComponent {
  @Input() text: string | undefined;
}
