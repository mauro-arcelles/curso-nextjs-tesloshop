import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";
import { SideMenu } from "../ui/SideMenu";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {
          imageFullUrl && (
            <meta name="og:image" content={imageFullUrl} />
          )
        }
      </Head>

      <SideMenu />

      <nav>
        <Navbar />
      </nav>

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0 30px',
      }}>
        {children}
      </main>

      <footer>

      </footer>
    </>
  );
};
