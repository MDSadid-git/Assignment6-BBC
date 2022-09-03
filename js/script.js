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
    makeLi.classList.add("dark:text-gray-400");
    makeLi.classList.add("hover:text-blue-800");
    makeLi.classList.add("hover:font-semibold");
    makeLi.setAttribute("onclick", `categoryId(${element.category_id})`);
    makeLi.innerHTML = `
    <span>${element.category_id}</span>
    <span>${element.category_name}</span>
    `;
    categoriesUl.appendChild(makeLi);
  });
};
//Category ul end

//Category Id
const categoryId = (data) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${data}`;
  console.log(url);
};
categoryId();
