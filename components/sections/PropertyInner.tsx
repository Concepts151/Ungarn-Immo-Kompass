import Link from "next/link";
import { Expose } from "@/app/(nondashboard)/property/[id]/page";
import dynamic from "next/dynamic";
import VillageSection from "@/app/(nondashboard)/property/components/village-section";

// Dynamically import ContactSeller with no SSR
const ContactSeller = dynamic(
  () => import("@/components/elements/ContactSeller"),
  { ssr: false }
);

interface PropertyInnerProps {
  block_extend?: string;
  property: any;
}

// Helper function to render star ratings
const renderStarRating = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rating ? "#ED8438" : "#ccc",
          fontSize: "18px",
        }}
      >
        ★
      </span>
    );
  }
  return stars;
};

// Helper to format currency
const formatCurrency = (amount: number, currency: string = "EUR") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function PropertyInner({
  block_extend,
  property,
}: PropertyInnerProps) {
  // Extract seller information
  const seller = property.seller;
  const sellerName = `${seller.firstName} ${seller.lastName}`;

  // Create property title from basic info
  const basic = property.basic as any;
  const propertyTitle = `${basic.title ?? basic.address} in ${basic.city}`;
  const sellerMatrixId = property.seller.matrixUserId;
  const sellerAvatarUrl = `https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${seller.avatarUrl}`;

  // Filter media by type
  const photos = property.media.filter(
    (mediaItem: any) => mediaItem.mediaType === "PHOTO"
  );
  const videos = property.media.filter(
    (mediaItem: any) => mediaItem.mediaType === "VIDEO"
  );
  const videoSource = videos.length > 0 ? videos[0].url : null;

  // Calculate total monthly costs
  const monthlyCosts = property.details?.monthlyCosts;
  const totalMonthlyCosts = monthlyCosts
    ? (monthlyCosts.electricity || 0) +
      (monthlyCosts.water || 0) +
      (monthlyCosts.gas || 0) +
      (monthlyCosts.trash || 0) +
      (monthlyCosts.tax || 0)
    : 0;

  return (
    <>
      {/*===== PROPERTY AREA STARTS =======*/}
      <div className="property-inner-section-find">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-mapgrid-area">
                <div className="space32" />
                <div className="row">
                  <div className="col-lg-3">
                    <div className="sidebar1-area">
                      <ContactSeller
                        sellerName={sellerName}
                        sellerImage={sellerAvatarUrl}
                        sellerEmail={seller.email}
                        sellerPhone={seller.phone}
                        sellerMatrixId={sellerMatrixId}
                        propertyId={property.id}
                        propertyTitle={propertyTitle}
                        sellerId={seller.id}
                      />
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="property-widget-sidebar">
                      {/* Video Section */}
                      {videos.length > 0 && (
                        <div className="img1">
                          <video
                            controls
                            poster={photos[0]?.url || ""}
                            style={{
                              width: "100%",
                              height: "500px",
                              borderRadius: 10,
                              backgroundColor: "#000",
                            }}
                          >
                            <source src={videoSource!} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      <div className="space40" />
                      <div className="padding-side">
                        {/* About This Property */}
                        {(property.basic as any).description && (
                          <>
                            <h3>About This Property</h3>
                            <div className="space24" />
                            <p>{(property.basic as any).description}</p>
                          </>
                        )}
                        <div className="space30" />

                        {/* Property Overview */}
                        <h3>Property Overview</h3>
                        <div className="space12" />
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="others-box">
                              <img src="/assets/img/icons/check1.svg" alt="check" />
                              <div className="text">
                                <p>
                                  <span>Property Type:</span> {property.basic.propertyType}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="others-box">
                              <img src="/assets/img/icons/check1.svg" alt="check" />
                              <div className="text">
                                <p>
                                  <span>Build Year:</span> {property.basic.buildYear}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="others-box">
                              <img src="/assets/img/icons/check1.svg" alt="check" />
                              <div className="text">
                                <p>
                                  <span>Living Area:</span> {property.basic.livingArea} sqft
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="others-box">
                              <img src="/assets/img/icons/check1.svg" alt="check" />
                              <div className="text">
                                <p>
                                  <span>Lot Size:</span> {property.basic.lotSize} sqft
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="others-box">
                              <img src="/assets/img/icons/check1.svg" alt="check" />
                              <div className="text">
                                <p>
                                  <span>Rooms:</span> {property.basic.rooms}
                                </p>
                              </div>
                            </div>
                          </div>
                          {property.basic.lastRenovation && (
                            <div className="col-lg-6">
                              <div className="others-box">
                                <img src="/assets/img/icons/check1.svg" alt="check" />
                                <div className="text">
                                  <p>
                                    <span>Last Renovation:</span> {property.basic.lastRenovation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space30" />

                        {/* Property Details Section */}
                        {property.details && (
                          <>
                            <h3>Property Details</h3>
                            <div className="space12" />
                            <div className="row">
                              {property.details.material && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Material:</span> {property.details.material}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {property.details.roofType && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Roof:</span> {property.details.roofType} ({property.details.roofCondition})
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {property.details.insulation && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Insulation:</span> {property.details.insulation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {property.details.windows && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Windows:</span> {property.details.windows}
                                        {property.details.windowsAge && ` (${property.details.windowsAge} years old)`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="col-lg-6">
                                <div className="others-box">
                                  <img src="/assets/img/icons/check1.svg" alt="check" />
                                  <div className="text">
                                    <p>
                                      <span>Roller Shutters:</span> {property.details.hasRollerShutters ? "Yes" : "No"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {property.details.heatingType && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Heating:</span> {property.details.heatingType} ({property.details.heatingCondition})
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {property.details.internetType && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Internet:</span> {property.details.internetType} ({property.details.internetSpeed} Mbps)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="space30" />

                            {/* Energy & Utilities Section */}
                            <h3>Energy & Utilities</h3>
                            <div className="space12" />
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="others-box">
                                  <img src="/assets/img/icons/check1.svg" alt="check" />
                                  <div className="text">
                                    <p>
                                      <span>Electric Condition:</span> {property.details.electricCondition}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="others-box">
                                  <img src="/assets/img/icons/check1.svg" alt="check" />
                                  <div className="text">
                                    <p>
                                      <span>Water Condition:</span> {property.details.waterCondition}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="others-box">
                                  <img src="/assets/img/icons/check1.svg" alt="check" />
                                  <div className="text">
                                    <p>
                                      <span>Energy Certificate:</span> {property.details.energyCertificate ? "Yes" : "No"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {property.details.energyClass && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Energy Class:</span> {property.details.energyClass}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {property.details.energyConsumption && (
                                <div className="col-lg-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Energy Consumption:</span> {property.details.energyConsumption} kWh/m²
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="space30" />
                          </>
                        )}

                        {/* Monthly Costs Section */}
                        {monthlyCosts && totalMonthlyCosts > 0 && (
                          <>
                            <h3>Monthly Costs</h3>
                            <div className="space12" />
                            <div className="row">
                              {monthlyCosts.electricity > 0 && (
                                <div className="col-lg-4 col-md-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Electricity:</span> {formatCurrency(monthlyCosts.electricity, property.basic.currency)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {monthlyCosts.water > 0 && (
                                <div className="col-lg-4 col-md-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Water:</span> {formatCurrency(monthlyCosts.water, property.basic.currency)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {monthlyCosts.gas > 0 && (
                                <div className="col-lg-4 col-md-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Gas:</span> {formatCurrency(monthlyCosts.gas, property.basic.currency)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {monthlyCosts.trash > 0 && (
                                <div className="col-lg-4 col-md-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Trash:</span> {formatCurrency(monthlyCosts.trash, property.basic.currency)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {monthlyCosts.tax > 0 && (
                                <div className="col-lg-4 col-md-6">
                                  <div className="others-box">
                                    <img src="/assets/img/icons/check1.svg" alt="check" />
                                    <div className="text">
                                      <p>
                                        <span>Tax:</span> {formatCurrency(monthlyCosts.tax, property.basic.currency)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="col-lg-4 col-md-6">
                                <div className="others-box">
                                  <img src="/assets/img/icons/check1.svg" alt="check" />
                                  <div className="text">
                                    <p>
                                      <span>Total:</span> <strong>{formatCurrency(totalMonthlyCosts, property.basic.currency)}/month</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space30" />
                          </>
                        )}

                        {/* Property Condition Section */}
                        {property.condition && (
                          <>
                            <h3>Property Condition</h3>
                            <div className="space12" />
                            <div className="row">
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div
                                  style={{
                                    padding: "20px",
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                                    Structure Rating
                                  </p>
                                  <div>{renderStarRating(property.condition.structureRating)}</div>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div
                                  style={{
                                    padding: "20px",
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                                    Electric Rating
                                  </p>
                                  <div>{renderStarRating(property.condition.electricRating)}</div>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div
                                  style={{
                                    padding: "20px",
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                                    Heating Rating
                                  </p>
                                  <div>{renderStarRating(property.condition.heatingRating)}</div>
                                </div>
                              </div>
                            </div>
                            {property.condition.damageDescription && (
                              <div className="others-box">
                                <img src="/assets/img/icons/check1.svg" alt="check" />
                                <div className="text">
                                  <p>
                                    <span>Damage Description:</span> {property.condition.damageDescription}
                                  </p>
                                </div>
                              </div>
                            )}
                            {property.condition.renovationNeeded && (
                              <div className="others-box">
                                <img src="/assets/img/icons/check1.svg" alt="check" />
                                <div className="text">
                                  <p>
                                    <span>Renovation Needed:</span> {property.condition.renovationNeeded}
                                  </p>
                                </div>
                              </div>
                            )}
                            {property.condition.additionalNotes && (
                              <div className="others-box">
                                <img src="/assets/img/icons/check1.svg" alt="check" />
                                <div className="text">
                                  <p>
                                    <span>Additional Notes:</span> {property.condition.additionalNotes}
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="space30" />
                          </>
                        )}

                        {/* Garden Description */}
                        {property.details?.gardenDesc && (
                          <>
                            <h3>Garden & Outdoor</h3>
                            <div className="space12" />
                            <p>{property.details.gardenDesc}</p>
                            <div className="space30" />
                          </>
                        )}

                        {/* Property Gallery */}
                        <h3>Property Gallery, Explore The Space</h3>
                        <div className="space32" />
                        {photos.length > 0 ? (
                          <>
                            <div className="img2">
                              <img
                                src={photos[0]?.url}
                                alt="Property"
                                style={{
                                  width: "100%",
                                  height: "400px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <div className="plus">
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 32 32"
                                    fill="none"
                                  >
                                    <path
                                      d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z"
                                      fill="white"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                            <div className="row">
                              {photos.slice(1, 4).map((photo: any, index: number) => (
                                <div key={photo.id} className="col-lg-4 col-md-6">
                                  <div className="img2">
                                    <img
                                      src={photo.url}
                                      alt={`Property ${index + 2}`}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginTop: "16px",
                                      }}
                                    />
                                    <div className="plus">
                                      <Link href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={32}
                                          height={32}
                                          viewBox="0 0 32 32"
                                          fill="none"
                                        >
                                          <path
                                            d="M12.7143 13.7143C13.2666 13.7143 13.7143 13.2666 13.7143 12.7143V1C13.7143 0.447715 14.162 0 14.7143 0H17.2857C17.838 0 18.2857 0.447715 18.2857 1V12.7143C18.2857 13.2666 18.7334 13.7143 19.2857 13.7143H31C31.5523 13.7143 32 14.162 32 14.7143V17.2857C32 17.838 31.5523 18.2857 31 18.2857H19.2857C18.7334 18.2857 18.2857 18.7334 18.2857 19.2857V31C18.2857 31.5523 17.838 32 17.2857 32H14.7143C14.162 32 13.7143 31.5523 13.7143 31V19.2857C13.7143 18.7334 13.2666 18.2857 12.7143 18.2857H1C0.447715 18.2857 0 17.838 0 17.2857V14.7143C0 14.162 0.447715 13.7143 1 13.7143H12.7143Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p>No photos available for this property.</p>
                        )}
                        <div className="space30" />

                        {/* Village Section */}
                        {basic.village && (
                          <VillageSection village={basic.village} />
                        )}

                        {/* Floor Plans */}
                        {property.floorplans && property.floorplans.length > 0 && (
                          <>
                            <div className="space30" />
                            <h3>Floor Plans</h3>
                            <div className="space32" />
                            <div
                              className="accordion accordion-flush"
                              id="accordionFlushExample"
                            >
                              {property.floorplans.map((floorplan: any, index: number) => (
                                <div key={floorplan.id} className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#flush-collapse${index}`}
                                      aria-expanded={index === 0 ? "true" : "false"}
                                      aria-controls={`flush-collapse${index}`}
                                    >
                                      <span>Floor Plan {index + 1}</span>
                                      <span className="list">
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M8 9H16M8 15H16"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M3 21H21V3.00046L3 3V21Z"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          {property.basic.livingArea} sqft
                                        </span>
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M22 17.5H2"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                          {property.basic.bedrooms} Beds
                                        </span>
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M6 20L5 21M18 20L19 21"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M2 12H22"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                            <path
                                              d="M8 6L10.5 4"
                                              stroke="#1B1B1B"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                          {property.basic.bathrooms} Baths
                                        </span>
                                      </span>
                                    </button>
                                  </h2>
                                  <div
                                    id={`flush-collapse${index}`}
                                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="img1">
                                        <img
                                          src={floorplan.url}
                                          alt={`Floor Plan ${index + 1}`}
                                          style={{
                                            width: "100%",
                                            maxHeight: "500px",
                                            objectFit: "contain",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        <div className="space30" />
                        <h3>Schedule A Viewing Book a Tour Today!</h3>
                        <div className="space24" />
                        <p>
                          Interested in this property? Contact us today to
                          schedule a viewing and experience it for yourself. Our
                          real estate experts are here to guide you every step
                          of the way.
                        </p>
                        <div className="space32" />
                        <div className="contact-boxarea ms-0">
                          <h3>Get In Touch Now</h3>
                          <div className="space8" />
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="input-area">
                                <input type="text" placeholder="Your Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-area">
                                <input type="text" placeholder="Last Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-area">
                                <input
                                  type="number"
                                  placeholder="Phone Number "
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-area">
                                <input
                                  type="email"
                                  placeholder="Email Address"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <textarea
                                  placeholder="Your Message"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="space4" />
                              <div className="input-area">
                                <button type="submit" className="vl-btn1">
                                  Submit Now
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
                        <div className="space16" />
                        <div className="contact-box">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={33}
                              height={32}
                              viewBox="0 0 33 32"
                              fill="none"
                            >
                              <path
                                d="M5.83333 24.0013L12.5 16.0013M27.1667 24.0013L20.5 16.0013M4.5 10.668L14.1333 17.0901C14.9887 17.6604 15.4163 17.9456 15.8785 18.0562C16.2871 18.1542 16.7129 18.1542 17.1215 18.0562C17.5837 17.9456 18.0113 17.6604 18.8667 17.0901L28.5 10.668M8.76667 25.3346H24.2333C25.7268 25.3346 26.4736 25.3346 27.044 25.044C27.5457 24.7884 27.9537 24.3804 28.2093 23.8786C28.5 23.3082 28.5 22.5614 28.5 21.068V10.9346C28.5 9.44117 28.5 8.69442 28.2093 8.124C27.9537 7.62222 27.5457 7.21428 27.044 6.95862C26.4736 6.66797 25.7268 6.66797 24.2333 6.66797H8.76667C7.2732 6.66797 6.52645 6.66797 5.95603 6.95862C5.45425 7.21428 5.04631 7.62222 4.79065 8.124C4.5 8.69442 4.5 9.44116 4.5 10.9346V21.068C4.5 22.5614 4.5 23.3082 4.79065 23.8786C5.04631 24.3804 5.45425 24.7884 5.95603 25.044C6.52645 25.3346 7.27319 25.3346 8.76667 25.3346Z"
                                stroke="#ED8438"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <div className="text">
                            <p>Seller Email</p>
                            <div className="space8" />
                            <Link href={`mailto:${seller.email}`}>
                              {seller.email}
                            </Link>
                          </div>
                        </div>
                        {seller.phone && (
                          <div className="contact-box">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={32}
                                height={32}
                                viewBox="0 0 32 32"
                                fill="none"
                              >
                                <path
                                  d="M18.7333 7.99935C20.0357 8.25344 21.2325 8.89036 22.1708 9.8286C23.1091 10.7668 23.746 11.9637 24 13.266M18.7333 2.66602C21.4391 2.9666 23.9621 4.17824 25.8884 6.10203C27.8145 8.0258 29.0295 10.5474 29.3333 13.2527M24.6667 27.9993C13.2528 27.9993 4 18.7465 4 7.33268C4 6.81772 4.01884 6.30716 4.05585 5.80166C4.09833 5.22151 4.11957 4.93144 4.2716 4.66739C4.39752 4.4487 4.62067 4.2413 4.84797 4.13168C5.12241 3.99935 5.44251 3.99935 6.08268 3.99935H9.83909C10.3774 3.99935 10.6466 3.99935 10.8774 4.08795C11.0812 4.16622 11.2627 4.29334 11.4059 4.45815C11.568 4.64472 11.66 4.8977 11.844 5.40363L13.3988 9.67942C13.6128 10.2681 13.7199 10.5624 13.7017 10.8416C13.6857 11.0878 13.6016 11.3248 13.4589 11.5261C13.2971 11.7544 13.0286 11.9155 12.4915 12.2378L10.6667 13.3327C12.2692 16.8645 15.1335 19.7325 18.6667 21.3327L19.7616 19.5079C20.0839 18.9707 20.2449 18.7021 20.4732 18.5404C20.6745 18.3977 20.9115 18.3136 21.1577 18.2976C21.4369 18.2795 21.7313 18.3865 22.32 18.6005L26.5957 20.1553C27.1016 20.3393 27.3547 20.4313 27.5412 20.5935C27.706 20.7367 27.8332 20.9181 27.9113 21.122C28 21.3527 28 21.6219 28 22.1603V25.9167C28 26.5568 28 26.877 27.8676 27.1514C27.758 27.3787 27.5507 27.6019 27.332 27.7278C27.0679 27.8798 26.7779 27.9009 26.1977 27.9435C25.6921 27.9805 25.1816 27.9993 24.6667 27.9993Z"
                                  stroke="#ED8438"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <div className="text">
                              <p>Call Seller</p>
                              <div className="space8" />
                              <Link href={`tel:${seller.phone}`}>
                                {seller.phone}
                              </Link>
                            </div>
                          </div>
                        )}
                        <div className="contact-box">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.329 27.958C17.8625 26.5665 19.2817 25.0541 20.573 23.4353C23.293 20.018 24.9477 16.6487 25.0597 13.6527C25.104 12.4351 24.9024 11.221 24.4671 10.0831C24.0317 8.94509 23.3714 7.90654 22.5257 7.02947C21.6799 6.15239 20.6661 5.45477 19.5447 4.97829C18.4233 4.5018 17.2174 4.25622 15.999 4.25622C14.7806 4.25622 13.5747 4.5018 12.4533 4.97829C11.3319 5.45477 10.3181 6.15239 9.47235 7.02947C8.62661 7.90654 7.96634 8.94509 7.53095 10.0831C7.09557 11.221 6.89402 12.4351 6.93834 13.6527C7.05167 16.6487 8.70767 20.018 11.4263 23.4353C12.7176 25.0541 14.1369 26.5665 15.6703 27.958C15.8179 28.0913 15.9277 28.1882 15.9997 28.2487L16.329 27.958ZM15.0157 29.5114C15.0157 29.5114 5.33301 21.3567 5.33301 13.3327C5.33301 10.5037 6.45681 7.7906 8.4572 5.79021C10.4576 3.78982 13.1707 2.66602 15.9997 2.66602C18.8287 2.66602 21.5418 3.78982 23.5421 5.79021C25.5425 7.7906 26.6663 10.5037 26.6663 13.3327C26.6663 21.3567 16.9837 29.5114 16.9837 29.5114C16.445 30.0074 15.5583 30.002 15.0157 29.5114ZM15.9997 17.066C16.9898 17.066 17.9394 16.6727 18.6395 15.9725C19.3397 15.2724 19.733 14.3228 19.733 13.3327C19.733 12.3425 19.3397 11.393 18.6395 10.6928C17.9394 9.99268 16.9898 9.59935 15.9997 9.59935C15.0095 9.59935 14.0599 9.99268 13.3598 10.6928C12.6597 11.393 12.2663 12.3425 12.2663 13.3327C12.2663 14.3228 12.6597 15.2724 13.3598 15.9725C14.0599 16.6727 15.0095 17.066 15.9997 17.066ZM15.9997 18.666C14.5852 18.666 13.2286 18.1041 12.2284 17.1039C11.2282 16.1037 10.6663 14.7472 10.6663 13.3327C10.6663 11.9182 11.2282 10.5616 12.2284 9.56145C13.2286 8.56125 14.5852 7.99935 15.9997 7.99935C17.4142 7.99935 18.7707 8.56125 19.7709 9.56145C20.7711 10.5616 21.333 11.9182 21.333 13.3327C21.333 14.7472 20.7711 16.1037 19.7709 17.1039C18.7707 18.1041 17.4142 18.666 15.9997 18.666Z"
                                fill="#ED8438"
                              />
                            </svg>
                          </span>
                          <div className="text">
                            <p>Property Location</p>
                            <div className="space8" />
                            <Link href="#">
                              {property.basic.address}, {property.basic.city},{" "}
                              {property.basic.county} {property.basic.postalCode}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${block_extend}`}>
                      <>
                        <div className="space30" />
                        <div className="bg1-property">
                          <h3>Map Location</h3>
                          <div className="space32" />
                          <div className="map-section">
                            {property.location ? (
                              <iframe
                                src={`https://www.google.com/maps?q=${property.location.latitude},${property.location.longitude}&z=14&output=embed`}
                                width="100%"
                                height={450}
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            ) : (
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd"
                                width={600}
                                height={450}
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            )}
                            <div className="space12" />
                            <div className="list">
                              <ul>
                                <li>
                                  <span>Address:</span>
                                  <div>{property.basic.address}</div>
                                </li>
                                <li>
                                  <span>City:</span>
                                  <div>{property.basic.city}</div>
                                </li>
                              </ul>
                              <ul className="m-0 ">
                                <li>
                                  <span>Postal Code:</span>
                                  <div>{property.basic.postalCode}</div>
                                </li>
                                <li>
                                  <span>County:</span>
                                  <div>{property.basic.county}</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===== PROPERTY AREA ENDS =======*/}
    </>
  );
}