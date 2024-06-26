"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import CreateDialogCategory from "./dialog/create-dialog-category";
import { BadgePlus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

function CategoryPicker({ type, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });


  useEffect(() => {
    if(!value) return;
    onChange(value);
  },[onChange, value]);

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  const successCallBack = (category: Category) => {
    setValue(category.name);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      
      <PopoverTrigger asChild >
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between",
              open && "bg-muted-foreground/20 "
          )}
        >          
          
          {selectedCategory ? (                     
            <CategoryRow category={selectedCategory} />
          ) : (           
            " Select Category"
          )}
        <ChevronsUpDown size={15}/>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
      <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup heading="Recent Category">
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    className="flex justify-between"
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category}  />
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0",
                        value === category.name && "opacity-100 text-green-500"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
          <CommandSeparator/>
          <CreateDialogCategory type={type} successCallBack={successCallBack} />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryPicker;



function CategoryRow({ category } : { category : Category } ){
  
    return (
        <div className="flex items-center gap-2">
           <span role="img">{category.icon}</span>
           <span>{category.name}</span>
        </div>
    )
}