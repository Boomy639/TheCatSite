var after = "";

function fetchCat() {
 

  if (document.getElementById("cat")) {
    document.getElementById("cat").remove();
  }

  let parentdiv = document.createElement("div");
  parentdiv.id = "cat";
  fetch(`https://www.reddit.com/r/catpictures.json?after=${after}`)
    .then((response) => response.json())
    .then((body) => {
      after = body.data.after;
      for (let index = 0; index < body.data.children.length; index++) {

        const postData = body.data.children[index].data
        console.log(postData)
        const postHint = postData.post_hint
        const postUrl = postData.url

        if (postHint === "image" && postUrl.includes("i.redd.it")) {
          console.log(body.data.children[index].data)
          let div = document.createElement("div");
          let image = document.createElement("img");
          image.src = body.data.children[index].data.url_overridden_by_dest;
          div.appendChild(image);
          parentdiv.appendChild(div);
          break;
        }
      }
      document.body.appendChild(parentdiv);
    })
    .catch((e) => {
      console.log(e);
    });

    fetch(`https://meowfacts.herokuapp.com/?count=1`)
    .then((response) => response.json())
    .then((body) => {
      const catFact = body.data[0];
      
      const catFactParagraph = document.getElementById("catfactp")
      catFactParagraph.textContent = catFact;
    })
    .catch((e) => {
      console.log(e);
    });
}