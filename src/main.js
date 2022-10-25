import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

const numberElement = document.querySelector(".cc-number")
const numberValue = document.querySelector("#card-number")

const holderElement = document.querySelector(".cc-holder .value")
const holderValue = document.querySelector("#card-holder")

const expirationElement = document.querySelector(".cc-expiration .value")
const expirationValue = document.querySelector("#expiration-date")

const securityElement = document.querySelector(".cc-security .value")
const securityValue = document.querySelector("#security-code")


holderValue.addEventListener("input", () => {
  holderElement.innerHTML = 
    holderValue.value.length === 0 ? "FULANO DA SILVA" : holderValue.value
})

numberValue.addEventListener("input", () => {
  numberElement.innerHTML = numberValue.value
})

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#4D54ED", "#CC0A0A"],
    american: ["#4D54ED", "#FFFFFF"],
    sodexo: ["#CC0A0A", "#4D54ED"],
    hipercard: ["#CC0A0A", "#FFFFFF"],
    default: ["black", "gray"],
  }
  
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

// setCardType("hipercard")

globalThis.setCardType = setCardType

// console.log(nameElement)

// holderElement.innerHTML = "MEU NOME"
// numberElement.innerHTML = "1234 5678 9101 1121"
// expirationElement.innerHTML = "01/50"
// securityElement.innerHTML = "999"


// mask para o CVC - fazer o teste da documentação
// CVC deve conter 4 dígitos

var securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

securityCodeMasked.on("accept", () => {
updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code){
  securityElement.innerText = code.length === 0 ? "123" : code
}

// Expiração
// Números, barra dividindo mês e ano!

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
    mask: IMask.MaskedRange,
    from: String(new Date().getFullYear()).slice(2),
    to: String(new Date().getFullYear() + 10).slice(2)
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^5[1,5]\d{0,2}|^22[2,9]\d|^2[3,7]\d{0,2}\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^34\d|^37\d{0,13}/,
      cardtype: "american",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "defaut",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundMask)

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  updatecardNumber(cardNumberMasked.value)
  setCardType(cardType)
})

function updatecardNumber(number){
  numberElement.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}


expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date){
  expirationElement.innerText = date.length === 0 ? "02/32" : date
}