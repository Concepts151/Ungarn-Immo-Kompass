import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";

// Fetch data from our new Regions API
async function getRegion(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
  const res = await fetch(`${baseUrl}/regions/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch region");
  }

  return res.json();
}

export default async function RegionPage({
  params,
}: {
  params: { slug: string };
}) {
  const region = await getRegion(params.slug);

  if (!region) {
    notFound();
  }

  const { name, textContent } = region;
  // textContent contains the rich JSON data we seeded
  const { vibes, life_style_check, top_orte, infrastruktur } = textContent;

  return (
    <Layout>
      <InnerHeader title={name} currentpage="Region Guide" />

      <section className="about-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="about-content">
                <div className="title-area mb-40">
                  <span className="sub-title">Explore Hungary</span>
                  <h2 className="title">{name}</h2>
                </div>

                {/* Vibe / Atmosphere */}
                {vibes && (
                  <div className="mb-40">
                    <h4 className="mb-20">The Atmosphere</h4>
                    <p>{vibes}</p>
                  </div>
                )}

                {/* Lifestyle Check */}
                {life_style_check && (
                  <div className="about-feature-area mb-40">
                    <h4 className="mb-20">Lifestyle Check</h4>
                    <div className="row gap-4">
                      <div className="col-md-5 feature-box">
                        <h5>🏔️ Nature & Hiking</h5>
                        <p>{life_style_check.natur_wandern}</p>
                      </div>
                      <div className="col-md-5 feature-box">
                        <h5>🏖️ Vibe</h5>
                        <p>{life_style_check.vibe}</p>
                      </div>
                      <div className="col-md-5 feature-box">
                        <h5>💼 Digital Nomads</h5>
                        <p>{life_style_check.digital_nomads}</p>
                      </div>
                      <div className="col-md-5 feature-box">
                        <h5>👨‍👩‍👧‍👦 Families</h5>
                        <p>{life_style_check.familien}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Infrastructure */}
                {infrastruktur && (
                  <div className="mb-40">
                    <h4 className="mb-20">Infrastructure</h4>
                    <ul>
                      <li>
                        <strong>Medical:</strong>{" "}
                        {infrastruktur.arztliche_versorgung}
                      </li>
                      <li>
                        <strong>Shopping:</strong> {infrastruktur.einkaufen}
                      </li>
                      <li>
                        <strong>Transport:</strong> {infrastruktur.anbindung}
                      </li>
                      <li>
                        <strong>Internet:</strong>{" "}
                        {infrastruktur.internet_mobil}
                      </li>
                    </ul>
                  </div>
                )}

                {/* Top Locations */}
                {top_orte && top_orte.length > 0 && (
                  <div className="mb-40">
                    <h4 className="mb-20">Top Towns & Cities</h4>
                    <div className="row">
                      {top_orte.map((ort: any, idx: number) => (
                        <div key={idx} className="col-md-6 mb-3">
                          <div className="card shadow-sm p-3">
                            <h5 className="text-primary">{ort.name}</h5>
                            <p className="text-muted small">
                              {ort.beschreibung || ort.bescheribung}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar for Real Estate Listings specific to this region could go here */}
            <div className="col-lg-4">
              <div className="sidebar-widget">
                <h4 className="widget-title">Properties in {name}</h4>
                <p>Discover real estate matching your dreams in this region.</p>
                <a href={`/property?region=${region.id}`} className="vl-btn1">
                  View Properties
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
