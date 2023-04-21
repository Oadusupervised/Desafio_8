# segunda_pre_entrega

en este segunad pre entrega se cumplen los siguientes parametros:

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
-limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

El método GET deberá devolver un objeto con el siguiente formato:
{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}


Además, agregar al router de carts los siguientes endpoints:
DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body


DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.


IMPORTANTE PARA SU CORRECTO FUNCIONAMIENTO SE DEBEN OPERAR LAS PRIMERAS LINEAS QUE CARGAN LOS DATOS DEL LOCALSTORAGE A LA BASE DE DATOS QUE SE ESTE USANDO
