import React, { useState, useEffect } from "react";
import { Upload, Sparkles, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useExtractDocumentMutation } from "@/state/api";
import { useTranslations } from "next-intl";

interface DocumentUploadAidProps {
  onDataExtracted: (data: any) => void;
}

const DocumentUploadAid = ({ onDataExtracted }: DocumentUploadAidProps) => {
  const t = useTranslations("AddProperty");
  const [extractDocument, { isLoading }] = useExtractDocumentMutation();
  const [dragActive, setDragActive] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingMessages = [
    "AI is reading your document...",
    "Extracting property details...",
    "Analyzing amenities & location...",
    "Structuring data for form...",
    "Almost done...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFile = async (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOCX, or TXT document.");
      return;
    }

    try {
      const result = await extractDocument(file).unwrap();
      if (result.data) {
        onDataExtracted(result.data);
        toast.success("✨ Form auto-filled successfully!");
      }
    } catch (err: any) {
      console.error("Extraction failed full object:", err);

      // Handle RTK Query error structure
      let errorMessage = "Failed to extract data from document.";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error(errorMessage);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`ai-smart-fill-container ${dragActive ? "active" : ""} ${isLoading ? "processing" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="smart-fill-header">
        <Sparkles size={18} className="sparkle-icon" />
        <span>{t("smart_fill_title")}</span>
      </div>

      <p className="smart-fill-hint">{t("smart_fill_hint")}</p>

      <label className="smart-fill-upload-btn">
        {isLoading ? (
          <div className="loading-state-enhanced">
            <div className="scanner-container">
              <FileText className="doc-icon" size={24} />
              <div className="scanner-line"></div>
            </div>
            <div className="loading-text-container">
              <span className="loading-message">
                {loadingMessages[loadingTextIndex]}
              </span>
              <span className="loading-subtext">
                This might take a few seconds
              </span>
            </div>
          </div>
        ) : (
          <div className="upload-state">
            <Upload size={18} />
            <span>{t("smart_fill_upload_btn")}</span>
          </div>
        )}
        <input
          type="file"
          className="hidden-file-input"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleChange}
          disabled={isLoading}
        />
      </label>

      <style jsx>{`
        .ai-smart-fill-container {
          background: linear-gradient(135deg, #fdf2f3 0%, #fff 100%);
          border: 2px dashed var(--ztc-bg-bg-3, #ce283f);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 48px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          box-shadow: 0 10px 30px -10px rgba(206, 40, 63, 0.1);
        }
        .ai-smart-fill-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(206, 40, 63, 0.15);
        }
        .ai-smart-fill-container.active {
          border-color: var(--ztc-bg-bg-2, #1b1b1b);
          background: #fff;
        }
        .ai-smart-fill-container.processing {
          border-color: var(--ztc-bg-bg-3, #ce283f);
          background: rgba(206, 40, 63, 0.03);
          animation: pulse-border-glow 2s infinite ease-in-out;
        }
        .ai-smart-fill-container.processing .smart-fill-header,
        .ai-smart-fill-container.processing .smart-fill-hint {
          opacity: 0.4;
        }
        .smart-fill-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 700;
          color: var(--ztc-text-text-2, #1b1b1b);
          margin-bottom: 16px;
          font-size: 1.25rem;
          font-family: var(--ztc-family-font1, "Roboto", sans-serif);
          letter-spacing: -0.01em;
          transition: opacity 0.4s ease;
        }
        .sparkle-icon {
          color: var(--ztc-bg-bg-3, #ce283f);
          animation: pulse-gold 2s infinite ease-in-out;
        }
        .smart-fill-hint {
          color: var(--ztc-text-text-3, #5c5d62);
          font-size: 1rem;
          margin-bottom: 28px;
          line-height: 1.6;
          max-width: 400px;
          margin-inline: auto;
          transition: opacity 0.4s ease;
        }
        .smart-fill-upload-btn {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          background: var(--ztc-bg-bg-3, #ce283f);
          color: #fff;
          padding: 16px 32px;
          border-radius: 70px;
          font-weight: 700;
          font-family: var(--ztc-family-font1, "Roboto", sans-serif);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          box-shadow: 0 8px 25px -5px rgba(206, 40, 63, 0.3);
          position: relative;
          z-index: 1;
          overflow: hidden;
          min-height: 56px;
        }
        .smart-fill-upload-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: var(--ztc-bg-bg-2, #1b1b1b);
          transition: width 0.4s ease;
          z-index: -1;
        }
        .smart-fill-upload-btn:not(:disabled):hover {
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -8px rgba(27, 27, 27, 0.4);
        }
        .smart-fill-upload-btn:not(:disabled):hover::before {
          width: 100%;
        }
        .loading-state-enhanced {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .scanner-container {
          position: relative;
          width: 24px;
          height: 24px;
          overflow: hidden;
          color: #fff;
        }
        .doc-icon {
          opacity: 0.8;
          display: block;
        }
        .scanner-line {
          position: absolute;
          top: 0;
          left: -10%;
          width: 120%;
          height: 2px;
          background: #fff;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
          animation: scan 1.5s infinite linear alternate;
        }
        .loading-text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .loading-message {
          font-weight: 600;
          font-size: 1rem;
          min-width: 230px;
        }
        .loading-subtext {
          font-size: 0.75rem;
          font-weight: 400;
          opacity: 0.8;
          margin-top: 2px;
        }
        .upload-state {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hidden-file-input {
          display: none;
        }
        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        @keyframes pulse-border-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(206, 40, 63, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(206, 40, 63, 0);
          }
        }
        @keyframes pulse-gold {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default DocumentUploadAid;
