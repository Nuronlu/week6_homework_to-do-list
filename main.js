//tanimlamalari yap/fonksiyon icinde de yapilabilir:
const task = document.querySelector("#task")
const btn = document.querySelector("#liveToastBtn")

//A-FONKSIYON-element ekleme
//A1-btn'a basildiginda newElement() fonksiyonunu calistir: 
btn.addEventListener("click", newElement)
//A2-newElement() fonksiyonu ile: eger task'a girilen bir deger varsa ve bu deger bos degilse; task'a yazilan item, liste ogesi olarak olusturulup ul icine eklesin ve success toast'i ekrana getirsin. // degilse, sadece error toast ekrana gelsin:
const ulDOM = document.querySelector("#list")
function newElement(event) {
    event.preventDefault();
    if(task.value !== "") {
        // Yeni bir liDOM öğesi oluştur
        let liDOM = document.createElement("li");
        // liDOM öğesini içeriğiyle birlikte oluştur
        liDOM.innerHTML = `<button>x</button> ${task.value}`;
        // ulDOM'a liDOM öğesini ekle
        ulDOM.append(liDOM);
        // Eleman eklendikten sonra task alanını temizle
        task.value = "";
        //local storage kaydetme fonksiyonu:
        saveItem();
        //basarili ekleme toast:
        successToast();
    } else {
        //hatali islem toast:
        errorToast();
    }
}

//B-LISTE'DEN ELEMAN SILME VEYA CHECK ETME
ulDOM.addEventListener("click", deleteOrChecked)
function deleteOrChecked (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveItem();
        console.log(event.target.tagName)//kontrol amacli
    } else if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        saveItem();
        console.log(event.target.tagName)//kontrol amacli
    }
}

//C-TOASTS
//success toast
function successToast() {
    let toast = document.querySelector(".toast.success");
    let toastBody = toast.querySelector(".toast-body");
    toastBody.textContent = `${"#toast-body-success"}`;
    $(toast).toast("show");
}
//error toast
function errorToast() {
    let toast = document.querySelector(".toast.error");
    let toastBody = toast.querySelector(".toast-body");
    toastBody.textContent = `${"#toast-body-error"}`;
    $(toast).toast("show");
}

//D-LOCALSTORAGE'A EKLEME
function saveItem(){
    localStorage.setItem("data", ulDOM.innerHTML);
}

//E-SAYFA YENILEME-LISTE GORUNUMU
//sayfa yenilediginde listene ekledigin (localstorage ile gecici hafizada tutulan elemanlar) gorunmeye devam etsin:
function showItem(){
    ulDOM.innerHTML = localStorage.getItem("data");
}
showItem();


