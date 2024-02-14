$("#select").dropdown();

$(".ui.dropdown").dropdown();

$(".ui.form").form({
  fields: {
    gender: "empty",
    name1: "empty",
    name2: "empty",
  },
});
$("#wer").change(() => {
  const selectVale = $(".selectVale").text();
  console.log(selectVale);

  const nameText = $("#nameText").val();
  console.log(nameText);
  const translateText = $("#translateText").val();
  console.log(translateText);
  // Хэрэглэгчээс авсан датаг Firebase-д хадгалах
  db.collection(selectVale)
    .doc(nameText)
    .set({
      Name: nameText,
      Translate: translateText,
    })
    .then(() => {
      // getform.reset();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

$(".item").addClass("!text-sm");

$("#select").change(function () {
  //Use $option (with the "$") to see that the variable is a jQuery object
  var $option = $(this).find("option:selected");
  //Added with the EDIT
  var sukeValue = $option.val(); //to get content of "value" attrib
  console.log(sukeValue);
  if (sukeValue) {
    $(".mainName").replaceWith(
      `<span class="mainName text-2xl uppercase">${sukeValue} </span>`
    );
    $(".mainSub").replaceWith(
      `<span class="mainSub text-xs text-gray-400">${sukeValue} -н холбоотой үгнүүд </span>`
    );
  }

  // Хэрэглэгчээс авсан датаг дэлгэцэнд гарах
  const current = document.querySelector(".word");
  const btnNext = document.querySelector(".next");
  const btnHold = document.querySelector(".hold");
  const current2 = document.querySelector(".tran");

  current2.classList.add("hidden");
  btnHold.addEventListener("click", function () {
    html = `<span class="translate">$rename2$</span>`;
    html = html.replace("$rename2$", translate);
    current2.innerHTML = html;

    current2.classList.remove("hidden");
  });

  btnNext.addEventListener("click", function () {
    db.collection(sukeValue).onSnapshot(function (querySnapshot) {
      let books = [];
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          books.push({ ...change.doc.data() });
        }
      });
      let randomItem = books[Math.floor(Math.random() * books.length)];
      let rename = randomItem.Name;
      current2.classList.add("hidden");
      html = `<h2 class="text-3xl font-Rubik">$rename1$</h2>`;
      html = html.replace("$rename1$", rename);
      current.innerHTML = html;

      res = books.findIndex(result);
      function result(value) {
        return value === randomItem;
      }
      translate = books[res].Translate;
    });
  });
});

$("#admin").on("click", function () {
  $("#menu").toggleClass("!hidden");
});
