import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});

export const metadata = {
  title: "Peer Mentor App",
  description: "A peer mentoring application",
  verification: {
    google: "mrpHBzHaSOrtessmeLWY_D_a4_v168RxWM2EqcQwB7E"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoCondensed.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
