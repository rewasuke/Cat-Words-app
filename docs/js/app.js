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
      if (user.uid === "JVcxs3keNJMnUjfa0EAQHCyHmwN2") {
        $("#gLogin").addClass("!hidden");
        $("#logout").removeClass("!hidden");
        $("#adminName").removeClass("!hidden");
        $("#adminName").replaceWith(
          `<span class="item " id="adminName">
          <span class="">Admin:</span>
          <span class="text-cyan-500 px-2">${displayName}</span>
          </span>`
        );
        $("#modal1").removeAttr("disabled");
        $("#modal2").removeAttr("disabled");
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
      $("#modal2").attr("disabled", true);
      $("#toast1").removeClass("hidden");
    })
    .catch((error) => {});
});

$("#toast1").on("click", function () {
  $("#toastModal").removeClass("hidden");
  setTimeout(function () {
    $("#toastModal").addClass("hidden");
  }, 1000);
});
$("#exit").on("click", function () {
  $("#toastOut").removeClass("hidden");
  setTimeout(function () {
    $("#toastOut").addClass("hidden");
  }, 2000);
});

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

// jQuery with CSS Media Queries
$(window).resize(function () {
  if ($("#body").width() <= 640) {
    $("#modal2").removeClass("hidden");
    $("#modal1").addClass("hidden");
  } else {
    $("#modal1").removeClass("hidden");
    $("#modal2").addClass("hidden");
  }
});

$(".item").addClass("!text-sm");

$("#next").on("click", function () {
  if ($("#select option:selected").val() === "") {
    $("#toastInit").removeClass("hidden");
    setTimeout(function () {
      $("#toastInit").addClass("hidden");
    }, 1000);
  }
});
$("#translate").on("click", function () {
  if ($("#select option:selected").val() === "") {
    $("#toastInit").removeClass("hidden");
    setTimeout(function () {
      $("#toastInit").addClass("hidden");
    }, 1000);
  }
});

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
      `<span class="mainSub text-xs text-gray-400">${sukeValue} -н цээжлэх үгнүүд </span>`
    );
  }

  // Хэрэглэгчээс авсан датаг дэлгэцэнд гарах
  const current = document.querySelector(".word");
  const btnNext = document.querySelector(".next");
  const btnHold = document.querySelector(".hold");
  const current2 = document.querySelector(".tran");

  current2.classList.add("hidden");
  btnHold.addEventListener("click", function () {
    html = `<span class=" text-2xl translate">$rename2$</span>`;
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
      html = `<h2 class="text-[3rem] font-Rubik">$rename1$</h2>`;
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
