// Burger Menu

let toggleButton = document.getElementById('toggleButton');
// let nabvar =

toggleButton.addEventListener('click',function () {
    toggleButton. classList.toggle('active')
    // nabvar.classList.toggle()
})


// Email Validation
function validation() {
    let formEmail = document.getElementById('form-wrapper');
    let email = document.getElementById('myemail').value;    
    let spanEmail = document.getElementById('email-text');

    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(pattern)) {
        formEmail.classList.add('valid');
        formEmail.classList.remove('invalid');
        spanEmail.innerHTML = 'Your Email is Valid';
        spanEmail.style.color = 'white';            
    } else {
        formEmail.classList.remove('valid');
        formEmail.classList.add('invalid');        
        spanEmail.innerHTML = 'Please Enter Valid Email Address';
        spanEmail.style.color = 'black';        
    }

    if (email == '') {
        formEmail.classList.remove('valid');
        formEmail.classList.remove('invalid');
        spanEmail.innerHTML = '';
    }

}

// Posts
// Load more 
let currentPage = 1;
let totalPages;

function getUsers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method:'GET'
    })
    .then(function(response) {
        if (response.status != 200) {
            throw response.status;
        }
        return response.json();
    })
    .then(function(responseData) {
        let fragment = document.createDocumentFragment();

    responseData.data.forEach(element => {
        let li = document.createElement('li');
        li.classList.add('li-item');


        let span = document.createElement('span');
        span.textContent = element.first_name;

        let img = document.createElement('img');
        img.src = element.avatar;
        img.classList.add('image-item');

        li.appendChild(img);
        li.appendChild(span);


        fragment.appendChild(li);
    });
    
    document.getElementById('list').innerHTML = '';
    document.getElementById('list').appendChild(fragment);

    totalPages = responseData.total_pages;
    })
    .catch(function(x) {
        if (x == 404) {
            let p = document.createElement('p');
            p.textContent = 'Server Error';
            document.getElementById('posts').appendChild(p);
        } else {
            let p = document.createElement('p');
            p.textContent = 'Page Not Found';
            document.getElementById('posts').appendChild(p);
        }        
    })
}

document.getElementById('loadprev').addEventListener('click', function() {
    if (currentPage == 1) {
        return;
    }
    currentPage -=1;
    getUsers(currentPage);
});

document.getElementById('loadnext').addEventListener('click', function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage +=1;
    getUsers(currentPage);

})

getUsers(currentPage);


// post practice
let mainwrapper = document.getElementById('post-block-wrapper');
let overlay = document.getElementById('overlay-post');
let content = document.getElementById('content');
let closeOverlay = document.getElementById('closeOverlay');
let addPost = document.getElementById('add');
let postOverlay = document.getElementById('postoverlay');
let form = document.getElementById('form');
let inputName = document.getElementById('namePost');
let inputEmail = document.getElementById('postEmail');


function ajax (url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function () {
        let responseDataUsers = JSON.parse(request.responseText);
        callback(responseDataUsers);

    });
    request.send();
}

ajax('https://jsonplaceholder.typicode.com/users', function(responseDataUsers) {
    printData(responseDataUsers);

});

function printData(responseDataUsers) {
    responseDataUsers.forEach(element => {
        createPost(element);
    })
}


// create post function
function createPost (item) {
    let divwrapper = document.createElement('div');
    divwrapper.classList.add('posts-2');
    divwrapper.setAttribute('data-id', item.id);
    divwrapper.classList.add('post')

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.innerText = 'DELETE THIS POST';
    deleteButton.classList.add('delButton');

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.id;
    h3Tag.classList.add('h3Tag');

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.username;
    h2Tag.classList.add('h2Tag');

    divwrapper.appendChild(h3Tag);
    divwrapper.appendChild(h2Tag);
    divwrapper.appendChild(deleteButton);

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');

        let url = `https://jsonplaceholder.typicode.com/users/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
        .then(() => divwrapper.remove());

    });

    // Overlay

    divwrapper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');        
        openOverlay(id);

    })

    mainwrapper.appendChild(divwrapper);

    console.log(divwrapper);

}

//
function openOverlay(id) {
    overlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/users/${id}`;
    ajax(url, function(responseDataUsers) {
        overlayFunction(responseDataUsers);
    })
    console.log(id);
    
}

// // post delete function

function overlayFunction(item) {
    let spanUserName = document.createElement('span');
    spanUserName.innerText = item.name;

    let userEmail = document.createElement('p');
    userEmail.innerText = item.email;

    content.innerHTML = '';
    content.appendChild(spanUserName);
    content.appendChild(userEmail);


}

// close Popup
closeOverlay.addEventListener('click', function() {
    overlay.classList.remove('active');
    // content.innerHTML = '';
});

// Adding post 
addPost.addEventListener('click', function() {
    postOverlay.classList.add('active');
    inputName. value = '';
    inputEmail.value = '';

})

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = {
        name:event.target[0].value,
        email:event.target[1].value

    }
    console.log(formData);
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((post) => afterPostSave(post));
                  
            
    console.log(formData);
    
})

function afterPostSave(post) {
    createPost(post);
    postOverlay.classList.remove('active');
}



// Slider

let data = [
    {
        id:1,
        imageUrl: "assets/img/Background.png",
        h3: '“The trip to Belgium was wonderful.”',
        p:'This tour took us to Brugge, Brussels and Antwerp. We stayed near the ocean in a great hotel in Ostend which was a great area with plenty to do and see.',
        h4:'Steven & Anna',
        url:'https://google.com'
    },
    {
        id:2,
        imageUrl: "assets/img/711402.jpg",
        h3:'"This was a great tour through Morocco!"',
        p:'We felt the tour was great. The destinations were well chosen and the accomodation was always appropriate. We felt we really were offered a full taste of the Moroccan experience',
        h4: 'Glyn & Senta',
        url:'https://google.com'
    },
    {
        id:3,
        imageUrl: "assets/img/porto-moniz-madeira-island-mountain-view-ocean-seascape.jpg",
        h3:'"We really enjoyed our time in Portugal!"',
        p: 'It highlighted Portugal’s hidden treasures, its history and culture. Group size was perfect (15) and our guide was very knowledgeable.',
        h4:'Merry C.',
        url:'https://google.com'   
    },
    {
        id:4,
        imageUrl: "assets/img/c8d308538241246b0f06f5c9058f779a.jpg",
        h3:'"Loved my trip to Istanbul, vibrant, lively beautiful and friendly... "',
        p: 'Istanbul is certainly among the best places to visit in the world. The concentration of gastronomic masterpieces, historical paces and leisure activities.',
        h4:'Alexander',
        url:'https://google.com'   
    }
]

createDots(data);
let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let dotItem = document.getElementsByClassName('dot');

let sliderIndex = 0

function createAtag(item) {
    let tag = document.createElement('a');
    tag.setAttribute('href', item.url);
    tag.classList.add('slide');

    return tag;
}


function createDots(item) {
    let dots = document.createElement('div');
    dots.classList.add('dots-wrapper');

    data.forEach( (element) => {
        let dot  = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id',element.id-1);
        dots.appendChild(dot);

        dot.onclick = function(event) {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlide();
        }
        dots.appendChild(dot);

    })    
}



function setSlide() {
    let dataItem = data[sliderIndex];
    let imgTag = document.getElementById('slider-section');   
    let h3Tag = document.getElementById('rev1');    
    let pTag = document.getElementById('p-content');
    let h4Tag = document.getElementById('travelers')
    let dots = createDots();


    imgTag.style.backgroundImage = "url('"+dataItem.imageUrl+"')";
    h3Tag.textContent = (dataItem.h3);
    pTag.textContent = (dataItem.p);
    h4Tag.textContent = (dataItem.h4);
    // dotItem[sliderIndex].classList.add('active');
    
}


/*function setSlide() {
    sliderContent.innerHTML = '';
    let slideItem = createAtag(data[sliderIndex]);
    let imgTag = createImgtag(data[sliderIndex]);
    let h2Tag = createH2tag(data[sliderIndex]);
    let h4Tag = createH4tag(data[sliderIndex]);
    let dots = createDots();

    slideItem.appendChild(imgTag);
    slideItem.appendChild(h2Tag);
    slideItem.appendChild(h4Tag);
    sliderContent.appendChild(slideItem);
    sliderContent.appendChild(dots);
   currentDotActive();
    
    console.log(slideItem);
}*/

function currentDotActive() {
   dotItem[sliderIndex].classList.add('active');
}
function arrowLeftClickSlider() {
    if (sliderIndex == 0) {
        sliderIndex = data.length - 1;
        setSlide();
        return;
    }
    sliderIndex--;
    setSlide();
}

function arrowRightClickSlider() {
    if (sliderIndex == data.length - 1) {
        sliderIndex = 0;
        setSlide();
        return;
    }
    sliderIndex+=1;
    setSlide();
}

arrowLeft.addEventListener('click', arrowLeftClickSlider);

arrowRight.addEventListener('click', arrowRightClickSlider);

// setInterval( () => {
//     arrowRightClickSlider();
// }, 3000);


setSlide();


// Accordion
let accordion = document.querySelectorAll('.container');

for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener('click', function(event) {
        this.classList.toggle('active');        
    })
}


// FILTER
let filter = document.getElementById('filter');
let result = document.getElementById('result');
let listItems = [];

function obtainUsers () {
    fetch('https://reqres.in/api/users?page=2', {
        method:'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(responseData) {
        responseData.data.forEach(element => {
            let li = document.createElement('li');

            let span = document.createElement('span');
            span.innerHTML = `${element.first_name} ${element.last_name}`;

            let eMail = document.createElement('email');
            eMail.innerHTML = element.email;
            
            li.appendChild(span);
            li.appendChild(eMail);

            listItems.push(li);

            result. appendChild(li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });
}

obtainUsers();


function filterData(searchItem) {
    listItems.forEach( item => {       
        if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
            item.classList.remove('hide');            
        } else {
            item.classList.add('hide');
        }
    })
}


filter.addEventListener('input', function(event) {
   filterData(event.target.value)

  }); 
 
