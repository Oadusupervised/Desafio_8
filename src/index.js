import express from 'express'
import carts from './localStorage/carts.json' assert { type: 'json' }
import messages from './localStorage/messages.json' assert { type: 'json' }
import products from './localStorage/products.json' assert { type: 'json' }
import { cartModel } from './models/carts.js';
import { messageModel } from './models/messages.js';
import { productOperator } from './models/products.js';
import { engine } from 'express-handlebars'
import { conectar } from './models/index.js'
import hbs from 'handlebars'
import { routerVistas } from './routers/views.router.js'
import { PORT } from './config/port.js'
import { apiRouter } from './routers/api.routers.js';
import { CartManager, cartManager } from './Managers/CartManager.js';
import cors from 'cors'
import session from './middlewares/session.js'
await conectar()

const app =express()

//await cartModel.insertMany(carts)
//await messageModel.insertMany(messages)
//await productOperator.insertMany(products)

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
})

app.use(cors({ origin: "*" }));
app.use(express.static("public"));
app.use(session)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use('/',routerVistas)
app.use('/api',apiRouter)

//await cartModel.find().populate('nombreProducts.product')

app.listen(PORT,()=>{
    console.log(`escuchando en puerto ${PORT}`)
    console.log('usar localhost:8080/views/realTimeProducts')
    console.log('usar localhost:8080/views/realTimeMessages')
    console.log('usar localhost:8080/views/realTimeCarts')
    console.log('usar localhost:8080/views/register')
    console.log('usar localhost:8080/views/login')
    console.log('usar localhost:8080/views/profile')



})

//console.log(cartManager.buscarCosas() + 'estos son los carritos')