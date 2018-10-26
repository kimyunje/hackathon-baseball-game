// BaseballGameLogic 생성자 정의
class BaseballGameLogic {
  // 초기화
  init() {
    this.randomStrike = this.getRandomArray();
  }

  // 3개의 겹치지 않는 랜덤 수를 담은 배열을 반환한다.
  getRandomArray() {
    const randoms = [null, null, null];
    for (let i = 0; i < 3; ) {
      const random = Math.ceil(Math.random() * 9);
      if (!randoms.includes(random)) {
        randoms[i] = random;
        i++;
      }
    }
    return randoms;
  }

  // 배열을 받아 구해놓은 랜덤 수랑 자리가 얼마나 일치하는 지 객체를 반환하는 함수
  // 일치하는 수가 없으면 null을 반환
  checkArray(arr) {
    const result = {
      strike: 0,
      ball: 0
    };
    for (let i = 0; i < 3; i++) {
      if (parseInt(arr[i]) === this.randomStrike[i]) {
        result.strike++;
      } else if (this.randomStrike.includes(parseInt(arr[i]))) {
        result.ball++;
      }
    }
    console.log(result);
    return result;
  }

  //정답의 배열과 입력배열이 같을 때 homerun창을 띄워주는 코드
  rightAnswer() {
    if (this.randomStrike === pitchDigitsArray) {
      const rightEl = document.querySelector(".right");
      rightEl.classList.add("active");
    }
  }
}

// BaseballGameLogic 생성자를 통한 game 객체 생성
const game = new BaseballGameLogic();
const pitchDigitsArray = [null, null, null];
const background = document.querySelector("body");
const pitch = document.querySelector(".pitch");
const pitchDigits = pitch.querySelectorAll(".pitch-input__digit");
const pitchMessage = pitch.querySelector(".pitch-message");
const buttonPitch = pitch.querySelector(".pitch-input__btn-pitch");
const buttonRestart = pitch.querySelector(".pitch-input__btn-restart");
const gameResultList = document.querySelector(".game-result__list");

// 숫자인지 확인하기 위해
// 정규식 표현으로 [x-y] x~y 사이의 문자중에 하나를 찾습니다.
const reg = new RegExp(/[0-9]/);

// 배경 이미지 배열
const bgArr = ["img-bg1", "img-bg2", "img-bg3"];

// 화면 초기화
function gameInit() {
  game.init();

  background.classList.add(bgArr[Math.floor(Math.random() * 3)]);

  // 랜덤 숫자 확인용
  console.log(...game.randomStrike);
  // 첫 인풋에 포커스를 넣어준다.
  pitchDigits[0].focus();
}

// 결과값을 담은 리스트 아이템을 만들어주는 코드
function render(arr) {
  const { strike, ball } = game.checkArray(arr);
  const item = document.createElement("li");
  item.classList.add("result-list");

  const countEl = document.createElement("div");
  countEl.innerHTML = `${count + 1} 회`;
  item.appendChild(countEl);
  countEl.classList.add("count");
  // 입력 값 HTML 코드 추가
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("span");
    el.textContent = arr[i];
    item.appendChild(el);
  }
  const txtEl = document.createElement("div");
  txtEl.classList.add("txt");
  // 내부 로직에서 구한 값 HTML 코드 추가
  txtEl.innerHTML =
    strike === 0 && ball === 0
      ? ` <em>OUT</em>`
      : ` <em>${ball}</em> B <em>${strike}</em> S`;
  item.appendChild(txtEl);
  return item;
}

//에러메세지를 사라지게 하는 코드
function removeValidMessage() {
  pitchMessage.classList.remove("pitch-message--invalid");
  pitchMessage.textContent = "";
}

gameInit();

// 숫자 입력 로직
pitchDigits.forEach((item, index, arr) => {
  item.addEventListener("keyup", e => {
    // 입력은 한 글자만 받고 숫자만 입력받는다.
    const inputValue = item.value;
    if (
      inputValue != null &&
      pitchDigitsArray.indexOf(inputValue) !== -1 &&
      pitchDigitsArray.indexOf(inputValue) !== index
    ) {
      pitchMessage.classList.add("pitch-message--invalid");
      pitchMessage.textContent = `중복되는 수입니다.`;
    } else if (
      inputValue != null &&
      (reg.test(inputValue) && inputValue.length === 1)
    ) {
      pitchDigitsArray[index] = inputValue;
      item.nextElementSibling.focus();
      removeValidMessage();
      // console.log(item.value);
    } else if (inputValue) {
      pitchMessage.classList.add("pitch-message--invalid");
      pitchMessage.textContent = `유효한 수가 아닙니다. 0에서 9사이의 수를 입력해주세요.`;
    } else {
      removeValidMessage();
    }
    // console.log(pitchDigitsArray, inputValue,  pitchDigitsArray.includes(inputValue))
    // 다음 입력으로 포커스 맞추기
  });
});

// pitch 버튼이 눌리면, pitchDigitsArray 값이 유효한 지 확인,
// 유효하지 않으면 동작하지 않음
// pitchDigitsArray의 배열을 체크해서 생성된 난수 배열과 맞는지 확인
// pitchDigitsArray 배열의 값을 초기화(null로)
let count = 0;
//몇회인지 세는 변수
buttonPitch.addEventListener("click", e => {
  // console.log(pitchDigitsArray);
  if (pitchDigitsArray.some(item => null || !reg.test(item))) {
    return false;
  }

  //게임이 9회까지만 실행되도록한다.
  if (count < 9 || strike !== 3) {
    gameResultList.appendChild(
      render(pitchDigitsArray),
      gameResultList.firstChild
    );
  }

  // 초기화
  for (let i = 0; i < 3; i++) {
    pitchDigitsArray[i] = null;
    pitchDigits[i].value = null;
    console.log("boo");
  }
  pitchDigits[0].focus();
  // console.log(pitchDigitsArray);
  count++;
});

//정답이면 홈런창을 띄워주는 코드
game.rightAnswer();

buttonRestart.addEventListener("click", e => {
  gameInit();
  // pitchDigits 비워준다. gameResultList도 비워줘야함
  console.log(pitchDigitsArray);
  removeValidMessage();
  pitchDigits.forEach(item => {
    item.value = null;
  });
  gameResultList.textContent = "";
});
