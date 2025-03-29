# Gestión de Clientes – Fullstack App 
Front de la Aplicación

Aplicación para la gestión de clientes. Permite registro de nuevo cliente (modal reactivo), listar clientes con diseño responsive, búsqueda por "sharedKey", exportación CSV de resultados, validaciones visuales en el formulario, pruebas unitarias de componentes.

Contruida con Angular 17, SCSS, con diseño responsive. 

Pruebas unitarias en Jasmine + Karma que cubrieron los siguientes componentes:  
- "ClientesListaComponent": carga, búsqueda, creación, exportación CSV
- "ClienteFormComponent": validaciones, envío y eventos
- "ClientesServic": mocks de endpoints REST con "HttpTestingController"

Despliegue local en: http://localhost:4200
Despliegue en AWS: http://front-customer-management.s3-website.us-east-2.amazonaws.com/clientes
