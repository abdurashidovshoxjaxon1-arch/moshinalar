let cards = document.querySelectorAll(".card");
let count = 0;

let modal = document.querySelector("#modal");
let modalImg = document.querySelector("#modalImg");
let modalTitle = document.querySelector("#modalTitle");
let modalPrice = document.querySelector("#modalPrice");
let closeBtn = document.querySelector("#close");

let cart = document.querySelector("#cartCount");
let cartBtn = document.querySelector("#cartBtn");
let cartModal = document.querySelector("#cartModal");
let closeCart = document.querySelector("#closeCart");
let cartItems = document.querySelector("#cartItems");
let total = document.querySelector("#total");
let products = [];

let favoriteCount = 0;
let favoriteBtn = document.querySelector("#favoriteBtn");
let favoriteNumber = document.querySelector("#favoriteCount");
let favModal = document.querySelector("#favModal");
let closeFav = document.querySelector("#closeFav");
let favItems = document.querySelector("#favItems");
let favCars = [];

let loader = document.querySelector("#loader");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
};

if (scrollBtn) {
  scrollBtn.onclick = () => {
    document.querySelector("#cars").scrollIntoView({ behavior: "smooth" });
  };
}

function renderCart() {
  if (products.length === 0) {
    cartItems.innerHTML = "<p>Savat bo'sh</p>";
    total.innerHTML = "Jami: 0 so'm";
    return;
  }

  cartItems.innerHTML = "";
  let sum = 0;

  products.forEach((product, index) => {
    sum += product.price;
    cartItems.innerHTML += `
      <div class="cartItem" style="display:flex;align-items:center;gap:12px;padding:10px;border-bottom:1px solid #333;">
        <img src="${product.img}" alt="${product.name}" style="width:80px;height:60px;object-fit:cover;border-radius:8px;">
        <div style="flex:1;">
          <p style="font-weight:bold;margin:0 0 4px;">${product.name}</p>
          <p style="color:#f0c040;margin:0;">${product.price.toLocaleString()} so'm</p>
        </div>
        <button onclick="removeFromCart(${index})" style="background:red;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:18px;">🗑</button>
      </div>
    `;
  });

  total.innerHTML = "Jami: " + sum.toLocaleString() + " so'm";
}

function removeFromCart(index) {
  products.splice(index, 1);
  count--;
  cart.innerHTML = count;
  renderCart();
}

if (cartBtn) {
  cartBtn.onclick = () => {
    cartModal.style.display = "flex";
  };
}

if (closeCart) {
  closeCart.onclick = () => {
    cartModal.style.display = "none";
  };
}

if (cartModal) {
  cartModal.onclick = (e) => {
    if (e.target == cartModal) cartModal.style.display = "none";
  };
}

document.querySelectorAll(".add").forEach((btn) => {
  btn.onclick = (e) => {
    count++;
    cart.innerHTML = count;

    let card = e.target.closest(".card");
    let name = card.querySelector("h2").innerText;
    let price = parseInt(card.querySelector("p").innerText);
    let img = card.querySelector("img").src;

    products.push({ name, price, img });
    renderCart();

    btn.innerHTML = "Qo'shildi ✅";
    btn.style.transform = "scale(1.2)";
    setTimeout(() => {
      btn.innerHTML = "Savat+";
      btn.style.transform = "scale(1)";
    }, 1000);
  };
});

document.querySelectorAll(".buy").forEach((btn) => {
  btn.onclick = () => {
    btn.innerHTML = "Buyurtma qabul";
    setTimeout(() => {
      btn.innerHTML = "Sotib olish";
    }, 2000);
    alert("Buyurtma qabul qilindi");
  };
});

document.querySelectorAll(".view").forEach((btn) => {
  btn.onclick = (e) => {
    let card = e.target.closest(".card");
    modal.style.display = "flex";
    modalImg.src = card.querySelector("img").src;
    modalTitle.innerHTML = card.querySelector("h2").innerHTML;
    modalPrice.innerHTML = card.querySelector("p").innerHTML;
  };
});

if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
}

if (modal) {
  modal.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };
}

if (search) {
  search.oninput = () => {
    let value = search.value.toLowerCase();
    cards.forEach((card) => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  };
}

if (filter) {
  filter.onchange = () => {
    cards.forEach((card) => {
      if (filter.value == "all" || card.dataset.brand == filter.value) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };
}

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    let top = card.getBoundingClientRect().top;
    if (top < 600) card.classList.add("show");
  });
});

let progress = document.createElement("div");
progress.classList.add("progress");
document.body.append(progress);

window.addEventListener("scroll", () => {
  let scroll = document.documentElement.scrollTop;
  let h =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  progress.style.width = (scroll / h) * 100 + "%";
});

setInterval(() => {
  document.querySelector(".logo").style.color =
    `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}, 1500);

document.querySelectorAll("nav a").forEach((link) => {
  link.onclick = () => {
    link.style.scale = "1.2";
    setTimeout(() => {
      link.style.scale = "1";
    }, 300);
  };
});

if (sendBtn) {
  sendBtn.onclick = () => {
    let fullname = document.querySelector("#fullname");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");

    if (fullname.value == "" || phone.value == "" || email.value == "") {
      alert("Formani to'ldiring");
    } else {
      alert("Ma'lumot yuborildi");
      fullname.value = "";
      phone.value = "";
      email.value = "";
    }
  };
}

let locationBtn = document.querySelector("#locationBtn");
if (locationBtn) {
  locationBtn.onclick = () => {
    window.open("https://maps.google.com/?q=Tashkent");
  };
}

document.querySelectorAll(".fav").forEach((btn) => {
  btn.onclick = (e) => {
    let card = e.target.closest(".card");
    let carName = card.querySelector("h2").innerText;

    if (!btn.classList.contains("active")) {
      btn.classList.add("active");
      btn.innerHTML = "❤️";
      favoriteCount++;
      favCars.push(carName);
    } else {
      btn.classList.remove("active");
      btn.innerHTML = "🤍";
      favoriteCount--;
      favCars = favCars.filter((item) => item !== carName);
    }

    favoriteNumber.innerHTML = favoriteCount;
    showFavCars();
  };
});

function showFavCars() {
  if (favCars.length == 0) {
    favItems.innerHTML = "Hozircha sevimli mashina yo'q";
    return;
  }
  favItems.innerHTML = "";
  favCars.forEach((car) => {
    favItems.innerHTML += `<div class="cartItem"><p>${car}</p></div>`;
  });
}

if (favoriteBtn) {
  favoriteBtn.onclick = () => {
    favModal.style.display = "flex";
  };
}

if (closeFav) {
  closeFav.onclick = () => {
    favModal.style.display = "none";
  };
}

if (favModal) {
  favModal.onclick = (e) => {
    if (e.target == favModal) favModal.style.display = "none";
  };
}

let contactBtn = document.querySelector("#contactBtn");
if (contactBtn) {
  contactBtn.onclick = () => {
    let name = document.querySelector("#name");
    let phone = document.querySelector("#phoneContact");
    let email = document.querySelector("#emailContact");

    if (name.value == "" || phone.value == "" || email.value == "") {
      alert("Iltimos formani to'ldiring");
      return;
    }

    alert("Xabaringiz muvaffaqiyatli yuborildi");
    name.value = "";
    phone.value = "";
    email.value = "";
    if (messageContact) messageContact.value = "";
  };
}

let menuBtn = document.querySelector("#menuBtn");
let nav = document.querySelector("#nav");
if (menuBtn) {
  menuBtn.onclick = () => {
    nav.classList.toggle("active");
  };
}

let statBox = document.querySelectorAll(".statBox");
window.addEventListener("scroll", () => {
  statBox.forEach((box) => {
    let top = box.getBoundingClientRect().top;
    if (top < 600) {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }
  });
});

let themeBtn = document.querySelector("#themeBtn");
if (themeBtn) {
  themeBtn.onclick = () => {
    document.body.classList.toggle("lightMode");
    themeBtn.innerHTML = document.body.classList.contains("lightMode")
      ? "☀️"
      : "🌙";
  };
}
document.querySelectorAll(".faqQuestion").forEach((question) => {
  question.onclick = () => {
    let item = question.closest(".faqItem");
    let isOpen = item.classList.contains("open");

    document
      .querySelectorAll(".faqItem")
      .forEach((el) => el.classList.remove("open"));

    if (!isOpen) {
      item.classList.add("open");
    }
  };
});
