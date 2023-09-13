// nav links
const links = document.querySelector("nav .links");
const menu = document.querySelector("nav .fa-bars");
const close = links.querySelector(".fa-x");
const overlay = document.body.querySelector(".overlay");

menu.onclick = () => {
  links.style.left = 0;
  links.style.borderRadius = "0 50px 50px 0";
  overlay.style.display = "block";

  close.onclick = overlay.onclick = () => {
    links.style.left = "-300px";
    links.style.borderRadius = "0 100% 100% 0";
    overlay.style.display = "none";
  }
}


// header

const img = document.querySelector("header img")

onresize = () => {
  document.documentElement.offsetWidth <= 595 ? img.setAttribute("src", "./img/banner2.png") : img.setAttribute("src", "./img/banner.png");
}

// services btn click event

const btns = document.querySelectorAll(".btn_group input");

btns.forEach((btn, i) => {
  btn.onclick = () => {
    let active = document.querySelector(".btn_group input[class*=active]");
    active && active.classList.remove("active");
    
    btn.classList.add("active");
  }
})

// working with carousel

const carousel = document.querySelector(".carousel-container .carousel");
const cards = carousel.querySelectorAll(".carousel-card");
const dots = document.querySelector(".carousel-container .dot-container");
const arrows = document.querySelectorAll(".carousel-container > .fa-solid");
let cardIndex = 0;

cards.forEach((card, index) => {
  if(index > cards.length - 2) return;
  let dot = document.createElement("label");
  dots.insertAdjacentElement("beforeend", dot);
  dot.addEventListener("click", () => {
    cardIndex = index;
    UpdateCarousel(index)
  })
})

dots.children[cardIndex].classList.add("active");

const responsive = () => {
  let total = 3;
  if(innerWidth < 900 && innerWidth > 600) total = 2;
  else if(innerWidth <= 600) total = 1;
  return total;
}

arrows.forEach((arrow, index) => {
  arrow.onclick = () => {
    let total = responsive();
    if(index === 0) {
      cardIndex -= 1;
      if(cardIndex < 0) cardIndex = cards.length - total;
    }
    if(index === 1) {
      cardIndex += 1;
      if(cardIndex > cards.length - total) cardIndex = 0;
    }
    
    UpdateCarousel(cardIndex);
  }
})

const UpdateCarousel = (dataindex) => {
  let total = responsive();
  carousel.style.transform = `translateX(-${dataindex * (100 / total)}%)`;

  for (let i = 0; i < dots.children.length; i++) {
    if(i === cardIndex) {
      dots.children[i].classList.add("active");
    }
    else {
      dots.children[i].classList.remove("active");
    }
  }
}


// working with expanded carousel

const sliderContainer = document.querySelector(".crossjoin");
const button_texts = ["Chile", "Impossible Labs", "Back 2 Bio", "Crossjoin Website"];

let element;

// https://shakhawathosenrahad.github.io/mockjson/db.json

fetch('./data.json')
      .then(res => res.json())
      .then(data => {
        for (let i = data.length-1; i >= 0; i--) {
          element = `<div class="column" ${data[i].bgcolor}>
                        <div class="reduce">
                            <img src="${data[i].img}" alt="">
                            <h5>${data[i].h5}</h5>
                            <i class="${data[i].arrow}"></i>
                        </div>
                        <div class="expand">
                            <img src="${data[i].img}" alt="">
                            <div class="expand_text">
                                <h3>${data[i].h5}</h3>
                                <p>${data[i].desc}</p>
                                <button class="btn">${button_texts[i]}</button>
                            </div>
                        </div>
                      </div>`;
            
          sliderContainer.insertAdjacentHTML("afterbegin", element);
        }
        clicktoextends()
      })
      .catch(err => {
        console.log(err);
      })


const clicktoextends = () => {
  const extands_card = sliderContainer.querySelectorAll(".column .fa-solid");
  extands_card.forEach((btn, index) => {
    btn.onclick = () => {
      document.querySelectorAll(".crossjoin .column").forEach(column => {
        column.classList.remove("expanded");
      })
      btn.parentElement.parentElement.classList.add("expanded");
    }
  })
  extands_card[3].click();
}


// animation in input form

const contact_text = document.querySelector(".contact .contact_text");

contact_text.addEventListener("mousemove", (e) => {
  let offsetX = e.offsetX;
  let offsetY = e.offsetY;
  let width = contact_text.clientWidth;
  let height = contact_text.clientHeight;
  let moveX = offsetX - width / 2;
  let moveY = offsetY - height / 3;
  contact_text.style.transform = `translate(${moveX}px, ${moveY}px)`;

  contact_text.addEventListener("mouseout", () => {
    contact_text.style.transform = "";
  })
})