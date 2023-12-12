export function commonOnChange (setter) {
  return function (e) {
    setter(prevState => ({
      ...prevState,
      [e.target.getAttribute('name')]: e.target.value
    }));
  }
}