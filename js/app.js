const input = document.querySelector("#search-input");
const btn = document.querySelector("#btn");
const userImage = document.querySelector(".userimg");
const userName = document.querySelector(".name");
const joined = document.querySelector(".joined");
const userUserName = document.querySelector(".username");
const userBio = document.querySelector(".bio");
const userRepos = document.querySelector(".repos");
const userFollowers = document.querySelector(".followers");
const userFollowing = document.querySelector(".following");
const content = document.querySelector(".content");

btn.addEventListener("click", async function () {
    const url = `https://api.github.com/users/${input.value}`;
    async function getUser() {
        const response = await fetch(url);
        if(response.status == 404){
            swal({
                title: "Error",
                text: "Invalid Username",
                icon: "error",
              });
              content.style.display = "none"
        }else {
            const data = await response.json();
            console.log(data);
            userImage.src = data.avatar_url;
            userName.innerHTML = data.name;
            const joinDate = new Date(data.created_at);
            const year = joinDate.getFullYear();
            const month = (joinDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based.
            const day = joinDate.getDate().toString().padStart(2, '0');
            joined.innerHTML = `Joined ${year}-${month}-${day}`;
            userUserName.innerHTML = "@" + data.login
            userBio.innerHTML = data.bio
            userRepos.innerHTML = data.public_repos
            userFollowers.innerHTML = data.followers
            userFollowing.innerHTML = data.following
            content.style.display = "flex"
        }
     
    }
    getUser();
    input.value = ""
});
