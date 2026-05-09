"use client";

import dynamic from "next/dynamic";

// Fallback skeleton while the component loads
function SearchBoxFallback() {
  return (
    <>
      <div className="others-section-area container-home1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-tab-section b-bg1">
                <div className="tab-content1">
                  <div className="filters mb-2">
                    <h2 className="fw-bold">Find your dream property</h2>
                  </div>
                  <div className="filters z-1 position-relative">
                    <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
                      <div className="filter-group flex-grow-1">
                        <div style={{ height: 52, background: '#f3f4f6', borderRadius: 52 }}></div>
                      </div>
                      <div className="filter-group" style={{ minWidth: 180 }}>
                        <div style={{ height: 52, background: '#f3f4f6', borderRadius: 52 }}></div>
                      </div>
                      <div className="filter-group" style={{ minWidth: 150 }}>
                        <div style={{ height: 52, background: '#f3f4f6', borderRadius: 52 }}></div>
                      </div>
                      <div className="filter-group" style={{ minWidth: 100 }}>
                        <div style={{ height: 52, background: '#f3f4f6', borderRadius: 52 }}></div>
                      </div>
                      <div className="filter-group" style={{ minWidth: 100 }}>
                        <div style={{ height: 52, background: '#f3f4f6', borderRadius: 52 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space30"></div>
    </>
  );
}

// Dynamically import the content component with SSR disabled
// This prevents hydration mismatch caused by nice-select jQuery plugin
const SearchBoxContent = dynamic(
  () => import('./SearchBoxContent'),
  { 
    ssr: false,
    loading: () => <SearchBoxFallback />
  }
);

export default function SearchBox() {
  return <SearchBoxContent />;
}