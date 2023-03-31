import { Header } from "../components/hearder";
import { Widget } from "../components/Widget";

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