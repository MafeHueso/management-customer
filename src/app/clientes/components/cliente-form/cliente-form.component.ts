import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/clientes.model';
import { ClientesService } from '../../services/clientes.services';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ClienteFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() clienteCreado = new EventEmitter<Cliente>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.form = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.clientesService.crearCliente(this.form.value).subscribe({
        next: (nuevoCliente) => {
          this.clienteCreado.emit(nuevoCliente);
          this.close.emit();
        },
        error: (err) => {
          console.error('Error al crear cliente', err);
        }
      });
    }
  }
}
