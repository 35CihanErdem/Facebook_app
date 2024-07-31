import { Component, EventEmitter, Output ,Input} from '@angular/core';
import { Routes } from '@angular/router'; 
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() value: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

}
