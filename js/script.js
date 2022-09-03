//make category ul
const myCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json();
    displayCategory(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};
myCategory();

const displayCategory = (data) => {
  const categoriesUl = document.getElementById("myCategory");
  data.forEach((element) => {
    const makeLi = document.createElement("li");
    makeLi.setAttribute(
      "class",
      "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
    );
    makeLi.setAttribute("onclick", `categoryId(${element.category_id})`);
    makeLi.innerHTML = `
    <span>${element.category_name}</span>
    `;
    categoriesUl.appendChild(makeLi);
  });
};
//Category ul end

//Category Id
const categoryId = async (data) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${data}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch (error) {
    console(error);
  }
};

const displayNews = (data) => {
  const medis = document.getElementById("medis");
  const viewArray = [];
  console.log(data);
  const spinnerArea = document.getElementById("spinnerArea");
  if (data.length === 0) {
    spinnerArea.classList.remove("hidden");
  } else {
    spinnerArea.classList.add("hidden");
  }
  medis.innerHTML = "";
  data.forEach((element) => {
    viewArray.push(element);
  });

  const sortView = viewArray.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  sortView.forEach((element) => {
    const { image_url, title, author, total_view, details, _id } = element;
    const makeDiv = document.createElement("div");
    makeDiv.innerHTML = `
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4 bg-slate-100 rounded my-5">
        <div class="">
          <div class="text-center">
            <img
              src="${image_url ? image_url : "Img Missing"}"
              alt="thumbnail"
              class=" mx-auto"
            />
          </div>
        </div>
        <div class="col-span-2 pb-5">
          <div class="">
            <div class="card-details mx-5">
              <div class="top my-5">
                <h2 class="text-4xl font-extrabold text-slate-800">${
                  title ? title : "Title missing"
                }</h2>
                <div class='h-10 '>
                <p class=' paragrafEllipsis my-5 text-slate-700 truncate text-ellipsis'>
                  ${details ? details : "Details missing"}
                </p>
                </div>
              </div>
              <div class="middle flex justify-between">
                <div class="flex">
                  <img
                    src="${author.img}"
                    alt="..."
                    class="imgRudes"
                  />
                  <div class="ml-3">
                    <h2 class="font-semibold text-black">${
                      author.name ? author.name : "Name missing"
                    }</h2>
                    <span class="font-extralight">${
                      author.published_date
                        ? author.published_date
                        : "Date missing"
                    }</span>
                  </div>
                </div>
                <div class="text-black">
                  <i class="fa-regular fa-eye font-extrabold"></i>
                  <span>${total_view ? total_view : "No view"}</span>
                </div>
                
                <div>
                  <label for="my-modal-6" class="btn modal-button" onclick="dainamikId('${_id}')"><i class="fa-solid fa-arrow-right"></i></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    

        `;
    medis.appendChild(makeDiv);
    console.log(element);
  });
  console.log(sortView);
  const itemsCategory = document.getElementById("itemsCategory");
  itemsCategory.innerHTML = `
  <h2 class="text-xl text-slate-700 font-bold pl-5">
        ${
          viewArray.length ? viewArray.length : "No News found!!!"
        } Items found for Category Entertainment
        </h2>`;
};
//Category ID end

const dainamikId = async (element) => {
  const url = ` https://openapi.programming-hero.com/api/news/${element}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    idUser(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const idUser = (data) => {
  const { title, author, total_view, details, image_url } = data;
  const modalNews = document.getElementById("modalNews");
  modalNews.innerHTML = `
          <img src="${image_url ? image_url : "Missing Img"}" alt="" >
          <h3 class="font-bold text-lg mt-2">
            ${title ? title : "Title missing"}
          </h3>
          <p class="py-4">
            ${details ? details : "details missing"}
          </p>
          <div class="ml-3">
                    <h2 class="font-semibold">${
                      author.name ? author.name : "Name missing"
                    }</h2>
                    <span class="font-extralight">${
                      author.published_date
                        ? author.published_date
                        : "Date missing"
                    }</span>
                  </div>
          <div class="font-light ml-3">
                  <i class="fa-regular fa-eye"></i>
                  <span>${total_view ? total_view : "No view"}</span>
          </div>
          `;
};

categoryId(8);
