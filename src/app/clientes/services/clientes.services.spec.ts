import { TestBed } from '@angular/core/testing';
import { ClientesService } from './clientes.services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cliente } from '../models/clientes.model';

describe('ClientesService', () => {
  let service: ClientesService;
  let httpMock: HttpTestingController;

  const mockCliente: Cliente = {
    sharedKey: 'testkey',
    businessId: 'Test Company',
    email: 'test@example.com',
    phone: '1234567890',
    dataAdded: '2025-03-28'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientesService]
    });

    service = TestBed.inject(ClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay peticiones pendientes
  });

  it('should retrieve all clients', () => {
    service.obtenerTodos().subscribe(clientes => {
      expect(clientes.length).toBe(1);
      expect(clientes[0].sharedKey).toBe('testkey');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/clients');
    expect(req.request.method).toBe('GET');
    req.flush([mockCliente]);
  });

  it('should search client by sharedKey', () => {
    const key = 'testkey';
    service.buscarPorSharedKey(key).subscribe(result => {
      expect(result[0].sharedKey).toBe('testkey');
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/clients/find?sharedKey=${key}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockCliente]);
  });

  it('should create a new client', () => {
    service.crearCliente(mockCliente).subscribe(response => {
      expect(response.sharedKey).toBe('testkey');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/clients/create');
    expect(req.request.method).toBe('POST');
    req.flush(mockCliente);
  });
});
