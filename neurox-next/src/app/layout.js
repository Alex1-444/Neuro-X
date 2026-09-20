import NavMenu from "@/components/Nav/Nav";
import Aside from "@/components/Aside/Aside";
import styles from "./layout.module.css";
import { CollectionProvider } from "@/context/collectionContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

export const metadata = {
  title: "NeuroX",
  description: "Aprende neurociencia de forma visual e interactiva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CollectionProvider>
          <ToastProvider>
            <div id="app-shell" className={styles.appShell}>
              <NavMenu />
              <Aside />
              <main id="main" className={styles.main}>
                {children}
              </main>
            </div>
          </ToastProvider>
        </CollectionProvider>
      </body>
    </html>
  );
}
