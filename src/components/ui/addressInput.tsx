"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { twMerge } from "tailwind-merge";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Typography } from "@/components/ui";
import { IconsType } from "@/types";
import Icon from "@/Icons";
import { useOutsideClick } from "@/hooks";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GooglePlace {
  formatted_address: string;
  address_components: AddressComponent[];
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface Prediction {
  place_id: string;
  description: string;
}

interface Props {
  label?: string;
  error?: string;
  value: string;
  className?: string;
  disabled?: boolean;
  leftIcon?: IconsType;
  placeholder?: string;
  wrapperClassName?: string;
  variant?: "primary" | "secondary";
  onChange?: (value: string) => void;
  onPlaceSelect?: (place: {
    address: string;
    latitude: number;
    longitude: number;
    state: string;
    city: string;
  }) => void;
}

const styles = {
  wrapper: "w-full",
  label: "block mb-1.5",
  leftIcon: "h-4 stroke-unactive mr-3",
  input: {
    base: "w-full flex items-center bg-white border-1 border-stroke rounded-lg h-11 px-4",
    secondary:
      "h-10 bg-element border-divider text-paragraph placeholder:text-unactive",
    disabled: "opacity-50 bg-stroke cursor-not-allowed",
    inner:
      "flex-1 focus:outline-none placeholder:text-paragraph text-sm text-heading disabled:cursor-not-allowed",
  },
  error: "text-[10px] text-red-600 mt-1",
  predictions:
    "absolute z-10 w-full mt-1 bg-white border-1 border-stroke rounded-lg shadow-lg",
  predictionItem:
    "px-4 py-2 text-sm text-paragraph hover:bg-stroke cursor-pointer",
};

const AddressInput = ({
  label,
  error,
  value,
  leftIcon,
  disabled,
  className,
  wrapperClassName,
  placeholder = "Enter address",
  variant = "primary",
  onChange,
  onPlaceSelect,
}: Props) => {
  const [showPredictions, setShowPredictions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowPredictions(false));

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetPredictions = useCallback(
    debounce((input: string) => {
      if (input.length > 2) {
        getPlacePredictions({
          input,
          componentRestrictions: { country: "us" },
        });
      } else {
        setShowPredictions(false);
      }
    }, 500),
    [getPlacePredictions]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);
    debouncedGetPredictions(value);
  };

  const handlePredictionClick = (prediction: Prediction) => {
    if (!placesService) return;
    placesService.getDetails(
      { placeId: prediction.place_id },
      (placeDetails: GooglePlace) => {
        const address = placeDetails.formatted_address;
        const lat = placeDetails.geometry?.location?.lat();
        const lng = placeDetails.geometry?.location?.lng();

        const addressComponents = placeDetails.address_components;
        const stateComponent = addressComponents?.find((component) =>
          component.types.includes("administrative_area_level_1")
        );
        const cityComponent = addressComponents?.find((component) =>
          component.types.includes("locality")
        );

        onPlaceSelect?.({
          address,
          latitude: lat,
          longitude: lng,
          state: stateComponent?.long_name || "",
          city: cityComponent?.long_name || "",
        });
        setShowPredictions(false);
      }
    );
  };

  useEffect(() => {
    if (placePredictions.length) {
      setShowPredictions(true);
    }
  }, [placePredictions]);

  return (
    <div className={`${styles.wrapper} ${wrapperClassName || ""}`}>
      {label && (
        <label className={styles.label}>
          <Typography level="p1_bold">{label}</Typography>
        </label>
      )}
      <div className="relative" ref={ref}>
        <div
          className={twMerge(
            styles.input.base,
            variant === "secondary" && styles.input.secondary,
            disabled && styles.input.disabled,
            className || ""
          )}
        >
          {leftIcon && <Icon name={leftIcon} className={styles.leftIcon} />}
          <input
            type="text"
            autoComplete="off"
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={styles.input.inner}
            onChange={handleInputChange}
            onFocus={() => value?.length > 2 && setShowPredictions(true)}
            onBlur={() => setTimeout(() => setShowPredictions(false), 200)}
          />
        </div>
        {showPredictions &&
          (placePredictions?.length > 0 || isPlacePredictionsLoading) && (
            <div className={styles.predictions}>
              {isPlacePredictionsLoading ? (
                <div className={styles.predictionItem}>Loading...</div>
              ) : (
                placePredictions?.map((prediction) => (
                  <div
                    key={prediction.place_id}
                    className={styles.predictionItem}
                    onClick={() => handlePredictionClick(prediction)}
                  >
                    {prediction.description}
                  </div>
                ))
              )}
            </div>
          )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AddressInput;
