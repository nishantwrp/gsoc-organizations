export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById("___loader").style.display = "none"
    document.getElementById("___gatsby").style.display = "block"
  }, 1000)
}
