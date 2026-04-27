// 1. Sahifalarni almashtirish funksiyasi
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId + "-page").classList.add("active");
  document.getElementById("nav-links").classList.remove("active"); // Mobil menyuni yopish
  window.scrollTo(0, 0);
}

// 2. Mobil menyu (Burger)
document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("active");
});

// 3. Ko'proq moshinalar ro'yxati (12 ta)
const carData = [
  {
    name: "BMW M5 CS",
    price: "$142,000",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
  },
  {
    name: "Mercedes G63",
    price: "$185,000",
    img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=500",
  },
  {
    name: "Tesla Model X",
    price: "$110,000",
    img: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500",
  },
  {
    name: "Audi RS6",
    price: "$120,000",
    img: "https://cdn.motor1.com/images/mgl/Wpyro/s1/audi-rs6-avant-by-wheelsandmore-lead-image.jpg",
  },
  {
    name: "Porsche 911",
    price: "$135,000",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
  },
  {
    name: "Lamborghini Urus",
    price: "$230,000",
    img: "https://images.unsplash.com/photo-1582010905429-bef463482aa2?w=500",
  },
  {
    name: "Ferrari Roma",
    price: "$220,000",
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=500",
  },
  {
    name: "Rolls Royce Cullinan",
    price: "$350,000",
    img: "https://cdn.bmwblog.com/wp-content/uploads/2022/04/Rolls-Royce-Cullinan-Keyvany-Hayula-6.jpg",
  },
  {
    name: "Range Rover",
    price: "$105,000",
    img: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=500",
  },
  {
    name: "Ford Mustang GT",
    price: "$55,000",
    img: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=500",
  },
  {
    name: "Nissan GTR",
    price: "$115,000",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500",
  },
  {
    name: "Toyota Supra",
    price: "$60,000",
    img: "https://hips.hearstapps.com/hmg-prod/images/2026-toyota-gr-supra-mkv-final-edition-106-67ed5d3eedce8.jpg?crop=1.00xw:0.855xh;0,0.0775xh&resize=1200:*",
  },
];

// Moshinalarni chiqarish
const carList = document.getElementById("car-list");
carData.forEach((car) => {
  carList.innerHTML += `
        <div class="car-card">
            <img src="${car.img}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p style="color:red; font-weight:bold">${car.price}</p>
            </div>
        </div>
    `;
});

// 4. Registratsiya formasi
document.getElementById("reg-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = document.getElementById("success-msg");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
    this.reset();
    showPage("home");
  }, 2000);
});
