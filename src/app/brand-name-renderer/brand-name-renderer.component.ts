import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-logo-renderer',
    template: `<a [href]="urlFacebook" target="_blank">{{brandName}}</a>`,
    styleUrls: ['./brand-name-renderer.component.css']
})
export class BrandNameRendererComponent implements ICellRendererAngularComp {
    private params: any;
    brandName: string;
    public urlFacebook: string;

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
        this.urlFacebook = params.data.url_page;
    }
}
