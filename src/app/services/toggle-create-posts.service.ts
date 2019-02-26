import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ToggleCreatePostsFormService {
    formIsActive: boolean;
    constructor() {
        this.formIsActive = false;
    }
    @Output() change: EventEmitter<boolean> = new EventEmitter();
    toggleCreatePostsForm() {
        this.formIsActive = !this.formIsActive;
        this.change.emit(this.formIsActive);
    }
}
