/**
 * Author: Eduarod Porto Morales
 * 
 * Description: Meanwhile, this function creates a specified number of copies of a given JSON object.
 **/

export function duplicateJson(original, copies) {
    if (copies <= 0) {
      throw new Error("El número de copias debe ser mayor que 0.");
    }
  
    return Array.from({ length: copies }, () => ({ ...original }));
}