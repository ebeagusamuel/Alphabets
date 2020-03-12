function showWord(e){
    let words = {
        A: "Apple", B: "Ball", C: "Cat", D: "Dog", E: "Elephant", F: "Fish", G: "Giraffe", H: "House", I: "Ink", J: "Jam", K: "Kite", L: "Leopard", M: "Monkey", N: "Nigeria", O: "Orange", P: "Pen", Q: "Queen", R: "Racoon", S: "Student", T: "Teacher", U: "Umbrella", V: "Van", W: "Wig", X: "Xylophone", Y: "Yatch", Z: "Zoo"
    }
    
    var letter = String.fromCharCode(e.keyCode)
    var addedText = words.letter;  
    console.log(letter)  
    var span = document.createElement("span")
    span.classList.add("sound")
    var text = document.createTextNode(words[letter])
    span.appendChild(text)
    var kbd = document.createElement("kbd")
    var kbdText = document.createTextNode(letter)
    kbd.appendChild(kbdText)
    var div = document.createElement("div")
    div.classList.add("key")
    div.innerHTML += kbd.outerHTML + span.outerHTML;
    var hey = document.getElementById("keys")
    hey.appendChild(div)
    
}

window.addEventListener("keydown", showWord)