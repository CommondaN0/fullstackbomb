"use strict"
// Скачивание картинки
const imgElement = document.getElementById("imageDisplay");

document.getElementById("downloadButton").addEventListener("click", async () => {
    try{
        const response = await fetch("https://clothapi.progskill.ru/static/products/a6f53cfe-51ca-4971-b596-5765618df9ae/f0ff0093-5bb3-488d-beb0-8137aa949f30.jpeg",);
        if(!response.ok) {
            throw new Error("faggot");
        }

        const contentType = response.headers.get("Content-Type");
        if(!contentType || !contentType?.startsWith("image/")) {
            throw new Error("faggot2");
        }

        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        imgElement.src = imageUrl;
        imgElement.style.display = "block";
    } catch(err) {
        console.log(err);
    }
});