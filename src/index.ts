import "@/index.css";
import PasscraftPage from "@/pages/PasscraftPage/PasscraftPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const passcraftPage = PasscraftPage();
  app.appendChild(passcraftPage);
};

document.addEventListener("DOMContentLoaded", onInit);
