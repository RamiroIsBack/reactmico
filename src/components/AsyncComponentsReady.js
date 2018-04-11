import asyncComponent from './AsyncComponent';

const AsyncHome = asyncComponent(() => import('./layout/Home'));
const AsyncDiseños = asyncComponent(() => import('./layout/Diseños'));
const AsyncTaller = asyncComponent(() => import('./layout/Taller'));
const AsyncConocenos = asyncComponent(() => import('./layout/Conocenos'));
const AsyncContacto = asyncComponent(() => import('./layout/Contacto'));
const AsyncFerias = asyncComponent(() => import('./layout/Ferias'));
const AsyncProductos = asyncComponent(() => import('./layout/Productos'));
const AsyncCarro = asyncComponent(() => import('./layout/Carro'));
const AsyncAmigo = asyncComponent(()=>import('./layout/Amigo'));
const AsyncAmigoPedidosContainer = asyncComponent(()=>import('./containers/AmigoPedidosContainer'));
const AsyncAmigoDatosContainer = asyncComponent(()=>import('./containers/AmigoDatosContainer'));

export  {AsyncHome, AsyncDiseños, AsyncProductos, AsyncFerias ,AsyncContacto ,AsyncConocenos, AsyncTaller, AsyncCarro, AsyncAmigo, AsyncAmigoDatosContainer, AsyncAmigoPedidosContainer};
