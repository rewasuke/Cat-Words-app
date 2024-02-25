var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "mn";

$("#gLogin").on("click", function () {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      if (user.uid === "JVcxs3keNJMnUjfa0EAQHCyHmwN2") {
        $("#gLogin").addClass("!hidden");
        $("#logout").removeClass("!hidden");
        $("#adminName").removeClass("!hidden");
        $(".profile").attr("src", photoURL);
        $(".dot").addClass("bg-teal-400");
        $("#adminName").replaceWith(
          `<span class="item " id="adminName">
          <span class="">Admin:</span>
          <span class="text-cyan-500 px-2">${displayName}</span>
          </span>`
        );
        $("#modal1").removeAttr("disabled");
        $("#toastLogin").removeClass("hidden");
      }
      $("#toast1").addClass("hidden");
      setTimeout(function () {
        $("#toastLogin").addClass("hidden");
      }, 2000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

$("#logout").on("click", function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      $("#gLogin").removeClass("!hidden");
      $("#adminName").addClass("!hidden");
      $("#logout").addClass("!hidden");
      $("#modal1").attr("disabled", true);
      $("#toast1").removeClass("hidden");
      $(".profile").attr("src", "./assests/man1.png");
      $(".dot").removeClass("bg-teal-400");
    })
    .catch((error) => {});
});

$("#toast1").on("click", function () {
  $("#toastModal").removeClass("hidden");
  setTimeout(function () {
    $("#toastModal").addClass("hidden");
  }, 2000);
});

$("#exit").on("click", function () {
  $("#toastOut").removeClass("hidden");
  setTimeout(function () {
    $("#toastOut").addClass("hidden");
  }, 2000);
});

$(".ui.form").form({
  fields: {
    field1: "empty",
    field2: "empty",
  },
});

$("#select").dropdown();
$(".dropdown").dropdown();

var term55;
$(".myReset").change(function (e) {
  e.preventDefault;
  if (!e) var e = window.e;
  term55 = $(this).find(":selected").val();
});

const sbtn = document.getElementById("save_btn");
sbtn.addEventListener("click", function (e) {
  e.preventDefault();
  const form2 = document.querySelector(".save_form2");
  const nameText = document.querySelector(".name_field").value;
  const translateText = document.querySelector(".translate_field").value;

  if (nameText === "") {
  } else {
    // Хэрэглэгчээс авсан датаг Firebase-д хадгалах
    db.collection(term55)
      .doc(nameText)
      .set({
        Name: nameText,
        Translate: translateText,
      })
      .then(() => {
        $(".ui.dropdown").dropdown("clear");
        form2.reset();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
});

$(".item").addClass("!text-sm");

function toastCheck() {
  if ($("#select option:selected").val() === "") {
    $("#toastInit").removeClass("hidden");
    setTimeout(function () {
      $("#toastInit").addClass("hidden");
    }, 2000);
  }
}
$("#next").on("click", function () {
  toastCheck();
});
$("#orchuulga").on("click", function () {
  toastCheck();
});

$("#select").change(function () {
  //Use $option (with the "$") to see that the variable is a jQuery object
  var $option = $(this).find("option:selected");
  //Added with the EDIT
  var sukeValue = $option.val(); //to get content of "value" attrib

  if (sukeValue) {
    $(".mainName").replaceWith(
      `<span class="mainName text-2xl uppercase">${sukeValue} </span>`
    );
    $(".mainSub").replaceWith(
      `<span class="mainSub text-xs text-gray-400">${sukeValue} -н цээжлэх үгнүүд
   </span>`
    );
  }

  // Хэрэглэгчээс авсан датаг дэлгэцэнд гарах
  const current = document.querySelector(".word");
  const btnNext = document.querySelector(".next");
  const btnHold = document.querySelector(".hold");
  const current2 = document.querySelector(".tran");

  current2.classList.add("hidden");

  function getImage(num) {
    let storage = firebase.storage();
    var pathReference = storage.ref(`images/${num}.jpg`);

    pathReference.getDownloadURL().then(function (url) {
      var img = document.querySelector(".picture");
      img.setAttribute("src", url);
    });
  }

  let books = [];
  db.collection(sukeValue).onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        books.push({ ...change.doc.data() });
      }
    });
    // // Санамсаргүй үгийг авах
    // let randomItem = books[Math.floor(Math.random() * books.length)];
    // let rename = randomItem.Name;

    // current2.classList.add("hidden");
    // html = `<h2 class="text-[3rem] font-Rubik">$rename1$</h2>`;
    // html = html.replace("$rename1$", rename);
    // current.innerHTML = html;

    // res = books.findIndex(result);
    // function result(value) {
    //   return value === randomItem;
    // }
    // translate = books[res].Translate;
  });

  var texts = ["1", "2", "3"],
    index1 = 0;
  // Товч ашиглан утгыг авах

  btnNext.addEventListener("click", function () {
    $(".picture").addClass("hidden");

    if (sukeValue === "Дүрэм") {
      index1++;
      index1 %= texts.length;
      resultNum = texts[index1];

      getImage(resultNum);

      $(".picture").removeClass("hidden");
    }
    clickDown();
  });

  $(document).keydown(function (e) {
    // CTRL A
    if (e.which === 39) {
      clickDown();
    }
  });
  function clickDown() {
    next(books);
    current2.classList.add("hidden");
    if (rename === undefined) {
      current.innerHTML = "";
    } else {
      html = `<h2 class="text-[3rem] font-Rubik">$rename1$</h2>`;
      html = html.replace("$rename1$", rename);
      current.innerHTML = html;
    }
  }

  let index = 0;
  let rename;
  function next(books) {
    if (!books.length == 0) {
      if (index < books.length) {
        rename = books[index].Name;
        index++;
      } else {
        index = 0;
        rename = books[index].Name;
        index++;
      }
      if (sukeValue) {
        $(".mainSub").replaceWith(
          `<span class="text-center mainSub text-xs text-gray-400 ">${sukeValue} -н цээжлэх үгнүүд
       <p class="inline-block w-4 text-right ">${index}</p> /<p class="inline-block w-4 text-right ">${books.length}</p>
       </span>`
        );
      }
    }
  }

  btnHold.addEventListener("click", function () {
    clickHold();
    current2.classList.remove("hidden");
  });
  $(document).keydown(function (e) {
    // CTRL A
    if (e.which === 40) {
      clickHold();
    }
  });

  function clickHold() {
    translate = books[index - 1].Translate;
    html = `<span class=" text-2xl translate">$rename2$</span>`;
    html = html.replace("$rename2$", translate);
    current2.innerHTML = html;
  }
});

$("#admin").on("click", function () {
  $("#menu").toggleClass("!hidden");
});
