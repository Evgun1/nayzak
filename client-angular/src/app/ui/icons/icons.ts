import { Component, Input } from '@angular/core';
import IconsIdList from './IconsIdList';

@Component({
    selector: 'app-icons',
    standalone: true,
    templateUrl: './icons.html',
    imports: [],
    styleUrl: './icons.scss',
})
export class Icons {
    @Input() icon!: keyof typeof IconsIdList;

    get iconId() {
        return IconsIdList[this.icon];
    }
}
