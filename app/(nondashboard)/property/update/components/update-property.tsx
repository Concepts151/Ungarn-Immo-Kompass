"use client";
import React, { useState, useEffect, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import bootstrap from "bootstrap";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAuthUserQuery,
  useGetPropertyQuery,
  useUpdatePropertyMutation,
} from "@/state/api";
import UpdatePropertyProgress from "./update-property-progress";
import UpdateDescriptionForm from "./update-description-form";
import UpdateMediaForm from "./update-media-form";
import { uploadImage, uploadVideo } from "@/utils/supabase/storage/client";
import toast from "react-hot-toast";
import "@/app/(dashboard)/add-property/components/css/add-property.css";
import UpdateDetailsForm from "./update-details-form";
import UpdateConditions from "./update-conditions-form";
import Overview from "@/app/(dashboard)/add-property/components/overview";

type Category = "Apartment" | "Bar" | "Cafe" | "House" | "Farm";

const steps = [
  "Description",
  "Media",
  "Details",
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
  category: string;
  listedIn: string;
  propertyStatus: string;
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
}

export interface ExposeCondition {
  structureRating: number;
  electricRating: number;
  heatingRating: number;
  damageDescription: string;
  renovationNeeded: string;
  additionalNotes?: string | null;
  floorPlanUrl?: string[] | null;
}

const initialDetailsFormData: DetailsFormData = {
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

const UpdateProperty = () => {
  const { id } = useParams();
  const propertyId =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";

  const { data: property, error, isLoading } = useGetPropertyQuery(propertyId);
  const [
    updateProperty,
    { isLoading: updating, isSuccess, isError, error: updateError },
  ] = useUpdatePropertyMutation();
  const { data: authUser } = useGetAuthUserQuery();

  console.log("property details:", property, error, isLoading);

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
    category: "HOUSE",
    listedIn: "Active",
    propertyStatus: "Sale",
  };

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
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isloading, setIsLoading] = useState(false);

  // 🔥 NEW: Track which media items have changed
  const [hasMediaChanged, setHasMediaChanged] = useState(false);
  const [hasFloorPlanChanged, setHasFloorPlanChanged] = useState(false);
  const [originalMediaUrls, setOriginalMediaUrls] = useState<string[]>([]);
  const [originalFloorPlanUrls, setOriginalFloorPlanUrls] = useState<string[]>(
    []
  );

  // Convert currency format
  const mapCurrency = (currency: string): string => {
    if (currency.includes("HUF")) return "HUF";
    if (currency.includes("EUR")) return "EUR";
    return "HUF";
  };

  const mapCategoryToPropertyType = (category: string): string => {
    const mapping: { [key: string]: string } = {
      House: "HOUSE",
      Apartment: "APARTMENT",
      Farm: "FARMHOUSE",
      Bar: "APARTMENT",
      Cafe: "APARTMENT",
    };
    return mapping[category] || "HOUSE";
  };

  useEffect(() => {
    if (!property) return;
    const basic = (property as any).basic ?? {};
    const location = (property as any).location ?? {};
    const details = (property as any).details ?? {};
    const conditions = (property as any).condition ?? {};
    const media = (property as any).media ?? [];
    const floorplans = (property as any).floorplans ?? [];

    setListingFormData((prev) => ({
      ...prev,
      title: basic.title ?? (property as any).title ?? prev.title,
      description: basic.description ?? prev.description,
      address: basic.address ?? prev.address,
      postalCode: basic.postalCode ?? prev.postalCode,
      price: String(basic.price ?? prev.price),
      currency: basic.currency ?? prev.currency,
      lotSize: String(basic.lotSize ?? prev.lotSize),
      livingArea: String(basic.livingArea ?? prev.livingArea),
      numberOfRooms: String(basic.rooms ?? prev.numberOfRooms),
      numberOfBedrooms: String(basic.bedrooms ?? prev.numberOfBedrooms),
      numberOfBathrooms: String(basic.bathrooms ?? prev.numberOfBathrooms),
      city: basic.city ?? prev.city,
      year: String(basic.year ?? prev.year),
      country: basic.country ?? prev.country,
      category: basic.propertyType ?? prev.category,
      listedIn: basic.listedIn ?? prev.listedIn,
      propertyStatus: basic.propertyStatus ?? prev.propertyStatus,
    }));

    // Load existing media URLs
    const existingImageUrls = media
      .filter((m: any) => m.mediaType === "PHOTO" || m.mediaType === "IMAGE")
      .map((m: any) => m.url);
    const existingVideoUrls = media
      .filter((m: any) => m.mediaType === "VIDEO")
      .map((m: any) => m.url);
    const existingFloorPlanUrls = floorplans.map((fp: any) => fp.url);

    setImageUrls(existingImageUrls);
    setVideoUrls(existingVideoUrls);
    setFloorPlanUrls(existingFloorPlanUrls);
    setFetchedImages(existingImageUrls);

    // 🔥 NEW: Store original URLs to compare later
    setOriginalMediaUrls([...existingImageUrls, ...existingVideoUrls]);
    setOriginalFloorPlanUrls(existingFloorPlanUrls);

    if (location?.coordinates) {
      setLocationData({
        latitude: String(location.coordinates.latitude ?? "0"),
        longitude: String(location.coordinates.longitude ?? "0"),
      });
    }

    if (details) {
      setDetails((prev) => ({
        ...prev,
        ...details,
        windowsAge: String(details.windowsAge ?? ""),
        energyConsumption: String(details.energyConsumption ?? ""),
        internetSpeed: String(details.internetSpeed ?? ""),
        monthlyCosts: details.monthlyCosts ?? prev.monthlyCosts,
      }));
    }

    if (conditions) {
      setConditionData((prev) => ({
        ...prev,
        ...conditions,
      }));
    }
  }, [property]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // 🔥 MODIFIED: Track when images change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    setHasMediaChanged(true); // Mark as changed

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  // 🔥 MODIFIED: Track when videos change
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setVideoFiles((prev) => [...prev, ...newFiles]);
    setHasMediaChanged(true); // Mark as changed

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setVideoUrls((prev) => [...prev, ...newUrls]);
  };

  // 🔥 MODIFIED: Track when floor plans change
  const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setFloorPlanFiles((prev) => [...prev, ...newFiles]);
    setHasFloorPlanChanged(true); // Mark as changed

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setFloorPlanUrls((prev) => [...prev, ...newUrls]);
  };

  // 🔥 MODIFIED: Mark as changed when deleting
  const handleDeleteImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setHasMediaChanged(true);
  };

  const handleDeleteVideo = (index: number) => {
    setVideoUrls((prev) => prev.filter((_, i) => i !== index));
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
    setHasMediaChanged(true);
  };

  // 🔥 NEW: Only upload new images (those that are File objects, not URLs)
  const uploadImagesToSupabase = async (): Promise<string[]> => {
    if (imageFiles.length === 0) {
      // No new files, return existing URLs
      return imageUrls.filter((url) => !url.startsWith("blob:"));
    }

    console.log(`📤 Uploading ${imageFiles.length} new images to Supabase...`);
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      try {
        const { imageUrl, error } = await uploadImage({
          file: file,
          bucket: "listings",
          folder: `property_${Date.now()}`,
        });
        uploadedUrls.push(imageUrl);
        console.log(`✅ Uploaded image: ${imageUrl}`);
      } catch (error) {
        console.error("❌ Error uploading image:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    // Combine existing URLs with newly uploaded ones
    const existingUrls = imageUrls.filter((url) => !url.startsWith("blob:"));
    return [...existingUrls, ...uploadedUrls];
  };

  // 🔥 NEW: Only upload new videos
  const uploadVideosToSupabase = async (): Promise<string[]> => {
    if (videoFiles.length === 0) {
      return videoUrls.filter((url) => !url.startsWith("blob:"));
    }

    console.log(`📤 Uploading ${videoFiles.length} new videos to Supabase...`);
    const uploadedUrls: string[] = [];

    for (const file of videoFiles) {
      try {
        const { videoUrl, error } = await uploadVideo({
          file: file,
          bucket: "videos",
          folder: `property_${Date.now()}`,
        });
        uploadedUrls.push(videoUrl);
        console.log(`✅ Uploaded video: ${videoUrl}`);
      } catch (error) {
        console.error("❌ Error uploading video:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    const existingUrls = videoUrls.filter((url) => !url.startsWith("blob:"));
    return [...existingUrls, ...uploadedUrls];
  };

  // 🔥 NEW: Only upload new floor plans
  const uploadFloorPlansToSupabase = async (): Promise<string[]> => {
    if (floorPlanFiles.length === 0) {
      return floorPlanUrls.filter((url) => !url.startsWith("blob:"));
    }

    console.log(`📤 Uploading ${floorPlanFiles.length} new floor plans...`);
    const uploadedUrls: string[] = [];

    for (const file of floorPlanFiles) {
      try {
        const { imageUrl, error } = await uploadImage({
          file: file,
          bucket: "listings",
          folder: `floorplans_${Date.now()}`,
        });
        uploadedUrls.push(imageUrl);
        console.log(`✅ Uploaded floor plan: ${imageUrl}`);
      } catch (error) {
        console.error("❌ Error uploading floor plan:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    const existingUrls = floorPlanUrls.filter(
      (url) => !url.startsWith("blob:")
    );
    return [...existingUrls, ...uploadedUrls];
  };

  const handleUpdateListing = () => {
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

    startTransition(async () => {
      try {
        // 🔥 OPTIMIZED: Only upload if media has changed
        let uploadedMediaUrls = imageUrls.filter(
          (url) => !url.startsWith("blob:")
        );
        let uploadedVideoUrls = videoUrls.filter(
          (url) => !url.startsWith("blob:")
        );
        let uploadedFloorPlanUrls = floorPlanUrls.filter(
          (url) => !url.startsWith("blob:")
        );

        if (hasMediaChanged) {
          console.log("📸 Media changed - uploading new files...");
          uploadedMediaUrls = await uploadImagesToSupabase();
          uploadedVideoUrls = await uploadVideosToSupabase();
        } else {
          console.log("✅ No media changes - skipping upload");
        }

        if (hasFloorPlanChanged) {
          console.log("📋 Floor plans changed - uploading new files...");
          uploadedFloorPlanUrls = await uploadFloorPlansToSupabase();
        } else {
          console.log("✅ No floor plan changes - skipping upload");
        }

        const allMediaUrls = [...uploadedMediaUrls, ...uploadedVideoUrls];

        // 🔥 OPTIMIZED: Build property data - only include sections that need updating
        const propertyData: any = {
          basic: {
            title: title,
            description: description,
            propertyType: mapCategoryToPropertyType(category),
            address: address,
            postalCode: postalCode,
            city: city,
            county: country,
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
        };

        // Only include details if they exist
        if (details.heatingType) {
          propertyData.details = {
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
            energyConsumption: parseFloat(details.energyConsumption) || null,
            energyClass: details.energyClass || null,
            internetType: details.internetType,
            internetSpeed: parseInt(details.internetSpeed) || 0,
            monthlyCosts: details.monthlyCosts,
            gardenDesc: String(details.gardenDesc) || "null",
          };
        }

        // Only include condition if it exists
        if (conditionData.damageDescription) {
          propertyData.condition = {
            structureRating: conditionData.structureRating,
            electricRating: conditionData.electricRating,
            heatingRating: conditionData.heatingRating,
            damageDescription: conditionData.damageDescription,
            renovationNeeded: conditionData.renovationNeeded,
            additionalNotes: conditionData.additionalNotes,
          };
        }

        // Only include location if it exists
        if (locationData.latitude && locationData.longitude) {
          propertyData.location = {
            latitude: parseFloat(locationData.latitude),
            longitude: parseFloat(locationData.longitude),
          };
        }

        // 🔥 OPTIMIZED: Only include media if it changed
        if (hasMediaChanged) {
          propertyData.media = allMediaUrls.map((url: string) => {
            const isVideo = uploadedVideoUrls.includes(url);
            return {
              mediaType: isVideo ? "VIDEO" : "PHOTO",
              url: url,
              thumbnailUrl: url,
            };
          });
          console.log("📸 Including updated media in request");
        } else {
          console.log("✅ Skipping media update - no changes");
        }

        // 🔥 OPTIMIZED: Only include floor plans if they changed
        if (hasFloorPlanChanged) {
          propertyData.floorplans = uploadedFloorPlanUrls.map(
            (url: string) => ({
              url: url,
            })
          );
          console.log("📋 Including updated floor plans in request");
        } else {
          console.log("✅ Skipping floor plans update - no changes");
        }

        console.log("🚀 Updating property with data:", propertyData);

        const result = await updateProperty({
          id: propertyId,
          data: propertyData,
        }).unwrap();

        toast.success("Property updated successfully!");
        console.log("✅ Property updated:", result);

        // Reset change flags
        setHasMediaChanged(false);
        setHasFloorPlanChanged(false);
        setImageFiles([]);
        setVideoFiles([]);
        setFloorPlanFiles([]);
      } catch (error: any) {
        console.error("❌ Error updating property:", error);
        toast.error(
          error?.data?.message || "Failed to update property. Please try again."
        );
      }
    });
  };

  return (
    <div className="add-property-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="property-boxarea">
              <h3>Update Property</h3>
              <div className="space40" />
              <div className="all-tabs-boxarea">
                <UpdatePropertyProgress
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  steps={steps}
                />
                <div className="multipage_form_wrapper">
                  {currentStep === 1 && (
                    <UpdateDescriptionForm
                      data={listingFormData}
                      onDataChange={setListingFormData}
                      onNext={handleNext}
                      steps={steps}
                      currentStep={currentStep}
                    />
                  )}
                  {currentStep === 2 && (
                    <UpdateMediaForm
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
                    <UpdateDetailsForm
                      data={details}
                      onNext={handleNext}
                      onBack={handleBack}
                      onDetailsChange={setDetails}
                      steps={steps}
                      currentStep={currentStep}
                    />
                  )}

                  {currentStep === 4 && (
                    <UpdateConditions
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
                  {currentStep === 5 && (
                    <Overview
                      descriptionData={listingFormData}
                      mediaData={imageUrls}
                      locationData={locationData}
                      detailsData={details}
                      upload={handleUpdateListing}
                      onBack={handleBack}
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
  );
};

export default UpdateProperty;
