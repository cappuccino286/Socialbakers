import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-logo-renderer',
    template: `<a [href]="imgForLogo" target="_blank">{{brandName}}</a>`,
    styleUrls: ['./brand-name-renderer.component.css']
})
export class BrandNameRendererComponent implements ICellRendererAngularComp {
    private params: any;
    brandName: string;
    public imgForLogo: string;

    agInit(params: any): void {
        this.params = params;
        this.setBrandName(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setBrandName(params);
        return true;
    }

    private setBrandName(params) {
        this.brandName = params.value;
        this.imgForLogo = this.brandName;
    }
}
