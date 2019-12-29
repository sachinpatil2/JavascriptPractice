// import fetch from 'cross-fetch';
const fetch = require("node-fetch");
async function showAvatar() {

    // read our JSON
    let response = await fetch('https://javascript.info/article/promise-chaining/user.json');
    let user = await response.json();
  
    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();
  
    // // show the avatar
    // let img = document.createElement('img');
    // img.src = githubUser.avatar_url;
    // img.className = "promise-avatar-example";
    // document.body.append(img);

    console.log(githubUser.avatar_url);
  
    // wait 3 seconds
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  
    // img.remove();
  
    return githubUser;
  }
  
  showAvatar();