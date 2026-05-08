let cart = [];

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(
      () => (document.getElementById("loader").style.display = "none"),
      1000,
    );
    reveal();
  }, 2000);
};

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId + "-page").classList.add("active");
  if (pageId === "cart") renderCartItems();
  window.scrollTo(0, 0);
  setTimeout(reveal, 100);
}

function addToCart(id, name, price, img) {
  cart.push({ id, name, price, img });
  updateCartCount();
  alert(name + " savatga qo'shildi!");
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("total-price");
  container.innerHTML = cart.length === 0 ? "<h3>Savat bo'sh</h3>" : "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
            <div class="cart-item" style="display:flex; align-items:center; justify-content:space-between; background:var(--card-bg); padding:15px; margin-bottom:10px; border-radius:10px;">
                <img src="${item.img}" style="width:80px; border-radius:5px;">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString()}</p>
                <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </div>`;
  });
  totalEl.innerText = "$" + total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

function checkout() {
  if (cart.length === 0) return alert("Savat bo'sh!");
  alert("Xarid muvaffaqiyatli yakunlandi!");
  cart = [];
  updateCartCount();
  showPage("home");
}

document.querySelectorAll(".acc-header").forEach((header) => {
  header.onclick = () => {
    const item = header.parentElement;
    item.classList.toggle("active");
    const icon = header.querySelector("i");
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");
  };
});

function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
      if (el.id === "stats-section") startCounters();
    }
  });
}

function startCounters() {
  document.querySelectorAll(".counter").forEach((counter) => {
    if (counter.innerText !== "0") return;
    const target = +counter.getAttribute("data-target");
    const update = () => {
      const c = +counter.innerText;
      const inc = target / 50;
      if (c < target) {
        counter.innerText = Math.ceil(c + inc);
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}
document.querySelectorAll(".acc-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.classList.toggle("active");

    const icon = header.querySelector("i");
    if (item.classList.contains("active")) {
      icon.classList.replace("fa-plus", "fa-minus");
    } else {
      icon.classList.replace("fa-minus", "fa-plus");
    }
  });
});

document.querySelector(".reg-btn").addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    document.getElementById("nav-links").classList.remove("active");
  }
});
window.addEventListener("scroll", reveal);
document.getElementById("theme-toggle").onclick = () =>
  document.body.classList.toggle("dark-theme");
document.getElementById("burger").onclick = () =>
  document.getElementById("nav-links").classList.toggle("active");
