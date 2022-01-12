import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById("___loader").style.display = "none"
    document.getElementById("___gatsby").style.display = "block"
  }, 1000)
}
