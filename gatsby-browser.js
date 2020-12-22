/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById("___loader").style.display = "none"
    document.getElementById("___gatsby").style.display = "block"
  }, 1000)
}
