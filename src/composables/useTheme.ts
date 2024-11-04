import { ref } from "vue";

const isDark = ref(localStorage.getItem("theme") === "dark");

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  return {
    isDark,
    toggleTheme,
  };
}
