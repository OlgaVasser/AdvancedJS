document.getElementById("main_form").addEventListener("submit", (event) => {
  validateName(event);
  validateNumber(event);
  validateEmail(event);
});

function validateName(event) {
  let input = document.getElementById("name");
  if (!input.value.match(/^[a-zа-яё]+$/i)) {
    input.style.border = "1px solid red";
    alert("Ошибка! Имя должно содержать только буквы!");
    event.preventDefault(); // Магия...
  } else {
    input.style.border = "1px solid #ced4da";
  }
}

function validateNumber(event) {
  let input = document.getElementById("number");
  if (!input.value.match(/^\+7\(\d{3}\)\d{3}\-\d{4}$/)) {
    input.style.border = "1px solid red";
    alert("Ошибка! Номер телефона должен бытъ в формате +7(000)000-0000!");
    event.preventDefault();
  } else {
    input.style.border = "1px solid #ced4da";
  }
}

function validateEmail(event) {
  let input = document.getElementById("email");
  if (!input.value.match(/^[a-z\.\-]+\@mail\.ru$/)) {
    input.style.border = "1px solid red";
    alert("Ошибка! Проверьте правильность эл.почты!");
    event.preventDefault();
  } else {
    input.style.border = "1px solid #ced4da";
  }
}
