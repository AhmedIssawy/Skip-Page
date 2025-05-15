
import type { ToastContainerProps } from "react-toastify"

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

export const toastSettengs: ToastContainerProps = {
    theme: isDarkMode ? "dark" : "light", position: "top-right"
}