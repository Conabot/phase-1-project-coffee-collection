//update number of new likes to server.
function updateLike(id, newLikes) {
    fetch(`http://localhost:3000/coffees/${id}`, {
      method :"PATCH",
      headers :
      {"Content-type" : "application/json",
      Accept: "application/json" 
      },
      body : JSON.stringify ({
        "like" : newLikes,
      })
    })
  }
  
  //add a card which include coffee name, ingredient, image, like and button
  function createCardCoffee(coffee) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const h1=document.createElement('h1');
    h1.textContent=coffee.name;
    
    const h2=document.createElement('h2');
    h2.textContent=coffee.price;
    
    let h3 =document.createElement('h3');
    h3.textContent=coffee.ingredient
  
    let img=document.createElement('img');
    img.src=coffee.image;
    img.classList.add('coffee-image');
  
    
    let p=document.createElement('p');
    p.textContent=`${coffee.like} Likes` ;
    //create a like button. 
    let likeButton=document.createElement('btn');
    //when click on lick button, number of likes will increase.
    likeButton.addEventListener(('click'), () => {
      p.textContent= `${coffee.like +=1} Likes` ;
  
      //patch
      updateLike( coffee.id, coffee.like)
    });
      likeButton.classList.add("like-btn");
      likeButton.id=coffee.id;
      likeButton.textContent=  'Likes';
  
    //add element to card
    card.append(h1, h2, h3, img, p, likeButton);
    document.getElementById('coffee-list').appendChild(card);
  }
  
  //render data of coffee from json server 
  document.addEventListener('DOMContentLoaded', () => {
      fetch('http://localhost:3000/coffees')
      .then ((resp) => resp.json())
      .then (renderCoffees)
  
  
  function renderCoffees(coffees) {
     coffees.forEach(createCardCoffee);
  }
  })
  
  //add new Coffee Collection to data server
  document.getElementById('new-coffee').addEventListener('submit', createNewCoffee);
  
  //add new Coffee Collecton
  function createNewCoffee(e) {
      e.preventDefault();
      //new coffee also have name, ingredient, image, price
      const newCoffee ={
          name: e.target.name.value,
          ingredient: e.target.ingredient.value,
          image: e.target.image.value,
          price: e.target.price.value,
         
      };
      //call renderCoffe function for new object
      createCardCoffee(newCoffee);
      //call postUp function to post new object server
      postUp(newCoffee);
      //clear out input area as hit submit button.
      e.target.reset();
  }
  //Post new coffee to JSON server
  function postUp(newCoffee){
      fetch('http://localhost:3000/coffees', {
        method : "POST",
        headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    
      body: JSON.stringify({
        ...newCoffee,
        'like' : 0
      })
    })
      .then((resp) => resp.json())
      .then((respCoffee) => createCardCoffee(respCoffee));
  }
    
  
    