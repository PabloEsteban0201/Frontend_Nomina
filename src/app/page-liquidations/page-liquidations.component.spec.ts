import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLiquidationsComponent } from './page-liquidations.component';

describe('PageLiquidationsComponent', () => {
  let component: PageLiquidationsComponent;
  let fixture: ComponentFixture<PageLiquidationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageLiquidationsComponent]
    });
    fixture = TestBed.createComponent(PageLiquidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
