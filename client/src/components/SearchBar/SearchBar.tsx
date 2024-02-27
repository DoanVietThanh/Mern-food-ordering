// import { Form } from "../ui/form";

// type SearchBarProps = {
//   onSubmit: () => void;
//   placeHolder: string;
//   onReset?: () => void;
//   searchQuery?: string;
// };

// const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: SearchBarProps) => {
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
//           form.formState.errors.searchQuery && "border-red-500"
//         }`}
//       >
//         <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
//         <FormField
//           control={form.control}
//           name="searchQuery"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   {...field}
//                   className="border-none shadow-none text-xl focus-visible:ring-0"
//                   placeholder={placeHolder}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">
//           Reset
//         </Button>
//         <Button type="submit" className="rounded-full bg-orange-500">
//           Search
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default SearchBar;
