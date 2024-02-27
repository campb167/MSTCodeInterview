import { Component, Input } from "@angular/core";

@Component({
    template: ''
})

export class UseMSTSorting {

    @Input() order: 'asc' | 'desc' | undefined = undefined;
    @Input() orderBy: string = ''
    
    constructor() {

    }
}
