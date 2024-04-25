const num = document.getElementById('num');
const maisButton = document.getElementById('mais');
const menosButton = document.getElementById('menos');

const updatenum = () => {
    num.innerHTML = count;
};

let count = 0;
let intervalId = 0;

maisButton.addEventListener('mousedown', () => {
    intervalId = setInterval(() => {
        count += 1;
        updatenum(), updatenum2();
    }, 80);
});
 
document.addEventListener('mouseup', () => clearInterval(intervalId));

menosButton.addEventListener('mousedown', () => {
    intervalId = setInterval(() => {
        if (count > 0) { // Verifica se o contador é maior que 0
            count -= 1;
            updatenum(), updatenum2();
        }
    }, 80);
});

document.addEventListener('mouseup', () => clearInterval(intervalId));

function img1 (){
    document.getElementById("trocarimg").src = "images/image-product-1.jpg";
}
function img2 (){
    document.getElementById("trocarimg").src = "images/image-product-2.jpg";
}
function img3 (){
    document.getElementById("trocarimg").src = "images/image-product-3.jpg";
}
function img4 (){
    document.getElementById("trocarimg").src = "images/image-product-4.jpg";
}



const ativo = document.getElementById("active");
const container = document.getElementById("container");


ativo.addEventListener("click", () => {
    if (container.classList.contains("active")) {
        container.classList.remove("active"); // Se estiver ativo, desativa
    } else {
        container.classList.add("active"); // Se não estiver ativo, ativa
    }
});



const num2 = document.getElementById('num2');

const updatenum2 = () => {
    num2.innerHTML = count;
};
