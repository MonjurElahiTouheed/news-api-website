const handleCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();

  const tabContainer = document.getElementById('tab-container');

  const trimedData = data.data.news_category.slice(0, 3);

  trimedData.forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
    tabContainer.appendChild(div);
  })

  console.log(data.data.news_category);
}



const handleLoadNews = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);

  const data = await res.json();
  console.log(data.data);

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ``;

  data.data.forEach((news) => {
    console.log(news);
    const div = document.createElement('div');
    div.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src=${news.image_url}
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    ${news.title.slice(0, 20)}
                    <div class="badge badge-secondary p-5">${news.rating.badge
      }</div>
                  </h2>
                  <p>
                    ${news?.details?.slice(0, 50)}
                  </p>
                  <h3>total views: ${news.total_view ? news.total_view : "no views"}</h3>
                  <div class="card-footer flex justify-between mt-8">
                    <div class="flex">
                      <div>
                        <div class="avatar online">
                          <div class="w-14 rounded-full">
                            <img
                              src=${news.author.img}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6>${news.author.name}</h6>
                        <small>${news.author.published_date}</small>
                      </div>
                    </div>
                    <div class="card-detaild-btn">
                      <button
                      onclick=handleModal('${news?._id}')
                        class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `

    cardContainer.appendChild(div);
  })


}

const handleModal = async (newsID) => {
  console.log(newsID);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsID}`
  );
  const data = await response.json();

  const modalContainer = document.getElementById('modal-container');
  console.log(modalContainer);
  
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
  <h3 class="text-lg font-bold">Hello!</h3>
  <p class="py-4">Press ESC key or click the button below to close</p>
  <div class="modal-action">
  <form method="dialog">
  <!-- if there is a button in form, it will close the modal -->
  <button class="btn">Close</button>
  </form>
  </div>
  </div>
  </dialog>
  `;
  const modal = document.getElementById('my_modal_1');
  modal.showModal();
}


handleCategory();
handleLoadNews('01');