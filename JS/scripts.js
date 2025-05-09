// ========== CARROSSEL DE PRODUTOS ==========
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((container, i) => {
    const containerWidth = container.getBoundingClientRect().width;

    nxtBtn[i].addEventListener('click', () => {
        container.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener('click', () => {
        container.scrollLeft -= containerWidth;
    });
});


// ========== MÁSCARA PARA TELEFONE ==========
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, '').slice(0, 11);

        if (input.length > 2) {
            input = '(' + input.slice(0, 2) + ') ' + input.slice(2);
        }
        if (input.length > 9) {
            input = input.slice(0, 10) + '-' + input.slice(10);
        }

        e.target.value = input;
    });
}


// ========== MÁSCARA PARA DATA DE NASCIMENTO ==========
const dataInput = document.getElementById('data');

if (dataInput) {
    dataInput.addEventListener('input', function (e) {
        let input = e.target.value.replace(/\D/g, '').slice(0, 8);

        if (input.length >= 5) {
            input = input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4);
        } else if (input.length >= 3) {
            input = input.slice(0, 2) + '/' + input.slice(2);
        }

        e.target.value = input;
    });
}


// ========== CARRINHO DE COMPRAS – QUANTIDADE E TOTAL ==========
window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const totalDisplay = document.querySelector(".titolo-total h2:nth-child(2)");

    // Converte string de preço para número decimal
    function parsePrice(text) {
        return parseFloat(text.replace("R$", "").replace(",", ".").replace(/[^\d.]/g, ""));
    }

    // Atualiza o valor total com base nas quantidades
    function updateTotal() {
        let total = 0;

        cards.forEach(card => {
            const priceText = card.querySelector(".preco p").textContent.trim();
            const amount = parseInt(card.querySelector(".amount").textContent);
            const price = parsePrice(priceText);
            total += price * amount;
        });

        if (totalDisplay) {
            totalDisplay.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
        }
    }

    // Adiciona eventos aos botões de + e -
    cards.forEach(card => {
        const plusBtn = card.querySelector(".fa-plus");
        const minusBtn = card.querySelector(".fa-minus");
        const amountEl = card.querySelector(".amount");

        if (plusBtn && minusBtn && amountEl) {
            plusBtn.addEventListener("click", () => {
                let amount = parseInt(amountEl.textContent);
                amountEl.textContent = ++amount;
                updateTotal();
            });

            minusBtn.addEventListener("click", () => {
                let amount = parseInt(amountEl.textContent);
                if (amount > 1) {
                    amountEl.textContent = --amount;
                    updateTotal();
                }
            });
        }
    });

    updateTotal(); // Atualiza ao carregar
});


// ========== Atualização dinâmica do cartão ==========

const numberInput = document.getElementById("cardNumber");
const nameInput = document.getElementById("CardName");
const expiryInput = document.getElementById("expiry");
const cvcInput = document.getElementById("cvc");

const previewNumber = document.getElementById("previewNumeber");
const previewName = document.getElementById("previewName");
const previewExpiry = document.getElementById("previewExpiry");
const previewCvc = document.getElementById("previewCvc");

// Apenas números no número do cartão
numberInput.addEventListener("input", () => {
  let input = numberInput.value.replace(/\D/g, "").slice(0, 16);
  // Formata com espaços
  input = input.replace(/(\d{4})(?=\d)/g, "$1 ");
  numberInput.value = input;
  previewNumber.textContent = input.padEnd(19, "•");
});

// Apenas letras no nome
nameInput.addEventListener("input", () => {
  let input = nameInput.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 26);
  nameInput.value = input;
  previewName.textContent = input || "NOME DO TITULAR";
});

// Apenas números + formatação MM/YY
expiryInput.addEventListener("input", () => {
  let input = expiryInput.value.replace(/\D/g, "").slice(0, 4);
  if (input.length >= 3) {
    input = input.slice(0, 2) + "/" + input.slice(2);
  }
  expiryInput.value = input;
  previewExpiry.textContent = input.padEnd(5, "•");
});

// Apenas 3 dígitos numéricos
cvcInput.addEventListener("input", () => {
  let input = cvcInput.value.replace(/\D/g, "").slice(0, 3);
  cvcInput.value = input;
  previewCvc.textContent = input.padEnd(3, "•");
});
