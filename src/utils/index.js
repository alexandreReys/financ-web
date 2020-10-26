import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swal = withReactContent(Sweetalert2);

export const requestPromotionalPrice = () => {
  const inputValue = 0;
  
  Swal.fire({
    title: 'Enter your IP address',
    input: 'number',
    inputLabel: 'Preço Promocional',
    inputValue: inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  })
};

export const estadosList = [
  { estado: "AC", estadoNome: "Acre" },
  { estado: "AL", estadoNome: "Alagoas" },
  { estado: "AP", estadoNome: "Amapá" },
  { estado: "AM", estadoNome: "Amazonas" },
  { estado: "BA", estadoNome: "Bahia" },
  { estado: "CE", estadoNome: "Ceará" },
  { estado: "DF", estadoNome: "Brasilia" },
  { estado: "ES", estadoNome: "Espirito Santo" },
  { estado: "GO", estadoNome: "Goias" },
  { estado: "MA", estadoNome: "Maranhão" },
  { estado: "MT", estadoNome: "Mato Grosso" },
  { estado: "MS", estadoNome: "Mato Grosso do Sul" },
  { estado: "MG", estadoNome: "Minas Gerais" },
  { estado: "PA", estadoNome: "Pará" },
  { estado: "PB", estadoNome: "Paraiba" },
  { estado: "PR", estadoNome: "Parana" },
  { estado: "PE", estadoNome: "Pernambuco" },
  { estado: "PI", estadoNome: "Piaui" },
  { estado: "RJ", estadoNome: "Rio de Janeiro" },
  { estado: "RN", estadoNome: "Rio Grande do Norte" },
  { estado: "RS", estadoNome: "Rio Grande do Sul" },
  { estado: "RO", estadoNome: "Rondonia" },
  { estado: "RR", estadoNome: "Roraima" },
  { estado: "SC", estadoNome: "Santa Catarina" },
  { estado: "SP", estadoNome: "São Paulo" },
  { estado: "SE", estadoNome: "Sergipe" },
  { estado: "TO", estadoNome: "Tocantins" },
];

export const MoneyMaskedToStringUnmasked = (paramValor) => {
  if (typeof paramValor === "number") {
    return paramValor;
  }

  let result = paramValor.replace("R$", "");
  result = result.replace("R$ ", "");
  result = result.replace(".", "");
  result = result.replace(".", "");
  result = result.replace(",", ".");

  return result;
};

export const MoneyMaskedToFloat = (paramValor) => {
  if (typeof paramValor === "number") {
    return paramValor;
  }

  let result = paramValor.replace("R$", "");
  result = result.replace("R$ ", "");
  result = result.replace(".", "");
  result = result.replace(".", "");
  result = result.replace(",", ".");

  return parseFloat(result);
};

// dd/mm/yyyy
export const formattedDate = (date) => {
  const d = date.toString().substring(0, 10);
  return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
};

// dd/mm/yyyy 00:00
export const formattedDateTime = (date, time) => {
  const d = date.toString().substring(0, 10);
  const t = time.toString().substring(0, 5);
  return d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4) + " " + t;
};

// Data : dd/mm/yyyy  -  Horário : 00:00
export const formattedDateTime2 = (date, time) => {
  const d = date.toString().substring(0, 10);
  const t = time.toString().substring(0, 5);

  const dateStr = d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
  const timeStr = t;

  return `Data : ${dateStr}  -  Horário : ${timeStr}`;
};

// dd/mm/yyyy as 00:00
export const formattedDateTime3 = (date, time) => {
  const d = date.toString().substring(0, 10);
  const t = time.toString().substring(0, 5);
  return (
    d.substr(8, 2) +
    "/" +
    d.substr(5, 2) +
    "/" +
    d.substr(0, 4) +
    " as " +
    t +
    "hs"
  );
};

export const firstWord = (phrase) => {
  if (!phrase) return "";

  const arrWords = phrase.split(" ");
  if (arrWords) return arrWords[0];
  return phrase;
};

// dd/mm/yyyy
export const formatttedToday = () => {
  const today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

// 00:00
export const formatttedCurrentTime = () => {
  const now = new Date();

  let hh = now.getHours();
  let mm = now.getMinutes() + 1;

  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;

  return hh + ":" + mm;
};
