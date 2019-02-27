import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { IPost } from '../shared/interfaces';
@Injectable()
export class ToggleCreatePostsFormService {
    formIsActive: boolean;
    constructor(private http: HttpClient) {
        this.formIsActive = false;
    }
    @Output() activeForm: EventEmitter<boolean> = new EventEmitter();
    @Output() editFormData: EventEmitter<boolean> = new EventEmitter();
    toggleCreatePostsForm() {
        this.formIsActive = !this.formIsActive;
        this.activeForm.emit(this.formIsActive);
    }
    getPost(id: string) {
        return this.http.get<IPost>('http://localhost:3030/api/posts/' + id).subscribe((postData: any) => {
            const formData = postData.post;
            this.editFormData.emit(formData);
        });
    }
}
