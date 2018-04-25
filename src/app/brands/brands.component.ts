import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { LogoRendererComponent } from '../logo-renderer/logo-renderer.component';
import { BrandNameRendererComponent } from '../brand-name-renderer/brand-name-renderer.component';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  private brands: Brand[] = [];
  private gridApi;
  private gridColumnApi;
  private gridOptions;
  private columnDefs;
  private country = 'france';
  constructor(private brandService: BrandService) {
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      rowSelection: 'single',
      rowHeight: 70,
    };
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'id', cellClass: 'cell-custom', width: 50 },
      { headerName: 'Logo', field: 'logo', cellRenderer: 'logoRenderer', suppressMenu: 'true', suppressSorting: 'true', width: 50 },
      { headerName: 'Name', field: 'name', cellRenderer: 'brandNameRenderer', cellClass: 'cell-custom' },
      { headerName: 'Fans', field: 'fans', cellClass: 'cell-custom', width: 100 },
      { headerName: '<i class="fab fa-facebook-square"></i>', field: 'url_page', cellRenderer: 'brandNameRenderer', cellClass: 'cell-custom' }
    ];
    this.gridOptions.frameworkComponents = {
      logoRenderer: LogoRendererComponent,
      brandNameRenderer: BrandNameRendererComponent
    };
    this.gridOptions.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }
  ngOnInit() {
  }
  runCrawler() {
    this.gridApi.showLoadingOverlay();
    this.brandService.runJob(this.country).subscribe(data => {
      const job_id = data.jobid;
      this.getInfoJob(job_id);
    });
  }
  getInfoJob(job_id) {
    this.brandService.getJob(job_id).subscribe(info => {
      const state = info.jobs[0].state;
      if (state === 'finished') {
        this.getBrands(job_id);
        return;
      } else {
        setTimeout(() => this.getInfoJob(job_id), 1000);
      }
    });
  }
  getBrands(job_id) {
    this.brands = [];
    this.brandService.getBrands(job_id).subscribe(
      brands => {
        brands.forEach(brand => {
          const logo = brand.images.length > 0 ? brand.image_urls : '';
          const row = {
            id: +brand.pos,
            logo: logo,
            name: brand.brand_name,
            fans: +brand.fans,
            url_page: brand.url_page
          };
          this.brands.push(row);
        });
        this.brands.sort(this.compare);
        this.gridApi.setRowData(this.brands);
      }
    );
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.gridApi.showLoadingOverlay();
    this.brandService.getInitJob().subscribe(data => {
      const jobFrance = data.jobs.find(job => job.spider_args.country === 'france');
      this.getInfoJob(jobFrance.id);
    });
  }
  compare(val1, val2) {
    const pos1 = val1.id;
    const pos2 = val2.id;
    if (pos1 > pos2) {
      return 1;
    }
    if (pos1 < pos2) {
      return -1;
    }
    return 0;
  }
  changeCountry(evt) {
    this.runCrawler();
  }
}
