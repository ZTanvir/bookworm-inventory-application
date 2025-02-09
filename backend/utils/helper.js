const items = [
  {
    type: "field",
    value: "",
    msg: "Please add a name.",
    path: "name",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Please add descriptions.",
    path: "descriptions",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Please add authors.",
    path: "authors",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Only natural number is allowed Ex:102,48 ",
    path: "pages",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Only natural number is allowed Ex:628,148 ",
    path: "price",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Please add a valid date.",
    path: "release",
    location: "body",
  },
  {
    type: "field",
    msg: "Please check a category",
    path: "category",
    location: "body",
  },
  {
    type: "field",
    value: "",
    msg: "Please add an image.",
    path: "bookCoverImg",
    location: "body",
  },
];

const filterErrorMsg = (items = [], searchItem = "") => {
  let errorMsg = null;
  items.forEach((item) => {
    if (item.path === searchItem) {
      errorMsg = item.msg;
    }
  });
  return errorMsg;
};
module.exports = { filterErrorMsg };
