import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';
import { LogoRendererComponent } from '../logo-renderer/logo-renderer.component';
import { BrandNameRendererComponent } from '../brand-name-renderer/brand-name-renderer.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  socialNetworkSite: string;
  country: string;
  countries: Array<string>;
  gridOptions: any;
  brands: Brand[] = [];
  private gridApi;
  private gridColumnApi;
  brandNames = [
    { name: 'All Brands', val: '' },
    { name: 'Airlines', val: 'airlines' },
    { name: 'Alcohol', val: 'alcohol' }];
  brandName = this.brandNames[0].val;

  constructor(private brandService: BrandService, private router: Router) {
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      rowSelection: 'single',
      rowHeight: 70
    };
    this.gridOptions.columnDefs = [
      { headerName: '#', field: 'id', cellClass: 'cell-custom', width: 50 },
      { headerName: 'Logo', field: 'logo', cellRenderer: 'logoRenderer', suppressMenu: 'true', suppressSorting: 'true', width: 50 },
      { headerName: 'Name', field: 'name', cellRenderer: 'brandNameRenderer', cellClass: 'cell-custom', width: 150 },
      { headerName: 'Fans', field: 'fans', cellClass: 'cell-custom', width: 60 },
      { headerName: 'Tags', field: 'tags', cellClass: 'cell-custom'},
      { headerName: '<i class="fab fa-facebook-square"></i>', field: 'url_page', cellRenderer: 'brandNameRenderer', cellClass: 'cell-custom'}
    ];
    this.gridOptions.frameworkComponents = {
      logoRenderer: LogoRendererComponent,
      brandNameRenderer: BrandNameRendererComponent
    };
    this.gridOptions.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  ngOnInit() {
    this.socialNetworkSite = this.router.url.slice(1);
    this.brandService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.country = this.countries[0];
    });
  }

  changeCriteria() {
    this.gridApi.showLoadingOverlay();
    // check job with brand and country
    this.brandService.getJob().subscribe(data => {
      const existingJob = data.jobs.find(job => this.isExistingJob(job));
      existingJob ? this.getInfoJob(existingJob.id) : this.runCrawler();
    });
  }

  runCrawler() {
    this.brandService.runJob(this.brandName, this.country).subscribe(data => {
      const job_id = data.jobid;
      this.getInfoJob(job_id);
    });
  }

  // check job with job id
  getInfoJob(job_id) {
    this.brandService.getJob(job_id).subscribe(info => {
      const state = info.jobs[0].state;
      state === 'finished' ? this.getBrands(job_id) : setTimeout(() => this.getInfoJob(job_id), 1000);
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
            tags: brand.hashtags.join(', '),
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
    this.brandService.getJob().subscribe(data => {
      const jobFrance = data.jobs.find(job => !job.hasOwnProperty('spider_args') ||
        this.isExistingJob(job));
      jobFrance ? this.getInfoJob(jobFrance.id) : this.runCrawler();
    });
  }

  isExistingJob(job) {
    return job.spider_args.country === this.country && job.spider_args.brand === this.brandName;
  }

  compare(val1, val2) {
    const pos1 = val1.id;
    const pos2 = val2.id;
    return (pos1 > pos2) ? 1 : (pos1 < pos2) ? -1 : 0;
  }
}
