// Creates a safe css class name from any string
const getSafeCssClassName = (string) => {
  return string.replace(/ /g, '-')
    .replace(/[^a-zA-Z-]/g, '')
    .toLowerCase();
}
export default getSafeCssClassName;
