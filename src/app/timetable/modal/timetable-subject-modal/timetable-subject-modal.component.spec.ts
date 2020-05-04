import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimetableSubjectModalComponent } from './timetable-subject-modal.component';

describe('TimetableSubjectModalComponent', () => {
  let component: TimetableSubjectModalComponent;
  let fixture: ComponentFixture<TimetableSubjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableSubjectModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimetableSubjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
