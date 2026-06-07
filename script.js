import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCi4gwTByWTguCIZEk-Xuu_tFhgPaudNWg",
  authDomain: "war1pvc.firebaseapp.com",
  projectId: "war1pvc",
  storageBucket: "war1pvc.firebasestorage.app",
  messagingSenderId: "667003577539",
  appId: "1:667003577539:web:ab03ffd094e3840d40ae76",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let cards = document.querySelectorAll(".card");
let count = 0;

let modal = document.querySelector("#modal");
let modalImg = document.querySelector("#modalImg");
let modalTitle = document.querySelector("#modalTitle");
let modalPrice = document.querySelector("#modalPriceText");
let modalBadge = document.querySelector("#modalBadge");
let modalDesc = document.querySelector("#modalDesc");
let modalSpecs = document.querySelector("#modalSpecs");
let closeBtn = document.querySelector("#close");
let modalBuyBtn = document.querySelector("#modalBuyBtn");

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

window.removeFromCart = function (index) {
  products.splice(index, 1);
  count--;
  cart.innerHTML = count;
  renderCart();
};

if (cartBtn)
  cartBtn.onclick = () => {
    cartModal.style.display = "flex";
  };
if (closeCart)
  closeCart.onclick = () => {
    cartModal.style.display = "none";
  };
if (cartModal)
  cartModal.onclick = (e) => {
    if (e.target == cartModal) cartModal.style.display = "none";
  };

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
  btn.onclick = () => {
    let card = btn.closest(".card");
    if (!card) return;
    let h2 = card.querySelector("h2");
    let ps = card.querySelectorAll("p");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modalImg.src = card.querySelector("img").src;
    modalTitle.innerHTML = h2.innerText;
    modalPrice.innerHTML = ps[0] ? ps[0].innerHTML : "";
    modalBadge.innerHTML = ps[1] ? ps[1].innerHTML : "";
    modalDesc.innerHTML = h2.dataset.desc || "";
    let specs = h2.dataset.specs || "";
    modalSpecs.innerHTML = specs
      ? specs
          .split("|")
          .map((s) => `<span>${s.trim()}</span>`)
          .join("")
      : "";
  };
});

if (modalBuyBtn) {
  modalBuyBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    alert("Buyurtma qabul qilindi! Tez orada siz bilan bog'lanamiz.");
  };
}

if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };
}

if (modal) {
  modal.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  };
}

let search = document.querySelector("#search");
if (search) {
  search.oninput = () => {
    let value = search.value.toLowerCase();
    cards.forEach((card) => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  };
}

let filter = document.querySelector("#filter");
if (filter) {
  filter.onchange = () => {
    cards.forEach((card) => {
      card.style.display =
        filter.value == "all" || card.dataset.brand == filter.value
          ? "block"
          : "none";
    });
  };
}

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    if (card.getBoundingClientRect().top < 600) card.classList.add("show");
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
  let logo = document.querySelector(".logo");
  if (logo)
    logo.style.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}, 1500);

document.querySelectorAll("nav a").forEach((link) => {
  link.onclick = () => {
    link.style.scale = "1.2";
    setTimeout(() => {
      link.style.scale = "1";
    }, 300);
  };
});

let sendBtn = document.querySelector("#sendBtn");
if (sendBtn) {
  sendBtn.onclick = () => {
    let fullname = document.querySelector("#fullname");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");
    if (!fullname.value || !phone.value || !email.value) {
      alert("Formani to'ldiring");
    } else {
      alert("Ma'lumot yuborildi");
      fullname.value = phone.value = email.value = "";
    }
  };
}

let locationBtn = document.querySelector("#locationBtn");
if (locationBtn)
  locationBtn.onclick = () => {
    window.open("https://maps.google.com/?q=Tashkent");
  };

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

if (favoriteBtn)
  favoriteBtn.onclick = () => {
    favModal.style.display = "flex";
  };
if (closeFav)
  closeFav.onclick = () => {
    favModal.style.display = "none";
  };
if (favModal)
  favModal.onclick = (e) => {
    if (e.target == favModal) favModal.style.display = "none";
  };

let contactBtn = document.querySelector("#contactBtn");
if (contactBtn) {
  contactBtn.onclick = () => {
    let name = document.querySelector("#name");
    let phone = document.querySelector("#phoneContact");
    let email = document.querySelector("#emailContact");
    let messageContact = document.querySelector("#messageContact");
    if (!name.value || !phone.value || !email.value) {
      alert("Iltimos formani to'ldiring");
      return;
    }
    alert("Xabaringiz muvaffaqiyatli yuborildi");
    name.value = phone.value = email.value = "";
    if (messageContact) messageContact.value = "";
  };
}

let menuBtn = document.querySelector("#menuBtn");
let nav = document.querySelector("#nav");
if (menuBtn)
  menuBtn.onclick = () => {
    nav.classList.toggle("active");
  };

let statBox = document.querySelectorAll(".statBox");
window.addEventListener("scroll", () => {
  statBox.forEach((box) => {
    if (box.getBoundingClientRect().top < 600) {
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
    if (!isOpen) item.classList.add("open");
  };
});

let loginBtn = document.querySelector("#loginBtn");
let loginModal = document.querySelector("#loginModal");
let closeLogin = document.querySelector("#closeLogin");
let loginSubmit = document.querySelector("#loginSubmit");
let registerSubmit = document.querySelector("#registerSubmit");
let toRegister = document.querySelector("#toRegister");
let toLogin = document.querySelector("#toLogin");
let loginFormEl = document.querySelector(".loginForm");
let registerFormEl = document.querySelector(".registerForm");

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.innerHTML = "👤 " + (user.displayName || user.email.split("@")[0]);
    loginBtn.onclick = (e) => {
      e.preventDefault();
      if (confirm("Chiqmoqchimisiz?")) signOut(auth);
    };
  } else {
    loginBtn.innerHTML = "🔐 Login";
    loginBtn.onclick = (e) => {
      e.preventDefault();
      loginModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    };
  }
});

if (closeLogin)
  closeLogin.onclick = () => {
    loginModal.style.display = "none";
    document.body.style.overflow = "";
  };
if (loginModal)
  loginModal.onclick = (e) => {
    if (e.target == loginModal) {
      loginModal.style.display = "none";
      document.body.style.overflow = "";
    }
  };
if (toRegister)
  toRegister.onclick = () => {
    loginFormEl.style.display = "none";
    registerFormEl.style.display = "flex";
  };
if (toLogin)
  toLogin.onclick = () => {
    registerFormEl.style.display = "none";
    loginFormEl.style.display = "flex";
  };

if (loginSubmit) {
  loginSubmit.onclick = async () => {
    let email = document.querySelector("#loginEmail").value.trim();
    let password = document.querySelector("#loginPassword").value;
    if (!email || !password) {
      alert("Email va parolni kiriting!");
      return;
    }
    try {
      loginSubmit.innerHTML = "Kirilmoqda...";
      await signInWithEmailAndPassword(auth, email, password);
      loginModal.style.display = "none";
      document.body.style.overflow = "";
    } catch (err) {
      if (err.code === "auth/invalid-credential")
        alert("Email yoki parol noto'g'ri!");
      else alert("Xato: " + err.message);
    } finally {
      loginSubmit.innerHTML = "Kirish";
    }
  };
}

if (registerSubmit) {
  registerSubmit.onclick = async () => {
    let name = document.querySelector("#regName").value.trim();
    let email = document.querySelector("#regEmail").value.trim();
    let password = document.querySelector("#regPassword").value;
    if (!name || !email || !password) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    if (password.length < 6) {
      alert("Parol kamida 6 ta belgi!");
      return;
    }
    try {
      registerSubmit.innerHTML = "Ro'yxatdan o'tilmoqda...";
      await createUserWithEmailAndPassword(auth, email, password);
      loginModal.style.display = "none";
      document.body.style.overflow = "";
      alert("Xush kelibsiz, " + name + "!");
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        alert("Bu email allaqachon ro'yxatdan o'tgan!");
      else alert("Xato: " + err.message);
    } finally {
      registerSubmit.innerHTML = "Ro'yxatdan o'tish";
    }
  };
}

document.querySelectorAll(".saleTimer").forEach((timer) => {
  let endDate = new Date(timer.dataset.end);
  let span = timer.querySelector(".timerText");

  function update() {
    let now = new Date();
    let diff = endDate - now;
    if (diff <= 0) {
      span.innerHTML = "Tugadi!";
      return;
    }
    let d = Math.floor(diff / 86400000);
    let h = Math.floor((diff % 86400000) / 3600000);
    let m = Math.floor((diff % 3600000) / 60000);
    let s = Math.floor((diff % 60000) / 1000);
    span.innerHTML = `${d}k ${h}s ${m}d ${s}s`;
  }

  update();
  setInterval(update, 1000);
});

document.querySelectorAll(".saleBuy").forEach((btn) => {
  btn.onclick = () => {
    btn.innerHTML = "Buyurtma qabul ✅";
    setTimeout(() => {
      btn.innerHTML = "Sotib olish";
    }, 2000);
    alert("Buyurtma qabul qilindi!");
  };
});

let videoModal = document.querySelector("#videoModal");
let videoFrame = document.querySelector("#videoFrame");
let closeVideo = document.querySelector("#closeVideo");

document.querySelectorAll(".videoThumb").forEach((thumb) => {
  thumb.onclick = () => {
    let url = thumb.dataset.video;
    videoFrame.src = url;
    videoModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
});

if (closeVideo) {
  closeVideo.onclick = () => {
    videoModal.style.display = "none";
    videoFrame.src = "";
    document.body.style.overflow = "";
  };
}

if (videoModal) {
  videoModal.onclick = (e) => {
    if (e.target == videoModal) {
      videoModal.style.display = "none";
      videoFrame.src = "";
      document.body.style.overflow = "";
    }
  };
}
document.querySelectorAll(".blogBtn").forEach((btn) => {
  btn.onclick = () => {
    alert("Blog sahifasi tez orada ishga tushadi!");
  };
});
