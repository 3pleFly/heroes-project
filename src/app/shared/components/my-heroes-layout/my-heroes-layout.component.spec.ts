import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroesLayoutComponent } from './my-heroes-layout.component';

describe('MyHeroesLayoutComponent', () => {
  let component: MyHeroesLayoutComponent;
  let fixture: ComponentFixture<MyHeroesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
