import { Book } from "../interfaces/book.interface";

export function checkFields(book: Book):boolean {
  if(!book.title.trim()){
    alert('El titulo no puede estar vacio');
    return false;
  }
  if (!book.author.trim()){
    alert('El autor no puede estar vacío'); 
    return false;
  } 
  if (/\d/.test(book.author)) {
    alert('El autor no puede contener números');
    return false;
  }
  if(!book.isbn.trim()){
    alert('El isbn no puede estar vacio'); 
    return false;
  }
  if(!book.author.trim()) {
    alert('El autor no puede estar vacio'); 
    return false;
  }
  return true;
}