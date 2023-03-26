const BASE_URL = "http://127.0.0.1:5000/api";

function createCupcakeMarkup(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
        ${cupcake.flavor} | ${cupcake.size} | ${cupcake.rating}
        </li>
        <img src="${cupcake.image}" alt=""></img>
    </div>
    `;
};


async function generateCupcakeList() {

    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(createCupcakeMarkup(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
};

$("#add-cupcake").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
  
    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResp.data.cupcake));

    $("#cupcake-list").append(newCupcake);
    $("#add-cupcake").trigger("reset");
  });

  $("#cupcake-list").on("click", ".delete-button", async function (evt) {
    evt.preventDefault();

    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);

    $cupcake.remove();
  });

  $(generateCupcakeList);