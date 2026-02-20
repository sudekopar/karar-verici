// 1. Gerekli HTML elementlerini seçiyoruz
const optionInput = document.getElementById('optionInput');
const addBtn = document.getElementById('addBtn');
const optionList = document.getElementById('optionList');
const decideBtn = document.getElementById('decideBtn');
const resultDiv = document.getElementById('result');

// 2. Seçenekleri saklayacağımız boş bir dizi (array)
let options = [];

// 3. "Ekle" butonuna basınca çalışacak fonksiyon
addBtn.addEventListener('click', () => {
    const value = optionInput.value.trim(); // Boşlukları temizle

    if (value !== "") {
        options.push(value); // Diziye ekle
        
        // Ekranda listelemek için yeni bir <li> oluştur
        const li = document.createElement('li');
        li.textContent = value;
        optionList.appendChild(li);
        
        optionInput.value = ""; // Inputu temizle
        optionInput.focus(); // Tekrar yazmaya hazır hale getir
    }
});

// 4. "Karar Ver" butonuna basınca çalışacak fonksiyon
decideBtn.addEventListener('click', () => {
    if (options.length < 2) {
        resultDiv.textContent = "Lütfen önce en az 2 seçenek ekle! 😊";
        return;
    }

    let counter = 0;
    // 100 milisaniyede bir seçenekleri döndüren zamanlayıcı
    const interval = setInterval(() => {
        const tempIndex = Math.floor(Math.random() * options.length);
        resultDiv.textContent = `🎲 ${options[tempIndex]}`;
        resultDiv.style.opacity = "0.5"; // Dönerken hafif şeffaf olsun
        counter++;

        // 20 kere döndükten sonra dur (yaklaşık 2 saniye)
        if (counter > 20) {
            clearInterval(interval);
            const finalIndex = Math.floor(Math.random() * options.length);
            const choice = options[finalIndex];
            
            resultDiv.innerHTML = `🎯 Sonuç: <span class="animate-result">${choice}</span>`;
            resultDiv.style.opacity = "1";

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 100);
});