export function initializeRouteSearch() {
  const routeBoxContainer = document.querySelector(".route-box-container");
  const routeBoxes = document.querySelectorAll(".route-box");

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  function updateSlidePosition() {
    const offset = -currentIndex * 100;
    routeBoxContainer.style.transform = `translateX(${offset}%)`;
  }

  routeBoxContainer.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  routeBoxContainer.addEventListener("touchmove", function (e) {
    if (!isDragging) return;

    const moveX = e.touches[0].clientX;
    const distance = moveX - startX;

    if (distance > 50) {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
      isDragging = false;
    } else if (distance < -50) {
      if (currentIndex < routeBoxes.length - 1) {
        currentIndex++;
        updateSlidePosition();
      }
      isDragging = false;
    }
  });

  routeBoxContainer.addEventListener("touchend", function () {
    isDragging = false;
  });

  updateSlidePosition(); // 초기 위치 설정
}
