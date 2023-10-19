import { Widget } from "../components/Widget";
import { Header } from "../components/hearder";
import { Footer } from "../components/footer";
import { MatrixRainingLetters } from "react-mdr";


export default function Template({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Widget />
      {children}
      <Footer />
      <MatrixRainingLetters key="foo-bar" custom_class="m-0 p-0" />
    </>
  );
}
