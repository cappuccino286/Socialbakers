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
  constructor(private brandService: BrandService) {
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      rowSelection: 'single',
      rowHeight: 70,
    };
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'id', cellClass: 'cell-custom', width: 50 },
      { headerName: 'Logo', field: 'logo', cellRenderer: 'logoRenderer', suppressMenu: 'true', suppressSorting : 'true', width: 50 },
      { headerName: 'Name', field: 'name', cellRenderer: 'brandNameRenderer',  cellClass: 'cell-custom' },
      { headerName: 'Fans', field: 'fans', cellClass: 'cell-custom' , width: 100 },
      { headerName: '<i class="fab fa-facebook-square"></i>', field: 'url_page', cellRenderer: 'brandNameRenderer', cellClass: 'cell-custom' }
    ];
    this.gridOptions.frameworkComponents = {
      logoRenderer: LogoRendererComponent,
      brandNameRenderer: BrandNameRendererComponent
    };
  }
  ngOnInit() {
    this.brandService.runJob().subscribe(data => console.log(data));
  }
  getBrands(job_id) {
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
    this.brandService.getJobs().subscribe(data => {
      if (data.jobs.length <= 0) { return; }
      this.getBrands(data.jobs[0].id);
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
}
