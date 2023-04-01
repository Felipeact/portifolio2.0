import { Widget } from "../components/Widget";
import { Header } from "../components/hearder";


export default function Template({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Widget />

      {children}
    </>
  );
}