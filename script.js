let cards = document.querySelectorAll(".card");
let count = 0;

let modal = document.querySelector("#modal");
let modalImg = document.querySelector("#modalImg");
let modalTitle = document.querySelector("#modalTitle");
let modalPrice = document.querySelector("#modalPrice");

let closeBtn = document.querySelector("#close");

let cart = document.querySelector("#cartCount");

scrollBtn.onclick = () => {
  document.querySelector("#cars").scrollIntoView({
    behavior: "smooth",
  });
};

document.querySelectorAll(".add").forEach((btn) => {
  btn.onclick = () => {
    count++;

    cart.innerHTML = count;

    btn.innerHTML = "Qo'shildi";

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

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

search.oninput = () => {
  let value = search.value.toLowerCase();

  cards.forEach((card) => {
    let text = card.innerText.toLowerCase();

    card.style.display = text.includes(value) ? "block" : "none";
  });
};

filter.onchange = () => {
  cards.forEach((card) => {
    if (filter.value == "all" || card.dataset.brand == filter.value) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    let top = card.getBoundingClientRect().top;

    if (top < 600) {
      card.classList.add("show");
    }
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

  let total = (scroll / h) * 100;

  progress.style.width = total + "%";
});

setInterval(() => {
  document.querySelector(".logo").style.color = `rgb(
${Math.random() * 255},
${Math.random() * 255},
${Math.random() * 255}
)`;
}, 1500);

document.querySelectorAll("nav a").forEach((link) => {
  link.onclick = () => {
    link.style.scale = "1.2";

    setTimeout(() => {
      link.style.scale = "1";
    }, 300);
  };
});

let loader = document.querySelector("#loader");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
};

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
let cartBtn = document.querySelector("#cartBtn");
let cartModal = document.querySelector("#cartModal");
let closeCart = document.querySelector("#closeCart");
let cartItems = document.querySelector("#cartItems");
let total = document.querySelector("#total");

let products = [];

document.querySelectorAll(".add").forEach((btn) => {
  btn.onclick = (e) => {
    count++;

    cart.innerHTML = count;

    let card = e.target.closest(".card");

    let name = card.querySelector("h2").innerText;

    let price = parseInt(card.querySelector("p").innerText);

    products.push({
      name,
      price,
    });

    renderCart();
  };
});

function renderCart() {
  cartItems.innerHTML = "";

  let sum = 0;

  products.forEach((item) => {
    sum += item.price;

    cartItems.innerHTML += `

<div class="cartItem">

<p>${item.name}</p>

<p>${item.price}$</p>

</div>

`;
  });

  total.innerHTML = sum;
}

cartBtn.onclick = () => {
  cartModal.style.display = "flex";
};

closeCart.onclick = () => {
  cartModal.style.display = "none";
};
window.addEventListener("load", () => {
  let loader = document.querySelector("#loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 3000);
});
let favoriteCount = 0;

let favoriteBtn = document.querySelector("#favoriteCount");

document.querySelectorAll(".fav").forEach((btn) => {
  btn.onclick = () => {
    if (!btn.classList.contains("active")) {
      btn.classList.add("active");

      btn.innerHTML = "❤️";

      favoriteCount++;
    } else {
      btn.classList.remove("active");

      btn.innerHTML = "🤍";

      favoriteCount--;
    }

    favoriteBtn.innerHTML = favoriteCount;
  };
});
document.addEventListener("DOMContentLoaded", () => {
  let loader = document.querySelector("#loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 3000);
});
