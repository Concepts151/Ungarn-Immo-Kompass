"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import bootstrap from "bootstrap";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { uploadImage, uploadVideo } from "@/utils/supabase/storage/client";
import cities from "@/data/hu.json";
import AddPropertyProgress from "@/app/(dashboard)/add-property/components/add-property-progress";
import "@/app/(dashboard)/add-property/components/css/add-property.css";
import DescriptionInfoForm from "@/app/(dashboard)/add-property/components/description-info-form";
import MediaForm from "@/app/(dashboard)/add-property/components/media-form";
import LocationInfoForm from "@/app/(dashboard)/add-property/components/location-info-form";
import DetailsForm from "@/app/(dashboard)/add-property/components/details-info-form";
import AmenitiesForm from "@/app/(dashboard)/add-property/components/amenities-info-form";

import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/state/api";
import Conditions from "@/app/(dashboard)/add-property/components/conditon-and-plan";
import AddOverview from "@/app/(dashboard)/add-property/components/add-overview";
import { useNiceSelect } from "@/components/elements/useNiceSelect";

type Category = "Apartment" | "Bar" | "Cafe" | "House" | "Farm";

const steps = [
  "Description",
  "Media",
  "Details",
  "Location",
  "Condition & Floor Plan",
  "Overview",
];

interface ListingFormData {
  title: string;
  description: string;
  address: string;
  postalCode: string;
  price: string;
  currency: string;
  lotSize: string;
  livingArea: string;
  numberOfRooms: string;
  numberOfBedrooms: string;
  numberOfBathrooms: string;
  city: string;
  year: string;
  country: string;
  villageId?: string;
  category: string;
  listedIn: string;
  propertyStatus: string; // imageUrls: string[];
  // fetchedImages: string[];
}

interface DetailsFormData {
  material: string;
  roofType: string;
  roofCondition: string;
  insulation: string;
  windows: string;
  windowsAge: string;
  hasRollerShutters: boolean;
  heatingType: string;
  heatingCondition: string;
  electricCondition: string;
  waterCondition: string;
  energyCertificate: boolean;
  energyClass: string;
  energyConsumption: string;
  internetType: string;
  internetSpeed: string;
  monthlyCosts: {
    electricity: number;
    water: number;
    gas: number;
    trash: number;
    tax: number;
  };
  gardenDesc: string;
}

interface Locationdata {
  longitude: string;
  latitude: string;
  villageId: string;
}

export interface ExposeCondition {
  structureRating: number; // 1–5
  electricRating: number; // 1–5
  heatingRating: number; // 1–5
  damageDescription: string;
  renovationNeeded: string;
  additionalNotes?: string | null;
  floorPlanUrl?: string[] | null;
}

const initialListingFormData: ListingFormData = {
  title: "",
  description: "",
  address: "",
  postalCode: "",
  price: "",
  currency: "Hungarian forint (HUF)",
  lotSize: "",
  livingArea: "",
  numberOfRooms: "",
  numberOfBedrooms: "",
  numberOfBathrooms: "",
  city: "",
  year: "",
  country: "Hungary",
  villageId: "",
  category: "HOUSE",
  listedIn: "Active",
  propertyStatus: "Sale",
};

const initialDetailsFormData: DetailsFormData = {
  // Add initial values for details form data if needed
  material: "",
  roofType: "",
  roofCondition: "",
  insulation: "",
  windows: "",
  windowsAge: "",
  hasRollerShutters: false,
  heatingType: "",
  heatingCondition: "",
  electricCondition: "",
  waterCondition: "",
  energyCertificate: false,
  energyClass: "",
  energyConsumption: "",
  internetType: "",
  internetSpeed: "",
  monthlyCosts: {
    electricity: 0,
    water: 0,
    gas: 0,
    trash: 0,
    tax: 0,
  },
  gardenDesc: "",
};

const initialLocationData: Locationdata = {
  longitude: "0",
  latitude: "0",
  villageId: "",
};

const initialConditionData: ExposeCondition = {
  structureRating: 1,
  electricRating: 1,
  heatingRating: 1,
  damageDescription: "",
  renovationNeeded: "",
  additionalNotes: null,
  floorPlanUrl: null,
};

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const supabase = createClient();
  const [listingFormData, setListingFormData] = useState<ListingFormData>(
    initialListingFormData
  );
  const [locationData, setLocationData] =
    useState<Locationdata>(initialLocationData);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<string[]>([]);
  const [floorPlanUrls, setFloorPlanUrls] = useState<string[]>([]);

  const [details, setDetails] = useState(initialDetailsFormData);
  const [conditionData, setConditionData] = useState(initialConditionData);

  const [isPending, startTransition] = useTransition();
  const [listingId, setListingId] = useState<string | null>(null);
  // new
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // redux user
  const { data: authUser } = useGetAuthUserQuery();
  const [createProperty] = useCreatePropertyMutation();

  // Initialize nice-select for dropdowns
  const { initializeNiceSelect } = useNiceSelect();

  // Convert property type category to match backend enum
  const mapCategoryToPropertyType = (category: string): string => {
    const mapping: { [key: string]: string } = {
      House: "HOUSE",
      Apartment: "APARTMENT",
      Farm: "FARMHOUSE",
      Bar: "APARTMENT", // Map to closest available type
      Cafe: "APARTMENT", // Map to closest available type
    };
    return mapping[category] || "HOUSE";
  };

  // Convert currency format
  const mapCurrency = (currency: string): string => {
    if (currency.includes("HUF")) return "HUF";
    if (currency.includes("EUR")) return "EUR";
    return "HUF";
  };

  useEffect(() => {
    console.log("authUser", authUser);
  }, []);

  // Handle AI Extracted Data
  const handleDataExtracted = (extractedData: any) => {
    console.log("🎯 Merging extracted data:", extractedData);

    const sanitize = (obj: any) => {
      const sanitized = { ...obj };
      Object.keys(sanitized).forEach(key => {
        if (sanitized[key] === null || sanitized[key] === undefined) {
          sanitized[key] = "";
        }
      });
      return sanitized;
    };

    if (extractedData.basic) {
      const basic = sanitize(extractedData.basic);
      
      // Map currency to form options
      let currency: string | null = null;
      if (basic.currency === "EUR") currency = "Euro (EUR)";
      else if (basic.currency === "HUF") currency = "Hungarian forint (HUF)";
      else if (basic.currency === "USD") currency = "US Dollar (USD)";

      setListingFormData((prev) => ({
        ...prev,
        ...basic,
        currency: currency || prev.currency,
        // Ensure strings for form inputs
        price: basic.price?.toString() || prev.price,
        lotSize: basic.lotSize?.toString() || prev.lotSize,
        livingArea: basic.livingArea?.toString() || prev.livingArea,
        numberOfRooms: basic.rooms?.toString() || prev.numberOfRooms,
        numberOfBedrooms: basic.bedrooms?.toString() || prev.numberOfBedrooms,
        numberOfBathrooms: basic.bathrooms?.toString() || prev.numberOfBathrooms,
        year: basic.buildYear?.toString() || prev.year,
        category: basic.propertyType ? 
                  (basic.propertyType.charAt(0) + basic.propertyType.slice(1).toLowerCase()) : 
                  prev.category,
      }));
    }

    if (extractedData.details) {
      setDetails((prev) => ({
        ...prev,
        ...sanitize(extractedData.details),
      }));
    }

    if (extractedData.condition) {
      setConditionData((prev) => ({
        ...prev,
        ...sanitize(extractedData.condition),
      }));
    }
  };

  // Reinitialize nice-select when step changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is updated before initializing
    const timer = setTimeout(() => {
      initializeNiceSelect();
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, initializeNiceSelect, listingFormData.category]); // Re-init if category changes via AI

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDeleteImage = (url: string) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  const handleDeleteVideo = (url: string) => {
    console.log("🎯 Deleting video URL:", url);

    setVideoUrls(videoUrls.filter((videoUrl) => videoUrl !== url));
    setVideoFiles(
      videoFiles.filter((file) => URL.createObjectURL(file) !== url)
    );
  };
  // Handler for details tab input changes
  const handleDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLocationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (imageFiles.length + filesArray.length > 10) {
        toast.error("You can only upload up to 10 images in total.");
        return;
      }

      // Store actual files for upload
      setImageFiles([...imageFiles, ...filesArray]);

      // Create preview URLs
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };
  // handle video selection
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      console.log("🎯 Selected video files:", filesArray);

      console.log(
        "🎯 Current video files before adding:",
        videoFiles.length + filesArray.length > 2
      );

      if (videoFiles.length + filesArray.length > 2) {
        toast.error("You can only upload up to 2 videos in total.");
        return;
      }
      // Store actual files for upload
      setVideoFiles([...videoFiles, ...filesArray]);

      // Create preview URLs
      const newVideoUrls = filesArray.map((file) => URL.createObjectURL(file));
      setVideoUrls([...videoUrls, ...newVideoUrls]);
    }
  };

  // Upload images to Supabase Storage
  const uploadImagesToSupabase = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      try {
        const { imageUrl, error } = await uploadImage({
          file: file,
          bucket: "listings",
          folder: `property_${Date.now()}`,
        });

        if (error) {
          console.error("Error uploading image:", error);
          continue;
        }

        if (imageUrl) {
          uploadedUrls.push(imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return uploadedUrls;
  };

  const uploadVideosToSupabase = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of videoFiles) {
      try {
        const { videoUrl, error } = await uploadVideo({
          file: file,
          bucket: "videos",
          folder: `property_${Date.now()}`,
        });
        if (error) {
          console.error("Error uploading video:", error);
          continue;
        }
        if (videoUrl) {
          uploadedUrls.push(videoUrl);
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }

    return uploadedUrls;
  };

  // Handle floor plan selection
  const handleFloorPlanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      // Store actual files for upload
      setFloorPlanFiles([...floorPlanFiles, ...filesArray]);

      // Create preview URLs
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFloorPlanUrls([...floorPlanUrls, ...newUrls]);
    }
  };

  // Upload floor plans to Supabase Storage
  const uploadFloorPlansToSupabase = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of floorPlanFiles) {
      try {
        const { imageUrl, error } = await uploadImage({
          file: file,
          bucket: "listings",
          folder: `floorplans_${Date.now()}`,
        });

        if (error) {
          console.error("Error uploading floor plan:", error);
          continue;
        }

        if (imageUrl) {
          uploadedUrls.push(imageUrl);
        }
      } catch (error) {
        console.error("Error uploading floor plan:", error);
      }
    }

    return uploadedUrls;
  };

  // Actual function implementation:
  const handleSubmitNewListing = async () => {
    // Validation
    const {
      title,
      description,
      address,
      postalCode,
      price,
      lotSize,
      livingArea,
      numberOfBathrooms,
      numberOfBedrooms,
      numberOfRooms,
      country,
      city,
      year,
      category,
      currency,
    } = listingFormData;

    // if (!address || !postalCode || !price || !city) {
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }

    // if (!authUser?.user?.id) {
    //   toast.error("You must be logged in to create a property.");
    //   return;
    // }

    startTransition(async () => {
      setIsCreating(true);
      try {
        // First, upload images to Supabase Storage
        const uploadedMediaUrls = await uploadImagesToSupabase();
        const uploadedFloorPlanUrls = await uploadFloorPlansToSupabase();

        const uploadedVideoUrls = await uploadVideosToSupabase();

        console.log("🎯 Uploaded image URLs:", uploadedMediaUrls);
        console.log("🎯 Uploaded floor plan URLs:", uploadedFloorPlanUrls);
        console.log("🎯 Uploaded video URLs:", uploadedVideoUrls);

        const allMediaUrls = [...uploadedMediaUrls, ...uploadedVideoUrls];

        const mediaEntries = allMediaUrls.map((url: string) => {
          const isVideo = uploadedVideoUrls.includes(url);
          return {
            mediaType: isVideo ? "VIDEO" : "PHOTO",
            url: url,
            thumbnailUrl: url, // Using same URL for now
          };
        });

        console.log("🎯 Prepared media entries for property:", mediaEntries);

        // Prepare the property data
        const propertyData = {
          sellerId: authUser.user.id,
          basic: {
            title: title,
            description: description,
            propertyType: mapCategoryToPropertyType(category),
            address: address,
            postalCode: postalCode,
            city: city,
            county: country, // Using city as county for now
            villageId: locationData.villageId,
            price: parseInt(price),
            currency: mapCurrency(currency),
            lotSize: parseInt(lotSize) || 0,
            livingArea: parseInt(livingArea) || 0,
            rooms: parseInt(numberOfRooms) || 0,
            bedrooms: parseInt(numberOfBedrooms) || 0,
            bathrooms: parseInt(numberOfBathrooms) || 0,
            buildYear: parseInt(year) || new Date().getFullYear(),
            lastRenovation: null,
          },
          details: details.heatingType
            ? {
                material: details.material || null,
                roofType: details.roofType || null,
                roofCondition: details.roofCondition || null,
                insulation: details.insulation || null,
                windows: details.windows || null,
                windowsAge: parseInt(details.windowsAge) || null,
                hasRollerShutters: details.hasRollerShutters,
                heatingType: details.heatingType,
                heatingCondition: details.heatingCondition,
                electricCondition: details.electricCondition,
                waterCondition: details.waterCondition,
                energyCertificate: details.energyCertificate,
                energyConsumption:
                  parseFloat(details.energyConsumption) || null,
                energyClass: details.energyClass || null,
                internetType: details.internetType,
                internetSpeed: parseInt(details.internetSpeed) || 0,
                monthlyCosts: details.monthlyCosts,
                gardenDesc: details.gardenDesc || null,
              }
            : undefined,
          condition: conditionData.damageDescription
            ? {
                structureRating: conditionData.structureRating,
                electricRating: conditionData.electricRating,
                heatingRating: conditionData.heatingRating,
                damageDescription: conditionData.damageDescription,
                renovationNeeded: conditionData.renovationNeeded,
                additionalNotes: conditionData.additionalNotes,
              }
            : undefined,
          // Location will be geocoded by the backend if not provided
          location:
            locationData.latitude && locationData.longitude
              ? {
                  latitude: parseFloat(locationData.latitude),
                  longitude: parseFloat(locationData.longitude),
                }
              : undefined,
          media: mediaEntries,
          floorplans: uploadedFloorPlanUrls.map((url: string) => ({
            url: url,
          })),
        };

        // Call the API to create the property
        const result = await createProperty(propertyData).unwrap();

        toast.success("Property created successfully!");
        setIsCreating(false);

        // Redirect to the property listing or dashboard
        // setTimeout(() => {
        //   router.push("/dashboard/properties");
        // }, 1500);
      } catch (error: any) {
        console.error("Error creating property:", error);
        toast.error(
          error?.data?.message || "Failed to create property. Please try again."
        );
        setIsCreating(false);
      }
    });
  };

  return (
    <>
      {/*===== DASHBOARD AREA STARTS =======*/}
      <div className="add-property-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-boxarea">
                {/* to br removed */}
                {/* {JSON.stringify(listingFormData, null, 2)} <br /> */}
                {/* image urls: */}
                {/* {JSON.stringify(imageUrls, null, 2)} */}
                {/* <br /> */}
                {/* location: */}
                {/* {JSON.stringify(locationData, null, 2)} */}
                {/* <br /> */}
                {/* detail: */}
                {/* {JSON.stringify(details, null, 2)} */}
                {/* to br removed */}
                <h3>Add New Property</h3>
                <div className="space40" />
                <div className="all-tabs-boxarea">
                  <AddPropertyProgress
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    steps={steps}
                  />
                  <div className="multipage_form_wrapper">
                    {currentStep === 1 && (
                      <DescriptionInfoForm
                        data={listingFormData}
                        onDataChange={setListingFormData}
                        onNext={handleNext}
                        steps={steps}
                        currentStep={currentStep}
                        onDataExtracted={handleDataExtracted}
                      />
                    )}
                    {currentStep === 2 && (
                      <MediaForm
                        imageUrls={imageUrls}
                        handleImageChange={handleImageChange}
                        videoUrls={videoUrls}
                        handleVideoChange={handleVideoChange}
                        onNext={handleNext}
                        onBack={handleBack}
                        steps={steps}
                        currentStep={currentStep}
                        handleDeleteImage={handleDeleteImage}
                        handleDeleteVideo={handleDeleteVideo}
                      />
                    )}

                    {currentStep === 3 && (
                      <DetailsForm
                        data={details}
                        onNext={handleNext}
                        onBack={handleBack}
                        onDetailsChange={setDetails}
                        steps={steps}
                        currentStep={currentStep}
                      />
                    )}
                    {currentStep === 4 && (
                      <LocationInfoForm
                        propertyData={listingFormData}
                        data={locationData}
                        onDataChange={handleLocationChange}
                        onNext={handleNext}
                        onBack={handleBack}
                        steps={steps}
                        currentStep={currentStep}
                      />
                    )}
                    {currentStep === 5 && (
                      <Conditions
                        data={conditionData}
                        onConditionData={setConditionData}
                        onNext={handleNext}
                        onBack={handleBack}
                        floorPlanFiles={floorPlanFiles}
                        floorPlanUrls={floorPlanUrls}
                        onFloorPlanChange={handleFloorPlanChange}
                        onDeleteFloorPlan={() => {}}
                        steps={steps}
                        currentStep={currentStep}
                      />
                    )}
                    {currentStep === 6 && (
                      <AddOverview
                        descriptionData={listingFormData}
                        mediaData={imageUrls}
                        videoData={videoUrls}
                        locationData={locationData}
                        detailsData={details}
                        upload={handleSubmitNewListing}
                        onBack={handleBack}
                        isLoading={isCreating || isPending}
                      />
                    )}
                  </div>
                  <div className="space40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===== DASHBOARD AREA ENDS =======*/}
    </>
  );
}