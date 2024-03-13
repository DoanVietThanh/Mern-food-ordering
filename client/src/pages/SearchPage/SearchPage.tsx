import { useState } from "react";

import FilterCuisine from "./FilterCuisine";
import SearchPagination from "./SearchPagination";
import SearchResultCard from "./SearchResultCard";
import SearchResultInfo from "./SearchResultInfo";
import SortOptionDropdown from "./SortOptionDropdown";
import { useSearchRestaurants } from "@/api/restaurantAPI/RestaurantAPI";
import SearchBar from "@/components/SearchBar";
import { SearchForm } from "@/components/SearchBar/SearchBar";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { searchedRestaurants, isLoading } = useSearchRestaurants(searchState, city);

  const handleSubmitSearchBar = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const handleResetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handleChangeExpanded = () => setIsExpanded((prev) => !prev);

  const handleChangeSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!searchedRestaurants?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <FilterCuisine
          isExpanded={isExpanded}
          onChangeExpanded={handleChangeExpanded}
          selectedCuisines={searchState.selectedCuisines}
          onChangeSelectedCuisines={handleChangeSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSubmitSearchBar}
          onReset={handleResetSearch}
          placeholder="Search by Cuisine or Restaurant Name"
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo city={city} total={searchedRestaurants.pagination.total} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => {
              console.log("value: ", value);
              setSortOption(value);
            }}
          />
        </div>
        {searchedRestaurants?.data?.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}

        {searchedRestaurants?.data?.length > 0 && (
          <SearchPagination
            page={searchedRestaurants.pagination.page}
            pages={searchedRestaurants.pagination.pages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
