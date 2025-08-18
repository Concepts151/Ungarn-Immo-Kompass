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
import AddPropertyProgress from "@/app/add-property/components/add-property-progress";
import "@/app/add-property/components/css/add-property.css";
import DescriptionInfoForm from "@/app/add-property/components/description-info-form";
import MediaForm from "@/app/add-property/components/media-form";
import LocationInfoForm from "@/app/add-property/components/location-info-form";

type Category = "Apartment" | "Bar" | "Cafe" | "House" | "Farm";

const steps = ["Description", "Media", "Location", "Amenities"];

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

interface Locationdata {
  longitude: number;
  latitude: number;
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

const initialLocationData: Locationdata = {
  longitude: 0,
  latitude: 0,
};

export default function AddProperty() {
  // new states
  const [currentStep, setCurrentStep] = useState(1);
  //

  const supabase = createClient();
  const tabsRef = useRef<HTMLUListElement>(null);
  const [activeTab, setActiveTab] = useState<string>("pills-home-tab");
  const [listingFormData, setListingFormData] = useState<ListingFormData>(
    initialListingFormData
  );
  const [locationData, setLocationData] = useState<Locationdata>(initialLocationData)
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<string[]>([]);

  const [details, setDetails] = useState({
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
  });

  const [isPending, startTransition] = useTransition();
  const [listingId, setListingId] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically import bootstrap to avoid SSR issues
    if (typeof window !== "undefined") {
      import("bootstrap").then((bootstrap) => {
        // Bootstrap is now available for client-side use
      });
    }
  }, []);

  // Remember tab on reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTab = window.localStorage.getItem("add-property-active-tab");
      if (savedTab) setActiveTab(savedTab);
    }
  }, []);

  // Save tab on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("add-property-active-tab", activeTab);
    }
  }, [activeTab]);

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
    // Check the 'new' parameter in the URL and move to the next tab if needed
    if (typeof window !== "undefined" && tabsRef.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const newParam = urlParams.get("new");
      setListingId(newParam);

      if (newParam && newParam !== "0") {
        const tabs = Array.from(tabsRef.current.querySelectorAll("button"));
        const currentTab = tabs.find((tab) => tab.classList.contains("active"));
        const currentIndex = tabs.indexOf(currentTab!);

        if (currentIndex !== -1 && currentIndex < tabs.length - 1) {
          const nextTab = tabs[currentIndex + 1];
          import("bootstrap").then((bootstrap) => {
            const nextTabInstance = bootstrap.Tab.getOrCreateInstance(nextTab);
            nextTabInstance.show();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [listingId]);

  // Move to next tab and remember
  const handleNextTab = (currentTabId: string) => {
    if (typeof window !== "undefined" && tabsRef.current) {
      const tabs = Array.from(tabsRef.current.querySelectorAll("button"));
      const currentIndex = tabs.findIndex((tab) => tab.id === currentTabId);
      if (currentIndex !== -1 && currentIndex < tabs.length - 1) {
        const nextTab = tabs[currentIndex + 1];
        setActiveTab(nextTab.id);
        import("bootstrap").then((bootstrap) => {
          const nextTabInstance = bootstrap.Tab.getOrCreateInstance(nextTab);
          nextTabInstance.show();
        });
      }
    }
  };

  // Set tab active on click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitDescription = async () => {
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Current User:", user?.id);

    if (user) {
      try {
        const { data: exposeData, error: exposeError } = await supabase
          .from("expose")
          .insert([
            { sellerId: user.id, title: title, description: description },
          ])
          .select();

        if (exposeError) {
          console.error("Error inserting data:", exposeError);
          return;
        }
        console.log("Insert Data:", exposeData);
        // Assuming the inserted data contains an `id` field
        const propertyId = exposeData[0]?.id;

        if (propertyId) {
          const { data: exposeBasicData, error: exposeBasicError } =
            await supabase
              .from("expose_basic")
              .insert([
                {
                  exposeid: propertyId,
                  title: title,
                  address: address,
                  postal_code: postalCode,
                  price: price,
                  lot_size: lotSize,
                  living_area: livingArea,
                  rooms: numberOfRooms,
                  bedroom: numberOfBedrooms,
                  bathroom: numberOfBathrooms,
                  build_year: year,
                  city: city,
                  country: country,
                  property_type: category as Category,
                  last_renovation: "2020",
                  currency: currency,
                },
              ])
              .select();

          console.log("expose basic", exposeBasicData);
          // Redirect using window.location
          window.location.href = `/add-property?new=${propertyId}`;
        }
      } catch (error) {
        console.log("Error inserting data:", error);
      }
    }
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

  const handleClickUploadImageButton = () => {
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

        await addRecordToMediaTable(imageUrl);
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

  async function addRecordToMediaTable(url: string) {
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
                {JSON.stringify(listingFormData, null, 2)} <br />
                image urls:
                {JSON.stringify(imageUrls, null, 2)}
                <br />
                location:
                {JSON.stringify(locationData, null, 2)}
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
                      />
                    )}
                    {currentStep === 2 && (
                      <MediaForm
                        imageUrls={imageUrls}
                        handleImageChange={handleImageChange}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 3 && (
                      <LocationInfoForm
                        propertyData={listingFormData}
                        data={locationData}
                        onDataChange={setLocationData}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 4 && (
                      <DescriptionInfoForm
                        data={listingFormData}
                        onDataChange={setListingFormData}
                        onNext={handleNext}
                      />
                    )}
                  </div>
                  <div className="space40" />
                  <ul
                    className="nav nav-pills"
                    id="pills-tab"
                    role="tablist"
                    ref={tabsRef}
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link${
                          activeTab === "pills-home-tab" ? " active" : ""
                        }`}
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected={activeTab === "pills-home-tab"}
                        onClick={() => handleTabClick("pills-home-tab")}
                      >
                        1. Description
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link${
                          activeTab === "pills-profile-tab" ? " active" : ""
                        }`}
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected={activeTab === "pills-profile-tab"}
                        onClick={() => handleTabClick("pills-profile-tab")}
                      >
                        2. Media
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link${
                          activeTab === "pills-contact-tab" ? " active" : ""
                        }`}
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected={activeTab === "pills-contact-tab"}
                        onClick={() => handleTabClick("pills-contact-tab")}
                      >
                        3. Location
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link${
                          activeTab === "pills-contact1-tab" ? " active" : ""
                        }`}
                        id="pills-contact1-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact1"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact1"
                        aria-selected={activeTab === "pills-contact1-tab"}
                        onClick={() => handleTabClick("pills-contact1-tab")}
                      >
                        4. Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link${
                          activeTab === "pills-contact2-tab" ? " active" : ""
                        }`}
                        id="pills-contact2-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact2"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact2"
                        aria-selected={activeTab === "pills-contact2-tab"}
                        onClick={() => handleTabClick("pills-contact2-tab")}
                      >
                        5. Amenities
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    {/* <div
                      className={`tab-pane fade${
                        activeTab === "pills-home-tab" ? " show active" : ""
                      }`}
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabIndex={0}
                    >
                      <div className="space48" />
                      <h4>Property Description</h4>
                      <div className="space28" />
                      <h5>Tittle Your Home*</h5>
                      <div className="space16" />
                      <div className="col-lg-12">
                        <div className="input-area">
                          <input
                            type="text"
                            placeholder="Title Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="space32" />
                        <h5>Description Note*</h5>
                        <div className="space16" />
                        <div className="input-area">
                          <textarea
                            placeholder="Your Message"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="space16" />
                          <h5>Address</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="Enter Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space16" />
                          <h5>Postal Code</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="000000"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>City</h5>
                            <div className="space16" />
                            <select
                              className="form-select"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            >
                              {cities.map((city, index) => (
                                <option key={index} value={city.city}>
                                  {city.city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>Country</h5>
                            <div className="space16" />
                            <select
                              className="nice-select"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option value="Hungary">Hungary</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Price</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="number"
                              placeholder="000,000.00"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>Currency</h5>
                            <div className="space16" />
                            <select
                              className="nice-select"
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                            >
                              <option value="US Dollar (USD)">
                                US Dollar (USD)
                              </option>
                              <option value="Euro (EUR)">Euro (EUR)</option>
                              <option value="Hungarian forint (HUF)">
                                Hungarian forint (HUF)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Lot Size (in m²)</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="000"
                              value={lotSize}
                              onChange={(e) => setLotSize(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Living Area (in m²)</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="000,000.00"
                              value={livingArea}
                              onChange={(e) => setLivingArea(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Number of Rooms</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="0"
                              value={numberOfRooms}
                              onChange={(e) => setNumberOfRooms(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Number of Bedrooms</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="0"
                              value={numberOfBedrooms}
                              onChange={(e) =>
                                setNumberOfBedrooms(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="space30" />
                          <h5>Number of Bathroom</h5>
                          <div className="space16" />
                          <div className="input-area">
                            <input
                              type="text"
                              placeholder="0"
                              value={numberOfBathrooms}
                              onChange={(e) =>
                                setNumberOfBathrooms(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>Select Category*</h5>
                            <div className="space16" />
                            <select
                              className="nice-select"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="Apartment">Apartment</option>
                              <option value="Bar">Bar</option>
                              <option value="Cafe">Cafe</option>
                              <option value="House">House</option>
                              <option value="Farm">Farm</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>Listed In*</h5>
                            <div className="space16" />
                            <select
                              className="nice-select"
                              value={listedIn}
                              onChange={(e) => setListedIn(e.target.value)}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="space30" />
                          <div className="input-area">
                            <h5>Property Status*</h5>
                            <div className="space16" />
                            <select
                              className="nice-select"
                              value={propertyStatus}
                              onChange={(e) =>
                                setPropertyStatus(e.target.value)
                              }
                            >
                              <option value="Approved">Approved</option>
                              <option value="Sale">Sale</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="space30" />
                            <div className="input-area">
                              <h5>Build Year</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="YYYY"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="space40" />
                            <div className="btn-area1 text-end">
                              <button
                                onClick={() => handleSubmitDescription()}
                                className="vl-btn1"
                              >
                                Update To Next Step
                                <span className="arrow1 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="arrow2 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div
                      className={`tab-pane fade${
                        activeTab === "pills-profile-tab" ? " show active" : ""
                      }`}
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                      tabIndex={0}
                    >
                      {/* <div className="property-main-boxarea">
                        <div className="space48" />
                        <h4>Upload Photos Of Your Property</h4>
                        <div className="space38" />

                        {fetchedImages.length > 0 && (
                          <div className="fetched-images-section">
                            <h5>
                              Existing Images{" "}
                              {fetchedImages.length > 5 && (
                                <span className="tag">
                                  +{fetchedImages.length - 5} more
                                </span>
                              )}
                            </h5>
                            <div className="space16" />
                            <div className="box-img-upload">
                              {fetchedImages.map((url, index) => (
                                <div
                                  className="item-upload file-delete"
                                  key={url}
                                >
                                  <img src={url} alt={`fetched-img-${index}`} />
                                  <span
                                    className="remove-file"
                                    onClick={() =>
                                      handleDeleteFetchedImage(url)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                    </svg>
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="space20" />
                          </div>
                        )}

                        <div className="box-uploadfile text-center">
                          <div className="uploadfile">
                            <div className="btn-upload vl-btn1 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
                              </svg>
                              Select Property Photos
                              <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="ip-file"
                              />
                            </div>
                            <p className="file-name fw-5">
                              or drag photos here <br />
                              <span>(Up to 10 photos)</span>
                            </p>
                          </div>
                          <div className="space20" />
                          <div className="box-img-upload">
                            {imageUrls.map((url, index) => (
                              <div
                                className="item-upload file-delete"
                                key={url}
                              >
                                <img src={url} alt={`img-${index}`} />
                                <span
                                  className="remove-file"
                                  onClick={() => handleDeleteImage(url)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
                                  </svg>
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="space20" />
                          <div className="text-center">
                            <button
                              className="vl-btn1"
                              onClick={handleClickUploadImageButton}
                              disabled={isPending}
                            >
                              {isPending ? "Uploading..." : "Upload Images"}
                            </button>
                          </div>
                        </div>
                        <div className="space30" />
                        <h4>Video Option</h4>
                        <div className="space40" />
                        <div className="row">
                          <div className="col-lg-6 co-md-6">
                            <div className="input-area">
                              <h5>Select Category*</h5>
                              <div className="space16" />
                              <select className="nice-select">
                                <option>Facebook</option>
                                <option>Instagram</option>
                                <option>Linkedin</option>
                                <option>Youtube</option>
                                <option>Pintares</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 co-md-6">
                            <div className="input-area">
                              <h5>Embed Video Id*</h5>
                              <div className="space16" />
                              <select className="nice-select">
                                <option>Facebook</option>
                                <option>Instagram</option>
                                <option>Linkedin</option>
                                <option>Youtube</option>
                                <option>Pintares</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12 co-md-6">
                            <div className="space30" />
                            <div className="input-area">
                              <h5>Virtual Tour</h5>
                              <div className="space16" />
                              <input type="text" placeholder="Virtual Tour" />
                            </div>
                          </div>
                          <div className="space40" />
                          <div className="col-lg-12">
                            <div className="btn-area1 text-end">
                              <button
                                onClick={() =>
                                  handleNextTab("pills-profile-tab")
                                }
                                className="vl-btn1"
                              >
                                Update To Next Step
                                <span className="arrow1 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="arrow2 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div
                      className={`tab-pane fade${
                        activeTab === "pills-contact-tab" ? " show active" : ""
                      }`}
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                      tabIndex={0}
                    >
                      <div className="upload-main-boxarea">
                        <div className="space48" />
                        <h4>Listing Property Location</h4>
                        <div className="space32" />
                        <div className="input-area">
                          <h5>Address</h5>
                          <div className="space16" />
                          <input type="text" placeholder="Property Address" />
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Country Name</h5>
                              <div className="space16" />
                              <div className="nice-select" tabIndex={0}>
                                <span className="current">Select Country</span>
                                <ul className="list">
                                  <li data-value={1} className="option">
                                    USA
                                  </li>
                                  <li
                                    data-value={2}
                                    className="option selected"
                                  >
                                    Australia
                                  </li>
                                  <li data-value={1} className="option">
                                    England
                                  </li>
                                  <li data-value={1} className="option">
                                    Portugal
                                  </li>
                                  <li data-value={1} className="option">
                                    California
                                  </li>
                                  <li data-value={1} className="option">
                                    Inter Milan
                                  </li>
                                  <li data-value={1} className="option">
                                    Liverpool
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Property City</h5>
                              <div className="space16" />
                              <div className="nice-select" tabIndex={0}>
                                <span className="current">Select City</span>
                                <ul className="list">
                                  <li data-value={1} className="option">
                                    USA
                                  </li>
                                  <li
                                    data-value={2}
                                    className="option selected"
                                  >
                                    Australia
                                  </li>
                                  <li data-value={1} className="option">
                                    England
                                  </li>
                                  <li data-value={1} className="option">
                                    Portugal
                                  </li>
                                  <li data-value={1} className="option">
                                    California
                                  </li>
                                  <li data-value={1} className="option">
                                    Inter Milan
                                  </li>
                                  <li data-value={1} className="option">
                                    Liverpool
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>State Location</h5>
                              <div className="space16" />
                              <input type="text" placeholder="State Location" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>ZIP Code*</h5>
                              <div className="space16" />
                              <input type="text" placeholder="Zip Code" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Neighborhood*</h5>
                              <div className="space16" />
                              <input type="text" placeholder="Neighborhood*" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="space48" />
                            <div className="mapouter">
                              <div className="gmap_canvas">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd"
                                  width={600}
                                  height={450}
                                  style={{ border: 0 }}
                                  allowFullScreen={true}
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Latitude</h5>
                              <div className="space16" />
                              <input type="text" placeholder="Latitude" />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Longitude</h5>
                              <div className="space16" />
                              <input type="text" placeholder="Longitude*" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="space40" />
                            <div className="btn-area1 text-end">
                              <Link href="#" className="vl-btn1">
                                Update To Next Step
                                <span className="arrow1 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="arrow2 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade${
                        activeTab === "pills-contact1-tab" ? " show active" : ""
                      }`}
                      id="pills-contact1"
                      role="tabpanel"
                      aria-labelledby="pills-contact1-tab"
                      tabIndex={0}
                    >
                      <div className="upload-main-boxarea">
                        <div className="space48" />
                        <h4>Listing Details</h4>
                        <div className="space4" />
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Material</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Material"
                                name="material"
                                value={details.material}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Roof Type</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Roof Type"
                                name="roofType"
                                value={details.roofType}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Roof Condition</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Roof Condition"
                                name="roofCondition"
                                value={details.roofCondition}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Insulation</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Insulation"
                                name="insulation"
                                value={details.insulation}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Windows</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Windows"
                                name="windows"
                                value={details.windows}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Windows Age</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="windows age"
                                name="windowsAge"
                                value={details.windowsAge}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Roller Shutter</h5>
                              <div className="space16" />
                              <select
                                className="nice-select"
                                name="hasRollerShutter"
                                value={details.hasRollerShutter}
                                onChange={handleDetailsChange}
                              >
                                <option value="">Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Heating Type</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Heating Type"
                                name="heatingType"
                                value={details.heatingType}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Heating Condition</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Heating Condition"
                                name="heatingCondition"
                                value={details.heatingCondition}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Electric Conditions</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Electric Conditions"
                                name="electricCondition"
                                value={details.electricCondition}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Water Condition</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Water Conditions"
                                name="waterCondition"
                                value={details.waterCondition}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Energy Certificate</h5>
                              <div className="space16" />
                              <select
                                className="nice-select"
                                name="energyCertificate"
                                value={details.energyCertificate}
                                onChange={handleDetailsChange}
                              >
                                <option value="">Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Energy Class</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Energy Class"
                                name="energyClass"
                                value={details.energyClass}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Energy Consumption</h5>
                              <div className="space16" />
                              <input
                                type="number"
                                placeholder="Energy Consumption"
                                name="energyConsumption"
                                value={details.energyConsumption}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Internet type</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Internet type"
                                name="internetType"
                                value={details.internetType}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Internet Speed</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Internet Speed"
                                name="internetSpeed"
                                value={details.internetSpeed}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Monthly Cost</h5>
                              <div className="space16" />
                              <input
                                type="text"
                                placeholder="Monthly  Cost"
                                name="monthlyCost"
                                value={details.monthlyCost}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="space28" />
                            <div className="input-area">
                              <h5>Gardern Description</h5>
                              <div className="space16" />
                              <textarea
                                placeholder="Decribe the garden area, its features, and any landscaping details."
                                name="gardenDesc"
                                value={details.gardenDesc}
                                onChange={handleDetailsChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="space40" />
                            <div className="btn-area1 text-end">
                              <button
                                type="button"
                                onClick={handleSubmitDetails}
                                className="vl-btn1"
                              >
                                Save Details
                                <span className="arrow1 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="arrow2 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade${
                        activeTab === "pills-contact2-tab" ? " show active" : ""
                      }`}
                      id="pills-contact2"
                      role="tabpanel"
                      aria-labelledby="pills-contact2-tab"
                      tabIndex={0}
                    >
                      <div className="upload-main-boxarea">
                        <div className="space48" />
                        <h4>Amenities*</h4>
                        <div className="space16" />
                        <div className="row">
                          <div className="col-lg-2 col-md-6">
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Air Condition </span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Selling Height </span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Heating</span>
                              </label>
                            </fieldset>
                          </div>
                          <div className="col-lg-2 col-md-6">
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Window Type</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Elevator</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Fire Place</span>
                              </label>
                            </fieldset>
                          </div>
                          <div className="col-lg-2 col-md-6">
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Pet Friendly</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Parking</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Disabled Access</span>
                              </label>
                            </fieldset>
                          </div>
                          <div className="col-lg-2 col-md-6">
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Floor</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Renovation</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Cable TV</span>
                              </label>
                            </fieldset>
                          </div>
                          <div className="col-lg-2 col-md-6">
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Furnishing</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Garden</span>
                              </label>
                            </fieldset>
                            <fieldset className="checkbox-item style-1">
                              <label>
                                <input type="checkbox" />
                                <span className="btn-checkbox" />
                                <span className="text-4">Wifi</span>
                              </label>
                            </fieldset>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="space40" />
                            <div className="btn-area1 text-end">
                              <Link href="#" className="vl-btn1">
                                Upload Your property
                                <span className="arrow1 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                                <span className="arrow2 ms-2">
                                  <i className="fa-solid fa-arrow-right" />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
