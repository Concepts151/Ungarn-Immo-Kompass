import "/public/assets/css/main.css";
import "/public/assets/css/plugins/aos.css";
import "/public/assets/css/plugins/bootstrap.min.css";
import "/public/assets/css/plugins/fontawesome.css";
import "/public/assets/css/plugins/magnific-popup.css";
import "/public/assets/css/plugins/mobile.css";
import "/public/assets/css/plugins/nice-select.css";
import "/public/assets/css/plugins/odometer.css";
import "/public/assets/css/plugins/owlcarousel.min.css";
import "/public/assets/css/plugins/sidebar.css";
import "/public/assets/css/plugins/slick-slider.css";
import "/public/assets/css/plugins/swiper-slider.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "@/state/redux";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  // variable: "--ztc-family-font1",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ungarn-immo",
  description: "Made by AliThemes",
  icons: {
    icon: [
      { url: "/assets/img/logo/favicon.png" },
      {
        url: "/assets/img/logo/favicon.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/img/logo/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/img/logo/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/img/logo/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/assets/img/logo/favicon.png" }],
    shortcut: ["/assets/img/logo/favicon.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${inter.className} homepage1-body body1`}>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            {/* Matrix Provider wraps everything */}
            {children}
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
