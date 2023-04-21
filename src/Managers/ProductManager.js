import mongoose from "mongoose";
import { productOperator, schemaProducts } from "../models/products.js";
import { paginate } from "mongoose-paginate-v2";
 

class ProductMongoose {
  #productsDb;
  constructor() {
     this.#productsDb =  mongoose.model("products", schemaProducts);
  }

  #linker(str, apg, sel) {
    const arrstr = str.split(`page=${apg}`);
    const nextPage = arrstr[0].concat(`page=${apg + 1}`).concat(arrstr[1]);
    const prevPage = arrstr[0].concat(`page=${apg - 1}`).concat(arrstr[1]);
    if (sel === "prev") {
      return prevPage;
    } else if (sel === "next") {
      return nextPage;
    }
    throw new Error("invalid page");
  }

  async addProduct(product) {
    const prodsave = await this.#productsDb.create(product);
    return prodsave;
  }

  async createPaginate(){
        
    const criterioDeBusqueda = {};
    
    const opcionesDePaginacion = {
        limit:  5,
        page:  1,
        lean: true // para que devuelva objetos literales, no de mongoose
    };
//@ts-ignore
    let result = await productOperator.paginate(criterioDeBusqueda, opcionesDePaginacion)
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
        pagingCounter: result.pagingCounter}
    return context
  }

  async getProducts() {
    const prodDisp = await this.#productsDb.find().lean();
    return prodDisp;
  }

  async getProductById(id) {
    const product = await this.#productsDb.findById(id).lean();
    return product;
  }

  async deleteProduct(id) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndRemove(id);
  }

  async updateProduct(id, productUpd) {
    const finder = await this.#productsDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#productsDb.findByIdAndUpdate(id, productUpd);
  }

  async getPagProducts(options, srt) {
    const optDefault = {
      limit: options.limit || 10,
      page: options.page || 1,
      sort: { price: null },
      lean: true,
      // projection: { _id: 0 },
    };

    const optQuery = {
      stock: { $gt: -1 },
    };

    for (const [key, value] of Object.entries(options)) {
      if (key !== "limit" && key !== "page" && key !== "sort")
        optQuery[key] = value;
      if (key === "sort" && (value === "asc" || value === "1")) {
        // @ts-ignore
        optDefault.sort.price = "ascending";
      } else if (key === "sort" && (value === "desc" || value === "-1")) {
        // @ts-ignore
        optDefault.sort.price = "descending";
      }
      if (key === "stock" && (value === "disp" || value === "1")) {
        optQuery.stock = { $gt: 0 };
      }
    }
    return {
      // @ts-ignore
      payload: result.docs,
      // @ts-ignore
      status: result.status_code,
      // @ts-ignore
      totalPages: result.totalPages,
      // @ts-ignore
      prevPage: result.prevPage,
      // @ts-ignore
      nextPage: result.nextPage,
      // @ts-ignore
      page: result.page,
      // @ts-ignore
      hasPrevPage: result.hasPrevPage,
      // @ts-ignore
      hasNextPage: result.hasNextPage,
      // @ts-ignore
      prevLink:
        // @ts-ignore
        result.hasPrevPage === false
          ? "Not Exist"
          : // @ts-ignore
            this.#linker(srt, result.page, "prev"),
      // @ts-ignore
      nextLink:
        // @ts-ignore
        result.hasNextPage === false
          ? "Not Exist"
          : // @ts-ignore
            this.#linker(srt, result.page, "next"),
    };
  }
}
export const productModel = new ProductMongoose();
