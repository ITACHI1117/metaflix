import { LucideProps, Save, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ForwardRefExoticComponent, RefAttributes } from "react";

const FilterDialog = ({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedGenre,
  handleGenreChange,
  genres,
  selectedYear,
  handleYearChange,
  years,
  clearFilters,
  hasActiveFilters,
  saveFilters,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.SetStateAction<React.Dispatch<boolean>>;
  selectedGenre: string;
  handleGenreChange: (value: any) => void;
  genres: {
    value: string;
    label: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
  selectedYear: string;
  handleYearChange: (value: any) => void;
  years: {
    value: string;
    label: string;
  }[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
  saveFilters: () => void;
}) => {
  return (
    <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9">
          <SlidersHorizontal className="h-4 w-4" />
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Videos</DialogTitle>
          <DialogDescription>
            Filter search by category and date
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-0 space-y-6 flex gap-5 text-center">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.value} value={genre.value}>
                    <div className="flex items-center px-5">
                      {/* <genre.icon className="h-4 w-4 mr-2" /> */}
                      {genre.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="flex-1"
            >
              Clear Filters
            </Button>
            <Button onClick={saveFilters} className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Save Filters
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
