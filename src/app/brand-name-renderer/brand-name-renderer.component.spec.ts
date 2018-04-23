import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandNameRendererComponent } from './brand-name-renderer.component';

describe('BrandNameRendererComponent', () => {
  let component: BrandNameRendererComponent;
  let fixture: ComponentFixture<BrandNameRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandNameRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandNameRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
