import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAlbumComponent } from './usuarios-album.component';

describe('UsuariosAlbumComponent', () => {
  let component: UsuariosAlbumComponent;
  let fixture: ComponentFixture<UsuariosAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
