window.onload = function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const oneYears = document.querySelector(".vision-folder-1 > img");
  const threeYears = document.querySelector(".vision-folder-3 > img");

  // aos 연결
  AOS.init();

  // projects json 연결
  fetch("../assets/project.json")
    .then((res) => res.json())
    .then((result) => {
      makeList(result);
    });

  // makeList에 내용 밀어넣기
  function makeList(data) {
    swiperWrapper.innerHTML = null;
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "projects-box swiper-slide";
      div.innerHTML = `
      <div class="projects-box-header">${item.title}</div>
      <div class="projects-box-img"><img src="${item.image}" /></div>
      <div class="projects-box-txt"><div class="projects-box-subtitle">${item.subtitle}</div></div>
      <div class="projects-link"><a href="${item.link}" target="_blank" class="projects-link-demo">Demo</a><a href="${item.github}" class="projects-link-github" target="_blank">Github</a></div>
      `;
      swiperWrapper.appendChild(div);
    });
  }

  // Swiper 작동
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // 비전 타이핑 효과
  const visionTxt = document.querySelector(".vision-right-txt");
  let letters = ["폴더를 클릭해 주세요!"];

  let proc = {};

  oneYears.addEventListener("click", function () {
    if (!proc.oneYears) {
      proc.oneYears =
        "주어진 일에 최선을 다하고 있을 것입니다. 늘 배운다는 자세로 퇴근 후와 주말에도 새로운 기술을 익히기 위해 공부할 것입니다. 매일 조금씩 성장하여 제가 꿈꾸는 개발자의 모습에 가까워지겠습니다.";
    }
  });

  threeYears.addEventListener("click", function () {
    if (!proc.oneYears) {
      proc.oneYears = "초심 그대로 최신 언어와 기술을 익히는 데에 소홀하지 않을 것입니다. 맡은 일에 책임감을 가지고 임하는 훌륭한 프론트엔드 개발자가 되겠습니다.";
    }
  });
  // 속도
  const speed = 100;
  let i = 0;
  // 타이핑 효과
  const typing = async () => {
    for (const p in proc) {
      typingProc(proc[p]);
      return delete proc[p];
    }
    typingProc("폴더를 클릭하고 기다려 주세요!");
  };

  const typingProc = async (msg) => {
    const letter = msg.split("");
    while (letter.length) {
      await wait(speed);
      visionTxt.innerHTML += letter.shift();
    }
    // 잠시 대기
    await wait(800);
    // 지우기
    remove(msg);
  };
  // 글자 지우기
  const remove = async (msg) => {
    const letter = msg.split("");
    while (letter.length) {
      await wait(speed);
      letter.pop();
      visionTxt.innerHTML = letter.join("");
    }
    // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
    i = !letters[i + 1] ? 0 : i + 1;

    running = null;

    //다음꺼 있으면 실행.
    typing();
  };
  // 딜레이 기능
  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  // 초기 실행
  let running = setTimeout(typing, 0);

  oneYears.addEventListener('click', function () {
    this.src = "../icon/openFolder.png"
    threeYears.src = "../icon/folder.png"
  })

  threeYears.addEventListener('click', function () {
    this.src = "../icon/openFolder.png"
    oneYears.src = "../icon/folder.png"
  })
};

//1년 폴더를 누르면 폴더 이미지가 바뀌고, 3년 폴더를 누르면 1년 폴더는 원래대로 돌아오고 3년 폴더만 바뀜 다시 1년 폴더를 누르면 3년 폴더는 원래대로
