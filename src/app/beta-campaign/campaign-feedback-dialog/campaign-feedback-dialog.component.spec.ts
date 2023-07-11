import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFeedbackDialogComponent } from './campaign-feedback-dialog.component';

describe('CampaignFeedbackDialogComponent', () => {
  let component: CampaignFeedbackDialogComponent;
  let fixture: ComponentFixture<CampaignFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignFeedbackDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
