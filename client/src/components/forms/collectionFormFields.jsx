const collectionFormFields = [
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
    name: "naziv_kolekcije",
    label: "Naziv Zbirke",
    multiline: false,
    validation: {
      required: true,
      error: "Naziv Zbirke je obavezan",
    },
  },
  {
    name: "vlasnik_kolekcije",
    label: "Vlasnik Zbirke",
    multiline: false,
  },
];

export default collectionFormFields;
