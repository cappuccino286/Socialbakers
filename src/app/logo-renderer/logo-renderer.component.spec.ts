import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoRendererComponent } from './logo-renderer.component';

describe('LogoRendererComponent', () => {
  let component: LogoRendererComponent;
  let fixture: ComponentFixture<LogoRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
