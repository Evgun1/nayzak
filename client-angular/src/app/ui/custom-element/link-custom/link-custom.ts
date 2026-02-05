import { Component, Input } from '@angular/core';
import { NgClass } from '../../../../../node_modules/@angular/common/types/_common_module-chunk';
import { StyleSettingsType } from '../theme/style-settings.type';
import { StyleSettings } from '../theme/style-settings';

@Component({
    selector: 'app-link-custom',
    imports: [NgClass],
    templateUrl: './link-custom.html',
    styleUrl: './link-custom.scss',
})
export class LinkCustom {
    @Input() styleSettings: StyleSettingsType = {};

    constructor(private readonly styleSettingsService: StyleSettings) {}

    get styleSettingsClass() {
        return this.styleSettingsService.generateClasses(this.styleSettings);
    }
}
