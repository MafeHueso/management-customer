import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesListaComponent } from './clientes-lista.component';
import { ClientesService } from '../../services/clientes.services';
import { Cliente } from '../../models/clientes.model';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';

describe('ClientesListaComponent', () => {
  let component: ClientesListaComponent;
  let fixture: ComponentFixture<ClientesListaComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;

  const CLIENTES_MOCK: Cliente[] = [
    {
      sharedKey: 'juan123',
      businessId: 'Juan Pérez',
      email: 'juan@mail.com',
      phone: '3001234567',
      dataAdded: '2025-03-28'
    }
  ];

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj('ClientesService', [
      'obtenerTodos',
      'buscarPorSharedKey',
      'crearCliente'
    ]);

    mockClientesService.obtenerTodos.and.returnValue(of(CLIENTES_MOCK));
    mockClientesService.buscarPorSharedKey.and.returnValue(of(CLIENTES_MOCK));
    mockClientesService.crearCliente.and.returnValue(of(CLIENTES_MOCK[0]));

    await TestBed.configureTestingModule({
      imports: [ClientesListaComponent, CommonModule, FormsModule, ClienteFormComponent],
      providers: [
        { provide: ClientesService, useValue: mockClientesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ejecuta ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate CSV when exportarCSV is called', () => {
    const anchor = document.createElement('a');
    spyOn(document, 'createElement').and.returnValue(anchor);
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();
    const clickSpy = spyOn(anchor, 'click');

    component.exportarCSV();

    expect(clickSpy).toHaveBeenCalled();
  });
});



