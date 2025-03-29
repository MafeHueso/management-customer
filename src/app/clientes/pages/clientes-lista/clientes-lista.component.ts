import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/clientes.model';
import { ClientesService } from '../../services/clientes.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteFormComponent]
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = true;
  mostrarModal = false;
  filtroSharedKey: string = '';

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.obtenerTodos().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener clientes', err);
        this.loading = false;
      }
    });
  }

  buscar(): void {
    if (this.filtroSharedKey.trim()) {
      this.clientesService.buscarPorSharedKey(this.filtroSharedKey).subscribe({
        next: (data) => (this.clientes = data),
        error: (err) => console.error('Error al buscar clientes', err)
      });
    } else {
      this.ngOnInit();
    }
  }

  onClienteCreado(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  // ✅ Método para exportar CSV
  exportarCSV(): void {
    if (this.clientes.length === 0) {
      alert('No hay clientes para exportar.');
      return;
    }

    const cabecera = ['Shared Key', 'Business ID', 'Email', 'Phone', 'Data Added'];
    const filas = this.clientes.map(cliente => [
      cliente.sharedKey,
      cliente.businessId,
      cliente.email,
      cliente.phone,
      cliente.dataAdded
    ]);

    const contenido = [cabecera, ...filas]
      .map(fila => fila.map(valor => `"${valor}"`).join(','))
      .join('\n');

    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'clientes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


