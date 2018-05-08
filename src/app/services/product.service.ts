import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product'

@Injectable()
export class ProductService {
  productList: AngularFireList<any>;
  // escoger product específico, comienza en blanco y luego almacena temporalmente el producto seleccionado
  selectedProduct: Product = new Product();

 
  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  // product es un parámetro que será de tipo Clase Product
  insertProduct(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  updateProduct(product: Product) {
    // product.$key busca el producto según su key (es el primer parámetro), el sgt objeto es el segundo parámetro con los campos a actualizar
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key:string) {
    this.productList.remove($key);
  }
}
