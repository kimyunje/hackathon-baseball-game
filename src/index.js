// 중복 없이 랜덤 생성
function getRandomAnswer() {
  const randomArr = [];
     do {
       const randomNum = Math.ceil(Math.random() * 9);
       if (!randomArr.includes(randomNum)) {
        randomArr.push(randomNum);
       }
     } while(randomArr.length < 3);
     return randomArr;
   }
   getRandomAnswer()

  let randomAnswer = getRandomAnswer();
  // console.log(`randomAnswer: ${randomAnswer}`)

  // 랜덤으로 받은 숫자가 문자열로 받은 숫자랑 비교
  function checkArray(arr) {
    // 볼 점수 상태
    let ball = 0
    // 스트라이크 점수 상태
    let strike = 0
    for (i =0; i<3; i++){
      if (arr.includes(randomAnswer[i])){
        ball++
        if(arr.indexOf(randomAnswer[i]) === i){
          strike++
        }
      }
    }
      // console.log(`checkArray: ${arr}`)
      // console.log(`ball: ${ball}`)
      // console.log(`strike: ${strike}`)
      return ball === 0 && strike === 0 ? 'OUT' : `${ball}B ${strike}S`
  }
  //입력값을 출력하는 코드
  const pitchDigitsArray = [null, null, null];
  const pitch = document.querySelector('.pitch');
  const pitchDigits = pitch.querySelectorAll('.pitch-input__digit');
   const pitchMessage = pitch.querySelector('.pitch-input__message');
   console.log(pitch, pitchDigits);
   const reg = new RegExp(/[1-9]/);
   // 첫 인풋에 포커스를 넣어준다.
   pitchDigits[0].focus();
   pitchDigits.forEach((item, index, arr) => {
     item.addEventListener('keyup', e => {
       // 입력은 한 글자만 받고 숫자만 입력받는다.
       const inputValue = item.value;
       if (inputValue != null && pitchDigitsArray.includes(inputValue)) {
         pitchMessage.textContent = `중복되는 값입니다.`;
       } else if (inputValue != null && (reg.test(inputValue) && inputValue.length === 1)) {
         pitchDigitsArray[index] = inputValue;
         item.nextElementSibling.focus();
         pitchMessage.textContent = '';
         console.log(item.value);
       } else if (inputValue) {
         pitchMessage.textContent = `유효한 값이 아닙니다.`;
       } else {
         pitchMessage.textContent = '';
       }
       console.log(pitchDigitsArray, inputValue,  pitchDigitsArray.includes(inputValue))
       // 다음 입력으로 포커스 맞추기
     });
   });
