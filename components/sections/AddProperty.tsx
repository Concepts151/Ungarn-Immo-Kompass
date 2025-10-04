"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import bootstrap from "bootstrap";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { uploadImage } from "@/utils/supabase/storage/client";
import cities from "@/data/hu.json";
import AddPropertyProgress from "@/app/(dashboard)/add-property/components/add-property-progress";
import "@/app/(dashboard)/add-property/components/css/add-property.css";
import DescriptionInfoForm from "@/app/(dashboard)/add-property/components/description-info-form";
import MediaForm from "@/app/(dashboard)/add-property/components/media-form";
import LocationInfoForm from "@/app/(dashboard)/add-property/components/location-info-form";
import DetailsForm from "@/app/(dashboard)/add-property/components/details-info-form";
import AmenitiesForm from "@/app/(dashboard)/add-property/components/amenities-info-form";
import Overview from "@/app/(dashboard)/add-property/components/overview";
import { useGetAuthUserQuery } from "@/state/api";
import Conditions from "@/app/(dashboard)/add-property/components/conditon-and-plan";

type Category = "Apartment" | "Bar" | "Cafe" | "House" | "Farm";

const steps = [
  "Description",
  "Media",
  "Details",
  "Amenities",
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
  propertyStatus: string; // imageUrls: string[];
  // fetchedImages: string[];
}

interface DetailsFormData {}

interface Locationdata {
  longitude: string;
  latitude: string;
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
  currency: "",
  lotSize: "",
  livingArea: "",
  numberOfRooms: "",
  numberOfBedrooms: "",
  numberOfBathrooms: "",
  city: "",
  year: "",
  country: "Hungary",
  category: "",
  listedIn: "",
  propertyStatus: "",
};

const initialDetailsFormData: DetailsFormData = {
  // Add initial values for details form data if needed
  material: "",
  roofType: "",
  roofCondition: "",
  insulation: "",
  windows: "",
  windowsAge: "",
  hasRollerShutter: "",
  heatingType: "",
  heatingCondition: "",
  electricCondition: "",
  waterCondition: "",
  energyCertificate: "",
  energyClass: "",
  energyConsumption: "",
  internetType: "",
  internetSpeed: "",
  monthlyCost: "",
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

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(5);
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

  // redux user
  const { data: authUser } = useGetAuthUserQuery();

  const fetchImages = async () => {
    if (!listingId || listingId === "0") return; // Skip fetching if listingId is "0"

    try {
      const { data, error } = await supabase
        .from("expose_media")
        .select("url")
        .eq("expose_id", listingId)
        .eq("media_type", "image");

      if (error) {
        toast.error("Failed to fetch images.");
        return;
      }

      setFetchedImages(data.map((item) => item.url));
    } catch {
      toast.error("An error occurred while fetching images.");
    }
  };

  const handleDeleteFetchedImage = async (url: string) => {
    if (!listingId) {
      toast.error("Listing ID is required to delete images.");
      return;
    }

    try {
      const { error } = await supabase
        .from("expose_media")
        .delete()
        .eq("expose_id", listingId)
        .eq("url", url);

      if (error) {
        toast.error("Failed to delete image.");
        return;
      }

      toast.success("Image deleted successfully.");
      await fetchImages(); // Refetch images after deletion
    } catch {
      toast.error("An error occurred while deleting the image.");
    }
  };

  useEffect(() => {
    fetchImages();
    console.log("authUser", authUser);
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitNewListing = async () => {
    // Validation to ensure all fields are filled
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
    if (
      !title ||
      !description ||
      !address ||
      !postalCode ||
      !price ||
      !lotSize ||
      !livingArea ||
      !numberOfRooms ||
      !numberOfBedrooms ||
      !numberOfBathrooms ||
      !city ||
      !year
    ) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    }

    // fetch user data
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Current User:", user?.id);

    // if (user) {
    //   try {
    //     const { data: exposeData, error: exposeError } = await supabase
    //       .from("expose")
    //       .insert([
    //         { sellerId: user.id, title: title, description: description },
    //       ])
    //       .select();

    //     if (exposeError) {
    //       console.error("Error inserting data:", exposeError);
    //       return;
    //     }
    //     console.log("Insert Data:", exposeData);
    //     // Assuming the inserted data contains an `id` field
    //     const propertyId = exposeData[0]?.id;

    //     if (propertyId) {
    //       const { data: exposeBasicData, error: exposeBasicError } =
    //         await supabase
    //           .from("expose_basic")
    //           .insert([
    //             {
    //               exposeid: propertyId,
    //               title: title,
    //               address: address,
    //               postal_code: postalCode,
    //               price: price,
    //               lot_size: lotSize,
    //               living_area: livingArea,
    //               rooms: numberOfRooms,
    //               bedroom: numberOfBedrooms,
    //               bathroom: numberOfBathrooms,
    //               build_year: year,
    //               city: city,
    //               country: country,
    //               property_type: category as Category,
    //               last_renovation: "2020",
    //               currency: currency,
    //             },
    //           ])
    //           .select();

    //       console.log("expose basic", exposeBasicData);

    //       handleUploadImage(propertyId);

    //       // const { data: exposeDetailsData, error: exposeDetailsError } =
    //       //   await supabase
    //       //     .from("expose_basic")
    //       //     .insert([
    //       //       {
    //       //         exposeid: propertyId,

    //       //       },
    //       //     ])
    //       //     .select();
    //       // Redirect using window.location
    //       // window.location.href = `/add-property?new=${propertyId}`;
    //     }
    //   } catch (error) {
    //     console.log("Error inserting data:", error);
    //   }
    // }
  };

  // upload images
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      if (fetchedImages.length + imageUrls.length + newImageUrls.length > 10) {
        toast.error("You can only upload up to 10 images in total.");
        return;
      }
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleDeleteImage = (url: string) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  const handleUploadImage = (listingId: any) => {
    startTransition(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to upload images.");
        return;
      }

      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "listings",
          folder: listingId!,
        });

        if (error) {
          toast.error("Failed to upload image.");
          return;
        }

        await addRecordToMediaTable(imageUrl, listingId);
      }

      toast.success("Images uploaded successfully!");
      setImageUrls([]); // Clear the image URLs after upload
      await fetchImages(); // Refetch existing images
    });
  };

  async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = Math.random().toString(36).slice(2, 9); // Generate a random file name
    const mineType = blob.type || "application/octet-stream"; // Default to jpeg if type is not available
    const file = new File([blob], `${fileName}.${mineType.split("/")[1]}`, {
      type: mineType,
    });
    return file;
  }

  async function addRecordToMediaTable(url: string, listingId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      toast.error("You must be logged in to upload images.");
      return;
    }

    if (!listingId) {
      console.error("Listing ID is not set");
      toast.error("Listing ID is required to upload images.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("expose_media")
        .insert([
          {
            expose_id: listingId, // Assuming `listingId` is the ID of the property
            url: url, // Add the URL to the `imageUrl` column
            media_type: "image", // Assuming the media type is an image
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting media data:", error);
        toast.error("Failed to add image to media table.");
        return;
      }

      console.log("Media Insert Data:", data);
    } catch (error) {
      console.error("Error inserting media data:", error);
      toast.error("An error occurred while adding image to media table.");
    }
  }

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

  // Submit function for details tab
  const handleSubmitDetails = async () => {
    if (!listingId) {
      toast.error("Listing ID is required to save details.");
      return;
    }
    try {
      const { error } = await supabase
        .from("exposedetails")
        .insert([
          {
            exposeid: listingId,
            ...details,
          },
        ])
        .select();

      if (error) {
        toast.error("Failed to save details.");
        return;
      }
      toast.success("Details saved successfully!");
      // Optionally move to next tab here
    } catch (err) {
      toast.error("An error occurred while saving details.");
    }
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
                      />
                    )}
                    {currentStep === 2 && (
                      <MediaForm
                        imageUrls={imageUrls}
                        handleImageChange={handleImageChange}
                        onNext={handleNext}
                        onBack={handleBack}
                        steps={steps}
                        currentStep={currentStep}
                        handleDeleteImage={handleDeleteImage}
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
                      <AmenitiesForm
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
                        steps={steps}
                        currentStep={currentStep}
                      />
                    )}
                    {currentStep === 6 && (
                      <Overview
                        descriptionData={listingFormData}
                        mediaData={imageUrls}
                        locationData={locationData}
                        detailsData={details}
                        upload={handleSubmitNewListing}
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
      {/*===== DASHBOARD AREA ENDS =======*/}
    </>
  );
}
