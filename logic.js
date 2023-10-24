let display = document.getElementById('display');
let out = document.getElementById('out');

let ac = document.getElementById('AC');
let negative = document.getElementById('negative');
let percent= document.getElementById('percent');

let number_1 = document.getElementById('number_1');
let number_2 = document.getElementById('number_2');
let number_3 = document.getElementById('number_3');
let number_4 = document.getElementById('number_4');
let number_5 = document.getElementById('number_5');
let number_6 = document.getElementById('number_6');
let number_7 = document.getElementById('number_7');
let number_8 = document.getElementById('number_8');
let number_9 = document.getElementById('number_9');
let number_0 = document.getElementById('number_0');
let comma = document.getElementById('comma');

let division = document.getElementById('division');
let multiple = document.getElementById('multiple');
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let equal = document.getElementById('equal');
// Объявляем массив
let summary = [];
let lastElem = summary.slice(-1);

// Обновление данных на "дисплее"
function updateOutput(){
  if (isFirstElementComma()) {
    out.innerHTML = '';
  } else {
    out.innerHTML = summary.join('');
  }
};

// Обработчики событий для кнопок удаления, процентов, и отриц.знач.
ac.addEventListener('click', function(){
    summary.length = 0;
    updateOutput();  
});
// TODO!!!
percent.addEventListener('click', function(){
  let final;
  let mainNum = parseFloat(summary[0]);
  let percentQuantity = parseFloat(summary[2]);
  let finalPercent = percentQuantity / 100;
  let operator = summary[1];
  
  switch (operator) {
    case '+':
      final = mainNum + finalPercent;
      break;
    case '-':
      final = mainNum - finalPercent;
      break;
    case 'x':
      final = mainNum * finalPercent;
      break;
    case '/':
      final = mainNum / finalPercent;
      break;
    default:
      console.log('Ошибка: Неверный оператор');
      return;
  }
  summary = [final.toString()]; 
  updateOutput(summary);
});
negative.addEventListener('click', function() {
  if (!isLastElementOperatorOrZero() && !isFirstElementComma()) {
    let lastNumberIndex = summary.length - 1;
    let lastNumber = parseFloat(summary[lastNumberIndex]);
    summary[lastNumberIndex] = (-lastNumber).toString();
    
    updateOutput();
  }
});



// Обработчики событий для цифр
number_1.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('1');
    updateOutput();
  } 
    
});
number_2.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('2');
    updateOutput();
  } 
});
number_3.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('3');
    updateOutput();
  } 
});
number_4.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('4');
    updateOutput();
  } 
});
number_5.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('5');
    updateOutput();
  } 
});
number_6.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('6');
    updateOutput();
  } 
});
number_7.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('7');
    updateOutput();
  } 
});
number_8.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('8');
    updateOutput();
  } 
});
number_9.addEventListener('click', function(){
  if (summary.length < 12){
    summary.push('9');
    updateOutput();
  } 
});
number_0.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero()){
    summary.push('0');
    updateOutput();
  } 
});

// Обработчики событий для операторов
division.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero()) {
    summary.push('/');
    updateOutput();
  }
});
multiple.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero()) {
    summary.push('x');
    updateOutput();
  }
});
minus.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero()) {
    summary.push('-');
    updateOutput();
  }
});
plus.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero()) {
    summary.push('+');
    updateOutput();
  }
});
comma.addEventListener('click', function(){
  if (summary.length < 12 && !isLastElementOperatorOrZero() && !isFirstElementComma()) {
    summary.push('.');
    updateOutput();
  }
});
equal.addEventListener('click', calculate);


// Проверяем, не яляется ли последний элемент оператором, нулем, или точкой
function isLastElementOperatorOrZero() {
  if (summary.length === 0) {
    return false;
  }
  const lastElement = summary[summary.length - 1];
  return lastElement === '+' || lastElement === '-' || lastElement === 'x' || lastElement === '/' || lastElement === '.' || lastElement === '0';
    
};
// Является ли первый символ точкой
function isFirstElementComma(){
  if (summary.length === 0) {
    return false;
  }
  const firstElement = summary[0];
  return firstElement === '.'
};

// Основная функция рассчета
function calculate() {
    if (summary.length > 0) {
      // Создаем стек для операций и чисел
      let stack = [];
      let currentNumber = '';
  
      // Проходим по всем элементам массива summary
      summary.forEach(item => {
        if (item === ' + ' || item === ' - ' || item === ' x ' || item === ' / ') {
          // Если текущий элемент является оператором, то сохраняем предыдущее число и оператор в стек
          stack.push(parseFloat(currentNumber));
          stack.push(item);
          currentNumber = '';
        } else {
          // Если текущий элемент - число, то добавляем его в текущее число (currentNumber)
          currentNumber += item;
        }
      });
  
      // Добавляем последнее число в стек
      stack.push(parseFloat(currentNumber));
  
      // Выполняем вычисления, используя стек
      let result = stack[0];
      for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i];
        const nextNumber = stack[i + 1];
    
        switch (operator) {
            case '+':
              result += nextNumber;
              break;
            case '-':
              result -= nextNumber;
              break;
            case 'x':
              result *= nextNumber;
              break;
            case '/':
              result /= nextNumber;
              break;
            default:
              console.log('Ошибка: Неверный оператор');
              
          }
        }
        // Ограничиваем результат до 12 символов
      if (result.toString().length > 12) {
      result = parseFloat(result.toFixed(12));
      }
        // Выводим результат вычисления
      summary = [result.toString()];
      updateOutput();
              
      } else {
        out.innerHTML('Ошибка: Недостаточно данных для вычисления');
      }
}
    
