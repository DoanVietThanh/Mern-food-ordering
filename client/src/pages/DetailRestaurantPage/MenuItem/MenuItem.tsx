import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem as MenuItemProps } from "@/types/restaurant.types";

type Props = {
  menuItem: MenuItemProps;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">£{(menuItem.price / 100).toFixed(2)}</CardContent>
    </Card>
  );
};

export default MenuItem;
