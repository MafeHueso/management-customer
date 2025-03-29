import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteFormComponent } from './cliente-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClientesService } from '../../services/clientes.services';
import { of } from 'rxjs';

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;
  let mockService: jasmine.SpyObj<ClientesService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ClientesService', ['crearCliente']);

    await TestBed.configureTestingModule({
      imports: [ClienteFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ClientesService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors when submitting empty form', () => {
    const form = component.form;
    form.markAllAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.error small'));
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('should emit clienteCreado and close on successful submit', () => {
    spyOn(component.close, 'emit');
    spyOn(component.clienteCreado, 'emit');

    const form = component.form;
    form.setValue({
      sharedKey: 'john123',
      businessId: 'John Smith',
      email: 'john@mail.com',
      phone: '1234567890'
    });

    mockService.crearCliente.and.returnValue(of(form.value));
    component.guardar();

    expect(component.clienteCreado.emit).toHaveBeenCalledWith(form.value);
    expect(component.close.emit).toHaveBeenCalled();
  });
});

