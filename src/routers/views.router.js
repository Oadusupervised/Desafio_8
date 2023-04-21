import { cartModel } from '../models/carts.js';
import { messageModel } from '../models/messages.js';
import { productModel } from '../Managers/ProductManager.js';
import { Router } from 'express'
import { productOperator } from '../models/products.js';
import { postProductController } from '../controllers/postProductController.js';
import { profileView } from '../controllers/web/perfil.controller.js';
import { loginView } from '../controllers/web/login.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';
import {soloAutenticados} from '../middlewares/autenticacionWeb.js'
export const routerVistas = Router()



routerVistas.get('/realTimeCarts', async (req, res, next) => {

    const criterioDeBusqueda = {};

    const opcionesDePaginacion = {
        limit: req.query.limit || 5,
        page: req.query.page || 1,
        lean: true // para que devuelva objetos literales, no de mongoose
    };

    // @ts-ignore
    let result = await cartModel.paginate(criterioDeBusqueda, opcionesDePaginacion);

    console.log(result);

    const context = {
        pageTitle: 'paginado',
        hayDocs: result.docs.length > 0,
        docs: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
        //status: if(docs){return console.log('sucess')}else{},
        //payload: Resultado de los productos solicitados,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    }

    console.log('todo ok');
    res.render('realTimeCarts', context);
})

routerVistas.get('/realTimeMessages', async (req, res, next) => {

    const criterioDeBusqueda = {};

    const opcionesDePaginacion = {
        limit: req.query.limit || 5,
        page: req.query.page || 1,
        lean: true // para que devuelva objetos literales, no de mongoose
    };

    // @ts-ignore
    let result = await messageModel.paginate(criterioDeBusqueda, opcionesDePaginacion);

    console.log(result);

    const context = {
        pageTitle: 'paginado',
        hayMensajes: result.docs.length > 0,
        mensajes: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
        //status: if(docs){return console.log('sucess')}else{},
        //payload: Resultado de los productos solicitados,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    };
    console.log('todo ok');
    res.render('realTimeMessages', context);
})
routerVistas.get('/realTimeProducts', async (req, res, next) => {
    const criterioDeBusqueda = {};

    const opcionesDePaginacion = {
        limit: req.query.limit || 5,
        page: req.query.page || 1,
        lean: true // para que devuelva objetos literales, no de mongoose
    };

    // @ts-ignore
    let result = await productOperator.paginate(criterioDeBusqueda, opcionesDePaginacion);

    console.log(result);

    const context = {
        pageTitle: 'paginado',
        hayProductos: result.docs.length > 0,
        productos: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
        //status: if(docs){return console.log('sucess')}else{},
        //payload: Resultado de los productos solicitados,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    };
    console.log('todo ok');
    res.render('realTimeProducts', context);
});


routerVistas.get('/register', registroView)

routerVistas.get('/login',loginView)

routerVistas.get('/profile',soloAutenticados,profileView)




routerVistas.post('/realTimeProducts', postProductController)
process.on('exit', async () => {
    //await productModel.deleteMany({});
    await cartModel.deleteMany({});
    await messageModel.deleteMany({});

})
