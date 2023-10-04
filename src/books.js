import axios from "axios";

export const palvelin = "http://localhost:8080";

export const getBooks = async () => {
  try {
    const response = await axios.get(palvelin + "/book/");
    return response.data;
  } catch (error) {
    throw new Error("Haku ei onnistunut");
  }
};
export const addBook = async (book) => {
  try {
    const response = await axios.post(palvelin + "/book/", book);
    return response.data.id;
  } catch (error) {
    throw new Error("Lisäys ei onnistunut");
  }
};

export const getImage = (imageName) => {
  if (imageName === undefined || imageName === null) {
    return palvelin + "/download/defaultImg.svg"
  }
  return palvelin + "/download/" + imageName
}

export const deleteBook = async (id) => {
    try {
        await axios.delete(palvelin + "/book/" + id)
    } catch (error) {
        throw new Error ("Poisto ei onnistunut");
    }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(palvelin + "/book/" + id);
    return response.data;
  } catch (error) {
    throw new Error ("Haku ei onnistunut")
  }
};

export const editBook = async (id, book) => {
  try {
    await axios.put(palvelin + "/book/" + id, book);
  }catch (error) {
    throw  new Error ("Muokkaus ei onnistunut")
  }
};