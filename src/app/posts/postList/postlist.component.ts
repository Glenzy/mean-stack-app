import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-postlist',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {
    title: String;
    @Input() posts = [];
    constructor() { }
    ngOnInit() {
        this.title = "Post List Component";
    }
}
