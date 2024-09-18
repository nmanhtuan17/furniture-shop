export const formatPrice = (value) => {
  // return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `$ ${value.toFixed(2)}`;
};

export const getUniqueValues = (data, type) => {
  let uniqueValues = data.map((item) => item[type]);
  if (type === "colors") {
    // colors are in an array, use flat() to transform
    uniqueValues = uniqueValues.flat();
  }
  return ["all", ...new Set(uniqueValues)];
};


export const capitalizedStr  = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
