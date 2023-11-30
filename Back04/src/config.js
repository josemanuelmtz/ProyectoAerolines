import { config } from "dotenv";
config();

// Paypal
export const PAYPAL_API_CLIENT = 'AUiF3aP4170eklEmkdX2Hwvlgm9WjZ0IPmW6SODT8spWXn1otjAn6jX44pziwhqgt6a9uxFhFlmvudy8';
export const PAYPAL_API_SECRET = 'EJpsrgwHnW3sGch4kzkR-wNVYHxy2TAxuAXNlURAwGU3GINmWyqyHtjY2QdDqb2CM4hKrxnBiY3EBxuI';
export const PAYPAL_API ='https://api-m.sandbox.paypal.com' // url sandbox or live for your app

// Server
export const PORT = 3004;
export const HOST = 'http://localhost:' + PORT;

console.log(PAYPAL_API_SECRET);
console.log(PAYPAL_API_CLIENT);