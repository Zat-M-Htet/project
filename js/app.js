//Selectors
const app = document.querySelector("#app");
const listBuilder = document.querySelector("#listBuilder");
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#addBtn");
const doneListCounter = document.querySelector("#doneListCounter");
const totalListCounter = document.querySelector("#totalListCounter");
const lists = document.querySelector("#lists");
// const textInput = document.querySelector("#textInput");

//Functions

const getRanInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const makeListId = (length) => {
  let char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  // console.log(char.length);
  let result = "";
  for (i = 1; i <= length; i++) {
    result += char[getRanInteger(0, char.length)];
  }
  return result;
};
// console.log(makeListId(5));
// console.log(makeListId(15));
// console.log(makeListId(25));

// console.log(getRanInteger(0,62));

const countList = () => {
  const totalList = lists.querySelectorAll(".list").length;
  totalListCounter.innerText = totalList;

  doneListCounter.innerText = lists.querySelectorAll(
    ".list-checker [type='checkbox']:checked"
  ).length;

  if (totalList === 0) {
    lists.innerHTML = `
    <div class=" text-center empty-stage">
      <div>
      <img width=100 src="./images/undraw.svg" class=" mb-3 mt-5">

        <p >There is no List</p>;
      </div>
    </div>`;
  } else {
    lists.querySelector(".empty-stage")?.remove();
  }
};

const createList = (textList) => {
  const checkerId = makeListId(10);

  const list = document.createElement("div");
  list.classList.add("list");

  list.innerHTML = `
      <div
          class="animate__animated animate__lightSpeedInLeft border border-2 border-primary p-3 d-flex justify-content-between align-items-start mb-3"
          >
              <div class="form-check list-checker">
                  <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="${checkerId}"
                  />
                  <label class="form-check-label list-label" for="${checkerId}">
                      ${textList}
                  </label>
              </div>
              <div class=" list-control">
                  <button class=" btn btn-outline-primary list-edit-btn">
                      <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-primary list-del-btn">
                      <i class="bi bi-trash3"></i>
                  </button>
              </div>
      </div>
      `;

  const listDelBtn = list.querySelector(".list-del-btn");

  listDelBtn.addEventListener("click", () => {
    const decision = window.confirm("Are u sure delete?");
    // decision && list.remove();
    if (decision) {
      list
        .querySelector(".animate__animated")
        .classList.add("animate__lightSpeedOutRight");
      list
        .querySelector(".animate__animated")
        .addEventListener("animationend", () => {
          list.remove();
          countList();
        });
    }

    // if (decision) {
    //   list.remove();
    // }
  });

  const listChecker = list.querySelector(".list-checker");
  listChecker.addEventListener("click", () => {
    // console.log("u check");
    list
      .querySelector(".list-label")
      .classList.add("text-decoration-line-through");
    // list
    //   .querySelector(".animate__animated")
    //   .classList.replace("animate__lightSpeedInLeft", "animate__shakeX");
    list.querySelector(".animate__animated").classList.add("animate__shakeX");
    countList();
  });

  const listEditBtn = list.querySelector(".list-edit-btn");
  const listLabel = list.querySelector(".list-label");

  listEditBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.value = listLabel.innerText;
    editInput.classList.add("form-control");

    listLabel.innerText = null;
    listLabel.append(editInput);

    editInput.addEventListener("blur", () => {
      listLabel.innerText = editInput.value;
    });
    //  console.log("u edit");
  });

  return list;
};

const handleNewList = () => {
  const list = createList(textInput.value);
  lists.append(list);

  list
    .querySelector(".animate__animated")
    .addEventListener("animationend", () => {
      list
        .querySelector(".animate__animated")
        .classList.remove("animate__lightSpeedInLeft", "animate__shakeX");
    });

  countList();

  textInput.value = null;
}

//Process

countList();
addBtn.addEventListener("click", handleNewList);

textInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleNewList();
  }
});
// const obj ={
//   a: "aaa",
//   b: "bbb",
// c: {
//   x:"xxx",
//   y:"yyy",
//   z:"zzz"
// }
// }
// console.log(obj.a);
// console.log(obj.b);
// console.log(obj.c?.e);
