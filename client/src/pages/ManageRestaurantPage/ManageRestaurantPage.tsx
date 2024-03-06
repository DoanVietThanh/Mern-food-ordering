import FormManageRestaurant from "@/components/forms/ManageRestaurant/FormManageRestaurant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageRestaurantPage = () => {
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg"></TabsContent>
      <TabsContent value="manage-restaurant">
        <FormManageRestaurant />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
