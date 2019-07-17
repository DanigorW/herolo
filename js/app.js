class Ui {
  constructor() {
    this.form = document.querySelector(".main-form");
    this.search = document.querySelector(".search");
    this.name = document.querySelector(".name");
    this.degree = document.querySelector(".degree");
    this.description = document.querySelector(".description");
    this.day = document.querySelector(".day");
    this.icon = document.querySelector(".icon");
    this.img = document.querySelector(".img");
    this.alert = document.querySelector(".alert");
    this.apiKey = "a9fec5bb7a9fb7d385c1634595c65d25";
  }

  async ajax(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
      this.apiKey
    }&units=metric`;

    const fetchData = await fetch(url);
    const dataFromFetch = await fetchData.json();
    console.log(dataFromFetch);
    return dataFromFetch;
  }

  submit() {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      const value = this.search.value.toLowerCase();
      if (value === "" || value === Number) {
        this.showAlert(`please type a value (no numbers)`);
      } else {
        this.search.value = "";
        this.ajax(value).then(data => {
          if (data.message === "city not found") {
            this.showAlert("city not found");
          } else {
            this.showData(data);
          }
        });
      }
    });
  }

  showData(data) {
    const {
      name,
      main: { temp },
      weather: [{ main }]
    } = data;

    const { icon } = data.weather[0];

    this.name.textContent = name;
    this.degree.textContent = temp.toFixed(0);
    this.description.textContent = main;
    this.img.src = `http://openweathermap.org/img/w/${icon}.png`;
  }

  showAlert(text) {
    this.alert.classList.add("show");
    this.alert.textContent = text;

    setTimeout(() => {
      this.alert.classList.remove("show");
    }, 3000);
  }
}

const eventListeners = () => {
  const ui = new Ui();
  ui.submit();
};

window.addEventListener("DOMContentLoaded", () => {
  eventListeners();
  typing();
});

// typing effect

const heading = "hey herolo, nice to meet you :)";
let i = 0;

const typing = () => {
  if (i < heading.length) {
    document.querySelector(".typing").innerHTML += heading.charAt(i);
    i++;

    setTimeout(typing, 150);

    setTimeout(() => {
      document.querySelector(".typing").classList.add("displayNone");
    }, 6000);
  }
};
