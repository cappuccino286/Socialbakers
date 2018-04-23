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
  private brands: Brand[];
  private gridApi;
  private gridColumnApi;
  private cellStyle;
  private gridOptions;
  private columnDefs;
  constructor(private brandService: BrandService) {
    this.cellStyle = {
      'line-height': '60px',
      'font-size': '16px'
    };
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      rowSelection: 'single',
      rowHeight: 70,
    };
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'position', cellStyle: this.cellStyle, width: 50 },
      { headerName: 'Logo', field: 'logo', cellRenderer: 'logoRenderer', width: 50 },
      { headerName: 'Name', field: 'name', cellRenderer: 'brandNameRenderer',  cellStyle: this.cellStyle },
      { headerName: 'Fans', field: 'fans', cellStyle: this.cellStyle, width: 100 },
      { headerName: '<i class="fab fa-facebook-square"></i>', field: 'url', cellRenderer: 'brandNameRenderer', cellStyle: this.cellStyle }
    ];
    this.gridOptions.frameworkComponents = {
      logoRenderer: LogoRendererComponent,
      brandNameRenderer: BrandNameRendererComponent
    };
  }
  ngOnInit() { }
  getBrands() {
    this.brandService.getBrands().subscribe(
      brands => {
        this.brands = brands;
        this.brands.sort(this.compare);
        const rowsData = [];
        this.brands.forEach(brand => {
          const row = {
            position: brand.pos,
            logo: brand.image_urls[0],
            name: brand.brand_name,
            fans: brand.fans,
            url: brand.url_page
          };
          rowsData.push(row);
        });
        this.gridApi.setRowData(rowsData);
      }
    );
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.getBrands();
  }
  compare(val1, val2) {
    const pos1 = +val1.pos;
    const pos2 = +val2.pos;
    if (pos1 > pos2) {
      return 1;
    }
    if (pos1 < pos2) {
      return -1;
    }
    return 0;
  }
}
