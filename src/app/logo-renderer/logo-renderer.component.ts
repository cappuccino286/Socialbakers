import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-logo-renderer',
    template: `<img class='logo-img' [src]="imgForLogo"/>`,
    styleUrls: ['./logo-renderer.component.css']
})
export class LogoRendererComponent implements ICellRendererAngularComp {
    private params: any;
    private logo: string;
    public imgForLogo: string;

    agInit(params: any): void {
        this.params = params;
        this.setLogo(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setLogo(params);
        return true;
    }

    private setLogo(params) {
        this.logo = params.value;
        this.imgForLogo = this.logo;
    }
}
