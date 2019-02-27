import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPost } from '../../shared/interfaces';
import { PostsService } from '../../services/posts.service'
import { ToggleCreatePostsFormService } from '../../services/toggle-create-posts.service'


@Component({
    selector: 'app-create-posts',
    templateUrl: './create-posts.component.html',
    styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
    title: String;
    formData: IPost;
    formIsActive: boolean;
    mode = 'create';
    form: FormGroup;

    constructor(
        public postsService: PostsService,
        public toggleCreatePostsFormService: ToggleCreatePostsFormService,
    ) {
        this.formData = {
            id: null,
            title: '',
            category: '',
            content: '',
            image: '',
            tag: ''
        };
        this.formIsActive = false;
    }
    ngOnInit() {
        this.form = new FormGroup({
            'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            'category': new FormControl(null, { validators: [Validators.required] }),
            'content': new FormControl(null, { validators: [Validators.required, Validators.minLength(25)] }),
            'image': new FormControl(null, {}),
            'tag': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
        })
        this.toggleCreatePostsFormService.activeForm.subscribe(formIsActive => {
            this.formIsActive = formIsActive;
        });

        this.toggleCreatePostsFormService.editFormData.subscribe(formData => {
            this.mode = 'edit';
            this.formData = formData;
            this.formData = {
                id: formData._id,
                title: formData.title,
                content: formData.content,
                tag: formData.tag,
                category: formData.category
            }
            console.log('this.formData', this.formData);
            this.form.setValue(this.formData);
        })
    }

    onCreatePost() {
        if (this.form.invalid) { return }

        this.formData.title = this.form.value.title;
        this.formData.category = this.form.value.category;
        this.formData.content = this.form.value.content;
        this.formData.tag = this.form.value.tag;

        if (this.mode === 'create') {
            this.postsService.addPost(this.formData);
        }

        if (this.mode === 'edit') {
            this.postsService.editPost(this.formData);
        }

        this.form.reset();
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
    toggleCreatePostsForm() {
        this.toggleCreatePostsFormService.toggleCreatePostsForm();
    }
}
