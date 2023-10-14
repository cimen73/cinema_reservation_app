const container = document.querySelector(".container");
const select = document.querySelector("#movie");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const infoText = document.querySelector(".infoText");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const getSeatsFromDatabase = () => {
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (dbSelectedMovie) {
    select.selectedIndex = dbSelectedMovie;
  }
  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {

    infoText.classList.add("open");

    seats.forEach((seat, index) => {

      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

function saveToDatabase(dataIndex) {
  localStorage.setItem("selectedSeats", JSON.stringify(dataIndex));
  localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex));
}

getSeatsFromDatabase();

const calcTotal = () => {

  const selectedSeats = container.querySelectorAll(".seat.selected");
  const allSeatsArray = [];
  const allSelectedSeatsArray = [];
  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });


  let selectedIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;



  if (selectedSeatsCount > 0) {

    infoText.classList.add("open");
  } else {

    infoText.classList.remove("open");
  }


  let price = select.value;

  count.innerText = selectedSeatsCount;

  amount.innerText = selectedSeatsCount * price;

  saveToDatabase(selectedIndexs);
};

calcTotal();

container.addEventListener("click", (mouseEvent) => {

  if (
    mouseEvent.target.offsetParent.classList.contains("seat") &&
    !mouseEvent.target.offsetParent.classList.contains("reserved")
  ) {

    mouseEvent.target.offsetParent.classList.toggle("selected");

    calcTotal();
  }
});

select.addEventListener("change", () => {
  calcTotal();
});