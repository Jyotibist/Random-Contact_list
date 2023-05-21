// work flow
// 1. fetch user from Api
//  2. store those users in a gloabal array
//  3. Display user in the UI

let userList = [];

const apiEp = "https://randomuser.me/api?";
let countElm = document.getElementById("count");

const displayElm = document.getElementById("list");

const fetchUser = async(path = "results=20")=>{
    // promise
    // fetch all us to get any data from any url
    // const user = fetch(apiEp);
    // console.log(user);
    // fetch(apiEp).then((response)=>{
    //     console.log(response);
    //     return response.json();

    // })
    // .then((data)=>{
    //     userList = data.results;

    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log(error)

    // })

    // =====async/await=====
    try {
    const response = await fetch(apiEp + path);
    const data = await response.json();
    userList = data.results
    displayUsers(userList);
    console.log(data.results);
   
        
    } catch (error) {
        console.log(error);
        
    }   

};
fetchUser();

const displayUsers = (displayArg)=>{
    let str = "";
    displayArg.forEach((usr)=>{
        str += `
        <div class="card" style="width: 18rem;">
      <img src="${usr?.picture?.large}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${usr?.name?.title} ${usr?.name?.first} ${usr?.name?.last}</h5>
        <div><i class="fa-solid fa-map"></i> ${usr?.location?.street?.number} ${usr?.location?.city} ${usr?.location?.street?.name} , ${usr?.location?.country}, ${usr?.location?.state}, ${usr?.location?.postcode}</div> 
        <div><i class="fa-solid fa-envelope"></i> ${usr?.email}</div> 
      </div>
        <a href = "tel:${usr?.phone}">
        <div class = "d-grid">
        <button class = "btn btn-primary">
        <i class="fa-solid fa-phone"></i> ${usr?.phone} 
        </button>
        </div>
        </a>

    </div>`;
    })
    displayElm.innerHTML = str;
    countElm.innerText = displayArg.length;
}


document.getElementById("select").addEventListener("change",(e)=>{
    const {value} = e.target;
    const path = `results=20&gender=` +value;
    fetchUser(path);
   
})

document.getElementById("search-input").addEventListener("keyup",(e)=>{
  const {value}=e.target; 
//   run filter method
const filteredUser = userList.filter((item)=>{
    
    console.log(item);
    const fullName = (item.name.first + "" + item.name.last).toLowerCase();
    return fullName.includes(value.toLowerCase());

});
// display function

    // console.log(e.target.value);
    displayUsers(filteredUser);
})