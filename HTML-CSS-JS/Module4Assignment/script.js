(function () {
  var names = [
    "Yaakov",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];

  for (value of names) {
    var firstLetter = value.charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(value);
    } else {
      helloSpeaker.speak(value);
    }
  }
})();
