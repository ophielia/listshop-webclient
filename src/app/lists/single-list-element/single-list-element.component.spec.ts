import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SingleListElementComponent} from "./single-list-element.component";


describe('ManageListsComponent', () => {
    let component: SingleListElementComponent;
    let fixture: ComponentFixture<SingleListElementComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SingleListElementComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleListElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
