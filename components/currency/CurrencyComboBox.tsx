"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Currencies, Currency } from "@/lib/currencies"
import { DollarSign } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import SkeletonWrapper from "../Skeleton/SkeletonWrapper"
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings"
import { toast } from "sonner";
import { UserSettings } from "@prisma/client"

type Status = {
  value: string
  label: string
}


export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  )

  // fetch the current currency of user
  const userSettings = useQuery({
    queryKey: ["userSettings"],
    queryFn: () => fetch("api/user-settings").then((res) => res.json()),
  });


  // check what is the current currency in the database for that user
  React.useEffect(()=>{
    if(!userSettings.data) return ;

    const userCurrency = Currencies.find((currency) => currency.value === userSettings.data) 

    if (userCurrency) setSelectedOption(userCurrency);

  },[userSettings.data])


  

  // update/mutate the currency
  const mutation = useMutation({
    mutationFn:  UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Currency updated successfully!",{
        id: "update-currency",
      });

      setSelectedOption(
        Currencies.find((c) => c.value === data.currency) || null)
    },
    onError: (error) => {
      toast.error(error.message,{
        id: "update-currency",
      });
    }
  });

  const selectOption = React.useCallback((currency: Currency | null ) =>{
    if(!currency) {
      toast.error("Please select a currency")
      return;
    }

    toast.loading("Updating Currency...",{
        id: "update-currency",
    })

    mutation.mutate(currency.value)

  },[mutation]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" 
            className="w-[150px] justify-start" 
            disabled={mutation.isPending}>
              {selectedOption ? <>{selectedOption.label}</> : <> <DollarSign size={15}/> Set Currency</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <OptionList 
            setOpen={setOpen} 
            setSelectedOption={selectOption} />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" 
        className="w-[150px] justify-start"
        disabled={mutation.isPending}>
          {selectedOption ? <>{selectedOption.label}</> : <> <DollarSign size={15} /> Set Currency</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList 
          setOpen={setOpen}
          setSelectedOption={selectOption} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((curr: Currency) => (
            <CommandItem
              className="cursor-pointer"
              key={curr.value}
              value={curr.value}
              onSelect={(value) => {
                setSelectedOption(
                    Currencies.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {curr.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
