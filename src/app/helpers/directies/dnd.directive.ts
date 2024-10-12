import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {

  @Output() fileDrop = new EventEmitter<File>()

  @HostBinding('class.fileover')
  fileover = false

  @HostListener('dragover', ['$event'])
  onDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = true

  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false
    
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false

    this.fileDrop.emit(event.dataTransfer?.files[0])
  }
}
