import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.css'
})
export class BtnComponent {
  @Input() label: string = ''; 
  @Output() buton = new EventEmitter<void>();

  onClick() {
    this.buton.emit();
  }

  

}
