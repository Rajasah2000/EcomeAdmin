
import HttpClientXml from "../Utils/HttpClientXml";

async function AddCategory(data) {
  let endpoind = "add-category";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllCategory() {
  let endpoind = "view-Category";
  return HttpClientXml.get(endpoind);
}

async function UpdateCategory(id, data) {
  let endpoind = `update-Category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteCategory(id) {
  let endpoind = `delete-Category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}


async function ViewAllAboutBushido() {
  let endpoind = "view-about-bushido";
  return HttpClientXml.get(endpoind);
}



export default {
 
  ViewAllAboutBushido,
  AddCategory,
  ViewAllCategory,
  UpdateCategory,
  DeleteCategory,
};
