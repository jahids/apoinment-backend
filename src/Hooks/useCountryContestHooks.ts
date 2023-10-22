import { useContext } from "react";
import { CountryContextType } from "../Types/commonTypes";
import { SelectedCountryContext } from "../App";

export const useCountryContext = (): CountryContextType => {
    const context = useContext(SelectedCountryContext);
    if (!context) {
      throw new Error("useCountryContext must be used within a CountryProvider");
    }
    return context;
  };
  