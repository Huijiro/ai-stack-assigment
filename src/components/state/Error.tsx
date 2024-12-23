import { Card } from "../ui/card";

type Props = {
  error: string;
};

export default function File({ error }: Props) {
  return <Card>{error}</Card>;
}
