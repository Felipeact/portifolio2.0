import { Widget } from "../components/Widget";
import { Header } from "../components/hearder";
import { Footer } from "../components/footer";


export default function Template({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Widget />
      {children}
      <Footer />
    </>
  );
}