const formFields = [
  {
    name: "_id",
    label: "ID",
    multiline: false,
    validation: {
      required: true,
      error: "ID je obavezan",
    },
  },
  {
    name: "naslov",
    label: "Naslov",
    multiline: false,
    validation: {
      required: true,
      error: "Naslov je obavezan",
    },
  },
  {
    name: "opis",
    label: "Opis",
    multiline: true,
  },
  { name: "komentar", label: "Komentar", multiline: true },
  { name: "datum", label: "Datum", multiline: false },
  { name: "lokacija", label: "Lokacija", multiline: false },
  { name: "zemlja", label: "Zemlja", multiline: false },
  { name: "vrsta", label: "Vrsta", multiline: false },
  { name: "autor", label: "Autor", multiline: false },
  { name: "izdavac", label: "Izdavač", multiline: false },
  { name: "dimenzije", label: "Dimenzije", multiline: false },
  { name: "tehnika", label: "Tehnika", multiline: false },
  {
    name: "autorskaPrava",
    label: "Autorska Prava",
    multiline: true,
  },
  { name: "licenca", label: "Licenca", multiline: false },
  { name: "arhiv", label: "Arhiv", multiline: false },
];

export default formFields;
