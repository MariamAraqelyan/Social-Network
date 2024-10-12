import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../helpers/directies/dnd.directive';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  preview = signal<string>('');

  avatar = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.proccessFile(file!)
 
  }

  onFileDroped(file: File) {
    this.proccessFile(file);
  }

  proccessFile(file: File | null) {
    if(!file || !file.type.match('image')) return
    
    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
  }
}
