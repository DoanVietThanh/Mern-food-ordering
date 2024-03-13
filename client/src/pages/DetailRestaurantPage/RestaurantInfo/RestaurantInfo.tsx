import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant.types";
import { Dot } from "lucide-react";

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">{restaurant.restaurantName}</CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex" key={index}>
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
