import { Component, OnInit } from '@angular/core';

import { ToggleCreatePostsFormService } from '../services/toggle-create-posts.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    constructor(public toggleCreatePostsFormService: ToggleCreatePostsFormService) { }
    ngOnInit() { }
    toggleCreatePostsForm() {
        this.toggleCreatePostsFormService.toggleCreatePostsForm('noId');
    }
}